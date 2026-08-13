# Phase 3 — Round 2 Learning Validation Plan

## Propósito de este documento en el laboratorio

Este documento define una segunda ronda pequeña de validación para comprobar si las mejoras de Phase 3 resuelven los principales problemas detectados en Round 1.

No busca volver a demostrar desde cero que el simulator es útil.

Busca responder:

> ¿Controlled personalization + compact widget improve interaction perception without reducing clarity?

## 1. What Changed Since Round 1

Round 2 should evaluate:

- compact widget footprint;
- more familiar agent-like visual presentation;
- controlled option parameters;
- visible prompt personalization;
- deterministic personalized output.

## 2. Primary Hypothesis

> Allowing learners to make simple controlled choices before execution increases perceived interaction while preserving clarity and confidence.

## 3. Secondary Hypothesis

> A compact widget presentation fits more naturally inside a course lesson than the previous larger panel.

## 4. Participants

Recommended:

```text
5 participants
```

Preferably include some previous Round 1 participants if practical, because they can directly compare versions.

New participants are also useful.

## 5. Test Experience

Use the Phase 3 integrated demo.

Suggested:

**Personalized Weekly Performance Review**

Learner should:

1. select a role;
2. inspect the personalized prompt;
3. run the simulation;
4. observe personalized output;
5. inspect resources.

## 6. Questions

Ask:

1. Did choosing an option make the exercise feel more interactive?
2. Did you understand how your selection changed the prompt?
3. Did the simulation output feel consistent with your selection?
4. Did the smaller widget feel easier to use inside a lesson?
5. Did the new presentation feel more familiar to an AI tool?
6. Was anything more confusing than the previous version?
7. Would you want more control than these predefined options?
8. Did you still understand the workflow clearly?
9. Did the experience still increase your confidence to try the task in a real AI tool?

## 7. Signals

Track:

```text
interaction_perception
parameter_understanding
prompt_change_awareness
output_consistency
compactness_preference
visual_familiarity
clarity
confidence
desire_for_more_control
confusion
```

## 8. Success Criteria

Strong Phase 3 signal:

- majority perceives more interaction;
- no meaningful drop in clarity;
- no meaningful drop in confidence;
- parameter effect is understood;
- compact layout is preferred or accepted;
- users do not require free-text input to find value.

## 9. Warning Signals

Investigate if users report:

- parameter choices feel cosmetic;
- output feels disconnected from selection;
- prompt changes are hard to notice;
- widget feels too small;
- tabs become harder to understand;
- fullscreen is required for normal use;
- users assume parameters are processed by real AI.

## 10. Decision Routes

### A — Phase 3 validated

Continue creating more parameterized learning experiences.

Possible next focus:

- authoring efficiency.

### B — Interaction improved but personalization feels shallow

Improve how parameterized content is authored before increasing engine complexity.

### C — Users strongly demand free text

Do not immediately implement it.

First evaluate whether a controlled branching/input model can satisfy the learning need.

### D — Compact redesign hurts clarity

Adjust visual density without undoing controlled personalization.

## 11. Output

Create a normalized Round 2 conclusion containing:

```text
classification
interaction result
clarity result
confidence result
compactness result
parameter result
recommended next direction
what not to build yet
```

## 12. Guardrail

Do not use Round 2 as justification for major roadmap expansion unless user evidence identifies a concrete learning limitation.
