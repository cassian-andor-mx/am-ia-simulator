# Phase 3 — Controlled Personalization

## Propósito de este documento en el laboratorio

Este documento define el modelo de producto para introducir variables controladas dentro de una Agent Experience.

Su objetivo es aumentar la sensación de participación del estudiante sin convertir el simulador en un chatbot, sin aceptar texto libre y sin requerir IA real.

## 1. Core Idea

An experience may define **parameters**.

A learner selects one value from a predefined list of options.

The selected value becomes part of the runtime `ExperienceContext`.

```text
Experience Definition
        ↓
Parameter Definitions
        ↓
Learner selects options
        ↓
Experience Context
        ↓
Prompt interpolation
        ↓
Output interpolation
        ↓
Existing Experience Engine
```

## 2. Parameter Constraints

For Phase 3:

- parameters are optional;
- parameter values are always predefined;
- input type is selection-based;
- no free text;
- no AI validation;
- no semantic transformation;
- no external data source;
- no sensitive information collection.

## 3. Initial Parameter Type

The only required parameter type for Phase 3 is:

```text
select
```

Conceptual example:

```json
{
  "parameters": [
    {
      "id": "role",
      "label": "Your role",
      "type": "select",
      "defaultValue": "sales-manager",
      "options": [
        { "value": "sales-manager", "label": "Sales Manager" },
        { "value": "operations-manager", "label": "Operations Manager" },
        { "value": "business-owner", "label": "Business Owner" }
      ]
    }
  ]
}
```

The exact schema may be refined during implementation.

Do not add additional input types unless a real Phase 3 use case requires them.

## 4. Experience Context

When execution starts, selected parameters become an immutable runtime context for that execution.

Conceptually:

```ts
interface ExperienceContext {
  parameters: Record<string, string>;
}
```

Important:

> Once a run starts, its parameter values should remain stable for the duration of that run.

## 5. Prompt Interpolation

Prompt content may contain placeholders.

Example:

```text
You are helping a {{role}} review weekly business performance.
```

If `role = Sales Manager`, the displayed prompt becomes:

```text
You are helping a Sales Manager review weekly business performance.
```

## 6. Output Interpolation

Visible scripted output may also contain placeholders.

Example:

```text
For a {{role}}, the most important issue to review is the increase in refunds.
```

The simulator only performs substitution.

It does not determine whether the statement is logically appropriate.

The experience author remains responsible for ensuring that every supported parameter option produces pedagogically correct text.

## 7. Interpolation Rules

Phase 3 should prefer a deliberately small interpolation system.

Required behavior:

- replace known placeholders;
- preserve deterministic content;
- fail clearly during development for missing required values;
- avoid executing arbitrary expressions;
- avoid JavaScript evaluation;
- avoid nested logic;
- avoid conditions unless explicitly approved later.

Example syntax:

```text
{{role}}
{{region}}
{{audience}}
```

## 8. What Parameters May Affect

Allowed:

- prompt paragraphs;
- message content;
- status text when useful;
- table text when supported safely;
- link labels;
- resource display names;
- other plain string fields that are explicitly enabled.

Not automatically allowed:

- URLs;
- file paths;
- event types;
- timing;
- executable code;
- engine behavior.

Do not let interpolation become a hidden programming language.

## 9. Authoring Responsibility

For every parameter option, authors must ensure:

- grammatical correctness;
- factual consistency;
- pedagogical consistency;
- no broken placeholders;
- no contradictory output.

The simulator is not responsible for interpreting meaning.

## 10. Compatibility

Experiences without `parameters` must continue to work exactly as before.

The parameter system is additive.

## 11. Future Possibilities — Not Phase 3

Possible later extensions:

- multiple parameter types;
- dependent option lists;
- branching based on parameter values;
- conditional text blocks;
- authoring helpers;
- generated parameter schemas.

None are required now.

## 12. Success Criteria

Controlled personalization is successful when:

1. an experience can define at least one select parameter;
2. the learner can choose an option;
3. the prompt reflects the selection;
4. scripted output can reflect the same selection;
5. replay remains deterministic for the same configuration;
6. experiences without parameters remain compatible.
