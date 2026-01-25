"""
HealthCareAI Chatbot - Prompts and Chat Logic
A lightweight FAQ chatbot with pre-written responses to guide LLM behavior.
"""

import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

# Initialize Groq client
groq_client = None
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if GROQ_API_KEY and GROQ_API_KEY != "your_groq_api_key_here":
    groq_client = Groq(api_key=GROQ_API_KEY)


# Pre-written responses to guide LLM behavior and provide context
EXAMPLE_RESPONSES = {
    "greeting": (
        "Hello! Welcome to HealthCareAI. I'm here to help answer your questions "
        "about our volunteer and patient support services. What would you like to know?"
    ),
    "volunteer_info": (
        "To become a volunteer, please visit our 'For Volunteers' page and fill "
        "out the registration form. You'll need to complete a brief background check, "
        "and our team will reach out within 2-3 business days."
    ),
    "patient_info": (
        "If you need healthcare support, please visit our 'For Patients' page. "
        "You can describe your needs and a compassionate volunteer will be matched "
        "with you shortly."
    ),
    "services": (
        "We offer various support services including:\n"
        "• Transportation to medical appointments\n"
        "• Medication pickup assistance\n"
        "• Companionship during hospital visits\n"
        "• General healthcare navigation help"
    ),
    "contact": (
        "You can reach our team through the contact form on our website. "
        "We typically respond within 24 hours. Our volunteer coordinators "
        "are available Monday-Friday, 9 AM to 5 PM."
    ),
}


SYSTEM_PROMPT = f"""You are a friendly and compassionate AI assistant for HealthCareAI, 
a non-profit organization that connects patients who need healthcare support with 
compassionate volunteers in their community.

## Your Role
- Help users understand our services
- Guide volunteers through the registration process
- Assist patients in finding support
- Answer common questions clearly and empathetically

## Our Services
- Transportation to medical appointments
- Medication pickup assistance
- Companionship during hospital visits
- General healthcare navigation help

## Key Information
- Volunteers: Must complete a brief background check. Registration takes 2-3 business days.
- Patients: Can request support through the 'For Patients' page. A volunteer will be matched shortly.
- Hours: Volunteer coordinators are available Monday-Friday, 9 AM to 5 PM, but requests can be submitted anytime.

## Critical Rule: Page Names
When referring to pages on our website, YOU MUST use these exact names:
- "For Volunteers" (NOT "Join as Volunteer", "Volunteer page", etc.)
- "For Patients" (NOT "Patient Support", "Patients page", etc.)
- "About Us"

## Response Style Guidelines
Follow these example responses as templates for your tone and format:

**Greeting example:** "{EXAMPLE_RESPONSES['greeting']}"

**Volunteer inquiry example:** "{EXAMPLE_RESPONSES['volunteer_info']}"

**Patient inquiry example:** "{EXAMPLE_RESPONSES['patient_info']}"

**Services inquiry example:** "{EXAMPLE_RESPONSES['services']}"

**Contact inquiry example:** "{EXAMPLE_RESPONSES['contact']}"

## Rules
1. Be warm, empathetic, and professional
2. Keep responses concise (2-4 sentences max unless listing items)
3. If unsure about specifics, suggest contacting support
4. Never provide medical advice - recommend healthcare professionals
5. Never ask for sensitive personal information
6. Direct users to the appropriate page when relevant ('For Volunteers' page, 'For Patients' page)

Remember: You represent a healthcare support organization. Be compassionate and helpful."""


FALLBACK_RESPONSE = """I apologize, but I'm having trouble processing your request right now. 
Please try again in a moment, or you can:
• Visit our 'For Patients' page for healthcare assistance
• Visit our 'For Volunteers' page to join our team

We're here to help!"""


# Keyword-based fallback responses (when API unavailable)
FAQ_KEYWORDS = {
    "volunteer": EXAMPLE_RESPONSES["volunteer_info"],
    "patient": EXAMPLE_RESPONSES["patient_info"],
    "help": EXAMPLE_RESPONSES["services"],
    "service": EXAMPLE_RESPONSES["services"],
    "contact": EXAMPLE_RESPONSES["contact"],
}

GREETING_KEYWORDS = ["hello", "hi", "hey", "greetings"]


def get_keyword_response(message: str) -> str:
    """Generate a response based on simple keyword matching (fallback)."""
    message_lower = message.lower().strip()

    for greeting in GREETING_KEYWORDS:
        if greeting in message_lower:
            return EXAMPLE_RESPONSES["greeting"]

    for keyword, response in FAQ_KEYWORDS.items():
        if keyword in message_lower:
            return response

    return (
        "I'm here to help with questions about volunteering, patient support, and our services. "
        "Could you please rephrase your question, or try asking about:\n"
        "• How to volunteer\n"
        "• Patient support\n"
        "• Our services\n"
        "• Contact information"
    )


def get_ai_response(message: str) -> str:
    """Generate an AI-powered response using Groq with a small context window."""
    if not groq_client:
        return get_keyword_response(message)

    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message},
            ],
            model="llama-3.1-8b-instant",  # Smaller, faster model for toy project
            temperature=0.5,  # Lower temp for more consistent responses
            max_tokens=150,   # Small context window for concise responses
        )
        return chat_completion.choices[0].message.content or FALLBACK_RESPONSE
    except Exception as e:
        print(f"Groq API error: {e}")
        return get_keyword_response(message)


def get_chat_response(message: str) -> str:
    """Main entry point for chat responses."""
    return get_ai_response(message)
