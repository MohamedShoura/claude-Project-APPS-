"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function CountdownTimer({
  target,
  variant = "light",
}: {
  target: string;
  variant?: "light" | "dark";
}) {
  const { dict } = useLocale();
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    // Client-only value (depends on Date.now()) — set after mount to avoid SSR/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!time) return <div className="h-11" />;

  const boxClass =
    variant === "dark"
      ? "bg-white/10 text-white border border-white/20"
      : "bg-neutral-900 text-white";

  const units: [number, string][] = [
    [time.days, dict.flash.days],
    [time.hours, dict.flash.hours],
    [time.minutes, dict.flash.minutes],
    [time.seconds, dict.flash.seconds],
  ];

  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      {units.map(([value, label], i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className={`flex min-w-11 flex-col items-center rounded-lg px-2 py-1.5 ${boxClass}`}>
            <span className="text-base font-bold leading-none tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-0.5 text-[10px] opacity-80">{label}</span>
          </div>
          {i < units.length - 1 && <span className="font-bold opacity-40">:</span>}
        </div>
      ))}
    </div>
  );
}
