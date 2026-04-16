import os
from dotenv import load_dotenv

# 1. LOAD THE ENV BEFORE ANYTHING ELSE HAPPENS!
load_dotenv()

from pydantic_ai import Agent
from app.models.rental import AssistantResponse
from app.services.legal_db import get_legal_framework, list_all_case_types


# ---------------------------------------------------------
# 2. DEFINE TOOLS FIRST (No decorators needed!)
# ---------------------------------------------------------

def fetch_legal_framework(case_type: str) -> dict:
    """
    Looks up the relevant BGB sections, typical deadline, and escalation path
    for a given tenant dispute case type (e.g. 'Mängelanzeige', 'Kautionsrückforderung').
    """
    return get_legal_framework(case_type)


def list_supported_cases() -> list[str]:
    """Returns all case types the system has legal templates for."""
    return list_all_case_types()


def calculate_deadline(issue_reported_days_ago: int, case_type: str) -> dict:
    """
    Given how many days ago the issue was reported and the case type,
    returns the recommended deadline to set for the landlord and whether
    the tenant is already past the point of needing escalation.
    """
    framework = get_legal_framework(case_type)
    deadline_days = framework.get("typical_deadline_days", 14)
    days_remaining = deadline_days - issue_reported_days_ago

    if days_remaining > 0:
        status = "within_initial_period"
        recommendation = f"Set a {deadline_days}-day deadline from today."
    else:
        status = "deadline_passed"
        recommendation = f"Initial {deadline_days}-day period has passed. Proceed to escalation: {framework['escalation']}"

    return {
        "deadline_days": deadline_days,
        "days_since_reported": issue_reported_days_ago,
        "days_remaining": days_remaining,
        "status": status,
        "recommendation": recommendation,
    }


# ---------------------------------------------------------
# 3. INITIALIZE THE AGENT (same pattern as the retail sample)
# ---------------------------------------------------------

rental_agent = Agent(
    'vertexai:gemini-2.5-flash',
    output_type=AssistantResponse,
    instrument=True,
    tools=[
        fetch_legal_framework,
        list_supported_cases,
        calculate_deadline,
    ],
    system_prompt=(
        "You are a knowledgeable and calm German tenant rights assistant called Rent Right. "
        "You help tenants in Germany understand their legal rights and draft formal letters to landlords. "
        "Always follow these rules:\n\n"

        "1. CASE IDENTIFICATION: First identify the case type "
        "(Mängelanzeige, Kautionsrückforderung, Eigenbedarfskündigung, Nebenkostenabrechnung, etc.). "
        "Use the fetch_legal_framework tool to get the correct BGB sections.\n\n"

        "2. URGENCY: Set urgency to 'high' for health hazards (mold, no heating in winter) "
        "or imminent deadlines. 'medium' for financial disputes (deposit, Nebenkosten). "
        "'low' for informational questions.\n\n"

        "3. LETTER DRAFTING: Always draft the formal letter in German. "
        "Use Sehr geehrte/r Vermieter/in as the salutation. "
        "Include the relevant BGB paragraph citations. "
        "Use placeholder brackets like [Ihr Name], [Adresse], [Datum] for personal details. "
        "End with Mit freundlichen Grüßen.\n\n"

        "4. LEGAL NOTE: Always add a short legal_note warning the user that "
        "the letter has legal consequences and requires their approval before sending.\n\n"

        "5. TIMELINE: Always generate a timeline of 4–6 steps showing what happens "
        "from today through potential escalation, using relative dates like 'Today', '+7 days', '+14 days'.\n\n"

        "6. COMMUNICATION: Respond in the same language the user writes in "
        "(German or English). Be empathetic but precise."
    )
)
