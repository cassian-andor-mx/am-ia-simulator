# Phase 4 — Prompt Composer and AI Usage Meter Design

## Propósito de este documento en el laboratorio

Este documento define la dirección visual aprobada para el **Read-only Prompt Composer** y el **AI Usage Meter**, optimizada para personas no técnicas y para el widget compacto existente.

## 1. Read-only Prompt Composer

El Prompt tab debe sentirse como un lugar natural para un prompt, sin fingir que es editable.

```text
┌──────────────────────────────────────────┐
│ Prompt                                   │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Analyze the weekly report...       │  │
│  │                                    │  │
│  │ Your role                          │  │
│  │ [ Business Owner              ▼ ]  │  │
│  │                                    │  │
│  │                         [ Run ]     │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Principles

- subtle rounded corners;
- soft border/shadow;
- generous internal padding;
- readable line length;
- no textarea caret;
- no fake editable behavior;
- one primary Run action;
- controlled parameters integrated subtly;
- no provider branding or exact imitation.

## 2. Simulation completion meter

After completion:

```text
┌──────────────────────────────────────────┐
│ AI response...                           │
├──────────────────────────────────────────┤
│ ✓ Completed                              │
│ AI Usage   ▰▰▰▰▱  Moderate        ›     │
└──────────────────────────────────────────┘
```

The meter should consume roughly one compact row.

## 3. Meter details

Desktop:

- popover or compact modal.

Small screens:

- bottom sheet or responsive modal.

Use the simplest accessible pattern consistent with the current project.

## 4. Information hierarchy

1. Input / Output / Total tokens.
2. Output/Input ratio.
3. Interaction load.
4. Environmental estimate.
5. `How this is calculated`.

Do not lead with environmental claims.

## 5. Methodology disclosure

Example concise copy:

```text
Token usage is calculated or estimated from the simulated prompt and response using the configured reference method.

Environmental values are reference estimates, not measurements of this simulation. Actual impact depends on the AI model and infrastructure.
```

## 6. Accessibility

- meter trigger is a real button;
- bar also has a text label;
- color is not the only signal;
- focus is managed in details overlay;
- close action is keyboard accessible;
- icon-only controls have accessible names.

## 7. Responsive behavior

Allow wrapping:

```text
✓ Completed
AI Usage
▰▰▰▰▱ Moderate  ›
```

Do not make the widget wider merely to fit the meter.

## 8. Visual validation

```text
Prompt surface intentional             ✓
Prompt easy to analyze                 ✓
Read-only state clear                  ✓
Run action obvious                     ✓
Parameters do not dominate             ✓
Simulation remains compact/full-use    ✓
Meter only after completion            ✓
Meter visually subtle                  ✓
Details understandable                 ✓
Estimate label visible                 ✓
Mobile usable                          ✓
Keyboard accessible                    ✓
```
