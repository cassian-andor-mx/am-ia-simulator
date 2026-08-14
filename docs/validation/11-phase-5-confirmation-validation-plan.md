# Phase 5 — Confirmation Mini Validation

## Propósito de este documento en el laboratorio

Este documento define una validación breve posterior a Phase 5, centrada solo en:

1. distracción;
2. comprensión de tokens;
3. comprensión de estimación ambiental.

## 1. Participants

Recommended:

```text
3–5 participants
```

Previous Phase 4 participants are ideal when available.

## 2. Test Flow

Participant:

1. runs the responsible-AI demo;
2. observes simulation;
3. notices AI Usage;
4. opens compact details;
5. explains what values mean.

## 3. Distraction Questions

Ask:

1. Did AI Usage distract you from the simulation?
2. Was it easy to notice after completion?
3. Is its location natural?
4. Does it occupy too much space?

Success:

- noticeable;
- not dominant.

## 4. Token Understanding Questions

Ask:

1. What does `You asked` represent?
2. What does `AI returned` represent?
3. What are tokens in simple terms?
4. What does the total represent?

Expected:

```text
You asked = text sent to AI.
AI returned = generated response.
Tokens = small pieces of text processed by AI systems.
```

## 5. Environmental Comprehension Test

Ask:

> Is this measuring the real environmental impact of this exact simulated interaction?

Expected:

> No. It is an estimate/reference based on a published workload.

This is the critical Phase 5 question.

## 6. Detail Complexity

Ask:

1. Is the detail view understandable?
2. Is anything still too technical?
3. Would you want more information by default?
4. Is `How this is calculated` enough for deeper information?

## 7. Success Criteria

Phase 5 is validated if:

- distraction is low;
- meter remains discoverable;
- token concepts are understood by majority;
- environmental methodology question is answered correctly by majority;
- detail panel is perceived as simple enough;
- simulator remains visually primary.

## 8. Warning Signals

- meter becomes too hidden;
- users confuse usage band with cost;
- users still do not understand tokens;
- users still believe environmental values are exact measurement;
- detail panel remains technical;
- utility toolbar becomes crowded.

## 9. Outcome Buckets

- `VALIDATED`
- `MINOR VISUAL REFINEMENT`
- `TOKEN EDUCATION ISSUE`
- `METHODOLOGY COMMUNICATION ISSUE`
- `TOO DISTRACTING`

## 10. Normalized Result

Capture:

```text
meter_noticeability
distraction_level
token_understanding
environmental_reference_understanding
detail_complexity
overall_result
recommended_next_step
```

## 11. Latest captured results

See:

- `docs/validation/12-phase-5-confirmation-validation-results.md`
