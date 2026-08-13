# 01 — Technical MVP Review

## Propósito de este documento en el laboratorio

Este documento define la revisión técnica posterior a los primeros 10 checkpoints. Su objetivo es confirmar que la base sigue siendo limpia, genérica y suficientemente estable para iniciar validación pedagógica.

No es una invitación a realizar un refactor general.

## 1. Momento de ejecución

Ejecutar después de:

- Checkpoints 0–10;
- Demo 1;
- Demo 2;
- Demo 3 Showcase.

## 2. Pregunta principal

> ¿El simulador sigue siendo genérico, entendible y extensible después de varias experiencias?

## 3. Separación arquitectónica

Confirmar que:

- `ExperienceDefinition` no depende de componentes concretos;
- `ExperienceEngine` no contiene estilos;
- renderers no controlan el flujo del engine;
- experiencias no insertan comportamiento específico en el core;
- resources permanecen separados;
- Demo 1, 2 y 3 usan el mismo mecanismo general.

## 4. Provider independence

Buscar acoplamiento innecesario a:

- ChatGPT;
- OpenAI;
- Claude;
- Gemini;
- Copilot.

El dominio central debe seguir siendo provider-agnostic.

## 5. TypeScript

Verificar:

- no `any` injustificado;
- tipos claros;
- assertions mínimas;
- contratos entendibles;
- cero errores de TypeScript.

## 6. React

Revisar:

- componentes excesivamente grandes;
- state duplicado;
- efectos innecesarios;
- lógica del engine en UI;
- JSX específico de demos;
- rendering inconsistente.

## 7. Engine

Verificar:

- orden determinista;
- estados claros;
- completion confiable;
- timers correctamente limpiados;
- replay/reset correcto si existe;
- ausencia de race conditions obvias.

## 8. Renderers

Por renderer:

- responsabilidad única;
- props claras;
- consistencia visual;
- cero conocimiento de demos específicos.

## 9. Resources

Verificar:

- paths válidos;
- downloads;
- empty states;
- gating antes de completion;
- metadata consistente.

## 10. Visual review

Usar Demo 3 para revisar:

- spacing;
- typography;
- readability;
- scrolling;
- streaming;
- status transitions;
- responsive behavior;
- tabs;
- resources.

## 11. Accessibility

Validar al menos:

- semantic buttons;
- keyboard navigation;
- focus visible;
- contrast;
- alt text;
- interacciones no dependientes únicamente de hover.

## 12. Dependencias

Para cada dependencia:

- ¿sigue siendo necesaria?
- ¿está en uso?
- ¿puede eliminarse?
- ¿introduce complejidad innecesaria?

## 13. Build health

Ejecutar únicamente scripts existentes, por ejemplo:

```text
lint
typecheck
test
build
```

No crear tooling nuevo solo para completar la lista.

## 14. Clasificación

### BLOCKER
Impide avanzar.

### SHOULD FIX
Conviene corregir antes de Phase 2.

### LATER
No representa riesgo inmediato.

## 15. Salida esperada

```text
Technical MVP Review

Blockers:
- ...

Should fix:
- ...

Later:
- ...

Decision:
READY FOR LEARNING VALIDATION
```

## 16. Criterio para avanzar

Phase 2 puede comenzar cuando:

- no existan blockers;
- Demo 1, Demo 2 y Demo 3 funcionen;
- engine siga siendo genérico;
- build sea estable;
- nuevas experiencias no requieran modificar significativamente el core.
