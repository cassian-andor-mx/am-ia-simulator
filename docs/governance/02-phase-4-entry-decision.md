# Phase 4 Entry Decision

## Propósito de este documento en el laboratorio

Este documento registra formalmente por qué se abre **Phase 4 — Prompt Experience & Responsible AI Usage** y qué decisiones están aprobadas, diferidas o descartadas.

## 1. Estado previo

Phase 3 validó:

- compact widget;
- controlled personalization;
- prompt/output interpolation;
- deterministic behavior;
- strong clarity and confidence.

Round 2 fue `MIXED POSITIVE`. La lectura refinada del feedback es que el problema no es tener un Prompt tab separado; el Prompt tab necesita una presentación visual más familiar e intencional.

## 2. Dirección aprobada

### A. Read-only Prompt Composer

Mantener Prompt / Simulation / Resources. El prompt sigue siendo read-only, pero se presenta dentro de una superficie visual con bordes suaves, buen padding, parámetros controlados cuando apliquen y una acción Run integrada.

### B. AI Usage Meter

Después de completar una simulación, mostrar un indicador compacto de uso:

```text
✓ Completed
AI Usage   ▰▰▰▰▱  Moderate   ›
```

El detalle se abre bajo demanda.

## 3. Ubicación aprobada

El meter pertenece al footer/completion area de `Simulation`, no a `Resources` ni al encabezado del Prompt.

## 4. Principio ambiental

Separar siempre:

- métricas de texto calculadas/estimadas;
- indicadores educativos derivados;
- estimaciones ambientales basadas en un perfil de referencia.

Nunca presentar impacto ambiental como medición exacta de una simulación local.

## 5. Deferred / Not approved

- free-text learner prompt input;
- branching;
- adaptive AI;
- random output variants;
- real LLM calls;
- live provider telemetry;
- gamified guilt/scoring;
- universal tokens-to-CO2 conversion.

## 6. Tono pedagógico

Educar sin culpabilizar.

Preferir:

> Could this interaction be more efficient?

Evitar mensajes que presenten el uso de IA como una falla moral.

## 7. Success definition

Phase 4 succeeds if:

- Prompt tab looks intentional and familiar;
- prompt remains easy to analyze;
- Run action is obvious;
- AI Usage Meter remains compact;
- learners understand input/output/total tokens;
- environmental estimates are clearly identified as estimates;
- deterministic behavior and previous demos remain intact.
