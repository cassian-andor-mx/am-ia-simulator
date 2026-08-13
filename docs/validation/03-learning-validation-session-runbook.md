# 03 — Learning Validation Session Runbook

## Purpose

This runbook operationalizes the learning validation process defined in [docs/validation/02-learning-validation-plan.md](docs/validation/02-learning-validation-plan.md).

It is designed for **Checkpoint 14** execution with the first real learning experience:

- Experience: `demo-4`
- Lab title: `Create an Executive Summary with AI`

## Session Goal

Collect evidence about whether a non-technical learner understands an AI-assisted workflow better through an interactive simulation than through passive observation.

## Participants

Target:

- 5 to 10 participants
- Non-developers
- Basic to intermediate AI familiarity

## Facilitator Setup

Before each session:

1. Run the app locally.
2. Confirm `demo-4` is available in the experience selector.
3. Open Prompt tab and keep the participant at the initial state.
4. Prepare a capture sheet (see [docs/validation/04-learning-validation-results-round-1.md](docs/validation/04-learning-validation-results-round-1.md)).

Suggested runtime command:

```text
npm run dev
```

## Session Script

### Part A — Context (2-3 min)

Facilitator prompt:

"You will complete a short simulated AI workflow called Create an Executive Summary with AI. Please think aloud while using it. There are no right or wrong answers."

### Part B — Experience Execution (5-8 min)

Participant actions:

1. Select `demo-4`.
2. Read Prompt content.
3. Click `Execute Prompt`.
4. Observe Simulation output.
5. Open Resources and inspect generated files.

Facilitator observations to capture:

- hesitation points;
- confusion points;
- whether they understand progression from prompt to output;
- whether they notice and use resources.

### Part C — Structured Questions (5-7 min)

Ask exactly:

1. What did the agent do after receiving the prompt?
2. What was the main result?
3. Which resources were produced?
4. What part became clearer for you?
5. What part felt confusing?
6. Did this feel like doing a task or watching an animation?
7. Do you feel more prepared to do this in a real AI tool?
8. Would you prefer this over a video for this topic?
9. Why?

## Scoring (Optional 1-5)

For each participant, rate:

- Clarity
- Realism
- Usefulness
- Engagement
- Confidence after exercise

## Signals to Track

Track explicitly:

- `understood_workflow`
- `understood_prompt_purpose`
- `understood_output`
- `noticed_resources`
- `felt_interaction`
- `felt_confidence`
- `confusion_points`
- `wanted_additional_control`

## Interpretation Rules

### Strong Signal

Use this outcome when most participants:

- can explain the workflow correctly;
- can identify outputs and resources;
- report improved confidence.

### Useful but Passive

Use this outcome when participants understand results but report low interaction value.

### Confusing

Use this outcome when multiple participants fail to explain flow/output or confuse simulation with real AI execution.

## Deliverable for Checkpoint 14

After sessions are complete, fill:

- [docs/validation/04-learning-validation-results-round-1.md](docs/validation/04-learning-validation-results-round-1.md)

Do not jump to architecture changes in this checkpoint.
