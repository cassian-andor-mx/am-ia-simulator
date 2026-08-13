# 07 — Phase 3 Round 2 Session Runbook

## Purpose

This runbook operationalizes Round 2 validation defined in [docs/validation/06-phase-3-round-2-validation-plan.md](docs/validation/06-phase-3-round-2-validation-plan.md).

It is designed to validate the impact of Phase 3 changes on interaction perception while preserving clarity and confidence.

## Session Goal

Collect evidence to answer:

- Do controlled parameters increase perceived interaction?
- Does compact widget layout remain clear and usable?

## Participants

Target:

- 5 participants
- Prefer mixed profile: at least 2 participants from Round 1 plus new participants

## Facilitator Setup

Before each session:

1. Run the app locally.
2. Select `demo-5` in the Experience selector.
3. Confirm role parameter is visible in Prompt tab.
4. Confirm Prompt changes when role changes.
5. Prepare capture sheet in [docs/validation/08-phase-3-round-2-results.md](docs/validation/08-phase-3-round-2-results.md).

Suggested runtime command:

```text
npm run dev
```

## Session Script

### Part A — Context (2-3 min)

Facilitator prompt:

"You will run a short personalized AI-workflow simulation. Please think aloud as you interact with it."

### Part B — Experience Execution (5-8 min)

Participant actions:

1. Select role in Prompt tab.
2. Read personalized prompt.
3. Click `Execute Prompt`.
4. Observe personalized simulation output.
5. Open Resources.

Facilitator observations:

- whether prompt personalization is noticed;
- whether output is perceived as consistent with the selected role;
- whether compact layout helps or hurts usability.

### Part C — Structured Questions (5-7 min)

Ask exactly:

1. Did choosing a role make this feel more interactive?
2. Was it clear how the role changed the prompt?
3. Was output consistent with your selected role?
4. Was the compact widget easier to use in a lesson?
5. Did this UI feel familiar enough compared to common AI tools?
6. Was anything more confusing than before?
7. Would you want more control than predefined options?
8. Did you still understand the workflow clearly?
9. Do you feel more prepared to do this in a real AI tool?

## Signals To Track

Track explicitly:

- `interaction_perception`
- `parameter_understanding`
- `prompt_change_awareness`
- `output_consistency`
- `compactness_preference`
- `visual_familiarity`
- `clarity`
- `confidence`
- `desire_for_more_control`
- `confusion`

## Interpretation Rules

### Strong Phase 3 Signal

Use when most participants report:

- increased interaction perception;
- clear parameter effect;
- stable clarity and confidence;
- acceptance or preference for compact layout.

### Mixed Signal

Use when interaction improves but parameter effect feels shallow or mostly cosmetic.

### Warning Signal

Use when clarity drops, confusion increases, or compactness harms usability.

## Deliverables

After sessions are complete:

1. Fill [docs/validation/08-phase-3-round-2-results.md](docs/validation/08-phase-3-round-2-results.md).
2. Update decision route in the product decision log (A/B/C/D from Round 2 plan).

## Guardrail

Do not use this round to justify major roadmap expansion without direct evidence.
