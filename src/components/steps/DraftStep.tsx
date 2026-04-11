import { motion } from "framer-motion";
import { Mail, AlertTriangle } from "lucide-react";
import type { CaseEmail } from "@/data/cases";

interface Props {
  emailDraft: CaseEmail;
  onNext: () => void;
}

export default function DraftStep({ emailDraft, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">📧 Your Email, Ready to Go</h3>
        <p className="text-sm text-muted-foreground">
          We wrote a proper German legal email for you. Take a look — it's in German because that's what your landlord needs to see.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Email header */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-5 py-3">
          <Mail className="h-4 w-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Subject</p>
            <p className="text-sm font-semibold text-foreground">{emailDraft.subject}</p>
          </div>
        </div>

        {/* Email body */}
        <div className="p-5">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
            {emailDraft.body}
          </pre>
        </div>
      </div>

      {/* Legal warning */}
      <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">{emailDraft.legalNote}</p>
      </div>

      <button
        onClick={onNext}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
      >
        Looks good? Let's send it 🚀 →
      </button>
    </motion.div>
  );
}
