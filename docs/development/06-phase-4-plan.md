# Phase 4 Development Plan

## Propósito de este documento en el laboratorio

Este documento organiza la implementación incremental de **Phase 4 — Prompt Experience & Responsible AI Usage**. Copilot debe implementar únicamente el checkpoint solicitado y detenerse.

## Checkpoint 24 — Prompt Composer Visual Pass

### Objective

Restyle Prompt tab as a read-only AI-like composer.

### Scope

- rounded prompt surface;
- subtle border/background/shadow;
- integrated Run action;
- controlled parameters preserved;
- read-only behavior preserved;
- responsive/accessibility validation.

### Not yet

- Usage Meter;
- token calculation;
- environmental profile;
- free-text editing.

---

## Checkpoint 25 — Usage Metrics Domain Model

### Objective

Introduce the minimum domain/config concepts required by the meter.

Use:

- `docs/product/06-phase-4-ai-usage-meter.md`
- `docs/research/01-ai-usage-meter-methodology.md`

### Scope

Concepts may include:

- `UsageMetrics`;
- `UsageLoadBand`;
- `UsageReferenceProfile`;
- methodology confidence.

No UI yet.

---

## Checkpoint 26 — Token Estimation

### Objective

Calculate/estimate input and output token metrics for a completed simulated experience.

### Required

- input uses final interpolated prompt;
- output uses one canonical serializer;
- total = input + output;
- ratio is safe when input is zero;
- approximation status exposed;
- exactly document which event fields count.

### Tokenizer decision

If a dependency is proposed, Copilot must explain:

- why it is necessary;
- which reference tokenizer/model it supports;
- bundle-size/runtime impact;
- whether a lighter alternative exists.

Do not introduce provider coupling into `ExperienceEngine`.

---

## Checkpoint 27 — AI Usage Meter

### Objective

Add compact completion-row UI:

```text
✓ Completed
AI Usage   ▰▰▰▰▱ Moderate   ›
```

### Scope

- visible only after completion;
- qualitative load band;
- text label + bar;
- accessible trigger;
- compact responsive behavior.

Do not show environmental numbers in the main row.

---

## Checkpoint 28 — Usage Details

### Objective

Add on-demand details.

Show:

- input tokens;
- output tokens;
- total tokens;
- output/input ratio;
- interaction load;
- methodology confidence;
- `How this is calculated`.

Use the simplest accessible popover/modal/bottom-sheet pattern compatible with the project.

---

## Checkpoint 29 — Environmental Reference Profile

### Objective

Add environmental education without false precision.

### Scope

- named reference profile;
- source URL/label/date;
- workload description;
- reference energy/CO2e/water when supported;
- clear `Estimated` / `Reference` language;
- limitations visible in methodology details.

### Critical rule

Do NOT create a universal tokens → CO2e formula unless the source provides valid model-specific normalization coefficients.

The initial environmental profile may be `REFERENCE_ONLY`.

---

## Checkpoint 30 — Integrated Responsible-AI Demo

### Objective

Create or adapt a demo that teaches AI usage awareness.

Learner should:

1. inspect the read-only prompt composer;
2. run the simulation;
3. understand the answer;
4. notice AI Usage after completion;
5. open details;
6. distinguish calculated/estimated/reference values;
7. receive one concise deterministic efficiency insight.

No demo-specific engine hacks.

---

## Post Checkpoint 30 — Mini Validation

Use:

`docs/validation/09-phase-4-mini-validation-plan.md`

## Definition of Done

- Checkpoints 24–30 complete;
- Prompt visual pass approved;
- token methodology reproducible;
- meter compact;
- details accessible;
- environmental labels non-misleading;
- old demos work;
- deterministic behavior preserved;
- lint/build pass.
