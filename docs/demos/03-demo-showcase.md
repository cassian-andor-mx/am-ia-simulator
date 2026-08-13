# Demo 3 — Simulator Capability Showcase

## Propósito de este documento en el laboratorio

Este documento define una tercera experiencia cuyo objetivo es **mostrar en una sola ejecución todas las capacidades actualmente soportadas por el simulador**.

Demo 3 sirve como:

- showcase técnico;
- prueba visual integrada;
- smoke test manual;
- referencia para futuras experiencias;
- evidencia del potencial actual del engine.

> Demo 3 uses the simulator as it exists. It does not redefine the simulator.

## 1. Objetivo

Crear una experiencia llamada:

**AI Weekly Performance Review**

Debe demostrar todos los tipos de eventos, modos de render y comportamientos que realmente existan al terminar los primeros 10 checkpoints.

## 2. Regla de compatibilidad

Antes de implementar Demo 3, Copilot debe inspeccionar el código y producir una matriz:

```text
Capability | Status
-----------|--------
status     | SUPPORTED / NOT YET SUPPORTED
message    | SUPPORTED / NOT YET SUPPORTED
streaming  | SUPPORTED / NOT YET SUPPORTED
wait       | SUPPORTED / NOT YET SUPPORTED
image      | SUPPORTED / NOT YET SUPPORTED
table      | SUPPORTED / NOT YET SUPPORTED
link       | SUPPORTED / NOT YET SUPPORTED
artifact   | SUPPORTED / NOT YET SUPPORTED
complete   | SUPPORTED / NOT YET SUPPORTED
replay     | SUPPORTED / NOT YET SUPPORTED
temporary  | SUPPORTED / NOT YET SUPPORTED
replace    | SUPPORTED / NOT YET SUPPORTED
remove     | SUPPORTED / NOT YET SUPPORTED
```

No implementar capacidades `NOT YET SUPPORTED` únicamente para que Demo 3 las use.

## 3. Prompt sugerido

```text
You are a business performance analyst.

Review the provided weekly performance data and prepare a concise management update.

Your response should:
1. Identify the three most important findings.
2. Highlight one potential risk.
3. Compare current performance with the previous period.
4. Present the key metrics clearly.
5. Reference the performance chart.
6. Prepare a downloadable executive summary and supporting data file.

Keep the final management summary concise and actionable.
```

## 4. Datos ficticios

```text
Revenue
Current week: $128,400
Previous week: $119,700

Orders
Current week: 1,842
Previous week: 1,765

Conversion Rate
Current week: 4.8%
Previous week: 4.5%

Refund Rate
Current week: 2.1%
Previous week: 1.6%

Customer Satisfaction
Current week: 92%
Previous week: 93%
```

## 5. Secuencia visual sugerida

```text
Execute Prompt
      ↓
Temporary processing status
      ↓
Data analysis status
      ↓
Streaming message
      ↓
Structured findings
      ↓
Rich content supported by engine
      ↓
Generated resource indication
      ↓
Completion
      ↓
Resources tab populated
```

## 6. Resultado narrativo esperado

```text
Weekly performance improved overall, led by revenue growth and a higher conversion rate.

Key findings:
- Revenue increased approximately 7.3% week over week.
- Orders increased while conversion improved from 4.5% to 4.8%.
- Refund rate increased from 1.6% to 2.1% and should be investigated.

Management attention:
The increase in refunds is the primary risk despite otherwise positive performance.
```

El resultado debe permanecer determinista.

## 7. Assets sugeridos

```text
simulations/
  demo-3/
    experience.json
    assets/
      weekly-performance-chart.png
      executive-summary.pdf
      supporting-data.xlsx
```

Respetar la estructura real del repositorio si ya es diferente.

## 8. Prueba de regresión manual

Después de cambios importantes al engine:

```text
Prompt               ✓
Execution start      ✓
Event ordering       ✓
Streaming            ✓
Rich content         ✓
Completion           ✓
Resources            ✓
Download/open        ✓
```

## 9. Criterio de terminado

Demo 3 está terminado cuando:

- usa todos los comportamientos actualmente soportados que tengan sentido juntos;
- no introduce hacks específicos en el engine;
- no requiere lógica React exclusiva para `demo-3`;
- todos los assets funcionan;
- build y TypeScript pasan;
- puede reproducirse de principio a fin;
- funciona como referencia visual del potencial actual.

## 10. Regla para Copilot

> Inspect the current implementation first. Produce a capability matrix based on the actual code, then build Demo 3 only with supported capabilities.

Do not add roadmap features just to make the showcase complete.
