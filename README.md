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

## Prerequisites

- **Node.js** v18+ — https://nodejs.org
- **bun** — https://bun.sh/docs/installation
- **Python** 3.13+ — https://www.python.org/downloads
- **uv** — https://docs.astral.sh/uv/getting-started/installation
- A **Google Cloud** service account key (`gcloud.json`) with Vertex AI access, placed in `backend/`

## Getting started

**1. Clone the repo**

```bash
git clone <repo-url>
cd rent-right
```

**2. Install frontend dependencies**

```bash
bun install
```

**3. Set up backend**

```bash
cd backend
uv sync
```

Edit `backend/.env`:

```
GOOGLE_APPLICATION_CREDENTIALS=gcloud.json
VERTEX_LOCATION=europe-west1
PROJECT_ID=<your-gcp-project-id>

# Optional — Langfuse tracing
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

Place your GCP service account key at `backend/gcloud.json`.

**4. Start both services** (two separate terminals)

```bash
# Terminal 1 — frontend (from project root)
bun run dev

# Terminal 2 — backend (from backend/)
cd backend
uv run uvicorn app.main:app --reload
```

The app runs at `http://localhost:8080`. The backend API runs at `http://localhost:8000`.

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
