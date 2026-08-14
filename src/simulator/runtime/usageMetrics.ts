import type { EngineContentItem } from "../engine/experienceEngine";
import type { PromptDefinition } from "../types/experience";
import type {
  UsageLoadBand,
  UsageLoadThresholds,
  UsageMetrics,
  UsageReferenceProfile
} from "../types/usage";
import { DEFAULT_USAGE_REFERENCE_PROFILE } from "../types/usage";

const APPROXIMATE_TOKEN_PATTERN = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?|[^\sA-Za-z0-9]/g;

export function serializePromptForUsage(prompt: PromptDefinition): string {
  const promptSections = [prompt.title, ...prompt.paragraphs, prompt.checklist.map((item) => `- ${item}`).join("\n")];
  return promptSections.filter((section) => section.trim().length > 0).join("\n\n");
}

export function serializeVisibleOutputForUsage(contentItems: EngineContentItem[]): string {
  return contentItems
    .map((item) => {
      if (item.type === "message") {
        return item.content;
      }

      if (item.type === "table") {
        const rows = item.content.rows.map((row) => row.join(" | "));
        return [item.content.title, item.content.columns.join(" | "), ...rows].join("\n");
      }

      if (item.type === "link") {
        return [item.content.label, item.content.description].filter(Boolean).join("\n");
      }

      return "";
    })
    .filter((section) => section.trim().length > 0)
    .join("\n\n");
}

export function estimateTokenCount(text: string): number {
  const matches = text.match(APPROXIMATE_TOKEN_PATTERN);
  return matches?.length ?? 0;
}

export function classifyUsageLoad(
  totalTokens: number,
  loadThresholds: UsageLoadThresholds
): UsageLoadBand {
  if (totalTokens <= loadThresholds.veryLowMax) {
    return "Very Low";
  }

  if (totalTokens <= loadThresholds.lowMax) {
    return "Low";
  }

  if (totalTokens <= loadThresholds.moderateMax) {
    return "Moderate";
  }

  if (totalTokens <= loadThresholds.highMax) {
    return "High";
  }

  return "Very High";
}

export function calculateUsageMetrics(
  prompt: PromptDefinition,
  contentItems: EngineContentItem[],
  referenceProfile: UsageReferenceProfile = DEFAULT_USAGE_REFERENCE_PROFILE
): UsageMetrics {
  const serializedPrompt = serializePromptForUsage(prompt);
  const serializedOutput = serializeVisibleOutputForUsage(contentItems);
  const inputTokens = estimateTokenCount(serializedPrompt);
  const outputTokens = estimateTokenCount(serializedOutput);
  const totalTokens = inputTokens + outputTokens;

  return {
    inputTokens,
    outputTokens,
    totalTokens,
    outputInputRatio: inputTokens === 0 ? null : outputTokens / inputTokens,
    interactionLoad: classifyUsageLoad(totalTokens, referenceProfile.loadThresholds),
    methodologyConfidence: referenceProfile.methodologyConfidence,
    isApproximate: referenceProfile.methodologyConfidence !== "CALCULATED_REFERENCE",
    referenceProfileId: referenceProfile.id,
    referenceProfileLabel: referenceProfile.label,
    referenceProfileVersionDate: referenceProfile.versionDate,
    environmentalReference: referenceProfile.environmentalReference ?? null,
    limitations: referenceProfile.limitations
  };
}
