# Phase 3 — Compact Learning Widget Design

## Propósito de este documento en el laboratorio

Este documento define la dirección visual y de interacción aprobada para Phase 3.

Su función es evitar un rediseño subjetivo o excesivo y traducir el feedback de usuarios en reglas concretas de UI.

La referencia conceptual es la filosofía de herramientas educativas compactas: pequeñas, funcionales, enfocadas y fáciles de insertar dentro de una lección.

## 1. Design Goal

The simulator should feel like a:

> **Compact Learning Widget**

not like a full application embedded inside a course.

## 2. Target Audience

Primary audience:

- non-technical learners;
- professionals learning practical AI workflows;
- users who may already recognize common AI-agent interfaces but should not need technical knowledge.

The UI must reduce cognitive load.

## 3. Core Design Principles

### 3.1 Compact by default

The widget should occupy only the space needed for the exercise.

It should not dominate the entire lesson page.

Use a controlled embedded footprint and internal scrolling when appropriate. Exact dimensions should be validated visually rather than treated as a permanent product contract.

### 3.2 Fullscreen on demand

A subtle fullscreen/expand control may allow focused work when needed.

The default state remains embedded.

### 3.3 Three clear tabs

Preserve:

- Prompt;
- Simulation;
- Resources.

They correspond to a simple learning model:

```text
What am I asking?
What is the agent doing?
What did I get?
```

Tabs should be visually lightweight.

### 3.4 One primary action

The main action should remain obvious.

Preferred wording:

```text
Run Prompt
```

or the existing approved equivalent.

Do not add competing primary buttons.

### 3.5 Secondary controls remain subtle

Possible examples:

- reset/replay;
- fullscreen.

Use small controls with clear accessible labels.

Do not overcrowd the toolbar.

## 4. Prompt Tab

The Prompt tab contains:

1. parameter controls, if the experience defines them;
2. formatted read-only prompt;
3. primary Run action.

Conceptual layout:

```text
┌───────────────────────────────────────┐
│ Prompt     Simulation     Resources   │
├───────────────────────────────────────┤
│                                       │
│ Role                                  │
│ [ Sales Manager                  ▼ ]  │
│                                       │
│ Analyze weekly performance...         │
│                                       │
├───────────────────────────────────────┤
│ [ Run Prompt ]               ↻   ⛶   │
└───────────────────────────────────────┘
```

Parameter controls should look simple and familiar.

## 5. Simulation Tab

The simulation area should receive stronger visual emphasis than auxiliary controls.

Desired qualities:

- focused;
- familiar;
- calm;
- modern;
- readable.

A darker simulation surface may be used if it improves familiarity, while the outer shell may remain light.

Conceptual direction:

```text
light widget shell
+
darker agent workspace
```

Avoid cloning a specific provider.

## 6. Resources Tab

Resources should be easy to scan.

Prefer compact rows/cards:

```text
Executive Summary.pdf              ↓
Supporting Data.xlsx               ↓
```

Avoid oversized resource cards unless content requires them.

## 7. Visual Hierarchy

Priority order:

1. current task/content;
2. primary action;
3. current simulation state;
4. generated result;
5. resources;
6. secondary controls.

Decorative UI should remain minimal.

## 8. Agent-Like Familiarity

Use familiar patterns such as:

- processing/status indicator;
- progressive text;
- subtle completion state;
- generated resource affordances;
- auto-scroll when appropriate.

Do not reproduce provider-specific branding, logos, exact layouts or proprietary visual identity.

## 9. Parameters and Non-Technical UX

Parameter controls should use plain language.

Good:

```text
Your role
Sales Manager
```

Avoid:

```text
runtimeVariable.role
```

The learner should understand the effect without understanding templates or variables.

## 10. Interaction Feedback

When the learner changes a parameter:

- the displayed prompt should update clearly;
- the learner should be able to see the personalization before running;
- avoid surprising hidden changes.

When Run is pressed:

- parameter controls should not change unexpectedly during execution;
- current selections belong to that run.

## 11. Mobile / Narrow Layout

The widget must remain usable at narrow widths.

Priorities:

- no horizontal overflow;
- readable prompt;
- usable tabs;
- touch-friendly primary action;
- simple resource list.

Fullscreen may become especially useful on small displays.

## 12. Accessibility

Maintain:

- semantic buttons;
- accessible tab behavior;
- visible focus;
- select labels;
- accessible names for icon-only controls;
- sufficient contrast;
- keyboard operation.

The audit finding regarding incomplete tab semantics should be addressed during this phase.

## 13. Avoid

Do not:

- make the widget visually huge;
- add multiple toolbars;
- add provider branding;
- use technical terminology in learner-facing UI;
- turn parameters into a complex form;
- add free-text prompt input;
- hide the prompt personalization from the learner.

## 14. Visual Validation Checklist

```text
Compact footprint                     ✓
Prompt remains readable               ✓
Tabs remain obvious                   ✓
Parameter controls are understandable ✓
Run action is dominant                ✓
Simulation feels agent-like           ✓
Resources are compact                 ✓
Fullscreen works if implemented       ✓
Keyboard navigation remains usable    ✓
Existing demos still look acceptable  ✓
```
