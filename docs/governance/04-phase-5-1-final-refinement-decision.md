# Phase 5.1 — Final Refinement Decision

## Propósito de este documento en el laboratorio

Registrar formalmente la decisión de hacer una iteración menor después de Phase 5.

## Estado actual

La confirmación de Phase 5 resultó en:

`MINOR VISUAL REFINEMENT`

Se validó que:

- la distracción ya es baja;
- el tamaño del meter es aceptable;
- los tokens se entienden mejor;
- el detalle ya no se percibe demasiado técnico.

Persisten dos asuntos:

- la ubicación de `AI Usage` aún no se siente natural;
- la estimación ambiental todavía puede interpretarse como medición real.

## Cambio aprobado 1 — Toolbar placement

Mover `AI Usage` a la misma barra que:

- Prompt;
- Simulation;
- Resources.

Ubicarlo al extremo derecho.

```text
Prompt   Simulation   Resources                         AI Usage ● Very Low
```

AI Usage es una utilidad, no un cuarto tab.

## Cambio aprobado 2 — Methodology cue

Mostrar cerca del resumen ambiental:

```text
This is a reference estimate, not a measurement of this exact run.
```

## Fuera de alcance

No modificar:

- token calculations;
- usage thresholds;
- environmental reference values;
- Experience Engine;
- event types;
- demos;
- parameters;
- Prompt Composer.

No agregar nuevas métricas o controles.
