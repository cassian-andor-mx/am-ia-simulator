# 03 — Development Workflow

## Propósito de este documento en el laboratorio

Este documento define **cómo debe colaborar Copilot con el desarrollador durante la construcción del proyecto**.

No define qué producto construir ni la arquitectura final.

Define la disciplina de trabajo: cambios pequeños, resultados visibles, validación frecuente y control explícito del alcance.

---

# 1. Regla de colaboración

El proyecto debe desarrollarse incrementalmente.

Copilot no debe implementar múltiples milestones en una sola tarea salvo instrucción explícita.

---

# 2. Flujo requerido para cada tarea

Antes de modificar código:

1. identificar el checkpoint o alcance actual;
2. revisar los documentos relevantes;
3. resumir el objetivo técnico;
4. identificar archivos que serán creados o modificados;
5. evitar trabajo fuera de alcance.

Después:

6. implementar únicamente el alcance solicitado;
7. ejecutar checks disponibles;
8. asegurar que la aplicación siga funcionando;
9. indicar cómo correr o inspeccionar el resultado;
10. explicar qué debe verificarse visualmente;
11. detenerse.

---

# 3. Visual Verification

Cuando exista un resultado visual, debe tratarse como parte del criterio de terminado.

Ejemplos:

- alignment;
- spacing;
- typography;
- active states;
- responsive behavior;
- streaming appearance;
- empty states;
- resource cards;
- error states.

Compilar correctamente no es suficiente si la funcionalidad es visual.

---

# 4. Keep a Running Application

Después de cada checkpoint importante:

- dev server must still work;
- production build should succeed when practical;
- no new TypeScript errors;
- no new obvious console errors;
- previous behavior should remain usable.

---

# 5. Small Changes

Preferir:

```text
small feature
   ↓
run
   ↓
inspect
   ↓
commit
```

Evitar:

```text
feature
+ architecture rewrite
+ styling rewrite
+ new dependency
+ new abstraction
+ unrelated cleanup
```

en un solo paso.

---

# 6. Refactor Discipline

No combinar refactors grandes con features grandes.

Si una refactorización es necesaria:

1. explicar por qué;
2. hacerla separadamente cuando sea posible;
3. preservar comportamiento;
4. verificar;
5. continuar después.

---

# 7. Scope Protection

Antes de implementar algo, Copilot debe contrastarlo con:

- `docs/product/02-mvp-validation.md`;
- `docs/product/04-future-roadmap.md`.

Si una solicitud cruza claramente hacia una capacidad futura, debe señalarlo.

Si el usuario insiste explícitamente, se puede continuar.

---

# 8. No Surprise Architecture

Copilot no debe introducir silenciosamente:

- state management frameworks;
- backend services;
- databases;
- LLM providers;
- complex dependency injection;
- plugin systems;
- elaborate factories;
- custom build systems;
- monorepo structures.

Si una nueva dependencia o arquitectura es realmente útil, explicar primero:

- qué problema resuelve;
- por qué la solución simple no es suficiente;
- qué costo introduce.

---

# 9. Documentation of Decisions

Las decisiones importantes que afecten la arquitectura deben quedar documentadas.

Para decisiones pequeñas, comentarios o notas breves son suficientes.

Para decisiones que cambien principios de arquitectura o alcance:

- actualizar el documento correspondiente;
- no dejar conocimiento crítico solo en una sesión de chat.

---

# 10. Code Comments

When writing code:

- comments must be in English;
- comments should explain intent;
- comments should explain non-obvious constraints;
- comments should not narrate trivial code.

---

# 11. Visual Checkpoint Report

Al terminar un checkpoint, Copilot debe proporcionar un resumen breve con:

```text
Completed
- ...

Files changed
- ...

How to run
- ...

What to verify visually
- ...

Not implemented yet
- ...
```

No convertir este resumen en un reporte excesivamente largo.

---

# 12. Error Handling During Development

Si aparece un error:

1. no continuar agregando features;
2. aislar el problema;
3. corregirlo;
4. volver a verificar;
5. continuar solo cuando el estado base sea estable.

---

# 13. Dependency Changes

Cuando se agregue una dependencia:

- explicar por qué;
- preferir pocas dependencias;
- evitar paquetes para problemas triviales;
- mantener `package.json` entendible.

---

# 14. Preserve Developer Understanding

El objetivo no es únicamente producir código rápido.

El desarrollador debe poder entender qué se está agregando.

Cuando una abstracción nueva sea importante, explicar su responsabilidad con pocas palabras y un ejemplo.

---

# 15. Stop After the Requested Step

Esta regla es obligatoria:

> After completing the requested checkpoint, stop.

No avanzar automáticamente al siguiente milestone aunque parezca sencillo.
