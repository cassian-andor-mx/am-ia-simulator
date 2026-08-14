# Phase 5 — AI Usage Meter Simplification

## Propósito de este documento en el laboratorio

Este documento define cómo simplificar el AI Usage Meter para personas no técnicas sin perder transparencia metodológica.

## 1. Product Goal

The meter should answer:

1. How large was this interaction?
2. What did I ask vs what did AI return?
3. Is environmental information measured or estimated?

It should not feel like a technical dashboard.

## 2. Compact Summary

Preferred:

```text
AI Usage   ● Very Low
```

or:

```text
AI Usage   ▰▱▱▱▱  Very Low
```

This belongs in a utility area, not inside the simulation response.

## 3. Meter States

Idle:

```text
AI Usage   ○ —
```

Running:

```text
AI Usage   ○ Measuring…
```

Completed:

```text
AI Usage   ● Very Low
```

Unavailable:

```text
AI Usage   — Unavailable
```

## 4. Human-Friendly Token Labels

Primary:

```text
You asked
AI returned
Total
```

Secondary technical labels may remain:

```text
Input tokens
Output tokens
Total tokens
```

Example:

```text
You asked        ~90 tokens
AI returned     ~154 tokens
Total           ~244 tokens
```

Helper:

```text
Tokens are small pieces of text AI systems process.
```

## 5. Detail View

Default details should contain only:

- total tokens;
- You asked;
- AI returned;
- interaction load;
- environmental estimate status;
- short disclaimer;
- methodology action.

Avoid showing every available metric immediately.

## 6. Environmental Summary

Preferred:

```text
Environmental estimate
Reference impact: Very Low

Estimated, not measured.
```

Do not lead with Wh, grams CO2e or mL water. Those belong in secondary details.

## 7. Progressive Disclosure

Level 1:

`Estimated, not measured.`

Level 2:

`Based on a published reference workload.`

Level 3:

- energy;
- CO2e;
- water;
- source;
- date;
- workload;
- limitations.

## 8. Interaction Load

Bands remain:

- Very Low;
- Low;
- Moderate;
- High;
- Very High.

They must not imply good/bad behavior, cost quality, or environmental morality.

## 9. Educational Tone

Prefer:

`This interaction used a relatively small amount of text processing.`

Avoid:

`You used too much AI.`

## 10. Compatibility

Reuse existing metrics. No engine changes are required solely for this visual simplification.
