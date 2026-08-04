import { cn, colorFromString, initials } from "@/lib/utils";
import type { EmployeeStatus } from "@/types";

const statusRing: Record<EmployeeStatus, string> = {
  available: "bg-success",
  in_meeting: "bg-warning",
  busy: "bg-destructive",
  on_leave: "bg-muted-foreground",
};

export function Avatar({
  name,
  photo,
  size = 40,
  status,
  className,
}: {
  name: string;
  photo?: string;
  size?: number;
  status?: EmployeeStatus;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-full w-full rounded-full object-cover ring-2 ring-background"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-full font-semibold text-white ring-2 ring-background"
          style={{ background: colorFromString(name), fontSize: size * 0.36 }}
        >
          {initials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-card",
            statusRing[status],
          )}
          style={{ width: size * 0.28, height: size * 0.28 }}
          title={status.replace("_", " ")}
        />
      )}
    </div>
  );
}
