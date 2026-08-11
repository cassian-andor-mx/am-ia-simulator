"""
AI Simulator — a simple rule-based chatbot that simulates AI responses.
"""

import random
import re
import sys

RESPONSES = {
    "hola": ["¡Hola! ¿En qué puedo ayudarte hoy?", "¡Hola! ¿Cómo estás?", "¡Saludos! ¿Qué deseas saber?"],
    "hello": ["Hello! How can I help you?", "Hi there!", "Hey! What can I do for you?"],
    "como estas": ["¡Estoy funcionando al 100%!", "Listo para ayudarte.", "Sin problemas, gracias por preguntar."],
    "que eres": [
        "Soy un simulador de IA creado para demostrar cómo podría funcionar un asistente inteligente.",
        "Soy una IA simulada. ¡Pregúntame lo que quieras!",
    ],
    "what are you": [
        "I'm an AI simulator built to demonstrate how an intelligent assistant could work.",
        "A simulated AI assistant — ask me anything!",
    ],
    "adios": ["¡Hasta luego!", "¡Adiós! Fue un placer chatear contigo."],
    "bye": ["Goodbye!", "See you later!"],
    "ayuda": [
        "Puedes preguntarme sobre cualquier tema. Intenta con: '¿qué eres?', 'cuéntame un chiste', o 'dato curioso'."
    ],
    "help": ["You can ask me anything. Try: 'what are you?', 'tell me a joke', or 'fun fact'."],
    "chiste": [
        "¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs. 🐛",
        "¿Qué le dijo el 0 al 8? — ¡Bonito cinturón!",
        "Un bit le dice a otro: '¿Te noto raro hoy?' — 'Es que estoy pasando por un momento de baja tensión.'",
    ],
    "joke": [
        "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
        "Why did the computer go to the doctor? Because it had a virus!",
    ],
    "dato curioso": [
        "El primer 'bug' informático fue un insecto real atrapado en un relé de la computadora Mark II en 1947.",
        "El 90% del mundo es diestro. ¡El ratón fue inventado por un zurdo!",
        "La palabra 'robot' viene del checo 'robota', que significa trabajo forzado.",
    ],
    "fun fact": [
        "The first computer bug was an actual insect found in the Mark II computer in 1947.",
        "The word 'robot' comes from the Czech word 'robota', meaning forced labor.",
    ],
}

DEFAULT_RESPONSES = [
    "Interesante pregunta. Déjame procesar eso... 🤔",
    "No estoy seguro de cómo responder a eso, pero lo intentaré la próxima vez.",
    "Fascinante. Aún estoy aprendiendo sobre ese tema.",
    "Hmm, eso está fuera de mi base de conocimientos actual. ¿Puedes reformularlo?",
    "That's an interesting one! I'm still learning about that topic.",
]


def get_response(user_input: str) -> str:
    """Return a simulated AI response for the given user input."""
    normalized = user_input.lower().strip()

    for keyword, replies in RESPONSES.items():
        if re.search(r'\b' + re.escape(keyword) + r'\b', normalized):
            return random.choice(replies)

    return random.choice(DEFAULT_RESPONSES)


def run_chat() -> None:
    """Start an interactive chat session."""
    print("=" * 50)
    print("  Bienvenido al Simulador de IA  /  AI Simulator")
    print("  Escribe 'salir' o 'exit' para terminar.")
    print("=" * 50)

    while True:
        try:
            user_input = input("\nTú: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n¡Hasta luego! / Goodbye!")
            break

        if not user_input:
            continue

        if user_input.lower() in {"salir", "exit", "quit"}:
            print("IA: ¡Hasta luego! / Goodbye!")
            break

        response = get_response(user_input)
        print(f"IA: {response}")


if __name__ == "__main__":
    run_chat()
