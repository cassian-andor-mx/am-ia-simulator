# Phase 5.1 — Toolbar Placement and Methodology Cue

## Propósito de este documento en el laboratorio

Definir los dos últimos ajustes de UX después de Phase 5.

## 1. Toolbar

Dirección:

```text
┌──────────────────────────────────────────────────────────────┐
│ Prompt    Simulation    Resources          AI Usage ● Very Low │
└──────────────────────────────────────────────────────────────┘
```

Navigation stays left-aligned.

AI Usage is right-aligned.

## 2. Important distinction

AI Usage must NOT look or behave like a fourth tab.

Use utility styling:

- smaller/subtler treatment;
- distinct spacing;
- button semantics;
- separate hover/focus behavior.

Do not give it `role="tab"`.

## 3. Existing states

Preserve:

```text
AI Usage ○ —
AI Usage ○ Measuring…
AI Usage ● Very Low
AI Usage — Unavailable
```

## 4. Responsive behavior

Requirements:

- no overlap;
- no clipped tabs;
- no horizontal scrolling;
- tabs retain priority;
- intentional wrapping if necessary.

## 5. Accessibility

Tabs preserve:

- tablist semantics;
- keyboard navigation;
- aria relationships.

AI Usage remains:

- semantic button;
- outside tab keyboard sequence;
- focus visible;
- accessible state label.

## 6. Environmental cue

Near the environmental summary, show:

```text
This is a reference estimate, not a measurement of this exact run.
```

It must be directly visible and not hidden behind methodology details.

## 7. Validation checklist

```text
AI Usage right-aligned in toolbar              ✓
Does not look like a fourth tab                 ✓
Toolbar remains compact                         ✓
Mobile/narrow width works                       ✓
Details still open correctly                    ✓
Environmental cue is immediately visible       ✓
Simulation area loses no space                  ✓
```
