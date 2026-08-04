import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A linear progress bar with an animated fill. Semantic-color aware. */
export function Progress({
  value,
  className,
  indicatorClassName,
  tone = "primary",
}: {
  value: number;
  className?: string;
  indicatorClassName?: string;
  tone?: "primary" | "success" | "warning" | "destructive";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const toneClass =
    tone === "success"
      ? "bg-success"
      : tone === "warning"
        ? "bg-warning"
        : tone === "destructive"
          ? "bg-destructive"
          : "bg-primary";
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <motion.div
        className={cn("h-full rounded-full", toneClass, indicatorClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/** A circular gauge used for scores (e.g. productivity). */
export function Gauge({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = c - (clamped / 100) * c;
  const tone =
    clamped >= 75 ? "hsl(var(--success))" : clamped >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="tabular text-2xl font-bold">{label ?? `${clamped}`}</span>
        {sublabel && <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  );
}
