import { motion } from "framer-motion";
import { Scale, AlertTriangle, ArrowRight } from "lucide-react";
import type { CaseAnalysis } from "@/data/cases";

interface Props {
  analysis: CaseAnalysis;
  onNext: () => void;
}

const urgencyConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-warning/15 text-warning" },
  high: { label: "High", className: "bg-destructive/15 text-destructive" },
};

export default function AnalysisStep({ analysis, onNext }: Props) {
  const urgency = urgencyConfig[analysis.urgency];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">🧠 AI Breakdown</h3>
        <p className="text-sm text-muted-foreground">
          Our agent digs into the law so you don't have to. Here's what it found:
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{analysis.caseType}</span>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${urgency.className}`}>
            {urgency.label} Urgency
          </span>
        </div>

        <div className="space-y-4 p-5">
          {/* Stage */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Where you're at</p>
            <p className="text-sm font-medium text-foreground">{analysis.stage}</p>
          </div>

          {/* Legal Basis */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">The law is on your side</p>
            <div className="space-y-1.5">
              {analysis.legalBasis.map((law, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="mt-0.5 text-accent">§</span>
                  <span className="text-foreground">{law}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-lg bg-info/5 border border-info/20 p-4">
            <p className="text-xs font-medium text-info mb-1">💡 Why this step?</p>
            <p className="text-sm leading-relaxed text-foreground">{analysis.explanation}</p>
          </div>

          {/* Next Action */}
          <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
            <ArrowRight className="h-4 w-4 text-primary shrink-0" />
            <p className="text-sm font-medium text-foreground">{analysis.nextAction}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
      >
        Draft the email 📝 →
      </button>
    </motion.div>
  );
}
