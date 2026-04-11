import { motion } from "framer-motion";
import { User } from "lucide-react";

interface Props {
  userInput: string;
  onNext: () => void;
}

export default function InputStep({ userInput, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">💬 What happened?</h3>
        <p className="text-sm text-muted-foreground">
          Just tell us your problem — no legal jargon needed, we got you.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-info/15 text-info">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-foreground">Tenant</span>
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm leading-relaxed text-foreground italic">
            "{userInput}"
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
      >
        Let AI do its magic ✨ →
      </button>
    </motion.div>
  );
}
