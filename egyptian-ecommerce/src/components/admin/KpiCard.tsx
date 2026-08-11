import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp = true,
  accent = "brand",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  accent?: "brand" | "gold" | "cta";
}) {
  const accentClass = {
    brand: "bg-brand-50 text-brand-700",
    gold: "bg-gold-50 text-gold-700",
    cta: "bg-cta-50 text-cta-700",
  }[accent];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accentClass)}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={cn("text-xs font-bold", trendUp ? "text-green-600" : "text-red-600")}>
            {trendUp ? "+" : ""}
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-extrabold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}
