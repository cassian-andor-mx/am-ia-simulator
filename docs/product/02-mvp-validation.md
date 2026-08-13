# 02 — MVP Validation

## Propósito de este documento en el laboratorio

Este documento define **qué queremos demostrar ahora**.

Su función principal es impedir que el laboratorio crezca antes de validar su hipótesis básica.

Cuando exista una nueva idea o funcionalidad, este archivo debe utilizarse para decidir si pertenece al MVP actual o si debe enviarse al roadmap futuro.

---

# 1. Objetivo del MVP

El primer MVP debe demostrar que es técnicamente viable construir una experiencia web convincente donde un usuario pueda:

1. ver un prompt preparado;
2. ejecutar una simulación;
3. observar una secuencia visible de acciones del agente;
4. recibir resultados previamente definidos;
5. acceder a recursos que aparentan haber sido generados durante esa ejecución.

---

# 2. Plataforma

El MVP será exclusivamente:

- web;
- React;
- TypeScript.

React Native queda fuera del alcance actual.

La arquitectura no debe bloquear una evolución futura, pero React Native no debe complicar el MVP.

---

# 3. Experiencia inicial

La interfaz tendrá tres tabs principales.

## Tab 1 — Prompt

Debe mostrar:

- prompt de solo lectura;
- formato claro;
- saltos de párrafo;
- ancho de lectura razonable;
- listas y Markdown cuando aplique;
- botón `Execute Prompt`.

El usuario no podrá editar el prompt durante el MVP.

## Tab 2 — Simulation

Debe reproducir una experiencia visual de agente mediante eventos previamente definidos.

Ejemplos:

- estado de procesamiento;
- mensajes;
- texto progresivo;
- imágenes;
- tablas;
- enlaces;
- recursos;
- finalización.

## Tab 3 — Resources

Debe mostrar los recursos generados por la experiencia.

Este tab debe poblarse cuando la simulación finalice.

Los archivos reales serán preparados previamente y referenciados por la experiencia.

---

# 4. Naturaleza de la simulación

La ejecución será:

- predefinida;
- declarativa;
- determinista;
- reproducida localmente por el motor.

El simulador no ejecutará realmente el prompt contra un LLM.

---

# 5. Flujo del MVP

```text
Load Experience
      ↓
Prompt visible
      ↓
User clicks Execute Prompt
      ↓
Simulation tab
      ↓
Experience Engine starts
      ↓
Events rendered sequentially
      ↓
Simulation completed
      ↓
Resources available
```

---

# 6. Estados conceptuales

El MVP debe poder representar al menos:

```text
idle
running
completed
error
```

---

# 7. Tipos de eventos iniciales

No se debe diseñar desde el primer día un catálogo enorme.

El conjunto mínimo debe surgir de los primeros checkpoints.

Tipos probables:

```text
status
message
wait
image
artifact
complete
```

Otros tipos pueden agregarse después si un caso real los justifica.

---

# 8. Recursos

Los recursos no serán generados realmente.

El autor de la experiencia podrá:

1. ejecutar el prompt en una IA real;
2. obtener los archivos;
3. guardarlos en el proyecto o almacenamiento correspondiente;
4. referenciarlos desde la definición de la experiencia.

Ejemplos:

- PDF;
- XLSX;
- CSV;
- PNG;
- JPG;
- ZIP.

---

# 9. Fuera del alcance actual

No implementar durante el MVP salvo instrucción explícita:

- llamadas reales a LLM;
- OpenAI API;
- Anthropic API;
- Gemini API;
- backend complejo;
- base de datos;
- autenticación;
- React Native;
- múltiples agentes;
- branching;
- input libre del alumno;
- tool execution real;
- navegación web real;
- editor visual;
- analytics avanzados;
- generación automática de experiencias;
- adaptación dinámica basada en IA;
- marketplace;
- colaboración multiusuario.

---

# 10. Criterios de éxito técnico

El laboratorio será técnicamente exitoso cuando:

1. exista al menos una experiencia completa;
2. el prompt se cargue desde configuración;
3. el usuario pueda ejecutar la simulación;
4. los eventos se reproduzcan secuencialmente;
5. exista al menos un efecto de streaming;
6. puedan mostrarse varios tipos de contenido;
7. existan recursos descargables;
8. una segunda experiencia pueda añadirse sin modificar significativamente el motor.

El punto 8 es crítico.

---

# 11. Criterio de éxito pedagógico posterior

Después de demostrar la viabilidad técnica, el siguiente experimento será validar si una persona no técnica aprende mejor usando la simulación que únicamente observando una demostración.

La pregunta principal será:

> ¿La experiencia interactiva ayuda al alumno a comprender mejor cómo trabajar con un agente de IA?

Esta validación no debe confundirse con el desarrollo técnico inicial.

---

# 12. Regla de alcance

Cuando una nueva funcionalidad parezca útil, preguntar:

> ¿Es necesaria para demostrar el MVP descrito en este documento?

Si la respuesta es no:

- no implementarla todavía;
- registrarla en `04-future-roadmap.md` si vale la pena conservarla.
