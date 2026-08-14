# Phase 5 — AI Usage Meter UX Refinement

## Propósito de este documento en el laboratorio

Este documento define la nueva jerarquía visual del AI Usage Meter después de la mini-validación de Phase 4.

> AI Usage must support the exercise, not compete with it.

## 1. Move Meter Out of Completion Card

Approved direction:

```text
Agent Experience Simulator

Experience   demo-6    AI Usage ○ —    ⛶
────────────────────────────────────────
Prompt   Simulation   Resources
```

Production versions may later hide developer-only controls.

## 2. Neutral During Execution

Before completion:

```text
AI Usage  ○ —
```

or:

```text
AI Usage  ○ Measuring…
```

Use subdued styling.

## 3. Activated After Completion

After completion:

```text
AI Usage  ● Very Low
```

Use subtle emphasis.

Avoid large badges or dominant green areas.

## 4. Color Rules

Color is not the only signal.

Do not automatically communicate:

```text
Low = good
High = bad
```

Use restrained accents and textual labels.

## 5. Compact Detail Surface

Replace the large technical modal with:

```text
┌─────────────────────────────────┐
│ AI Usage                    ×   │
│                                 │
│ ~244 tokens                     │
│                                 │
│ You asked        ~90            │
│ AI returned     ~154            │
│                                 │
│ Usage                           │
│ ▰▱▱▱▱  Very Low                │
│                                 │
│ Environmental estimate          │
│ Reference impact: Very Low      │
│                                 │
│ ⓘ Estimated, not measured       │
│                                 │
│ How this is calculated          │
└─────────────────────────────────┘
```

## 6. Detail Size

Desktop:

- compact popover or small modal;
- avoid full-window takeover;
- avoid unnecessary internal scroll.

Mobile:

- bottom sheet or responsive modal.

## 7. Secondary Environmental Details

Only after an additional action:

```text
Energy       ~0.24 Wh
CO2e         ~0.03 g
Water        ~0.26 mL
```

Immediately state:

`Reference values from a published workload. Not a measurement of this simulated run.`

## 8. Token Education

Use:

```text
You asked = text sent to AI
AI returned = text generated back
```

Optional:

`Tokens are small pieces of text AI systems process.`

## 9. Completion Area After Refinement

Return completion to:

```text
✓ Simulation completed.
Generated resources are now available.

[ Open Resources ]
```

AI Usage no longer dominates it.

## 10. Production Shell Note

These are development-oriented and may later be removed from the production widget:

- `Development Lab`;
- raw demo labels such as `demo-6`;
- developer-oriented experience controls.

Do not remove them in Phase 5 unless explicitly requested.

## 11. Accessibility

Required:

- meter trigger is a button;
- accessible label includes current result;
- correct focus handling;
- Escape closes overlay where appropriate;
- textual equivalent for bar state;
- disclaimer readable by assistive technology.

## 12. Visual Verification

```text
AI Usage no longer dominates completion      ✓
Utility placement feels natural              ✓
Idle state is neutral                        ✓
Completed state is noticeable but subtle     ✓
Detail surface is compact                    ✓
Total tokens easy to find                    ✓
You asked / AI returned understandable       ✓
Environmental estimate clearly labeled       ✓
Simulation remains primary focus             ✓
Resources CTA remains visible                ✓
Mobile remains usable                        ✓
```
