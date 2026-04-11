export type CaseStep = "input" | "analysis" | "draft" | "send" | "track";

export interface CaseAnalysis {
  caseType: string;
  stage: string;
  legalBasis: string[];
  urgency: "low" | "medium" | "high";
  nextAction: string;
  explanation: string;
}

export interface CaseEmail {
  subject: string;
  body: string;
  legalNote: string;
}

export interface CaseTimeline {
  date: string;
  event: string;
  status: "done" | "pending" | "upcoming";
}

export interface CaseData {
  id: number;
  title: string;
  titleDe: string;
  icon: string;
  color: "destructive" | "warning" | "info";
  userInput: string;
  analysis: CaseAnalysis;
  emailDraft: CaseEmail;
  timeline: CaseTimeline[];
}

export const cases: CaseData[] = [
  {
    id: 1,
    title: "Heating Defect",
    titleDe: "Heizungsausfall",
    icon: "🔥",
    color: "destructive",
    userInput:
      "My heating has not been working for two weeks. I told my landlord once, but he has not replied.",
    analysis: {
      caseType: "Mängelanzeige (Defect Notification)",
      stage: "Stage 1 → Fristsetzung (Deadline Setting)",
      legalBasis: [
        "§ 535 BGB — Landlord's duty to maintain",
        "§ 536 BGB — Rent reduction for defects",
        "§ 543 Abs. 2 BGB — Extraordinary termination",
      ],
      urgency: "high",
      nextAction: "Send formal Mängelanzeige with 14-day Frist",
      explanation:
        "The tenant already notified the landlord informally. Since there was no response, a formal written notice with a deadline (Fristsetzung) is the legally recommended next step. After 14 days without repair, the tenant may claim Mietminderung (rent reduction) of approx. 20–50% depending on season and severity.",
    },
    emailDraft: {
      subject: "Mängelanzeige — Heizungsausfall seit 2 Wochen",
      body: `Sehr geehrte/r Vermieter/in,

hiermit zeige ich Ihnen folgenden Mangel der Mietsache an:

Seit dem [Datum] funktioniert die Heizung in meiner Wohnung [Adresse, Wohnungsnr.] nicht. Ich habe Sie bereits am [Datum der ersten Mitteilung] darüber informiert, jedoch bisher keine Rückmeldung erhalten.

Ich fordere Sie auf, den Mangel innerhalb von 14 Tagen ab Zugang dieses Schreibens zu beseitigen (Fristsetzung gem. § 281 BGB).

Sollte die Reparatur nicht fristgerecht erfolgen, behalte ich mir ausdrücklich vor:
• die Miete gem. § 536 BGB zu mindern,
• Schadensersatz gem. § 536a BGB geltend zu machen,
• ggf. eine Ersatzvornahme gem. § 536a Abs. 2 BGB durchführen zu lassen.

Die Mietzahlung erfolgt ab sofort unter Vorbehalt der Rückforderung.

Mit freundlichen Grüßen
[Ihr Name]`,
      legalNote:
        "⚠️ This email sets a formal deadline (Fristsetzung). After expiry, you gain legal rights to reduce rent. Approval required before sending.",
    },
    timeline: [
      { date: "Day 0", event: "Defect reported to landlord (informal)", status: "done" },
      { date: "Day 14", event: "No reply received", status: "done" },
      { date: "Today", event: "Formal Mängelanzeige with Fristsetzung sent", status: "pending" },
      { date: "+14 days", event: "Deadline expires — check for reply", status: "upcoming" },
      { date: "+15 days", event: "If no reply: Mietminderung notice", status: "upcoming" },
      { date: "+30 days", event: "Escalation: Lawyer summary / Ersatzvornahme", status: "upcoming" },
    ],
  },
  {
    id: 2,
    title: "Deposit Return",
    titleDe: "Kautionsrückforderung",
    icon: "💰",
    color: "warning",
    userInput:
      "I moved out six weeks ago. My landlord still has not returned my deposit, and I already asked once by email.",
    analysis: {
      caseType: "Kautionsrückforderung (Deposit Return Claim)",
      stage: "Stage 2 → Mahnung (Formal Reminder)",
      legalBasis: [
        "§ 551 BGB — Deposit rules",
        "§ 286 BGB — Default (Verzug)",
        "§ 288 BGB — Default interest",
      ],
      urgency: "medium",
      nextAction: "Send formal Mahnung with payment deadline",
      explanation:
        "The landlord has a reasonable settlement period (typically 3–6 months) to account for the deposit, but must communicate transparently. After 6 weeks with no response to an initial request, a formal Mahnung is appropriate. This puts the landlord in Verzug (default) and enables interest claims (§ 288 BGB).",
    },
    emailDraft: {
      subject: "Mahnung — Rückzahlung der Mietkaution",
      body: `Sehr geehrte/r Vermieter/in,

ich beziehe mich auf mein Schreiben vom [Datum], in dem ich Sie um Rückzahlung meiner Mietkaution in Höhe von [Betrag] € gebeten habe.

Mietvertrag: [Adresse]
Mietdauer: [von] bis [bis]
Übergabe: [Datum der Wohnungsübergabe]
Kautionshöhe: [Betrag] €

Bis heute habe ich weder eine Rückzahlung noch eine Abrechnung erhalten. 

Ich setze Ihnen hiermit eine Frist bis zum [Datum + 14 Tage] zur vollständigen Rückzahlung der Kaution auf folgendes Konto:

IBAN: [Ihre IBAN]
BIC: [Ihre BIC]

Sollte die Zahlung nicht fristgerecht eingehen, werde ich ohne weitere Ankündigung rechtliche Schritte einleiten. Ab Verzugseintritt sind Verzugszinsen gem. § 288 BGB geschuldet.

Mit freundlichen Grüßen
[Ihr Name]`,
      legalNote:
        "⚠️ This Mahnung establishes Verzug (default). If ignored, you can proceed with Mahnverfahren (court payment order). Approval required.",
    },
    timeline: [
      { date: "Day 0", event: "Moved out, keys returned", status: "done" },
      { date: "Week 2", event: "First deposit return request sent", status: "done" },
      { date: "Week 6", event: "No reply — Mahnung generated", status: "pending" },
      { date: "+14 days", event: "Payment deadline expires", status: "upcoming" },
      { date: "+21 days", event: "If no reply: Final warning (Letzte Mahnung)", status: "upcoming" },
      { date: "+30 days", event: "Escalation: Mahnverfahren / Lawyer", status: "upcoming" },
    ],
  },
  {
    id: 3,
    title: "Mold Problem",
    titleDe: "Schimmelbefall",
    icon: "🦠",
    color: "info",
    userInput:
      "There is mold in my bathroom. It started last week. I have not contacted my landlord yet.",
    analysis: {
      caseType: "Mängelanzeige (Defect Notification)",
      stage: "Stage 0 → Initial Mängelanzeige",
      legalBasis: [
        "§ 535 BGB — Landlord's maintenance duty",
        "§ 536 BGB — Rent reduction for defects",
        "§ 536c BGB — Tenant's duty to notify",
      ],
      urgency: "high",
      nextAction: "Send initial Mängelanzeige immediately + document with photos",
      explanation:
        "Mold is a health hazard and must be reported immediately (§ 536c BGB — tenant's Anzeigepflicht). Failing to notify promptly can void the tenant's right to claim Mietminderung. The system recommends: (1) take photos now, (2) send formal Mängelanzeige today, (3) request landlord inspection within 7 days.",
    },
    emailDraft: {
      subject: "Mängelanzeige — Schimmelbefall im Badezimmer",
      body: `Sehr geehrte/r Vermieter/in,

hiermit zeige ich Ihnen folgenden Mangel in meiner Wohnung [Adresse] an:

Seit ca. einer Woche ist im Badezimmer Schimmelbefall aufgetreten. Der Schimmel befindet sich [genaue Stelle, z.B. an der Decke über der Dusche / an der Außenwand / hinter dem Waschbecken].

Ich bitte Sie, den Mangel schnellstmöglich zu besichtigen und die Ursache fachgerecht feststellen und beseitigen zu lassen.

Fotos des Schimmelbefalls sind diesem Schreiben beigefügt.

Ich setze Ihnen eine Frist von 7 Tagen ab Zugang dieses Schreibens, um einen Besichtigungstermin zu vereinbaren.

Bitte beachten Sie, dass Schimmelbefall ein erheblicher Mangel der Mietsache ist, der meine Gesundheit gefährden kann. Ich behalte mir eine Mietminderung gem. § 536 BGB sowie weitere Ansprüche ausdrücklich vor.

Mit freundlichen Grüßen
[Ihr Name]`,
      legalNote:
        "⚠️ Mold is a health hazard — prompt notification protects your legal rights. Attach photo evidence before sending. Approval required.",
    },
    timeline: [
      { date: "Today", event: "Mold discovered — photos taken", status: "pending" },
      { date: "Today", event: "Initial Mängelanzeige sent", status: "pending" },
      { date: "+7 days", event: "Deadline for landlord inspection", status: "upcoming" },
      { date: "+14 days", event: "If no response: Reminder with Fristsetzung", status: "upcoming" },
      { date: "+21 days", event: "If unresolved: Mietminderung notice", status: "upcoming" },
      { date: "+30 days", event: "Escalation: Health authority / Lawyer", status: "upcoming" },
    ],
  },
];
