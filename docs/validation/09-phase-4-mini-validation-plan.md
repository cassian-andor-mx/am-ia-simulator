# Phase 4 — Mini Validation Plan

## Propósito de este documento en el laboratorio

Este documento define una validación corta enfocada únicamente en los dos cambios de Phase 4: Prompt Composer familiarity y AI Usage Meter comprehension.

## 1. Participants

Recommended:

```text
3–5 participants
```

Previous participants are useful for comparison, but not required.

## 2. Prompt Experience Questions

1. Does this area look like a natural place for an AI prompt?
2. Is it clear that the prompt is read-only for this exercise?
3. Is the prompt easy to read and analyze?
4. Is the Run action easy to find?
5. Do parameter controls feel connected to the prompt?
6. Does the Prompt tab now feel intentional rather than empty?

## 3. AI Usage Questions

After completion:

1. Did you notice the AI Usage indicator?
2. What do you think `Moderate` means?
3. Do you understand input vs output tokens?
4. Is the detail useful or too technical?
5. Is it clear that environmental information is estimated/reference-based?
6. Does the meter make you think differently about the amount of work requested from AI?
7. Does it distract from the main exercise?

## 4. Critical methodology comprehension test

Ask:

> Is this measuring the real environmental impact of this exact simulation?

Expected understanding:

> No. Text usage is calculated/estimated from the simulated prompt/response; environmental values use a reference methodology and real systems may differ.

If most participants interpret environmental values as exact measurement, the UX fails this checkpoint.

## 5. Success signals

- prompt feels familiar;
- read-only nature is understood;
- Run action obvious;
- meter noticed without dominating;
- token concepts understandable;
- environmental estimate understood as non-exact;
- low distraction.

## 6. Warning signals

- users repeatedly try to type into the prompt;
- `Moderate` feels like a moral score;
- bar looks like something they must maximize/minimize;
- environmental estimate is understood as exact;
- details are too technical;
- meter distracts from learning task.

## 7. Decision buckets

- `VALIDATED`
- `VISUAL REFINEMENT NEEDED`
- `METHODOLOGY COMMUNICATION ISSUE`
- `TOO DISTRACTING`

## 8. Normalized output

```text
prompt_familiarity
prompt_readability
run_discoverability
usage_meter_noticeability
token_understanding
environmental_estimate_understanding
distraction_level
overall_result
recommended_next_step
```

## 9. Latest captured results

See:

- `docs/validation/10-phase-4-mini-validation-results.md`
