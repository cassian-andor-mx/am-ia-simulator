# Phase 3 Entry Decision

## Propósito de este documento en el laboratorio

Este documento registra formalmente por qué Agent Experience Simulator entra en una nueva fase y qué decisiones se consideran aprobadas, descartadas o diferidas.

Sirve como punto de control para evitar que futuras sesiones de IA interpreten la nueva fase como permiso para expandir libremente el roadmap.

## 1. New Phase

**Phase 3 — Controlled Personalization & Compact Learning Widget**

## 2. Evidence Behind the Decision

Phase 2 validation produced a `USEFUL BUT PASSIVE` classification.

Important signals:

- learners understood the workflow;
- learners understood the prompt purpose;
- learners understood the output;
- confidence after the exercise was strong;
- repeated executions felt increasingly static;
- learners wanted more control;
- learners requested prompt variables;
- learners wanted a smaller visual footprint;
- learners expected a more familiar agent-like visual language.

The technical audit also concluded that the Technical MVP is ready and that dynamic experience parameters are feasible without a major engine rewrite.

## 3. Approved Direction

### A. Controlled Personalization

Learners may choose values from predefined options.

Examples:

```text
Role
[ Sales Manager ▼ ]

Region
[ Florida ▼ ]

Audience
[ Executive Team ▼ ]
```

These values may be interpolated into:

- prompt content;
- selected visible simulation output;
- resource labels or metadata when appropriate.

No AI processing is required.

### B. Compact Learning Widget

The simulator should feel like an embedded learning tool instead of a large application panel.

Principles:

- compact by default;
- fullscreen on demand;
- three clear tabs;
- one primary action;
- minimal secondary controls;
- familiar agent-like visual language;
- no provider-specific imitation.

## 4. Explicitly Rejected for This Phase

### Output randomization / text variants

The previously discussed idea of varying output using multiple equivalent response variants is **not approved for Phase 3**.

Reason:

- adds complexity before controlled personalization is tested;
- could weaken deterministic behavior;
- is not required to address the strongest current user feedback.

It may be reconsidered later.

## 5. Deferred

Do not implement during Phase 3:

- free-text learner prompt input;
- unrestricted learner variables;
- branching;
- adaptive AI behavior;
- real LLM calls;
- dynamic semantic reasoning;
- multiple agents;
- complex authoring tools;
- randomized outputs;
- seeded variants;
- provider-specific themes.

## 6. Non-Negotiable Constraints

1. Preserve provider independence.
2. Preserve deterministic scripted behavior.
3. Parameters are predefined options only.
4. Parameter substitution must not require semantic reasoning.
5. Existing demos must continue to work.
6. Avoid engine-specific hacks for individual experiences.
7. Develop using visual checkpoints.
8. Do not implement future capabilities unless explicitly approved.

## 7. Phase 3 Success Definition

Phase 3 is successful if:

- the simulator is visibly more compact;
- the experience remains clear;
- users can make at least one meaningful controlled selection;
- selected values appear correctly in the prompt;
- selected values can appear in deterministic output;
- no LLM call is required;
- existing experiences remain compatible;
- Round 2 users perceive more interaction without reduced confidence or clarity.
