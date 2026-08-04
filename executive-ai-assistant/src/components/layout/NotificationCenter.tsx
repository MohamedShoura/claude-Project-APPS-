import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CalendarClock,
  AlarmClockOff,
  TrendingDown,
  PhoneMissed,
  Cake,
  FileWarning,
  CreditCard,
  CheckCheck,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { cn } from "@/lib/utils";
import type { NotificationKind } from "@/types";

const kindIcon: Record<NotificationKind, React.ReactNode> = {
  meeting: <CalendarClock className="h-4 w-4 text-primary" />,
  task_late: <AlarmClockOff className="h-4 w-4 text-destructive" />,
  reminder_missed: <PhoneMissed className="h-4 w-4 text-warning" />,
  target_alert: <TrendingDown className="h-4 w-4 text-destructive" />,
  follow_up: <PhoneMissed className="h-4 w-4 text-warning" />,
  birthday: <Cake className="h-4 w-4 text-chart-5" />,
  renewal: <FileWarning className="h-4 w-4 text-warning" />,
  payment: <CreditCard className="h-4 w-4 text-chart-3" />,
};

export function NotificationCenter() {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const unread = state.notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border bg-popover shadow-pop"
          >
            <div className="flex items-center justify-between border-b border-border p-3.5">
              <p className="text-sm font-semibold">Notifications</p>
              {unread > 0 && (
                <button
                  onClick={() => dispatch({ type: "MARK_ALL_NOTIF_READ" })}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {state.notifications.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">You're all caught up.</p>
              ) : (
                state.notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      dispatch({ type: "MARK_NOTIF_READ", id: n.id });
                      if (n.href) navigate(n.href);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border/60 p-3.5 text-left transition-colors last:border-0 hover:bg-muted/60",
                      !n.read && "bg-primary/[0.04]",
                    )}
                  >
                    <div className="mt-0.5 rounded-lg bg-muted p-1.5">{kindIcon[n.kind]}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.detail}</p>
                    </div>
                    {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
