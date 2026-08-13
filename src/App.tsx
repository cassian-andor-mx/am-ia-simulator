import { useEffect, useRef, useState } from "react";
import type {
  ExperienceDefinition,
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

type PromptPanelProps = {
  prompt: PromptDefinition;
  onExecutePrompt: () => void;
  isRunning: boolean;
};

function PromptPanel({ prompt, onExecutePrompt, isRunning }: Readonly<PromptPanelProps>) {

  return (
    <article className="prompt-panel" aria-labelledby="prompt-title">
      <h2 id="prompt-title">{prompt.title}</h2>

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
        disabled={isRunning}
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
  const [selectedExperienceId, setSelectedExperienceId] = useState<DemoExperienceId>("demo-1");
  const [experience, setExperience] = useState<ExperienceDefinition | null>(null);
  const [isLoadingExperience, setIsLoadingExperience] = useState(true);
  const [experienceLoadError, setExperienceLoadError] = useState<string | null>(null);
  const [engineSnapshot, setEngineSnapshot] = useState<EngineSnapshot>({
    state: "idle",
    statusMessage: "",
    contentItems: []
  });
  const engineRef = useRef<ExperienceEngine | null>(null);

  useEffect(() => {
    const readExperience = async () => {
      setIsLoadingExperience(true);
      setExperienceLoadError(null);
      setExperience(null);
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

    const engine = new ExperienceEngine(experience.events, setEngineSnapshot);
    engineRef.current = engine;

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [experience]);

  const runSimulation = () => {
    if (!experience) {
      return;
    }

    setActiveTab("Simulation");
    engineRef.current?.start();
  };

  const openResourcesTab = () => {
    setActiveTab("Resources");
  };

  return (
    <main className="app-shell" aria-label="Agent Experience Simulator">
      <section className="app-panel" aria-labelledby="simulator-title">
        <header className="panel-header">
          <h1 id="simulator-title">Agent Experience Simulator</h1>
          <p>Development Lab</p>

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
        </header>

        <nav className="tab-bar" role="tablist" aria-label="Primary simulator sections">
          {TAB_LABELS.map((tabLabel) => {
            const isActive = activeTab === tabLabel;

            return (
              <button
                key={tabLabel}
                type="button"
                role="tab"
                className="tab-button"
                aria-selected={isActive}
                onClick={() => setActiveTab(tabLabel)}
              >
                {tabLabel}
              </button>
            );
          })}
        </nav>

        <section className="content-area" role="tabpanel" aria-label={`${activeTab} content`}>
          {isLoadingExperience ? <p>Loading demo experience...</p> : null}
          {experienceLoadError ? <p>{experienceLoadError}</p> : null}
          {activeTab === "Prompt" && experience && !isLoadingExperience && !experienceLoadError ? (
            <PromptPanel
              prompt={experience.prompt}
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
              resources={experience?.resources ?? []}
              isCompleted={engineSnapshot.state === "completed"}
            />
          ) : null}
        </section>
      </section>
    </main>
  );
}

export default App;
