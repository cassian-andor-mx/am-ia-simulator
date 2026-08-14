# Phase 4 — AI Usage Meter

## Propósito de este documento en el laboratorio

Este documento define el **AI Usage Meter** como capacidad pedagógica. Su objetivo es ayudar a personas no técnicas a desarrollar intuición sobre la magnitud relativa de una interacción con IA sin convertir el simulador en un dashboard técnico.

## 1. Primary display

Mostrar solo después de `completed`:

```text
✓ Completed
AI Usage   ▰▰▰▰▱  Moderate   ›
```

La vista primaria solo muestra:

- etiqueta `AI Usage`;
- barra compacta;
- banda cualitativa;
- acción para ver detalle.

## 2. Detail view

Ejemplo:

```text
AI Usage Details

Input tokens          ~420
Output tokens         ~780
Total tokens        ~1,200
Output / Input         1.86x

Interaction load
██████░░░░   Moderate

Environmental impact
Estimated • Reference profile

[ How this is calculated ]
```

## 3. Metric categories

### Text usage

- input tokens;
- output tokens;
- total tokens;
- output/input ratio.

### Derived educational indicators

- interaction load band;
- optional deterministic efficiency hint.

### Environmental reference estimates

Optional, profile-driven:

- energy (Wh);
- CO2e (g);
- water (mL).

These are never direct measurements in simulator-only mode.

## 4. Approximation labels

Use `~` when a value is estimated rather than counted with a tokenizer known to match the reference model.

## 5. Interaction Load

Suggested labels:

```text
Very Low
Low
Moderate
High
Very High
```

Thresholds belong to a named configuration/profile. They are pedagogical categories, not universal scientific limits.

## 6. What counts as input

Initial Phase 4 definition:

> Final interpolated prompt text presented for execution.

Do not silently include invisible system prompts that are not part of the experience definition.

## 7. What counts as output

Use one canonical serializer for scripted visible AI-answer content. It may include:

- message text;
- table textual content;
- link labels/descriptions;
- other explicitly approved textual response fields.

Do not count downloadable binary file contents.

Status text should only be counted if the methodology explicitly defines it as part of the modeled output.

## 8. Reference profiles

A usage profile should document:

- id and label;
- tokenizer/model reference;
- load thresholds;
- environmental source, if any;
- source date;
- assumptions and limitations.

## 9. Environmental UX

Preferred primary label:

```text
Environmental impact
Estimated • Reference profile
```

Only show numerical values when the selected profile explicitly supports them.

## 10. Educational guidance

A deterministic tip may be shown, for example:

> Requesting a shorter answer can reduce output-token usage.

Do not use AI to generate the tip and do not claim numerical savings without a documented method.

## 11. Compatibility

Experiences without usage configuration must continue working. The meter may use a documented project default profile or remain hidden when required configuration is absent; choose and document one behavior during implementation.

## 12. Guardrails

- compact UI;
- no live counter during simulation in Phase 4;
- no false environmental precision;
- no real AI dependency;
- no provider-specific branding;
- deterministic baseline preserved.
