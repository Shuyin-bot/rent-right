"""
Static knowledge base of German tenant law (BGB).
This is the rent-right equivalent of the retail sample's store database.
"""

LEGAL_FRAMEWORKS = {
    "mängelanzeige": {
        "description": "Formal defect notification sent to the landlord.",
        "bgb_sections": [
            "§ 535 BGB — Landlord's duty to maintain the property",
            "§ 536 BGB — Rent reduction (Mietminderung) for defects",
            "§ 536a BGB — Landlord's liability for damages",
            "§ 536c BGB — Tenant's duty to notify landlord of defects",
        ],
        "typical_deadline_days": 14,
        "escalation": "If no repair within deadline: rent reduction (Mietminderung) of 10–50% depending on severity.",
    },
    "kautionsrückforderung": {
        "description": "Formal claim for return of rental deposit after move-out.",
        "bgb_sections": [
            "§ 551 BGB — Rules on security deposit (max 3 months cold rent)",
            "§ 286 BGB — Default (Verzug) when payment deadline is missed",
            "§ 288 BGB — Default interest (currently 5% above base rate)",
        ],
        "typical_deadline_days": 14,
        "escalation": "If no payment: Mahnverfahren (court payment order) via local Amtsgericht.",
    },
    "eigenbedarfskündigung": {
        "description": "Landlord termination notice claiming personal use (Eigenbedarf).",
        "bgb_sections": [
            "§ 573 BGB — Landlord's legitimate interest required for termination",
            "§ 574 BGB — Tenant's right to object (Widerspruchsrecht)",
            "§ 574a BGB — Court may extend tenancy despite valid notice",
            "§ 577a BGB — Restriction on Eigenbedarf after condo conversion",
        ],
        "typical_deadline_days": 30,
        "escalation": "If notice is disputed: file Widerspruch within 2 months of notice. Seek Mieterschutzverein support.",
    },
    "nebenkostenabrechnung": {
        "description": "Dispute over annual utility cost statement (Betriebskostenabrechnung).",
        "bgb_sections": [
            "§ 556 BGB — Billing of ancillary costs (Nebenkosten)",
            "§ 556a BGB — Allocation method",
            "§ 556b BGB — Due date — 12-month settlement period",
            "§ 259 BGB — Right to demand itemized accounting",
        ],
        "typical_deadline_days": 30,
        "escalation": "If billing period has passed or statement is incorrect, landlord loses right to additional payment.",
    },
}


def get_legal_framework(case_type: str) -> dict:
    """
    Returns the legal framework (BGB sections, deadlines, escalation path)
    for a given case type keyword.
    """
    key = case_type.lower().replace(" ", "").replace("-", "")
    for framework_key, data in LEGAL_FRAMEWORKS.items():
        if framework_key in key or key in framework_key:
            return {"case_type": framework_key, **data}
    return {
        "case_type": "unknown",
        "description": "No specific framework found. Recommend consulting a Mieterschutzverein.",
        "bgb_sections": [],
        "typical_deadline_days": 14,
        "escalation": "Seek advice from local Mieterschutzverein or legal counsel.",
    }


def list_all_case_types() -> list[str]:
    """Returns all supported case type keywords."""
    return list(LEGAL_FRAMEWORKS.keys())
