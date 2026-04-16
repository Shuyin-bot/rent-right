import { useState } from "react";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";

interface Props {
  defaultInput: string;
  isLoading: boolean;
  onSubmit: (userInput: string) => void;
}

export default function InputStep({ defaultInput, isLoading, onSubmit }: Props) {
  const [text, setText] = useState(defaultInput);

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
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full rounded-lg bg-muted/50 p-4 text-sm leading-relaxed text-foreground italic resize-none border-0 outline-none focus:ring-1 focus:ring-primary"
          placeholder="Describe your situation..."
          disabled={isLoading}
        />
      </div>

      <button
        onClick={() => onSubmit(text)}
        disabled={isLoading || !text.trim()}
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            AI is thinking...
          </>
        ) : (
          "Let AI do its magic ✨ →"
        )}
      </button>
    </motion.div>
  );
}
