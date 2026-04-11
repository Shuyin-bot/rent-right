import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  onNext: () => void;
}

export default function SendStep({ onNext }: Props) {
  const [state, setState] = useState<"review" | "sending" | "sent">("review");

  const handleApprove = () => {
    setState("sending");
    setTimeout(() => setState("sent"), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">🛡️ You're in Control</h3>
        <p className="text-sm text-muted-foreground">
          Nothing goes out without your say-so. Legal stuff is serious — we keep you in the driver's seat.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {state === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 border-dashed border-warning/40 bg-warning/5 p-8 text-center space-y-4"
          >
            <ShieldCheck className="mx-auto h-12 w-12 text-warning" />
            <div>
              <p className="text-base font-semibold text-foreground">Ready to fire? 🔥</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This email carries legal weight. Double-check it, then hit send!
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleApprove}
                className="rounded-lg bg-success px-6 py-2.5 text-sm font-medium text-success-foreground shadow transition hover:opacity-90"
              >
                ✓ Send it!
              </button>
              <button className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
                Wait, let me edit
              </button>
            </div>
          </motion.div>
        )}

        {state === "sending" && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-border bg-card p-8 text-center space-y-4"
          >
            <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
            <p className="text-sm font-medium text-foreground">
              n8n workflow is doing its thing...
            </p>
            <div className="mx-auto max-w-xs space-y-2 text-left text-xs text-muted-foreground">
              <p>✓ Case saved to database</p>
              <p>✓ Approval timestamp recorded</p>
              <p className="animate-pulse">→ Firing off email via SMTP...</p>
            </div>
          </motion.div>
        )}

        {state === "sent" && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-success/30 bg-success/5 p-8 text-center space-y-4"
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <div>
              <p className="text-base font-semibold text-foreground">Boom — sent! 🎉</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We've got a 14-day reminder set. If your landlord ghosts you, we'll draft a follow-up.
              </p>
            </div>
            <div className="mx-auto max-w-xs space-y-1.5 text-left text-xs text-muted-foreground">
              <p>✓ Email delivered via Gmail SMTP</p>
              <p>✓ Evidence locked in your case file</p>
              <p>✓ 14-day countdown started ⏰</p>
              <p>✓ Auto-escalation armed if no reply</p>
            </div>
            <button
              onClick={onNext}
              className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
            >
              See what's next 📅 →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
