# 02 — Bootstrap Plan

## Propósito de este documento en el laboratorio

Este documento define **cómo construir el repositorio desde cero en pequeños pasos verificables**.

Su función es evitar que Copilot genere demasiada arquitectura o funcionalidad antes de que el desarrollador pueda ver y validar el resultado.

Cada checkpoint debe terminar con algo ejecutable, inspeccionable y estable.

---

# 1. Regla principal

> Never implement several architectural layers ahead of what can currently be demonstrated.

Cada checkpoint debe terminar con:

1. aplicación ejecutándose;
2. cero errores de build o TypeScript;
3. comportamiento anterior preservado;
4. resultado visible o inspeccionable;
5. breve explicación de lo cambiado;
6. instrucciones claras para verificar;
7. pausa antes de comenzar el siguiente checkpoint.

---

# 2. Visual Checkpoint Development

El proyecto seguirá una estrategia de **Visual Checkpoint Development**.

No se avanzará varios pasos confiando en que la integración final funcionará.

La prioridad es detectar problemas temprano.

---

# 3. Checkpoint 0 — Repository Foundation

## Objetivo

Crear la base mínima de una aplicación web moderna con React y TypeScript.

## Resultado esperado

La aplicación abre en el navegador y muestra:

```text
Agent Experience Simulator

Development Lab
```

## Alcance

Configurar únicamente lo necesario para:

- React;
- TypeScript;
- development server;
- build;
- basic linting/formatting if selected;
- minimal global styling.

## No hacer todavía

- tabs;
- simulator engine;
- JSON schema;
- resource system;
- routing complejo;
- state management library.

## Verificación

- dev server starts;
- page loads;
- no console errors;
- production build succeeds.

---

# 4. Checkpoint 1 — Application Shell

## Objetivo

Crear la estructura visual principal.

## Resultado esperado

```text
┌──────────────────────────────────────┐
│ Agent Experience Simulator           │
├──────────────────────────────────────┤
│ Prompt | Simulation | Resources      │
│                                      │
│          Empty content area          │
│                                      │
└──────────────────────────────────────┘
```

## Alcance

- header;
- tabs;
- active tab state;
- main content container;
- basic responsive behavior.

## Verificación visual

- three tabs visible;
- active state is obvious;
- clicking tabs works;
- layout remains clean at common desktop width;
- basic mobile narrowing does not break layout.

---

# 5. Checkpoint 2 — Prompt Experience

## Objetivo

Mostrar un prompt realista de solo lectura.

## Resultado esperado

```text
Prompt

You are an analyst...

Analyze the following weekly results...

[ Execute Prompt ]
```

## Alcance

- prompt data from a simple in-memory object;
- formatted content;
- readable max width;
- paragraph spacing;
- `Execute Prompt` action.

## Verificación visual

- prompt is easy to scan;
- long lines are controlled;
- spacing feels intentional;
- button is clearly discoverable.

---

# 6. Checkpoint 3 — First Visible Simulation

## Objetivo

Demostrar la interacción básica sin diseñar todavía un engine formal.

## Resultado esperado

Al ejecutar:

```text
Processing...

Analyzing the provided information...

The analysis is complete.
```

Los elementos aparecen con delays simples.

## Alcance

- switch to Simulation tab;
- simple local sequence;
- basic timing;
- visual processing state.

## Verificación

- click starts experience;
- UI changes immediately;
- sequence is visible;
- no blocking;
- replay behavior is understood.

---

# 7. Checkpoint 4 — Introduce ExperienceDefinition

## Objetivo

Mover el contenido que ya funciona hacia una estructura declarativa.

## Resultado esperado

La experiencia se ve igual que en Checkpoint 3, pero ahora sus datos provienen de una `ExperienceDefinition`.

## Alcance

Introducir solamente los tipos necesarios para representar la experiencia ya existente.

No agregar eventos futuros "por si acaso".

## Verificación

- visual behavior unchanged;
- no simulation-specific content hard-coded in renderer components;
- definition is understandable.

---

# 8. Checkpoint 5 — Minimal Experience Engine

## Objetivo

Crear el primer motor real de reproducción.

## Event types iniciales

Solo los necesarios. Como referencia:

```text
status
message
complete
```

## Resultado esperado

El engine procesa una secuencia declarativa y la UI reacciona.

## Verificación

- events preserve order;
- execution state is explicit;
- completion is reliable;
- replay/reset behavior is defined;
- no provider-specific code.

---

# 9. Checkpoint 6 — Message Streaming

## Objetivo

Reproducir generación progresiva de texto.

## Resultado esperado

Un evento `message` puede mostrarse:

```text
instant
```

o:

```text
stream
```

## Verificación visual

- streaming feels readable;
- speed is reasonable;
- layout does not jump excessively;
- completed message matches expected content.

---

# 10. Checkpoint 7 — Rich Content

## Objetivo

Agregar uno o dos tipos de contenido adicionales basados en una necesidad real.

Posibles candidatos:

- image;
- table;
- link.

No implementar todos automáticamente.

## Verificación

Cada renderer debe:

- verse consistente;
- recibir datos declarativos;
- no conocer el laboratorio específico.

---

# 11. Checkpoint 8 — Resources

## Objetivo

Implementar el tercer tab con recursos generados.

## Resultado esperado

Después de completar la simulación:

```text
Generated Resources

Executive Summary.pdf
Sales Analysis.xlsx
```

## Alcance

- resource metadata;
- completion gating;
- download/open action;
- clear empty state before completion.

## Verificación

- resources unavailable or empty before completion;
- resources appear after completion;
- links work;
- filenames are correct.

---

# 12. Checkpoint 9 — External Experience Folder

## Objetivo

Sacar la experiencia demo del código principal.

## Resultado esperado

```text
simulations/
  demo-1/
    experience.json
    assets/
```

El simulador carga la experiencia sin que los componentes principales conozcan su contenido.

## Verificación

- demo-1 works;
- assets resolve;
- engine remains generic.

---

# 13. Checkpoint 10 — Second Experience Validation

## Objetivo

Validar la arquitectura creando una segunda experiencia.

## Regla crítica

La segunda experiencia debe poder agregarse **sin modificar significativamente el motor**.

## Resultado esperado

```text
simulations/
  demo-1/
  demo-2/
```

## Criterio de éxito

Si agregar `demo-2` requiere cambios significativos al engine o UI base, revisar la arquitectura antes de continuar.

---

# 14. Commit Strategy

Idealmente cada checkpoint produce uno o pocos commits claros.

Ejemplo:

```text
chore: initialize React application

feat: add simulator application shell

feat: add prompt experience

feat: add basic simulation playback

refactor: introduce experience definition

feat: add minimal experience engine

feat: add streamed messages

feat: add generated resources
```

---

# 15. Stop Rule

Copilot debe detenerse después de implementar el checkpoint solicitado.

No debe comenzar el siguiente automáticamente.

Antes de avanzar, el desarrollador debe poder:

- ejecutar;
- inspeccionar;
- validar;
- decidir si continuar o corregir.
