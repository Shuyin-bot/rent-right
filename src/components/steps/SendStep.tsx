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
        <h3 className="text-lg font-semibold text-foreground">Human Approval</h3>
        <p className="text-sm text-muted-foreground">
          All legally sensitive emails require your explicit approval before sending.
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
              <p className="text-base font-semibold text-foreground">Ready to send?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This email may have legal consequences. Please confirm you have reviewed the content.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleApprove}
                className="rounded-lg bg-success px-6 py-2.5 text-sm font-medium text-success-foreground shadow transition hover:opacity-90"
              >
                ✓ Approve & Send
              </button>
              <button className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
                Edit Draft
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
              Sending via n8n workflow...
            </p>
            <div className="mx-auto max-w-xs space-y-2 text-left text-xs text-muted-foreground">
              <p>✓ Saving case to database</p>
              <p>✓ Recording approval timestamp</p>
              <p className="animate-pulse">→ Sending email via SMTP...</p>
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
              <p className="text-base font-semibold text-foreground">Email Sent Successfully</p>
              <p className="mt-1 text-sm text-muted-foreground">
                n8n has scheduled a follow-up check in 14 days.
              </p>
            </div>
            <div className="mx-auto max-w-xs space-y-1.5 text-left text-xs text-muted-foreground">
              <p>✓ Email delivered via Gmail SMTP</p>
              <p>✓ Evidence saved to case file</p>
              <p>✓ 14-day timer started</p>
              <p>✓ Auto-escalation scheduled if no reply</p>
            </div>
            <button
              onClick={onNext}
              className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
            >
              View Timeline →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
