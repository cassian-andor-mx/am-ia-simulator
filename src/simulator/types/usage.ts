export type UsageLoadBand = "Very Low" | "Low" | "Moderate" | "High" | "Very High";

export type UsageMethodologyConfidence = "CALCULATED_REFERENCE" | "ESTIMATED" | "REFERENCE_ONLY";

export type EnvironmentalNormalizationBasis = "reference-prompt" | "model-specific-coefficients";

export type UsageLoadThresholds = {
  veryLowMax: number;
  lowMax: number;
  moderateMax: number;
  highMax: number;
};

export type EnvironmentalReferenceProfile = {
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  workloadDescription: string;
  normalizationBasis: EnvironmentalNormalizationBasis;
  referenceEnergyWh?: number;
  referenceCO2eGrams?: number;
  referenceWaterMl?: number;
};

export type UsageReferenceProfile = {
  id: string;
  label: string;
  tokenizerReference: string;
  modelReference: string;
  methodologyConfidence: UsageMethodologyConfidence;
  versionDate: string;
  loadThresholds: UsageLoadThresholds;
  environmentalReference?: EnvironmentalReferenceProfile;
  limitations: string[];
};

export type UsageMetrics = {
  inputTokens: number | null;
  outputTokens: number | null;
  totalTokens: number | null;
  outputInputRatio: number | null;
  interactionLoad: UsageLoadBand | null;
  methodologyConfidence: UsageMethodologyConfidence;
  isApproximate: boolean;
  referenceProfileId: string;
  referenceProfileLabel: string;
  referenceProfileVersionDate: string;
  environmentalReference: EnvironmentalReferenceProfile | null;
  limitations: string[];
};

export const DEFAULT_USAGE_REFERENCE_PROFILE: UsageReferenceProfile = {
  id: "default-phase-4-reference",
  label: "Phase 4 Reference Profile",
  tokenizerReference: "Heuristic token estimator pattern",
  modelReference: "Generic simulator reference",
  methodologyConfidence: "ESTIMATED",
  versionDate: "2026-08-14",
  loadThresholds: {
    veryLowMax: 250,
    lowMax: 700,
    moderateMax: 1400,
    highMax: 2600
  },
  environmentalReference: {
    sourceLabel: "Google Cloud: Environmental impact of AI inference",
    sourceUrl: "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/",
    sourceDate: "2025-08-04",
    workloadDescription: "Point-in-time estimate for a median Gemini Apps text prompt.",
    normalizationBasis: "reference-prompt",
    referenceEnergyWh: 0.24,
    referenceCO2eGrams: 0.03,
    referenceWaterMl: 0.26
  },
  limitations: [
    "Token counts are heuristic estimates and do not represent provider billing values.",
    "Environmental values are reference-only workload estimates, not measurements for this simulation.",
    "No universal token-to-CO2e conversion is applied without model-specific coefficients."
  ]
};
