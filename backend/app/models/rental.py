from pydantic import BaseModel, Field


class AssistantResponse(BaseModel):
    message: str = Field(description="Conversational reply to the user.")
    case_type: str | None = Field(description="Identified case type, e.g. 'Mängelanzeige'.")
    urgency: str | None = Field(description="Urgency level: low, medium, or high.")
    legal_basis: list[str] | None = Field(description="Relevant BGB sections, e.g. ['§ 535 BGB — landlord duty'].")
    letter_subject: str | None = Field(description="Subject line of the formal German letter.")
    letter_body: str | None = Field(description="Full body of the formal German letter.")
    legal_note: str | None = Field(description="Short warning about legal consequences of sending.")
    timeline: list[str] | None = Field(description="Ordered steps, each as a plain string like '+14 days: Deadline expires'.")
