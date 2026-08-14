import { useEffect, useRef, useState } from "react";
import type {
  ExperienceContext,
  ExperienceDefinition,
  ExperienceParameterDefinition,
  ExperienceResource,
  PromptDefinition
} from "./simulator/types/experience";
import type { UsageMethodologyConfidence, UsageMetrics } from "./simulator/types/usage";
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

const formatUsageTokenCount = (tokenCount: number | null): string => {
  if (tokenCount === null) {
    return "—";
  }

  return `~${tokenCount.toLocaleString()}`;
};

const formatUsageRatio = (ratio: number | null): string => {
  if (ratio === null) {
    return "—";
  }

  return `${ratio.toFixed(2)}x`;
};

const formatMethodologyConfidence = (confidence: UsageMethodologyConfidence): string => {
  if (confidence === "CALCULATED_REFERENCE") {
    return "Calculated reference";
  }

  if (confidence === "ESTIMATED") {
    return "Estimated";
  }

  return "Reference only";
};

const formatEnvironmentalValue = (value: number | undefined, unit: string): string => {
  if (value === undefined) {
    return "Not available";
  }

  return `~${value.toFixed(2)} ${unit}`;
};

const LOAD_BAND_FILL_COUNT: Record<string, number> = {
  "Very Low": 1,
  Low: 2,
  Moderate: 3,
  High: 4,
  "Very High": 5
};

const getUsageMeterFillCount = (interactionLoad: string): number =>
  LOAD_BAND_FILL_COUNT[interactionLoad] ?? 3;

type UsageDetailsDialogProps = {
  usageMetrics: UsageMetrics;
  isOpen: boolean;
  onClose: () => void;
};

function UsageDetailsDialog({ usageMetrics, isOpen, onClose }: Readonly<UsageDetailsDialogProps>) {
  const usageDetailsCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
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

  const hasEnvironmentalValues =
    usageMetrics.environmentalReference?.referenceEnergyWh !== undefined ||
    usageMetrics.environmentalReference?.referenceCO2eGrams !== undefined ||
    usageMetrics.environmentalReference?.referenceWaterMl !== undefined;

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
              Token usage is estimated from the simulated prompt and visible response.
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

        <dl className="usage-details-grid">
          <div>
            <dt>Input tokens</dt>
            <dd>{formatUsageTokenCount(usageMetrics.inputTokens)}</dd>
          </div>
          <div>
            <dt>Output tokens</dt>
            <dd>{formatUsageTokenCount(usageMetrics.outputTokens)}</dd>
          </div>
          <div>
            <dt>Total tokens</dt>
            <dd>{formatUsageTokenCount(usageMetrics.totalTokens)}</dd>
          </div>
          <div>
            <dt>Output / Input</dt>
            <dd>{formatUsageRatio(usageMetrics.outputInputRatio)}</dd>
          </div>
          <div>
            <dt>Interaction load</dt>
            <dd>{usageMetrics.interactionLoad ?? "—"}</dd>
          </div>
          <div>
            <dt>Methodology confidence</dt>
            <dd>{formatMethodologyConfidence(usageMetrics.methodologyConfidence)}</dd>
          </div>
        </dl>

        <section className="usage-details-environment" aria-labelledby="usage-details-environment-title">
          <h4 id="usage-details-environment-title">Environmental impact</h4>
          <p className="usage-details-environment-meta">Estimated • Reference profile</p>

          {usageMetrics.environmentalReference ? (
            <>
              {hasEnvironmentalValues ? (
                <dl className="usage-details-environment-values">
                  <div>
                    <dt>Energy</dt>
                    <dd>
                      {formatEnvironmentalValue(
                        usageMetrics.environmentalReference.referenceEnergyWh,
                        "Wh"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>CO2e</dt>
                    <dd>
                      {formatEnvironmentalValue(
                        usageMetrics.environmentalReference.referenceCO2eGrams,
                        "g"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Water</dt>
                    <dd>
                      {formatEnvironmentalValue(
                        usageMetrics.environmentalReference.referenceWaterMl,
                        "mL"
                      )}
                    </dd>
                  </div>
                </dl>
              ) : null}

              <p>
                <strong>Reference profile:</strong> {usageMetrics.referenceProfileLabel} ({usageMetrics.referenceProfileVersionDate})
              </p>
              <p>
                <strong>Workload:</strong> {usageMetrics.environmentalReference.workloadDescription}
              </p>
              <p>
                <strong>Normalization basis:</strong> {usageMetrics.environmentalReference.normalizationBasis}
              </p>
              <p>
                <strong>Source:</strong>{" "}
                <a href={usageMetrics.environmentalReference.sourceUrl} target="_blank" rel="noreferrer">
                  {usageMetrics.environmentalReference.sourceLabel}
                </a>{" "}
                ({usageMetrics.environmentalReference.sourceDate})
              </p>
            </>
          ) : (
            <p>No environmental reference profile is configured for this meter.</p>
          )}
        </section>

        <section className="usage-details-explanation" aria-labelledby="usage-details-how-title">
          <h4 id="usage-details-how-title">How this is calculated</h4>
          <p>
            Input uses the final interpolated prompt shown for execution. Output uses one canonical textual
            serialization of the visible simulated response. This keeps the meter reproducible and avoids
            counting hidden or binary content.
          </p>
          <p>
            All values shown here are simulator estimates, not live provider telemetry.
          </p>

          <h5 className="usage-details-limitations-title">Known limitations</h5>
          <ul className="usage-details-limitations-list">
            {usageMetrics.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
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
  prompt: PromptDefinition | null;
  onOpenResources: () => void;
};

function SimulationPanel({
  state,
  statusMessage,
  contentItems,
  prompt,
  onOpenResources
}: Readonly<SimulationPanelProps>) {
  const simulationLogRef = useRef<HTMLDivElement | null>(null);
  const [isUsageDetailsOpen, setIsUsageDetailsOpen] = useState(false);

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

  const usageMetrics = state === "completed" && prompt ? calculateUsageMetrics(prompt, contentItems) : null;

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

          {usageMetrics ? (
            <div className="usage-meter-summary" aria-label="AI usage summary">
              <div className="usage-meter-summary-labels">
                <span className="usage-meter-summary-title">AI Usage</span>
                <span className="usage-meter-summary-band">{usageMetrics.interactionLoad ?? "Moderate"}</span>
              </div>

              <div className="usage-meter-summary-bar" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => {
                  const filled = index < getUsageMeterFillCount(usageMetrics.interactionLoad ?? "Moderate");

                  return (
                    <span
                      key={`usage-bar-${index}`}
                      className={`usage-meter-summary-segment${filled ? " is-filled" : ""}`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                className="usage-meter-summary-trigger"
                aria-label="Open AI usage details"
                aria-expanded={isUsageDetailsOpen}
                aria-controls="usage-details-panel"
                onClick={() => setIsUsageDetailsOpen((currentValue) => !currentValue)}
              >
                ›
              </button>
            </div>
          ) : null}

          {usageMetrics ? (
            <UsageDetailsDialog
              usageMetrics={usageMetrics}
              isOpen={isUsageDetailsOpen}
              onClose={() => setIsUsageDetailsOpen(false)}
            />
          ) : null}

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

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentTab: TabLabel) => {
    const tabIndex = TAB_LABELS.indexOf(currentTab);
    let nextTab: TabLabel | null = null;

    if (event.key === "ArrowRight") {
      nextTab = TAB_LABELS[(tabIndex + 1) % TAB_LABELS.length];
    } else if (event.key === "ArrowLeft") {
      nextTab = TAB_LABELS[(tabIndex - 1 + TAB_LABELS.length) % TAB_LABELS.length];
    } else if (event.key === "Home") {
      nextTab = TAB_LABELS[0];
    } else if (event.key === "End") {
      nextTab = TAB_LABELS[TAB_LABELS.length - 1];
    }

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
              onParameterChange={handleParameterChange}
              prompt={experienceInterpolation?.experience.prompt ?? experience.prompt}
              onExecutePrompt={runSimulation}
              isRunning={engineSnapshot.state === "running"}
            />
          ) : null}
          {activeTab === "Simulation" ? (
            <SimulationPanel
              state={engineSnapshot.state}
              statusMessage={engineSnapshot.statusMessage}
              contentItems={engineSnapshot.contentItems}
              prompt={experienceInterpolation?.experience.prompt ?? experience?.prompt ?? null}
              onOpenResources={openResourcesTab}
            />
          ) : null}
          {activeTab === "Resources" ? (
            <ResourcesPanel
              resources={runtimeResources}
              isCompleted={engineSnapshot.state === "completed"}
            />
          ) : null}
        </section>
      </section>
    </main>
  );
}

export default App;
