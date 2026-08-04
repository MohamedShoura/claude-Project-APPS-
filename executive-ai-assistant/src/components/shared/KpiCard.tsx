import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** A compact analytics tile: label, hero figure, delta chip, and a sparkline. */
export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  spark,
  accent = "hsl(var(--chart-1))",
  index = 0,
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  spark?: number[];
  accent?: string;
  index?: number;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="relative overflow-hidden p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </span>
            <span className="tabular text-2xl font-bold tracking-tight">{value}</span>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
                positive ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
              )}
            >
              {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {Math.abs(delta)}%
            </span>
          )}
          {spark && spark.length > 1 && <Sparkline data={spark} color={accent} />}
        </div>
      </Card>
    </motion.div>
  );
}

/** A tiny inline area sparkline (pure SVG). */
export function Sparkline({
  data,
  color = "hsl(var(--chart-1))",
  width = 96,
  height = 32,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((d, i) => [i * step, height - ((d - min) / range) * (height - 4) - 2]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const id = `sg-${Math.round(min)}-${Math.round(max)}-${data.length}`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.at(-1)![0]} cy={pts.at(-1)![1]} r={2.6} fill={color} />
    </svg>
  );
}
