import type { ExperienceDefinition } from "../simulator/types/experience";

const DEFAULT_DEMO_EXPERIENCE_IDS = ["demo-1", "demo-2", "demo-3", "demo-4", "demo-5"];
type DemoManifest = {
  demoIds: string[];
};

export type DemoExperienceId = string;

function isValidDemoManifest(value: unknown): value is DemoManifest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const manifest = value as DemoManifest;
  return Array.isArray(manifest.demoIds) && manifest.demoIds.every((id) => typeof id === "string");
}

export async function loadDemoExperienceIds(): Promise<string[]> {
  const response = await fetch("/simulations/manifest.json");

  if (!response.ok) {
    return DEFAULT_DEMO_EXPERIENCE_IDS;
  }

  const manifest = (await response.json()) as unknown;

  if (!isValidDemoManifest(manifest) || manifest.demoIds.length === 0) {
    return DEFAULT_DEMO_EXPERIENCE_IDS;
  }

  return manifest.demoIds;
}

export async function loadDemoExperience(demoId: DemoExperienceId): Promise<ExperienceDefinition> {
  const demoExperienceUrl = `/simulations/${demoId}/experience.json`;
  const response = await fetch(demoExperienceUrl);

  if (!response.ok) {
    throw new Error(`Unable to load experience definition from ${demoExperienceUrl}.`);
  }

  const experience = (await response.json()) as ExperienceDefinition;
  return experience;
}
