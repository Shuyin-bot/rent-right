import { motion } from "framer-motion";
import { MessageSquare, Brain, FileText, Send, Clock } from "lucide-react";
import type { CaseStep } from "@/data/cases";

const steps: { key: CaseStep; label: string; icon: typeof MessageSquare }[] = [
  { key: "input", label: "Input", icon: MessageSquare },
  { key: "analysis", label: "Analysis", icon: Brain },
  { key: "draft", label: "Draft", icon: FileText },
  { key: "send", label: "Send", icon: Send },
  { key: "track", label: "Track", icon: Clock },
];

interface Props {
  current: CaseStep;
  onStepClick: (step: CaseStep) => void;
  completedSteps: CaseStep[];
}

export default function StepIndicator({ current, onStepClick, completedSteps }: Props) {
  const currentIdx = steps.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = step.key === current;
        const isCompleted = completedSteps.includes(step.key);
        const isClickable = isCompleted || i <= currentIdx;

        return (
          <div key={step.key} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => isClickable && onStepClick(step.key)}
              disabled={!isClickable}
              className={`relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : isCompleted
                  ? "bg-success/15 text-success"
                  : "bg-muted text-muted-foreground"
              } ${isClickable ? "cursor-pointer hover:opacity-80" : "cursor-default opacity-50"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="step-bg"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{step.label}</span>
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-3 sm:w-6 ${
                  i < currentIdx ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
