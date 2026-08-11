# am-ia-simulator

Un simulador de IA / An AI Simulator

## Descripción / Description

Un chatbot de consola basado en reglas que simula respuestas de una inteligencia artificial.  
A rule-based console chatbot that simulates artificial intelligence responses.

Soporta entradas en **español** e **inglés** / Supports inputs in **Spanish** and **English**.

## Requisitos / Requirements

- Python 3.8+

## Uso / Usage

```bash
python simulator.py
```

Escribe tu mensaje y presiona **Enter**. Escribe `salir` o `exit` para terminar.  
Type your message and press **Enter**. Type `salir` or `exit` to quit.

## Ejemplo / Example

```
==================================================
  Bienvenido al Simulador de IA  /  AI Simulator
  Escribe 'salir' o 'exit' para terminar.
==================================================

Tú: hola
IA: ¡Hola! ¿En qué puedo ayudarte hoy?

Tú: cuéntame un chiste
IA: ¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs. 🐛

Tú: salir
IA: ¡Hasta luego! / Goodbye!
```

## Pruebas / Tests

```bash
pip install pytest
python -m pytest test_simulator.py -v
```