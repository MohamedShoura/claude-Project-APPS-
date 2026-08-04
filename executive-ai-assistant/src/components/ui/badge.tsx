import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

type Tone = "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "info";

const tones: Record<Tone, string> = {
  default: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success/12 text-success ring-1 ring-inset ring-success/25",
  warning: "bg-warning/15 text-warning-foreground ring-1 ring-inset ring-warning/30 dark:text-warning",
  destructive: "bg-destructive/12 text-destructive ring-1 ring-inset ring-destructive/25",
  info: "bg-chart-1/12 text-chart-1 ring-1 ring-inset ring-chart-1/25",
  outline: "text-foreground ring-1 ring-inset ring-border",
};

export function Badge({
  className,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

const priorityTone: Record<Priority, Tone> = {
  low: "secondary",
  medium: "info",
  high: "warning",
  urgent: "destructive",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge tone={priorityTone[priority]} className="capitalize">
      {priority}
    </Badge>
  );
}
