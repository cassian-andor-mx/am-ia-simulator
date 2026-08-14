# Phase 5 Development Plan

## Propósito de este documento en el laboratorio

Este documento organiza Phase 5 en checkpoints pequeños y verificables.

Copilot must implement one checkpoint at a time and stop.

## Phase 5 Objective

Reduce AI Usage visual dominance and improve understanding for non-technical learners.

# Checkpoint 31 — Move AI Usage to Utility Area

Move AI Usage out of the large Simulation completion section into a compact top utility position.

Preserve:

- metrics;
- completion;
- Resources CTA;
- responsive behavior.

No methodology changes.

# Checkpoint 32 — Compact Meter States

Implement:

```text
idle/running → neutral
completed → band visible
unavailable → clear fallback
```

Keep styling subdued and non-gamified.

# Checkpoint 33 — Simplified Usage Details

Replace the large detail modal/panel with a compact summary.

Primary content:

- total tokens;
- You asked;
- AI returned;
- interaction load;
- environmental estimate summary;
- concise disclaimer;
- methodology action.

Do not show all environmental technical values by default.

# Checkpoint 34 — Human-Friendly Token Language

Add:

```text
You asked = input tokens
AI returned = output tokens
```

and one short token definition.

Technical terminology may remain secondary.

# Checkpoint 35 — Environmental Transparency Layer

Apply progressive disclosure.

Level 1:

`Estimated, not measured.`

Level 2:

reference workload explanation.

Level 3:

- Energy;
- CO2e;
- Water;
- source/date;
- limitations.

Preserve Phase 4 methodology.

# Checkpoint 36 — Integrated Visual Consistency Pass

Review:

- utility toolbar;
- Prompt;
- Simulation;
- Resources;
- completion;
- AI Usage detail;
- mobile;
- fullscreen.

No feature expansion.

# Post Checkpoint 36

Run:

`docs/validation/11-phase-5-confirmation-validation-plan.md`

## Technical Guardrails

Do not modify Experience Engine unless a real bug is discovered.

Do not add:

- event types;
- usage calculations;
- live telemetry;
- provider APIs;
- state management frameworks.

## Definition of Done

Phase 5 is ready for validation when:

- AI Usage is compact;
- completion area is clean;
- details are smaller;
- token concepts use plain language;
- environmental estimate is unambiguous;
- demos still work;
- lint/build pass.
