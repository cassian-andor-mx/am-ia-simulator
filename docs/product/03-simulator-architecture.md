# 03 — Simulator Architecture

## Propósito de este documento en el laboratorio

Este documento define las **abstracciones arquitectónicas que deben protegerse durante el desarrollo**.

No pretende diseñar todos los detalles técnicos desde el principio.

Su función es evitar que el código evolucione hacia una colección de componentes específicos de cada ejercicio o hacia un clon acoplado a una herramienta concreta de IA.

---

# 1. Regla arquitectónica principal

> The engine does not know ChatGPT, Claude, Gemini, Copilot, or any other provider.

El motor conoce **experiencias y eventos**.

---

# 2. Modelo conceptual

```text
Experience Definition
        ↓
Experience Engine
        ↓
Experience Events
        ↓
Event Renderers
        ↓
Agent UI
        ↓
Resources / Artifacts
```

---

# 3. Responsabilidades

## 3.1 Experience Definition

Describe una experiencia concreta.

Debe contener, según evolucione el MVP:

- identificador;
- metadata;
- prompt;
- eventos;
- recursos.

Ejemplo conceptual:

```ts
interface ExperienceDefinition {
  id: string;
  prompt: PromptDefinition;
  events: ExperienceEvent[];
  resources: ExperienceResource[];
}
```

El contrato definitivo debe evolucionar a partir de implementaciones reales.

No sobre diseñarlo antes de tiempo.

---

## 3.2 Experience Engine

Responsable de:

- leer la definición;
- controlar el estado de ejecución;
- procesar eventos en orden;
- respetar delays;
- notificar cambios;
- finalizar la experiencia;
- mantener comportamiento determinista.

No debe contener estilos de presentación.

---

## 3.3 Experience Events

Un evento describe **qué ocurre en la experiencia**.

No debe describir detalles internos del DOM ni del framework.

Ejemplo:

```json
{
  "type": "message",
  "content": "Analyzing the weekly results...",
  "render": "stream"
}
```

Preferir conceptos declarativos sobre instrucciones específicas de React.

---

## 3.4 Event Renderers

Cada tipo de evento debe poder mapearse a un renderer especializado.

Ejemplo conceptual:

```text
status   → StatusRenderer
message  → MessageRenderer
image    → ImageRenderer
artifact → ArtifactRenderer
```

Agregar un nuevo tipo de evento no debería obligar a reescribir el motor.

---

## 3.5 Agent UI

La interfaz representa visualmente la experiencia.

Debe estar separada del motor.

El mismo motor podría utilizar diferentes temas o skins en el futuro.

---

## 3.6 Resources

Los recursos son archivos o assets utilizados o producidos visualmente por una experiencia.

Ejemplos:

- images;
- PDFs;
- spreadsheets;
- CSV files;
- downloadable artifacts.

---

# 4. Separación propuesta

Estructura conceptual inicial:

```text
src/
  simulator/
    engine/
    components/
    renderers/
    types/

simulations/
  demo-1/
    experience.json
    assets/
```

La estructura puede evolucionar.

La separación conceptual no debe perderse.

---

# 5. Reutilización

El objetivo ideal de consumo es algo similar a:

```tsx
<AgentExperienceSimulator experience={experienceDefinition} />
```

La aplicación educativa futura no debe necesitar conocer los detalles internos del motor.

---

# 6. Determinismo

La misma definición debe producir:

- mismo contenido;
- mismo orden;
- mismos recursos;
- mismo resultado.

El timing puede ser configurable, pero no debe cambiar el significado pedagógico.

---

# 7. Streaming

El motor debe permitir representar al menos:

```text
instant
stream
```

La implementación exacta puede evolucionar.

La experiencia debe controlar la intención.

El renderer controla cómo se representa visualmente.

---

# 8. Estados temporales

Debe ser posible representar elementos que:

- permanecen;
- desaparecen;
- reemplazan otros;
- duran cierto tiempo.

No es necesario implementar todos estos comportamientos en el primer checkpoint.

La arquitectura simplemente no debe impedirlos.

---

# 9. Tema visual

El MVP puede tener un único tema.

La arquitectura no debe llamar al tema `ChatGPTTheme` como concepto principal.

Preferir nombres como:

```text
DefaultAgentTheme
DarkAgentTheme
```

Una apariencia inspirada en interfaces modernas de agentes es válida.

Un clon rígido de una marca específica no es el objetivo.

---

# 10. Principios arquitectónicos

## Keep the engine small

El motor debe hacer pocas cosas y hacerlas bien.

## Prefer composition

Preferir composición de renderers y componentes simples sobre jerarquías complejas.

## Avoid premature frameworks

No crear plugins, registries, factories o dependency injection compleja sin necesidad real.

## Keep domain logic out of UI components

La lógica de experiencia debe permanecer fuera de componentes puramente visuales.

## Avoid provider-specific concepts

No introducir tipos como:

```text
ChatGPTMessage
OpenAIResponse
ClaudeStep
```

si pueden expresarse como eventos genéricos.

## Configuration over simulation-specific code

Una nueva experiencia debe agregarse principalmente mediante datos y assets.

---

# 11. Contrato JSON

El schema definitivo NO debe cerrarse completamente antes de implementar una experiencia real.

Proceso preferido:

```text
Working experience
      ↓
Identify repeated concepts
      ↓
Extract types
      ↓
Formalize schema
```

No:

```text
Large theoretical schema
      ↓
Build everything around it
      ↓
Discover it does not fit reality
```

---

# 12. Señales de alerta arquitectónicas

Revisar una implementación si ocurre cualquiera de estos casos:

- un componente React contiene texto específico de un laboratorio;
- agregar una simulación obliga a modificar muchos archivos del motor;
- el engine conoce CSS o detalles visuales;
- el renderer modifica lógica de ejecución;
- aparecen nombres dependientes de un proveedor;
- se agregan abstracciones que todavía no tienen dos usos reales;
- el JSON se vuelve más complejo que el problema que intenta describir.
