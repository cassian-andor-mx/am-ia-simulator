import { useEffect, useRef, useState } from "react";
import type {
  ExperienceContext,
  ExperienceDefinition,
  ExperienceParameterDefinition,
  ExperienceResource,
  PromptDefinition
} from "./simulator/types/experience";
import {
  ExperienceEngine,
  type EngineContentItem,
  type EngineExecutionState,
  type EngineSnapshot
} from "./simulator/engine/experienceEngine";
import { SimulationContentRenderer } from "./simulator/renderers/simulationContentRenderer";
import {
  DEMO_EXPERIENCE_IDS,
  loadDemoExperience,
  type DemoExperienceId
} from "./simulations/loadExperience";

const TAB_LABELS = ["Prompt", "Simulation", "Resources"] as const;
type TabLabel = (typeof TAB_LABELS)[number];

const getTabId = (tabLabel: TabLabel): string => `tab-${tabLabel.toLowerCase()}`;
const getPanelId = (tabLabel: TabLabel): string => `panel-${tabLabel.toLowerCase()}`;
const PLACEHOLDER_PATTERN = /{{\s*([a-zA-Z0-9_-]+)\s*}}/g;

function getInitialParameterValues(
  parameterDefinitions: ExperienceParameterDefinition[] | undefined
): Record<string, string> {
  if (!parameterDefinitions) {
    return {};
  }

  return parameterDefinitions.reduce<Record<string, string>>((parameterValues, parameter) => {
    parameterValues[parameter.id] = parameter.defaultValue;
    return parameterValues;
  }, {});
}

function interpolateText(
  value: string,
  parameterValues: Record<string, string>
): { content: string; missingKeys: string[] } {
  const missingKeys = new Set<string>();

  const content = value.replace(PLACEHOLDER_PATTERN, (fullMatch, parameterId: string) => {
    const parameterValue = parameterValues[parameterId];

    if (parameterValue === undefined) {
      missingKeys.add(parameterId);
      return fullMatch;
    }

    return parameterValue;
  });

  return {
    content,
    missingKeys: [...missingKeys]
  };
}

function getInterpolatedExperience(
  experience: ExperienceDefinition,
  parameterValues: Record<string, string>
): { experience: ExperienceDefinition; missingKeys: string[] } {
  const missingKeys = new Set<string>();

  const interpolateAndTrack = (value: string): string => {
    const result = interpolateText(value, parameterValues);
    result.missingKeys.forEach((missingKey) => missingKeys.add(missingKey));
    return result.content;
  };

  return {
    experience: {
      ...experience,
      prompt: {
        title: interpolateAndTrack(experience.prompt.title),
        paragraphs: experience.prompt.paragraphs.map(interpolateAndTrack),
        checklist: experience.prompt.checklist.map(interpolateAndTrack),
        executeLabel: interpolateAndTrack(experience.prompt.executeLabel)
      },
      events: experience.events.map((event) => {
        if (event.type === "status") {
          return {
            ...event,
            content: interpolateAndTrack(event.content)
          };
        }

        if (event.type === "message") {
          return {
            ...event,
            content: interpolateAndTrack(event.content)
          };
        }

        if (event.type === "table") {
          return {
            ...event,
            content: {
              title: interpolateAndTrack(event.content.title),
              columns: event.content.columns.map(interpolateAndTrack),
              rows: event.content.rows.map((row) => row.map(interpolateAndTrack))
            }
          };
        }

        if (event.type === "link") {
          return {
            ...event,
            content: {
              ...event.content,
              label: interpolateAndTrack(event.content.label),
              description: event.content.description
                ? interpolateAndTrack(event.content.description)
                : undefined
            }
          };
        }

        return event;
      }),
      resources: experience.resources.map((resource) => ({
        ...resource,
        fileName: interpolateAndTrack(resource.fileName),
        description: interpolateAndTrack(resource.description)
      }))
    },
    missingKeys: [...missingKeys]
  };
}

type PromptPanelProps = {
  parameterDefinitions: ExperienceParameterDefinition[];
  parameterValues: Record<string, string>;
  missingInterpolationKeys: string[];
  onParameterChange: (parameterId: string, value: string) => void;
  prompt: PromptDefinition;
  onExecutePrompt: () => void;
  isRunning: boolean;
};

function PromptPanel({
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
      <h2 id="prompt-title">{prompt.title}</h2>

      {parameterDefinitions.length > 0 ? (
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

      <button
        type="button"
        className="execute-button"
        onClick={onExecutePrompt}
        disabled={isRunning || missingInterpolationKeys.length > 0}
      >
        {prompt.executeLabel}
      </button>
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
          <button type="button" className="open-resources-button" onClick={onOpenResources}>
            Open Resources
          </button>
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

function App() {
  const [activeTab, setActiveTab] = useState<TabLabel>("Prompt");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<DemoExperienceId>("demo-1");
  const [experience, setExperience] = useState<ExperienceDefinition | null>(null);
  const [parameterValues, setParameterValues] = useState<Record<string, string>>({});
  const [, setExecutionContext] = useState<ExperienceContext | null>(null);
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
  const experienceInterpolation = experience
    ? getInterpolatedExperience(experience, parameterValues)
    : null;

  useEffect(() => {
    const readExperience = async () => {
      setIsLoadingExperience(true);
      setExperienceLoadError(null);
      setExperience(null);
      setParameterValues({});
      setExecutionContext(null);
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
    setExecutionContext(null);
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
      parameters: { ...parameterValues }
    };

    const runtimeExperience = getInterpolatedExperience(experience, nextExecutionContext.parameters);

    if (runtimeExperience.missingKeys.length > 0) {
      return;
    }

    setExecutionContext(nextExecutionContext);
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
              Experience
              <select
                id="experience-select"
                value={selectedExperienceId}
                onChange={(event) => {
                  setSelectedExperienceId(event.target.value as DemoExperienceId);
                  setActiveTab("Prompt");
                }}
              >
                {DEMO_EXPERIENCE_IDS.map((experienceId) => (
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
          className="content-area"
          role="tabpanel"
          id={getPanelId(activeTab)}
          aria-labelledby={getTabId(activeTab)}
          tabIndex={0}
        >
          {isLoadingExperience ? <p>Loading demo experience...</p> : null}
          {experienceLoadError ? <p>{experienceLoadError}</p> : null}
          {activeTab === "Prompt" && experience && !isLoadingExperience && !experienceLoadError ? (
            <PromptPanel
              parameterDefinitions={experience.parameters ?? []}
              parameterValues={parameterValues}
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
