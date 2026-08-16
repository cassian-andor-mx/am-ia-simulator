import { useEffect, useRef, useState } from "react";
import type {
  ExperienceContext,
  ExperienceDefinition,
  ExperienceParameterDefinition,
  ExperienceResource,
  PromptDefinition
} from "./simulator/types/experience";
import type { UsageMetrics } from "./simulator/types/usage";
import {
  ExperienceEngine,
  type EngineContentItem,
  type EngineExecutionState,
  type EngineSnapshot
} from "./simulator/engine/experienceEngine";
import {
  getInitialParameterValues,
  getInterpolatedExperience,
  mergeWithParameterDefaults
} from "./simulator/runtime/experienceRuntime";
import { calculateUsageMetrics } from "./simulator/runtime/usageMetrics";
import { SimulationContentRenderer } from "./simulator/renderers/simulationContentRenderer";
import {
  loadDemoExperienceIds,
  loadDemoExperience,
  type DemoExperienceId
} from "./simulations/loadExperience";

const TAB_LABELS = ["Prompt", "Simulation", "Resources"] as const;
type TabLabel = (typeof TAB_LABELS)[number];

const getTabId = (tabLabel: TabLabel): string => `tab-${tabLabel.toLowerCase()}`;
const getPanelId = (tabLabel: TabLabel): string => `panel-${tabLabel.toLowerCase()}`;

const getNextTabFromKey = (currentTab: TabLabel, key: string): TabLabel | null => {
  const tabIndex = TAB_LABELS.indexOf(currentTab);
  const nextTabsByKey: Record<string, TabLabel | undefined> = {
    ArrowRight: TAB_LABELS[(tabIndex + 1) % TAB_LABELS.length],
    ArrowLeft: TAB_LABELS[(tabIndex - 1 + TAB_LABELS.length) % TAB_LABELS.length],
    Home: TAB_LABELS[0],
    End: TAB_LABELS[TAB_LABELS.length - 1]
  };

  return nextTabsByKey[key] ?? null;
};

const formatUsageTokenCount = (tokenCount: number | null): string => {
  if (tokenCount === null) {
    return "—";
  }

  return `~${tokenCount.toLocaleString()}`;
};

const formatEnvironmentalValue = (value: number | undefined, unit: string): string => {
  if (value === undefined) {
    return "Not available";
  }

  return `~${value.toFixed(2)} ${unit}`;
};

type UsageUtilityState = "idle" | "running" | "completed" | "unavailable";

const getUsageUtilityPresentation = (
  engineState: EngineExecutionState,
  hasExperienceError: boolean,
  usageMetrics: UsageMetrics | null
): { state: UsageUtilityState; valueLabel: string; ariaDescription: string } => {
  if (hasExperienceError) {
    return {
      state: "unavailable",
      valueLabel: "— Unavailable",
      ariaDescription: "Usage metrics are unavailable"
    };
  }

  if (engineState === "running") {
    return {
      state: "running",
      valueLabel: "○ Measuring...",
      ariaDescription: "Usage is currently being measured"
    };
  }

  if (engineState === "completed") {
    if (usageMetrics) {
      return {
        state: "completed",
        valueLabel: `● ${usageMetrics.interactionLoad ?? "Moderate"}`,
        ariaDescription: `Usage completed with interaction load ${usageMetrics.interactionLoad ?? "Moderate"}`
      };
    }

    return {
      state: "unavailable",
      valueLabel: "— Unavailable",
      ariaDescription: "Usage metrics are unavailable"
    };
  }

  return {
    state: "idle",
    valueLabel: "○ —",
    ariaDescription: "Usage is idle"
  };
};

type UsageDetailsDialogProps = {
  usageMetrics: UsageMetrics;
  isOpen: boolean;
  onClose: () => void;
};

function UsageDetailsDialog({ usageMetrics, isOpen, onClose }: Readonly<UsageDetailsDialogProps>) {
  const usageDetailsCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isEnvironmentalReferenceOpen, setIsEnvironmentalReferenceOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsMethodologyOpen(false);
      setIsEnvironmentalReferenceOpen(false);
      return;
    }

    usageDetailsCloseButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      className="usage-details-overlay"
      open
      aria-labelledby="usage-details-title"
      aria-describedby="usage-details-description"
    >
      <section id="usage-details-panel" className="usage-details-panel">
        <div className="usage-details-header">
          <div>
            <h3 id="usage-details-title">AI Usage Details</h3>
            <p id="usage-details-description">
              Compact summary of this interaction's text usage and reference impact status.
            </p>
          </div>

          <button
            type="button"
            className="usage-details-close-button"
            onClick={onClose}
            ref={usageDetailsCloseButtonRef}
          >
            Close
          </button>
        </div>

        <section className="usage-details-total" aria-label="Total token usage">
          <p className="usage-details-total-label">Total</p>
          <p className="usage-details-total-value">{formatUsageTokenCount(usageMetrics.totalTokens)} tokens</p>
          <p className="usage-details-total-secondary">Total tokens</p>
        </section>

        <dl className="usage-details-compact-grid">
          <div>
            <dt>
              <span>You asked</span>
              <span className="usage-details-technical-label">Input tokens</span>
            </dt>
            <dd>{formatUsageTokenCount(usageMetrics.inputTokens)}</dd>
          </div>
          <div>
            <dt>
              <span>AI returned</span>
              <span className="usage-details-technical-label">Output tokens</span>
            </dt>
            <dd>{formatUsageTokenCount(usageMetrics.outputTokens)}</dd>
          </div>
          <div>
            <dt>Usage</dt>
            <dd>{usageMetrics.interactionLoad ?? "—"}</dd>
          </div>
        </dl>

        <p className="usage-details-token-helper">
          Tokens are small pieces of text AI systems process.
        </p>

        <section className="usage-details-environment" aria-labelledby="usage-details-environment-title">
          <h4 id="usage-details-environment-title">Environmental estimate</h4>
          <p className="usage-details-environment-impact">
            Reference impact: {usageMetrics.interactionLoad ?? "—"}
          </p>
          <p className="usage-details-environment-meta">Estimated, not measured.</p>
          <p className="usage-details-environment-reference-note">
            This is a reference estimate, not a measurement of this exact run.
          </p>

          <button
            type="button"
            className="usage-details-environment-action"
            onClick={() => setIsEnvironmentalReferenceOpen((currentValue) => !currentValue)}
            aria-expanded={isEnvironmentalReferenceOpen}
            aria-controls="usage-environment-reference-content"
          >
            Reference details
          </button>

          {isEnvironmentalReferenceOpen ? (
            <div
              id="usage-environment-reference-content"
              className="usage-details-environment-reference-content"
            >
              <dl className="usage-details-environment-values">
                <div>
                  <dt>Energy</dt>
                  <dd>
                    {formatEnvironmentalValue(
                      usageMetrics.environmentalReference?.referenceEnergyWh,
                      "Wh"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>CO2e</dt>
                  <dd>
                    {formatEnvironmentalValue(
                      usageMetrics.environmentalReference?.referenceCO2eGrams,
                      "g"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Water</dt>
                  <dd>
                    {formatEnvironmentalValue(
                      usageMetrics.environmentalReference?.referenceWaterMl,
                      "mL"
                    )}
                  </dd>
                </div>
              </dl>

              {usageMetrics.environmentalReference ? (
                <>
                  <p>
                    <strong>Source:</strong>{" "}
                    <a href={usageMetrics.environmentalReference.sourceUrl} target="_blank" rel="noreferrer">
                      {usageMetrics.environmentalReference.sourceLabel}
                    </a>{" "}
                    ({usageMetrics.environmentalReference.sourceDate})
                  </p>
                  <p>
                    <strong>Workload:</strong> {usageMetrics.environmentalReference.workloadDescription}
                  </p>
                </>
              ) : null}

              <ul className="usage-details-limitations-list">
                {usageMetrics.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="usage-details-explanation" aria-labelledby="usage-details-how-title">
          <button
            type="button"
            className="usage-details-methodology-action"
            onClick={() => setIsMethodologyOpen((currentValue) => !currentValue)}
            aria-expanded={isMethodologyOpen}
            aria-controls="usage-methodology-content"
            id="usage-details-how-title"
          >
            How this is calculated
          </button>

          {isMethodologyOpen ? (
            <div id="usage-methodology-content" className="usage-details-methodology-content">
              <p>
                Input uses the final interpolated prompt shown for execution. Output uses one canonical textual
                serialization of the visible simulated response.
              </p>
              <p>
                Environmental information uses a reference profile. It is not a direct measurement of this
                simulated run.
              </p>
            </div>
          ) : null}
        </section>
      </section>
    </dialog>
  );
}

type AppProps = {
  externalParameterValues?: Record<string, string>;
};

type PromptPanelProps = {
  showInternalControls: boolean;
  parameterDefinitions: ExperienceParameterDefinition[];
  parameterValues: Record<string, string>;
  missingInterpolationKeys: string[];
  onParameterChange: (parameterId: string, value: string) => void;
  prompt: PromptDefinition;
  onExecutePrompt: () => void;
  isRunning: boolean;
};

function PromptPanel({
  showInternalControls,
  parameterDefinitions,
  parameterValues,
  missingInterpolationKeys,
  onParameterChange,
  prompt,
  onExecutePrompt,
  isRunning
}: Readonly<PromptPanelProps>) {
  return (
    <article className="prompt-panel" aria-labelledby="prompt-title">
      <header className="prompt-panel-header">
        <h2 id="prompt-title">{prompt.title}</h2>
        <p className="prompt-panel-caption">Read-only prompt composer</p>
      </header>

      <div className="prompt-composer-surface">
        <div className="prompt-body">
          {prompt.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <ul>
            {prompt.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {showInternalControls && parameterDefinitions.length > 0 ? (
          <div className="parameter-section" aria-label="Experience parameters">
            {parameterDefinitions.map((parameter) => (
              <label key={parameter.id} className="parameter-field" htmlFor={`parameter-${parameter.id}`}>
                <span>{parameter.label}</span>
                <select
                  id={`parameter-${parameter.id}`}
                  value={parameterValues[parameter.id] ?? parameter.defaultValue}
                  onChange={(event) => onParameterChange(parameter.id, event.target.value)}
                  disabled={isRunning}
                >
                  {parameter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ) : null}

        {missingInterpolationKeys.length > 0 ? (
          <p className="prompt-warning" role="alert">
            Missing parameter values for: {missingInterpolationKeys.join(", ")}
          </p>
        ) : null}

        <div className="prompt-actions">
          <button
            type="button"
            className="execute-button"
            onClick={onExecutePrompt}
            disabled={isRunning || missingInterpolationKeys.length > 0}
          >
            Run Prompt
          </button>
        </div>
      </div>
    </article>
  );
}

type SimulationPanelProps = {
  state: EngineExecutionState;
  statusMessage: string;
  contentItems: EngineContentItem[];
  onOpenResources: () => void;
};

function SimulationPanel({
  state,
  statusMessage,
  contentItems,
  onOpenResources
}: Readonly<SimulationPanelProps>) {
  const simulationLogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!simulationLogRef.current) {
      return;
    }

    simulationLogRef.current.scrollTo({
      top: simulationLogRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [contentItems, statusMessage]);

  if (state === "idle") {
    return <p>Run Execute Prompt in the Prompt tab to start the simulation.</p>;
  }

  return (
    <article className="simulation-panel" aria-live="polite">
      {statusMessage ? <p className="processing-status">{statusMessage}</p> : null}

      <div className="simulation-log" ref={simulationLogRef}>
        {contentItems.map((item) => (
          <SimulationContentRenderer key={item.id} item={item} />
        ))}
      </div>

      {state === "completed" ? (
        <div className="simulation-complete">
          <p>Simulation completed. Generated resources are now available.</p>

          <div className="simulation-complete-actions">
            <button type="button" className="open-resources-button" onClick={onOpenResources}>
              Open Resources
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

type ResourcesPanelProps = {
  resources: ExperienceResource[];
  isCompleted: boolean;
};

function ResourcesPanel({ resources, isCompleted }: Readonly<ResourcesPanelProps>) {
  const getResourceFormat = (fileName: string): string => {
    const extension = fileName.split(".").pop();
    return extension ? extension.toUpperCase() : "FILE";
  };

  if (!isCompleted) {
    return <p className="resources-empty">Resources will be available after simulation completion.</p>;
  }

  return (
    <section className="resources-panel" aria-label="Generated resources">
      <h2>Generated Resources</h2>

      <div className="resource-list">
        {resources.map((resource) => (
          <article key={resource.id} className="resource-card">
            <div className="resource-heading">
              <h3>{resource.fileName}</h3>
              <span className="resource-format-tag">{getResourceFormat(resource.fileName)}</span>
            </div>
            <p>{resource.description}</p>

            <div className="resource-actions">
              <a href={resource.path} target="_blank" rel="noreferrer">
                Open
              </a>
              <a href={resource.path} download={resource.fileName}>
                Download
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type ActiveTabContentProps = {
  activeTab: TabLabel;
  isLoadingExperience: boolean;
  experienceLoadError: string | null;
  experience: ExperienceDefinition | null;
  hasExternalParameterSource: boolean;
  effectiveParameterValues: Record<string, string>;
  experienceInterpolation: ReturnType<typeof getInterpolatedExperience> | null;
  onParameterChange: (parameterId: string, value: string) => void;
  onRunSimulation: () => void;
  engineSnapshot: EngineSnapshot;
  onOpenResourcesTab: () => void;
  runtimeResources: ExperienceResource[];
};

function ActiveTabContent({
  activeTab,
  isLoadingExperience,
  experienceLoadError,
  experience,
  hasExternalParameterSource,
  effectiveParameterValues,
  experienceInterpolation,
  onParameterChange,
  onRunSimulation,
  engineSnapshot,
  onOpenResourcesTab,
  runtimeResources
}: Readonly<ActiveTabContentProps>) {
  return (
    <section
      className={`content-area${activeTab === "Simulation" ? " simulation-content-area" : ""}${activeTab === "Prompt" ? " prompt-content-area" : ""}`}
      role="tabpanel"
      id={getPanelId(activeTab)}
      tabIndex={0}
    >
      {isLoadingExperience ? <p>Loading demo experience...</p> : null}
      {experienceLoadError ? <p>{experienceLoadError}</p> : null}
      {activeTab === "Prompt" && experience && !isLoadingExperience && !experienceLoadError ? (
        <PromptPanel
          parameterDefinitions={experience.parameters ?? []}
          showInternalControls={!hasExternalParameterSource}
          parameterValues={effectiveParameterValues}
          missingInterpolationKeys={experienceInterpolation?.missingKeys ?? []}
          onParameterChange={onParameterChange}
          prompt={experienceInterpolation?.experience.prompt ?? experience.prompt}
          onExecutePrompt={onRunSimulation}
          isRunning={engineSnapshot.state === "running"}
        />
      ) : null}
      {activeTab === "Simulation" ? (
        <SimulationPanel
          state={engineSnapshot.state}
          statusMessage={engineSnapshot.statusMessage}
          contentItems={engineSnapshot.contentItems}
          onOpenResources={onOpenResourcesTab}
        />
      ) : null}
      {activeTab === "Resources" ? (
        <ResourcesPanel
          resources={runtimeResources}
          isCompleted={engineSnapshot.state === "completed"}
        />
      ) : null}
    </section>
  );
}

function App({ externalParameterValues }: Readonly<AppProps>) {
  const [activeTab, setActiveTab] = useState<TabLabel>("Prompt");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [demoExperienceIds, setDemoExperienceIds] = useState<DemoExperienceId[]>([]);
  const [selectedExperienceId, setSelectedExperienceId] = useState<DemoExperienceId>("");
  const [experience, setExperience] = useState<ExperienceDefinition | null>(null);
  const [parameterValues, setParameterValues] = useState<Record<string, string>>({});
  const executionContextRef = useRef<ExperienceContext | null>(null);
  const [runtimeResources, setRuntimeResources] = useState<ExperienceResource[]>([]);
  const [isLoadingExperience, setIsLoadingExperience] = useState(true);
  const [experienceLoadError, setExperienceLoadError] = useState<string | null>(null);
  const [isUsageDetailsOpen, setIsUsageDetailsOpen] = useState(false);
  const [engineSnapshot, setEngineSnapshot] = useState<EngineSnapshot>({
    state: "idle",
    statusMessage: "",
    contentItems: []
  });
  const engineRef = useRef<ExperienceEngine | null>(null);
  const appPanelRef = useRef<HTMLElement | null>(null);
  const tabButtonRefs = useRef<Record<TabLabel, HTMLButtonElement | null>>({
    Prompt: null,
    Simulation: null,
    Resources: null
  });
  const hasExternalParameterSource = externalParameterValues !== undefined;
  const runtimeParameterValues = hasExternalParameterSource ? externalParameterValues : parameterValues;
  const effectiveParameterValues = experience ? mergeWithParameterDefaults(experience.parameters, runtimeParameterValues) : {};
  const experienceInterpolation = experience
    ? getInterpolatedExperience(experience, effectiveParameterValues)
    : null;
  const usageMetrics =
    engineSnapshot.state === "completed" && experienceInterpolation?.experience.prompt
      ? calculateUsageMetrics(experienceInterpolation.experience.prompt, engineSnapshot.contentItems)
      : null;

  useEffect(() => {
    const readDemoManifest = async () => {
      const demoIds = await loadDemoExperienceIds();
      setDemoExperienceIds(demoIds);
      setSelectedExperienceId((currentId) => currentId || demoIds[0] || "");
    };

    void readDemoManifest();
  }, []);

  useEffect(() => {
    if (!selectedExperienceId) {
      setIsLoadingExperience(false);
      return;
    }

    const readExperience = async () => {
      setIsLoadingExperience(true);
      setExperienceLoadError(null);
      setExperience(null);
      setParameterValues({});
      executionContextRef.current = null;
      setRuntimeResources([]);
      setEngineSnapshot({
        state: "idle",
        statusMessage: "",
        contentItems: []
      });

      try {
        const loadedExperience = await loadDemoExperience(selectedExperienceId);
        setExperience(loadedExperience);
      } catch (error) {
        setExperienceLoadError(
          error instanceof Error ? error.message : "Unable to load the selected experience."
        );
      } finally {
        setIsLoadingExperience(false);
      }
    };

    void readExperience();
  }, [selectedExperienceId]);

  useEffect(() => {
    if (!experience) {
      return;
    }

    setParameterValues(getInitialParameterValues(experience.parameters));
    executionContextRef.current = null;
    setRuntimeResources(experience.resources);

    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [experience]);

  useEffect(() => {
    const syncFullscreenState = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
    };
  }, []);

  const runSimulation = () => {
    if (!experience || !experienceInterpolation) {
      return;
    }

    const nextExecutionContext: ExperienceContext = {
      parameters: { ...effectiveParameterValues }
    };

    const runtimeExperience = getInterpolatedExperience(experience, nextExecutionContext.parameters);

    if (runtimeExperience.missingKeys.length > 0) {
      return;
    }

    executionContextRef.current = nextExecutionContext;
    setRuntimeResources(runtimeExperience.experience.resources);

    engineRef.current?.dispose();
    const engine = new ExperienceEngine(runtimeExperience.experience.events, setEngineSnapshot);
    engineRef.current = engine;

    setActiveTab("Simulation");
    engine.start();
  };

  const handleParameterChange = (parameterId: string, value: string) => {
    setParameterValues((currentValues) => ({
      ...currentValues,
      [parameterId]: value
    }));
  };

  const openResourcesTab = () => {
    setActiveTab("Resources");
  };

  const usageUtility = getUsageUtilityPresentation(
    engineSnapshot.state,
    Boolean(experienceLoadError),
    usageMetrics
  );
  const isUsageControlEnabled = usageUtility.state === "completed" && Boolean(usageMetrics);

  useEffect(() => {
    if (!isUsageControlEnabled && isUsageDetailsOpen) {
      setIsUsageDetailsOpen(false);
    }
  }, [isUsageControlEnabled, isUsageDetailsOpen]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentTab: TabLabel) => {
    const nextTab = getNextTabFromKey(currentTab, event.key);

    if (!nextTab) {
      return;
    }

    event.preventDefault();
    setActiveTab(nextTab);
    tabButtonRefs.current[nextTab]?.focus();
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenEnabled) {
      return;
    }

    if (!document.fullscreenElement && appPanelRef.current) {
      await appPanelRef.current.requestFullscreen();
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  return (
    <main className="app-shell" aria-label="Agent Experience Simulator">
      <section
        className={`app-panel${isFullscreen ? " app-panel-fullscreen" : ""}`}
        aria-labelledby="simulator-title"
        ref={appPanelRef}
      >
        <header className="panel-header">
          <div className="panel-header-main">
            <h1 id="simulator-title">Agent Experience Simulator</h1>
            <p>Development Lab</p>
          </div>

          <div className="panel-controls">
            <label className="experience-selector" htmlFor="experience-select">
              <span className="experience-selector-label">Experience</span>
              <select
                id="experience-select"
                value={selectedExperienceId}
                disabled={demoExperienceIds.length === 0}
                onChange={(event) => {
                  setSelectedExperienceId(event.target.value as DemoExperienceId);
                  setActiveTab("Prompt");
                }}
              >
                {demoExperienceIds.map((experienceId) => (
                  <option key={experienceId} value={experienceId}>
                    {experienceId}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="panel-secondary-control"
              onClick={() => {
                void toggleFullscreen();
              }}
              aria-label={isFullscreen ? "Exit fullscreen" : "Expand widget"}
            >
              {isFullscreen ? "Exit Fullscreen" : "Expand"}
            </button>
          </div>
        </header>

        <section className="tabs-toolbar" aria-label="Navigation and utilities">
          <nav className="tab-bar" role="tablist" aria-label="Primary simulator sections">
            {TAB_LABELS.map((tabLabel) => {
              const isActive = activeTab === tabLabel;

              return (
                <button
                  key={tabLabel}
                  type="button"
                  role="tab"
                  id={getTabId(tabLabel)}
                  className="tab-button"
                  aria-selected={isActive}
                  aria-controls={getPanelId(tabLabel)}
                  tabIndex={isActive ? 0 : -1}
                  ref={(element) => {
                    tabButtonRefs.current[tabLabel] = element;
                  }}
                  onClick={() => setActiveTab(tabLabel)}
                  onKeyDown={(event) => handleTabKeyDown(event, tabLabel)}
                >
                  {tabLabel}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            className={`usage-utility-trigger usage-utility-trigger-${usageUtility.state} usage-toolbar-trigger`}
            onClick={() => setIsUsageDetailsOpen(true)}
            disabled={!isUsageControlEnabled}
            aria-label={`AI Usage status: ${usageUtility.ariaDescription}`}
          >
            <span className="usage-utility-trigger-title">AI Usage</span>
            <span className="usage-utility-trigger-value">{usageUtility.valueLabel}</span>
          </button>
        </section>

        <ActiveTabContent
          activeTab={activeTab}
          isLoadingExperience={isLoadingExperience}
          experienceLoadError={experienceLoadError}
          experience={experience}
          hasExternalParameterSource={hasExternalParameterSource}
          effectiveParameterValues={effectiveParameterValues}
          experienceInterpolation={experienceInterpolation}
          onParameterChange={handleParameterChange}
          onRunSimulation={runSimulation}
          engineSnapshot={engineSnapshot}
          onOpenResourcesTab={openResourcesTab}
          runtimeResources={runtimeResources}
        />

        {usageMetrics ? (
          <UsageDetailsDialog
            usageMetrics={usageMetrics}
            isOpen={isUsageDetailsOpen}
            onClose={() => setIsUsageDetailsOpen(false)}
          />
        ) : null}
      </section>
    </main>
  );
}

export default App;
