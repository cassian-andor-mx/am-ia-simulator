import type { ExperienceDefinition } from "../simulator/types/experience";

export const DEMO_EXPERIENCE_IDS = ["demo-1", "demo-2", "demo-3", "demo-4"] as const;
export type DemoExperienceId = (typeof DEMO_EXPERIENCE_IDS)[number];

export async function loadDemoExperience(demoId: DemoExperienceId): Promise<ExperienceDefinition> {
  const demoExperienceUrl = `/simulations/${demoId}/experience.json`;
  const response = await fetch(demoExperienceUrl);

  if (!response.ok) {
    throw new Error(`Unable to load experience definition from ${demoExperienceUrl}.`);
  }

  const experience = (await response.json()) as ExperienceDefinition;
  return experience;
}
