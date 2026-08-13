# Phase 3 Focused Architecture Review

## Scope

Read-only technical review after Checkpoint 21 completion.

Focus areas:

1. Simulation workspace effective area.
2. Parameter ownership and decoupling readiness.

---

## 1. Simulation Workspace Finding

### Root cause

The visible white/light margins around the dark Simulation area come from the shared tab content container plus width constraints:

- The tab panel wrapper applies outer spacing:
  - `place-items: start center` in [src/styles.css](src/styles.css#L139)
  - `padding: 0.95rem 1rem 1rem` in [src/styles.css](src/styles.css#L140)
- The simulation container does not fill all available width:
  - `width: min(640px, 100%)` in [src/styles.css](src/styles.css#L261)
- The panel itself is wider than simulation content:
  - `width: min(760px, 100%)` in [src/styles.css](src/styles.css#L28)

This creates a panel-within-panel effect and reduces useful simulation area.

### Affected files

- [src/styles.css](src/styles.css#L136)
- [src/App.tsx](src/App.tsx#L541)

### Recommended smallest fix

Classification: CSS-only + small component change.

Smallest safe approach:

1. Add a conditional class on the tabpanel when `activeTab === "Simulation"` in [src/App.tsx](src/App.tsx#L541).
2. In that class:
   - remove/reduce outer content-area padding for Simulation only;
   - allow simulation container to use full available width (`width: 100%` for Simulation mode only);
   - keep internal padding inside `simulation-panel` so text/cards remain readable.
3. Keep Prompt and Resources tab spacing unchanged.

### Risk level

LOW-MEDIUM

Primary risks:

- mobile overflow if full-width simulation is not constrained correctly;
- altered scrolling feel in fullscreen mode if max-height assumptions remain static.

---

## 2. Parameter Architecture Finding

### Current data flow

Parameter definitions:

- Stored in experience schema as optional `parameters` in [src/simulator/types/experience.ts](src/simulator/types/experience.ts#L75).
- Used by demos through JSON definitions (e.g., [public/simulations/demo-5/experience.json](public/simulations/demo-5/experience.json)).

Selected values:

- Stored in local state `parameterValues` in [src/App.tsx](src/App.tsx#L313).

Internal control rendering:

- Rendered by `PromptPanel` in [src/App.tsx](src/App.tsx#L147).

ExperienceContext creation:

- Created at run time in `runSimulation` in [src/App.tsx](src/App.tsx#L390).

Prompt interpolation:

- Performed by `getInterpolatedExperience` and `interpolateText` in [src/App.tsx](src/App.tsx#L42) and [src/App.tsx](src/App.tsx#L65).

Output interpolation:

- Also performed by `getInterpolatedExperience` for:
  - status/message content;
  - table title/columns/rows;
  - link label/description;
  - resource fileName/description.

### Coupling classification

MODERATELY COUPLED

Why:

- The parameter capture UI and interpolation/runtime assembly coexist in the same host component [src/App.tsx](src/App.tsx#L1).
- The engine remains decoupled from parameter concerns.

### Engine impact

No engine impact required for decoupling.

`ExperienceEngine` still consumes already-resolved deterministic events and has no parameter awareness in [src/simulator/engine/experienceEngine.ts](src/simulator/engine/experienceEngine.ts#L35).

### Recommended ownership model

Preferred model:

Host/Course collects parameters -> builds/provides ExperienceContext -> simulator consumes resolved runtime experience.

Keep internal parameter controls as optional convenience.

---

## 3. External Parameter Injection Feasibility

Result: MODERATE

Brief rationale:

- Feasible without engine changes.
- Requires extracting runtime interpolation/build logic out of host orchestration in [src/App.tsx](src/App.tsx).
- Requires an input channel for externally provided parameter values/context.

Likely changes:

- [src/App.tsx](src/App.tsx)
- [src/simulator/types/experience.ts](src/simulator/types/experience.ts)
- A small runtime interpolation module under `src/simulator/` (exact file path NOT VERIFIED).

Backward compatibility:

- Preserved by keeping `parameters` optional and falling back to defaults/internal controls when external values are absent.

---

## 4. Optional Internal Controls Feasibility

Result: RECOMMENDED

Brief rationale:

- Current architecture already supports optionality directionally:
  - optional parameter definitions;
  - interpolation before engine execution;
  - engine fully agnostic.
- Remaining task is separation of responsibilities, not redesign.

---

## 5. Recommended Next Checkpoints

22 — Simulation content-area fill pass

- Make Simulation use near-full useful panel space with tab-conditional layout styles.

23 — Parameter source decoupling pass

- Extract interpolation/runtime builder and support external parameter injection path while preserving internal controls.

---

## 6. Files Likely To Change

- [src/App.tsx](src/App.tsx)
- [src/styles.css](src/styles.css)
- [src/simulator/types/experience.ts](src/simulator/types/experience.ts)
- Small new runtime helper under `src/simulator/` (exact location NOT VERIFIED)

---

## 7. Risks

- Visual regression in Prompt/Resources if Simulation layout changes are not tab-scoped.
- Mobile overflow risk with full-width simulation and table content.
- Context consistency risk if external parameter values can mutate during a running session.
- Further growth of host component complexity if extraction is postponed.

---

## 8. Final Recommendation

Apply the smallest tab-conditional Simulation layout fix first (mostly CSS, minimal component toggle), then perform a focused extraction of parameter interpolation/runtime assembly so external parameter injection becomes first-class while internal controls remain optional. Keep the engine unchanged.
