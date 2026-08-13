# Phase 3 Development Plan

## Propósito de este documento en el laboratorio

Este documento organiza la implementación de **Phase 3 — Controlled Personalization & Compact Learning Widget** en pequeños checkpoints verificables.

Debe continuar la disciplina de desarrollo utilizada en fases anteriores.

Copilot must implement only the requested checkpoint and stop.

## Phase 3 Objective

Improve interaction perception through:

1. controlled option-based parameters;
2. prompt/output interpolation;
3. a compact embedded learning-widget presentation.

Do not add branching, free text or real AI.

## Checkpoint 16 — Canonical Documentation Sync

### Objetivo

Resolver la inconsistencia detectada por la auditoría antes de cambiar comportamiento.

### Scope

Synchronize the canonical Phase 2 validation documents with the accepted Round 1 evidence and decision.

Review at minimum:

- `docs/validation/04-learning-validation-results-round-1.md`
- `docs/validation/05-product-decision-checkpoint-15.md`
- accepted conclusion/evidence documents.

### Expected result

Canonical documentation should consistently reflect:

```text
Round 1:
USEFUL BUT PASSIVE

Technical MVP:
READY

Learning Validation:
READY WITH MINOR FIXES

Product Direction:
Improve pedagogy
```

### Rule

Documentation only.

No code changes.

## Checkpoint 17 — Compact Widget Shell

### Objetivo

Implementar la nueva dirección visual sin agregar parámetros todavía.

Use:

`docs/design/01-phase-3-compact-learning-widget.md`

### Scope

Improve:

- compact footprint;
- tab visual weight;
- workspace hierarchy;
- primary action placement;
- resource density;
- secondary control presentation;
- responsive behavior;
- tab accessibility semantics identified by audit.

Optional only if simple and justified:

- fullscreen/expand control.

### Do not implement

- parameters;
- interpolation;
- branching;
- free-text input.

### Visual checkpoint

All existing demos must still function.

## Checkpoint 18 — Controlled Parameters Model

### Objetivo

Agregar el modelo mínimo de parámetros declarativos.

Use:

`docs/product/05-phase-3-controlled-personalization.md`

### Scope

Introduce:

- optional parameter definitions;
- `select` parameter type;
- default values;
- runtime ExperienceContext;
- UI controls in Prompt tab.

Do not interpolate output yet unless necessary for minimal integration.

### Compatibility

Existing experiences without parameters must remain unchanged.

## Checkpoint 19 — Prompt Interpolation

### Objetivo

Permitir placeholders simples en prompt content.

Example:

```text
{{role}}
```

### Scope

- interpolate known parameter values;
- update visible prompt when selection changes;
- establish clear missing-placeholder behavior;
- keep interpolation simple and safe.

### Do not implement

- expressions;
- conditions;
- arbitrary JS;
- nested template language.

### Visual checkpoint

Learner changes option → prompt visibly updates.

## Checkpoint 20 — Output Interpolation

### Objetivo

Use the same ExperienceContext in deterministic simulation output.

### Scope

Support interpolation in approved string fields such as:

- message content;
- status content;
- selected labels where useful.

Do not allow parameters to change engine control flow.

### Visual checkpoint

Selection appears consistently in prompt and output.

## Checkpoint 21 — Integrated Phase 3 Demo

### Objetivo

Crear una nueva experience specifically designed to demonstrate Phase 3.

Suggested name:

**demo-5 — Personalized Weekly Performance Review**

It should include at least:

```text
Role:
- Sales Manager
- Operations Manager
- Business Owner
```

and optionally one additional simple select parameter if useful.

### Required demonstration

- compact widget;
- controlled parameter selection;
- prompt interpolation;
- output interpolation;
- existing streaming/events;
- resources;
- completion.

### Critical rule

No demo-specific engine hacks.

## Post-Checkpoint 21 — Round 2 Validation

Use:

`docs/validation/06-phase-3-round-2-validation-plan.md`

This is not automatically a coding checkpoint.

## Technical Improvements From Previous Audit

### Should address in Phase 3

- incomplete tabs accessibility semantics;
- App.tsx orchestration concentration, only through small safe extraction when touched by Phase 3 work.

### Can wait

- plugin architecture for events;
- advanced runtime schema validation;
- branching;
- learner free-text interaction.

### Demo registration

If adding Demo 5 still requires editing a hardcoded demo ID list, it is acceptable to address the audit recommendation with a small manifest/config index if this can be done without introducing unnecessary architecture.

Do not build dynamic filesystem discovery or backend infrastructure.

## Definition of Done for Phase 3

Phase 3 implementation is ready for validation when:

- Checkpoints 16–21 are complete;
- old demos still work;
- new demo demonstrates controlled personalization;
- build/lint pass;
- compact UX is visually validated;
- no real AI integration exists;
- deterministic behavior remains the baseline.
