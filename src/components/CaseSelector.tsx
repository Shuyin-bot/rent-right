import { motion } from "framer-motion";
import type { CaseData } from "@/data/cases";

interface Props {
  cases: CaseData[];
  activeId: number;
  onSelect: (id: number) => void;
}

const colorMap = {
  destructive: "border-destructive/30 bg-destructive/5 hover:border-destructive/50",
  warning: "border-warning/30 bg-warning/5 hover:border-warning/50",
  info: "border-info/30 bg-info/5 hover:border-info/50",
};

const activeColorMap = {
  destructive: "border-destructive bg-destructive/10 shadow-md",
  warning: "border-warning bg-warning/10 shadow-md",
  info: "border-info bg-info/10 shadow-md",
};

export default function CaseSelector({ cases, activeId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cases.map((c) => {
        const isActive = c.id === activeId;
        return (
          <motion.button
            key={c.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(c.id)}
            className={`relative rounded-xl border-2 p-4 text-left transition-all ${
              isActive ? activeColorMap[c.color] : colorMap[c.color]
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <p className="mt-2 text-sm font-semibold text-foreground">{c.title}</p>
            <p className="text-xs text-muted-foreground">{c.titleDe}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
