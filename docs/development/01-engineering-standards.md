# 01 — Engineering Standards

## Propósito de este documento en el laboratorio

Este documento define **cómo debe escribirse y organizarse el código** del Agent Experience Simulator.

Debe utilizarse como referencia permanente por Copilot al crear, modificar o refactorizar código.

Las decisiones aquí descritas buscan mantener el repositorio limpio, entendible y fácil de evolucionar.

---

# 1. Language

All source code must be written in English.

This includes:

- variable names;
- function names;
- component names;
- type names;
- interface names;
- enum names;
- file names;
- test descriptions;
- technical identifiers.

Code comments must also be written in English.

AI-oriented product and development documentation may be written in Spanish.

---

# 2. General Code Quality

Prefer:

- readable code;
- explicit intent;
- small focused units;
- simple control flow;
- descriptive naming;
- clear types;
- predictable behavior.

Avoid:

- clever code;
- unnecessary abstraction;
- large components;
- hidden side effects;
- deeply nested conditionals;
- premature optimization;
- premature infrastructure.

---

# 3. TypeScript

Use TypeScript consistently.

Guidelines:

- prefer explicit domain types;
- avoid `any`;
- use `unknown` when input truly has unknown shape;
- narrow values safely;
- prefer discriminated unions for experience events when appropriate;
- avoid unnecessary type assertions;
- keep public contracts easy to understand.

Example direction:

```ts
type ExperienceEvent =
  | StatusEvent
  | MessageEvent
  | CompleteEvent;
```

Only introduce complexity once the real event model justifies it.

---

# 4. React

Guidelines:

- prefer functional components;
- keep components focused;
- separate domain logic from presentation;
- avoid very large JSX blocks;
- extract components when responsibility becomes clear;
- avoid premature global state;
- keep state as local as practical;
- avoid unnecessary effects;
- prefer derived values over duplicated state.

---

# 5. Comments

The codebase should contain useful comments in English.

Comments should explain:

- intent;
- constraints;
- non-obvious behavior;
- architectural decisions;
- reasons behind unusual implementation choices.

Do not comment obvious syntax.

Bad:

```ts
// Increment index
index += 1;
```

Better:

```ts
// Events are intentionally processed sequentially because deterministic
// playback is a core requirement of the simulator.
await processEvent(event);
```

---

# 6. Naming

Names should describe purpose clearly.

Prefer:

```text
ExperienceDefinition
ExperienceEngine
ExperienceEvent
MessageRenderer
ResourceList
```

Avoid vague names:

```text
Data
Manager
Helper
Utils2
Thing
HandlerStuff
```

Avoid provider-specific domain names unless the code truly integrates that provider.

---

# 7. File Structure

Files should be organized by clear responsibility.

Avoid creating many folders before they are needed.

A possible direction:

```text
src/
  simulator/
    engine/
    components/
    renderers/
    types/
```

This is guidance, not a requirement to create empty folders preemptively.

---

# 8. Functions

Prefer functions that:

- do one clear job;
- have descriptive names;
- have small parameter lists;
- return predictable values;
- avoid hidden mutations.

Extract functions when doing so improves clarity.

Do not extract trivial one-line behavior solely to increase abstraction.

---

# 9. Error Handling

Errors should be explicit.

For the MVP:

- fail clearly during development;
- avoid silently swallowing exceptions;
- show useful developer-facing errors;
- keep user-facing error states simple.

Do not design a complex error framework prematurely.

---

# 10. Styling

The project should maintain consistent styling.

Guidelines:

- avoid scattered one-off inline styles when reusable styling is clearer;
- keep visual tokens centralized once repeated patterns emerge;
- prefer responsive behavior from early checkpoints;
- preserve readable widths for prompt and generated content;
- prioritize clarity over decorative complexity.

The exact styling technology should be selected during bootstrap and documented once chosen.

---

# 11. Accessibility

Use reasonable web accessibility practices from the beginning.

At minimum:

- semantic HTML;
- buttons for actions;
- labels where appropriate;
- keyboard-usable tabs;
- visible focus behavior;
- sufficient contrast;
- meaningful alt text for informative images.

Do not postpone basic accessibility until the end.

---

# 12. Testing

Testing should grow with risk.

Do not create an excessive test suite before behavior exists.

Early priorities:

- critical engine behavior;
- deterministic event ordering;
- state transitions;
- renderer mapping once stable.

Visual checks remain important during the MVP.

---

# 13. Dependencies

Before adding a dependency, ask:

1. Is it necessary?
2. Can the platform already do this?
3. Is the dependency maintained?
4. Does it materially simplify the implementation?
5. Will it introduce unnecessary coupling?

Keep the dependency surface small.

---

# 14. Refactoring

Do not combine large refactors with large feature additions.

Prefer:

```text
working state
   ↓
small refactor
   ↓
verify
   ↓
new feature
```

Every meaningful refactor must preserve observable behavior unless behavior change is explicitly intended.

---

# 15. Best-Practice Rule

"Best practice" does not mean "most abstract architecture."

For this laboratory:

> The best solution is the simplest clear solution that preserves the important product and architectural boundaries.
