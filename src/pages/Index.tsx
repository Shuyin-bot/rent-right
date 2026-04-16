import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { cases, type CaseStep } from "@/data/cases";
import CaseSelector from "@/components/CaseSelector";
import StepIndicator from "@/components/StepIndicator";
import InputStep from "@/components/steps/InputStep";
import AnalysisStep from "@/components/steps/AnalysisStep";
import DraftStep from "@/components/steps/DraftStep";
import SendStep from "@/components/steps/SendStep";
import TrackStep from "@/components/steps/TrackStep";
import { useChat, type AgentResponse } from "@/hooks/useChat";

const stepOrder: CaseStep[] = ["input", "analysis", "draft", "send", "track"];

export default function Index() {
  const [activeCaseId, setActiveCaseId] = useState(1);
  const [currentStep, setCurrentStep] = useState<CaseStep>("input");
  const [completedSteps, setCompletedSteps] = useState<CaseStep[]>([]);
  const [agentResult, setAgentResult] = useState<AgentResponse | null>(null);

  const { ask, reset, isLoading, error } = useChat();
  const activeCase = cases.find((c) => c.id === activeCaseId)!;

  const goNext = useCallback(() => {
    const idx = stepOrder.indexOf(currentStep);
    if (idx < stepOrder.length - 1) {
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setCurrentStep(stepOrder[idx + 1]);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async (userInput: string) => {
    const result = await ask(userInput);
    if (result) {
      setAgentResult(result);
      goNext();
    }
  }, [ask, goNext]);

  const selectCase = useCallback((id: number) => {
    setActiveCaseId(id);
    setCurrentStep("input");
    setCompletedSteps([]);
    setAgentResult(null);
    reset();
  }, [reset]);

  // Map agent response → AnalysisStep props, falling back to hardcoded case data
  const analysis = agentResult
    ? {
        caseType: agentResult.case_type ?? activeCase.analysis.caseType,
        stage: activeCase.analysis.stage,
        legalBasis: agentResult.legal_basis ?? activeCase.analysis.legalBasis,
        urgency: (agentResult.urgency ?? activeCase.analysis.urgency) as "low" | "medium" | "high",
        nextAction: activeCase.analysis.nextAction,
        explanation: agentResult.message ?? activeCase.analysis.explanation,
      }
    : activeCase.analysis;

  // Map agent response → DraftStep props, falling back to hardcoded case data
  const emailDraft = agentResult?.letter_subject
    ? {
        subject: agentResult.letter_subject,
        body: agentResult.letter_body ?? activeCase.emailDraft.body,
        legalNote: agentResult.legal_note ?? activeCase.emailDraft.legalNote,
      }
    : activeCase.emailDraft;

  // Map agent response → TrackStep props, falling back to hardcoded timeline
  const timeline = agentResult?.timeline
    ? agentResult.timeline.map((t, i) => ({
        date: t.split(":")[0]?.trim() ?? `Step ${i + 1}`,
        event: t.split(":").slice(1).join(":").trim() || t,
        status: (i === 0 ? "pending" : "upcoming") as "done" | "pending" | "upcoming",
      }))
    : activeCase.timeline;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight">
              Landlord Nightmare 😈
            </h1>
            <p className="text-xs text-muted-foreground">
              Your AI-powered legal sidekick for German rental disputes
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 space-y-8">
        {/* Case Selector */}
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Pick a scenario — or write your own below ✨
          </p>
          <CaseSelector cases={cases} activeId={activeCaseId} onSelect={selectCase} />
        </section>

        {/* Step Indicator */}
        <section className="flex justify-center">
          <StepIndicator
            current={currentStep}
            onStepClick={setCurrentStep}
            completedSteps={completedSteps}
          />
        </section>

        {/* Error banner */}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            ⚠️ Agent error: {error}. Is the backend running? (`cd backend && uv run python -m app.main`)
          </div>
        )}

        {/* Step Content */}
        <section className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentStep === "input" && (
              <InputStep
                key="input"
                defaultInput={activeCase.userInput}
                isLoading={isLoading}
                onSubmit={handleSubmit}
              />
            )}
            {currentStep === "analysis" && (
              <AnalysisStep key="analysis" analysis={analysis} onNext={goNext} />
            )}
            {currentStep === "draft" && (
              <DraftStep key="draft" emailDraft={emailDraft} onNext={goNext} />
            )}
            {currentStep === "send" && <SendStep key="send" onNext={goNext} />}
            {currentStep === "track" && (
              <TrackStep key="track" timeline={timeline} />
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
