# GitHub Copilot Instructions

## Propósito de este archivo en el laboratorio

Este archivo contiene las reglas permanentes y de alta prioridad que GitHub Copilot debe respetar al trabajar en este repositorio.

No reemplaza la documentación detallada. Su función es actuar como **router de contexto y constitución operativa** del proyecto.

---

# Project

This repository contains the **Agent Experience Simulator**.

It is a pedagogical simulation engine for reproducing visible AI-agent experiences.

It is **not** a chatbot and it is **not** a real AI agent.

---

# Source of Truth

Before making product or architectural decisions, use these documents:

## Product

- `/docs/product/01-product-vision.md`
- `/docs/product/02-mvp-validation.md`
- `/docs/product/03-simulator-architecture.md`
- `/docs/product/04-future-roadmap.md`

## Development

- `/docs/development/01-engineering-standards.md`
- `/docs/development/02-bootstrap-plan.md`
- `/docs/development/03-development-workflow.md`

---

# Current Priority

Build only what is required to validate the current MVP.

Do not implement future roadmap capabilities unless explicitly requested.

---

# Core Architectural Rule

The simulation engine must operate on generic declarative experience events.

Do not model the product around:

- ChatGPT;
- OpenAI;
- Claude;
- Gemini;
- Copilot;
- provider-specific chat behavior.

Prefer:

- `ExperienceDefinition`;
- `ExperienceEngine`;
- `ExperienceEvent`;
- generic event renderers;
- reusable resources.

---

# Development Rules

- Build incrementally.
- Never skip visual checkpoints.
- Implement only the requested checkpoint.
- Stop after the requested checkpoint.
- Keep the application running after every meaningful step.
- Preserve existing working behavior.
- Prefer simple solutions over premature architecture.
- Do not perform large refactors and large features simultaneously.
- Do not introduce future roadmap features automatically.

---

# Language

All source code must be written in English.

This includes:

- variables;
- functions;
- types;
- interfaces;
- components;
- file names;
- code comments.

AI-oriented documentation may be written in Spanish.

---

# Comments

Write useful English comments where they explain:

- intent;
- constraints;
- non-obvious behavior;
- architectural decisions.

Do not comment obvious syntax.

---

# MVP Constraints

Do not introduce unless explicitly requested:

- real LLM calls;
- OpenAI or other AI APIs;
- backend infrastructure;
- databases;
- authentication;
- React Native;
- multiple agents;
- branching experiences;
- complex state management;
- plugin systems;
- visual authoring tools.

---

# New Dependencies

Before adding a dependency, verify that it is necessary and materially simplifies the implementation.

Keep the dependency surface small.

---

# When a Request Conflicts With the Documentation

If a requested change appears to conflict with the current MVP scope or architecture:

1. point out the conflict;
2. identify the relevant document;
3. proceed only if the user explicitly wants to change direction.

---

# Definition of Done for a Checkpoint

A checkpoint is complete only when:

- the application runs;
- the requested scope is implemented;
- relevant checks pass;
- existing behavior is preserved;
- the result can be inspected;
- visual verification instructions are provided when applicable.

Do not continue into the next checkpoint automatically.
