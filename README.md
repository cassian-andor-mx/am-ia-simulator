# Agent Experience Simulator

## Propósito de este archivo en el laboratorio

Este `README.md` sirve como punto de entrada rápido al repositorio. Su objetivo es explicar, en pocos minutos, qué es el proyecto, qué se está validando actualmente y dónde encontrar la documentación que gobierna las decisiones de producto, arquitectura y desarrollo.

No debe convertirse en una especificación exhaustiva. Las decisiones detalladas viven en los documentos de `/docs`.

---

## ¿Qué es Agent Experience Simulator?

**Agent Experience Simulator** es un laboratorio para validar una idea de producto educativo: crear un motor web capaz de reproducir, de forma controlada y determinista, la experiencia visible de interacción con agentes de IA.

El simulador no ejecuta realmente un modelo de IA durante la experiencia del estudiante. En cambio, interpreta una definición declarativa previamente preparada y reproduce eventos como:

- mensajes;
- estados de procesamiento;
- texto progresivo;
- imágenes;
- tablas;
- enlaces;
- archivos;
- recursos generados;
- finalización de una ejecución.

El objetivo es ofrecer una experiencia pedagógica interactiva, reproducible y de bajo costo para enseñar a personas no técnicas a trabajar con agentes de IA.

---

## Estado actual

El proyecto se encuentra en etapa de laboratorio y validación de MVP.

La primera versión se enfoca exclusivamente en:

- React para web;
- experiencias lineales;
- prompt de solo lectura;
- ejecución simulada;
- eventos visibles del agente;
- recursos generados previamente;
- reproducción determinista.

No se busca construir todavía un chatbot real, un agente real ni una integración con un LLM.

---

## Documentación principal

### Producto

- [`docs/product/01-product-vision.md`](docs/product/01-product-vision.md)  
  Define la visión de largo plazo, el problema que se quiere resolver y los principios del producto.

- [`docs/product/02-mvp-validation.md`](docs/product/02-mvp-validation.md)  
  Define exactamente qué debe demostrar el MVP actual y qué queda fuera de alcance.

- [`docs/product/03-simulator-architecture.md`](docs/product/03-simulator-architecture.md)  
  Define las abstracciones y límites arquitectónicos del simulador.

- [`docs/product/04-future-roadmap.md`](docs/product/04-future-roadmap.md)  
  Conserva las ideas de evolución futura sin convertirlas en requisitos actuales.

### Desarrollo

- [`docs/development/01-engineering-standards.md`](docs/development/01-engineering-standards.md)  
  Define estándares de código, nomenclatura, comentarios y calidad.

- [`docs/development/02-bootstrap-plan.md`](docs/development/02-bootstrap-plan.md)  
  Define el orden incremental para construir el proyecto desde un repositorio nuevo.

- [`docs/development/03-development-workflow.md`](docs/development/03-development-workflow.md)  
  Define cómo Copilot debe trabajar paso a paso, con pequeños entregables verificables.

### GitHub Copilot

- [`.github/copilot-instructions.md`](.github/copilot-instructions.md)  
  Resume las reglas permanentes que Copilot debe respetar en todo el repositorio.

---

## Principio de trabajo

El proyecto debe evolucionar mediante **pequeños checkpoints visuales**.

Cada etapa debe terminar con una aplicación que:

1. compile;
2. pueda ejecutarse;
3. preserve el comportamiento previo;
4. produzca un resultado visible o inspeccionable;
5. pueda validarse antes de avanzar.

La intención es evitar grandes implementaciones opacas y detectar decisiones incorrectas lo antes posible.

---

## Lenguaje

- Código fuente: **inglés**.
- Nombres de variables, tipos, componentes y funciones: **inglés**.
- Comentarios dentro del código: **inglés**.
- Documentación orientada a IA y decisiones de producto: puede estar en **español**.

---

## Checks ejecutados

- `npm install`
- `npm run lint`
- `npm run build`
- `npm run dev`
