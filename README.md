# Landlord Nightmare

> Your AI-powered legal sidekick for German rental disputes.

An interactive demo app that walks tenants through real German rental dispute scenarios — from describing the problem to generating a legally-grounded formal letter (in German) and tracking next steps.

## What it does

Three pre-loaded demo cases guide users through a 5-step workflow:

| Step | What happens |
|------|-------------|
| **Input** | Tenant describes the problem in plain language |
| **Analysis** | AI breakdown: case type, legal stage, relevant BGB sections, urgency |
| **Draft** | Auto-generated formal German letter (Mängelanzeige / Mahnung) with legal citations |
| **Send** | Review and approve before sending |
| **Track** | Timeline of deadlines and escalation steps |

### Demo scenarios

- **Heating Defect** — broken heating for 2+ weeks, no landlord response → formal Mängelanzeige with Fristsetzung
- **Deposit Return** — no deposit returned 6 weeks after move-out → Mahnung establishing Verzug
- **Mold Problem** — new mold in bathroom, not yet reported → urgent initial Mängelanzeige with photo evidence prompt

## Tech stack

- **React 18** + **TypeScript**
- **Vite** for bundling
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **Framer Motion** for step transitions
- **React Router v6**, **TanStack Query**
- **Vitest** + **Testing Library** for tests

## Getting started

```bash

# start frontend
cd /path/to/rent-right
bun run dev || npm run dev

# start backend
cd /path/to/rent-right/backend
uv run uvicorn app.main:app --reload || uv run python -m app.main
```


The app runs at `http://localhost:8080` by default.

## Project structure

```
src/
  data/cases.ts          # All demo case data (analysis, email drafts, timelines)
  pages/Index.tsx        # Main page — case selector + step orchestration
  components/
    CaseSelector.tsx     # Tab strip for switching between demo cases
    StepIndicator.tsx    # Progress bar across the 5 steps
    steps/               # One component per step (Input, Analysis, Draft, Send, Track)
    ui/                  # shadcn/ui component library
```

## Notes

- All letter drafts are in **German** and reference actual BGB paragraphs (§ 535, § 536, § 543, § 551, § 286, § 536c, etc.).
- This is a demo/prototype — the "Send" step does not actually send emails.
- Switching cases resets the step flow back to the beginning.
