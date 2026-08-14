# AI Usage Meter — Measurement and Estimation Methodology

## Propósito de este documento en el laboratorio

Este documento describe cómo calcular o estimar las métricas del AI Usage Meter. Existe para evitar scoring opaco, supuestos hard-coded y afirmaciones ambientales con falsa precisión.

This document describes simulator methodology; it does not claim to measure a real provider inference request.

## 1. Three metric layers

### Layer A — Text metrics

- input tokens;
- output tokens;
- total tokens;
- output/input ratio.

### Layer B — Educational metrics

- interaction load band;
- optional deterministic efficiency hints.

### Layer C — Environmental reference estimates

- energy;
- CO2e;
- water.

Layer C is reference-based, not direct measurement.

## 2. Input Tokens

Definition: tokens in the final interpolated prompt shown for execution.

```text
experience prompt
+ parameter interpolation
        ↓
finalPromptText
        ↓
token counter / estimator
        ↓
inputTokens
```

Formula when a tokenizer is available:

```text
inputTokens = tokenize(finalPromptText).length
```

If only an estimator is available, expose that fact and use approximate UI notation.

## 3. Output Tokens

Create one canonical textual serialization of the scripted AI answer.

Conceptually:

```text
visible message text
+ table text
+ link labels/descriptions
+ explicitly approved response fields
        ↓
serializedVisibleOutput
        ↓
token counter / estimator
        ↓
outputTokens
```

Formula:

```text
outputTokens = tokenize(serializedVisibleOutput).length
```

Do not count downloadable file binary contents.

Status/progress strings should be excluded by default unless a profile explicitly treats them as model-generated output.

## 4. Total Tokens

```text
totalTokens = inputTokens + outputTokens
```

In simulator-only mode this means **simulated visible token usage**, not exact provider billing usage.

## 5. Output / Input Ratio

```text
outputInputRatio = outputTokens / inputTokens
```

If `inputTokens == 0`, return unavailable.

The ratio teaches that a short prompt can request a much larger output. It is not itself an efficiency score.

## 6. Tokenizer Reference

Tokenization varies by model and encoding. A profile should identify:

```text
tokenizerReference
modelReference
method
version/date
```

If the tokenizer matches the chosen reference model, the value can be described as calculated for that reference. Otherwise use approximate notation.

## 7. Approximate fallback

A heuristic may be used only if:

- documented;
- clearly labeled approximate;
- replaceable later;
- not embedded as unexplained UI constants.

Do not claim provider billing accuracy from a heuristic.

## 8. Interaction Load

Conceptual calculation:

```text
interactionLoad = classify(totalTokens, profile.thresholds)
```

Possible labels:

```text
Very Low
Low
Moderate
High
Very High
```

Example thresholds may be configured during implementation, but they must be explicitly labeled as **project-specific pedagogical thresholds**, not universal scientific bands.

## 9. Why tokens cannot directly equal environmental impact

Environmental footprint depends on more than token count, including:

- model architecture;
- accelerator hardware;
- utilization;
- CPU/RAM;
- idle provisioned capacity;
- data-center overhead / PUE;
- electricity carbon intensity;
- cooling;
- water use;
- provider operational efficiency.

Therefore:

> Tokens alone are insufficient to calculate exact environmental impact.

## 10. Environmental Reference Profile

Phase 4 may display environmental information only through a named reference profile.

Conceptual model:

```ts
interface EnvironmentalReferenceProfile {
  id: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  workloadDescription: string;
  referenceEnergyWh?: number;
  referenceCO2eGrams?: number;
  referenceWaterMl?: number;
  normalizationBasis: "reference-prompt" | "model-specific-coefficients";
  limitations: string[];
}
```

## 11. Initial published reference example

Google published a 2025 point-in-time estimate for a **median Gemini Apps text prompt** using a comprehensive production methodology:

```text
Energy: ~0.24 Wh
CO2e:   ~0.03 g
Water:  ~0.26 mL
```

The methodology considers broader production factors including accelerator dynamic power, idle machines, CPU/RAM, data-center overhead and cooling/water.

Important limitations:

- this is a Gemini Apps reference workload;
- it is not a universal per-token conversion;
- it is point-in-time;
- it depends on Google's infrastructure and fleet assumptions;
- it should not be presented as the exact footprint of OpenAI, Anthropic or another provider;
- efficiency can change substantially over time.

Therefore, **do not multiply token count by these per-prompt values as if they were universal coefficients**.

## 12. Future model-specific formula

Only if a trustworthy reference later provides valid model-specific coefficients such as input/output energy per token may the system support:

```text
estimatedEnergyWh =
  inputTokens  * inputWhPerToken
  + outputTokens * outputWhPerToken
```

Then, if a documented carbon-intensity value exists:

```text
estimatedCO2eGrams =
  estimatedEnergyKWh * carbonIntensity_gCO2ePerKWh
```

A water estimate would likewise require a supported water-use coefficient.

Do not implement these formulas without supported coefficients.

## 13. Methodology confidence

Suggested categories:

```text
CALCULATED_REFERENCE
ESTIMATED
REFERENCE_ONLY
```

Examples:

- matching reference tokenizer: `CALCULATED_REFERENCE`;
- heuristic text count: `ESTIMATED`;
- median environmental prompt reference: `REFERENCE_ONLY`.

## 14. UI language

Use:

```text
~1,200 tokens
Estimated environmental impact
Reference profile
```

Avoid:

```text
This exact interaction emitted 0.03 g CO2e.
```

## 15. Sources

### OpenAI token concepts and usage

OpenAI documents input/output/total token concepts and notes that tokenization depends on model/encoding.

- https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
- https://platform.openai.com/docs/api-reference/usage

### Google environmental inference methodology

Google published a 2025 methodology for estimating energy, emissions and water for a median Gemini Apps text prompt and explicitly frames the values as point-in-time workload-specific results.

- https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/

## 16. Recommended Phase 4 pipeline

```text
Final interpolated prompt
+ Canonical scripted output serialization
        ↓
Reference tokenizer or documented estimator
        ↓
Input / Output / Total tokens
        ↓
Project-specific pedagogical load band
        ↓
Optional environmental reference profile
        ↓
Compact meter + details
```
