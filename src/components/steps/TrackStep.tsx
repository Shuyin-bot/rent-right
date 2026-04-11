import { motion } from "framer-motion";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import type { CaseTimeline } from "@/data/cases";

interface Props {
  timeline: CaseTimeline[];
}

const statusConfig = {
  done: { icon: CheckCircle2, className: "text-success", lineClass: "bg-success" },
  pending: { icon: Clock, className: "text-warning animate-pulse", lineClass: "bg-warning" },
  upcoming: { icon: Circle, className: "text-muted-foreground/40", lineClass: "bg-border" },
};

export default function TrackStep({ timeline }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">📅 Your Battle Plan</h3>
        <p className="text-sm text-muted-foreground">
          Sit back — n8n watches deadlines, checks for replies, and escalates automatically. We've got your back.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="space-y-0">
          {timeline.map((item, i) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;
            const isLast = i === timeline.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <Icon className={`h-5 w-5 shrink-0 ${config.className}`} />
                  {!isLast && (
                    <div className={`mt-1 w-px flex-1 min-h-[2rem] ${config.lineClass}`} />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                  <p className="text-xs font-medium text-muted-foreground">{item.date}</p>
                  <p className={`text-sm font-medium ${
                    item.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  }`}>
                    {item.event}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Architecture note */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "AI Agent", desc: "Thinks & writes drafts", emoji: "🧠" },
          { label: "n8n", desc: "Sends, waits & escalates", emoji: "⚙️" },
          { label: "Evidence", desc: "Everything on record", emoji: "📋" },
        ].map((layer) => (
          <div
            key={layer.label}
            className="rounded-lg border border-border bg-muted/30 p-3 text-center"
          >
            <p className="text-lg">{layer.emoji}</p>
            <p className="text-xs font-semibold text-foreground">{layer.label}</p>
            <p className="text-[10px] text-muted-foreground">{layer.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
