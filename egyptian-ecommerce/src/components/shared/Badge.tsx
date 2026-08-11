import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "brand",
  className,
}: {
  children: React.ReactNode;
  variant?: "brand" | "cta" | "gold" | "neutral" | "outline";
  className?: string;
}) {
  const variants: Record<string, string> = {
    brand: "bg-brand-600 text-white",
    cta: "bg-cta-500 text-white",
    gold: "bg-gold-500 text-white",
    neutral: "bg-neutral-900 text-white",
    outline: "border border-neutral-300 text-neutral-700 bg-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
