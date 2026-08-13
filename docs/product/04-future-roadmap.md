# 04 — Future Roadmap

## Propósito de este documento en el laboratorio

Este documento conserva ideas de evolución futura para que no se pierdan, **sin convertirlas en requisitos del MVP actual**.

Copilot debe tratar este archivo como contexto de dirección futura, no como una lista de funcionalidades pendientes que deba implementar automáticamente.

---

# 1. Principio del roadmap

La evolución deseada es:

```text
Linear scripted experiences
        ↓
Branching experiences
        ↓
Learner interaction
        ↓
Hybrid real + simulated agents
        ↓
Adaptive learning experiences
```

Cada etapa debe validarse antes de justificar la siguiente.

---

# 2. Stage 1 — Linear Scripted Experiences

Estado objetivo inicial.

Características:

- prompt de solo lectura;
- ejecución iniciada por usuario;
- secuencia lineal;
- eventos deterministas;
- recursos preparados;
- resultado siempre reproducible.

Este stage corresponde al MVP actual.

---

# 3. Stage 2 — Richer Agent Experiences

Posibles extensiones:

- más tipos de eventos;
- progress indicators;
- richer status messages;
- simulated tool use;
- cards;
- citations;
- expandable sections;
- richer artifacts;
- multiple visual themes.

Todavía sin decisiones del alumno que alteren el flujo.

---

# 4. Stage 3 — Branching Experiences

La experiencia puede tomar distintos caminos.

Ejemplo:

```text
Agent asks question
        ↓
   ┌────┴────┐
Option A   Option B
   ↓          ↓
Flow A      Flow B
```

Posibles usos:

- decisiones del estudiante;
- selección de estrategias;
- errores frecuentes;
- feedback dirigido.

---

# 5. Stage 4 — Learner Interaction

El alumno puede proporcionar inputs limitados.

Ejemplos:

- escoger una respuesta;
- escribir una sección;
- seleccionar un archivo;
- aprobar o rechazar una acción;
- modificar un prompt dentro de límites controlados.

La simulación seguiría siendo principalmente controlada.

---

# 6. Stage 5 — Hybrid Real + Simulated Agents

Algunos pasos podrían ser simulados y otros reales.

Ejemplo:

```text
Simulated preparation
       ↓
Real LLM evaluation
       ↓
Simulated guided response
```

Esto puede permitir experiencias más personalizadas sin convertir toda la plataforma en un sistema dependiente de LLM.

---

# 7. Stage 6 — Adaptive Learning

Posibles capacidades:

- evaluación de desempeño;
- selección dinámica de ejercicios;
- dificultad adaptativa;
- feedback personalizado;
- recomendaciones de práctica.

Debe considerarse solo después de validar valor pedagógico suficiente.

---

# 8. Stage 7 — Authoring Tools

Herramientas para autores.

Posibles capacidades:

- visual experience editor;
- timeline editor;
- event inspector;
- asset manager;
- preview;
- validation;
- import/export;
- simulation recorder.

No construir un editor antes de demostrar que crear experiencias manualmente es valioso.

---

# 9. Stage 8 — AI-Assisted Experience Generation

Una IA podría ayudar al autor a transformar una ejecución real en un script del simulador.

Ejemplo:

1. el autor ejecuta un prompt real;
2. obtiene output y archivos;
3. proporciona una descripción estructurada;
4. una IA genera un borrador de `ExperienceDefinition`;
5. el autor revisa;
6. el simulador reproduce.

El contenido generado debe seguir siendo revisable y controlable.

---

# 10. Capacidades posibles de largo plazo

Ideas que pueden evaluarse en el futuro:

- multi-agent experiences;
- simulated browsers;
- simulated spreadsheets;
- simulated email;
- simulated document editing;
- simulated tool approvals;
- learner scoring;
- instructor analytics;
- reusable experience libraries;
- sharing;
- templates;
- localization;
- React Native;
- LMS integrations.

---

# 11. Regla para Copilot

No implementar ninguna funcionalidad de este roadmap únicamente porque aparece en este documento.

Antes de hacerlo debe existir una instrucción explícita y debe revisarse que:

1. el stage anterior esté validado;
2. la nueva capacidad resuelva una necesidad real;
3. no complique innecesariamente el MVP;
4. respete la arquitectura base.
