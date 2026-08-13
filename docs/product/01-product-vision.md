# 01 — Product Vision

## Propósito de este documento en el laboratorio

Este documento define **qué es Agent Experience Simulator, por qué existe y qué principios deben permanecer estables aunque cambien las tecnologías de IA**.

Debe utilizarse como referencia cuando haya dudas sobre la dirección del producto, el público objetivo o si una decisión técnica está alejando al laboratorio de su propósito original.

Este documento describe la visión de largo plazo. **No define todo lo que debe implementarse en el MVP actual.**

---

# 1. Nombre del producto

**Agent Experience Simulator**

---

# 2. Definición

Agent Experience Simulator es un motor pedagógico diseñado para reproducir experiencias visibles de interacción con agentes de IA de forma:

- controlada;
- determinista;
- interactiva;
- reutilizable;
- independiente de un proveedor específico.

El objetivo no es copiar exactamente una herramienta como ChatGPT, Claude, Gemini o Copilot.

El objetivo es reproducir **patrones de experiencia comunes a los agentes de IA** para que una persona pueda aprender observando y ejecutando escenarios previamente diseñados.

---

# 3. Problema que queremos resolver

Las herramientas de IA cambian rápidamente.

Los cursos basados exclusivamente en videos pueden quedar desactualizados cuando:

- cambia una interfaz;
- cambia la forma en que un agente muestra su progreso;
- aparecen nuevas herramientas;
- se modifican capacidades;
- cambia la forma de entregar archivos o resultados.

Además, ejecutar repetidamente un mismo prompt real para fines pedagógicos puede generar:

- costos innecesarios;
- resultados variables;
- dependencia de servicios externos;
- consumo de recursos que no aporta valor adicional cuando el resultado pedagógico ya es conocido.

Agent Experience Simulator busca crear una capa educativa estable entre el alumno y la evolución constante de las herramientas de IA.

---

# 4. Hipótesis de producto

La hipótesis central es:

> Una experiencia simulada cuidadosamente diseñada puede enseñar de forma efectiva cómo trabajar con agentes de IA cuando el objetivo pedagógico no requiere una ejecución real del modelo.

La simulación no pretende reemplazar completamente a la IA real.

Se considera parte de una progresión educativa:

1. **Observar** cómo funciona una experiencia.
2. **Simular** y practicar en un entorno controlado.
3. **Ejecutar realmente** en una herramienta de IA cuando sea necesario.

---

# 5. Público objetivo

La visión principal está orientada a personas no técnicas que quieran mejorar sus habilidades prácticas con IA.

Ejemplos:

- analistas;
- gerentes;
- profesionales administrativos;
- dueños de pequeños negocios;
- estudiantes;
- equipos de operaciones;
- profesionales que no desarrollan software.

La interfaz y la experiencia deben priorizar claridad sobre complejidad técnica.

---

# 6. Qué es una Agent Experience

Una **Agent Experience** es una secuencia visible de eventos que representa cómo un agente responde y actúa frente a una tarea.

Ejemplo conceptual:

```text
User objective
      ↓
Agent starts
      ↓
Visible status
      ↓
Agent message
      ↓
Tool-like action
      ↓
Generated artifact
      ↓
Result
```

Una Agent Experience puede evolucionar con el tiempo para incluir:

- mensajes;
- estados;
- herramientas;
- decisiones;
- aprobaciones;
- preguntas;
- archivos;
- imágenes;
- tablas;
- navegación;
- acciones de interfaz;
- múltiples resultados.

---

# 7. Qué NO queremos modelar como concepto central

El producto no debe diseñarse alrededor de conceptos específicos como:

- ChatGPT;
- OpenAI;
- Claude;
- Gemini;
- Copilot;
- una interfaz concreta;
- un único tipo de chat.

La arquitectura debe ser suficientemente genérica para que los cambios de proveedores no obliguen a reconstruir el motor.

---

# 8. Principios de producto

## 8.1 Pedagogía primero

Las decisiones deben mejorar el aprendizaje.

La fidelidad visual solo es útil cuando ayuda al estudiante a comprender mejor la experiencia.

## 8.2 Experiencias visibles, no razonamiento interno

El simulador reproduce lo que un usuario razonablemente puede observar.

No intenta mostrar o reconstruir razonamiento privado interno de los modelos.

## 8.3 Determinismo cuando es pedagógicamente útil

Una experiencia preparada debe poder reproducirse de manera consistente.

## 8.4 Configuración sobre código específico

Crear nuevas experiencias debería depender principalmente de definiciones, eventos y recursos.

No debería requerir reescribir componentes React para cada laboratorio.

## 8.5 Independencia de proveedor

El motor debe conocer eventos de experiencia, no marcas.

## 8.6 Uso responsable de IA

Cuando un objetivo de aprendizaje pueda lograrse con una simulación previamente preparada, no es necesario ejecutar repetidamente un modelo real.

## 8.7 Simplicidad antes de infraestructura

El proyecto comienza como laboratorio.

No se debe construir infraestructura compleja antes de validar que la experiencia realmente aporta valor pedagógico.

---

# 9. Visión de largo plazo

A largo plazo, Agent Experience Simulator podría convertirse en un sandbox educativo capaz de reproducir distintos niveles de interacción:

```text
Linear Experience
      ↓
Branching Experience
      ↓
Learner Interaction
      ↓
Hybrid Real + Simulated Agents
      ↓
Adaptive Learning Experiences
```

Esta visión existe para orientar la arquitectura.

No convierte esas capacidades en requisitos del MVP.

---

# 10. Criterio de coherencia

Ante una decisión futura, preguntar:

> ¿Esta decisión ayuda a construir un motor pedagógico genérico de experiencias de agentes o nos está encerrando innecesariamente en una interfaz, proveedor o caso particular?

Si la segunda opción es verdadera, la decisión debe revisarse.
