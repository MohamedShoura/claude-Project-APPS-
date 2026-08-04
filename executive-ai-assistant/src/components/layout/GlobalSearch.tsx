import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Users, Video, CheckSquare, BellRing, Building2, CornerDownLeft } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/misc";

interface Hit {
  id: string;
  label: string;
  sub: string;
  group: string;
  href: string;
  icon: React.ReactNode;
}

/** Global command-palette search across every entity in the app. */
export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state } = useApp();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    const out: Hit[] = [];
    const add = (h: Hit) => out.push(h);

    for (const e of state.employees)
      add({
        id: e.id,
        label: e.name,
        sub: `${e.position} · ${e.department}`,
        group: "People",
        href: `/team/${e.id}`,
        icon: <Users className="h-4 w-4 text-chart-1" />,
      });
    for (const c of state.clients)
      add({
        id: c.id,
        label: c.company,
        sub: `${c.name} · ${c.stage}`,
        group: "Clients",
        href: "/team",
        icon: <Building2 className="h-4 w-4 text-chart-3" />,
      });
    for (const m of state.meetings)
      add({
        id: m.id,
        label: m.name,
        sub: `Meeting · ${m.date} ${m.time}`,
        group: "Meetings",
        href: "/meetings",
        icon: <Video className="h-4 w-4 text-chart-2" />,
      });
    for (const t of state.tasks)
      add({
        id: t.id,
        label: t.title,
        sub: `Task · ${t.status.replace("_", " ")}`,
        group: "Tasks",
        href: "/planner",
        icon: <CheckSquare className="h-4 w-4 text-chart-4" />,
      });
    for (const r of state.reminders)
      add({
        id: r.id,
        label: r.title,
        sub: `Reminder · ${r.date} ${r.time}`,
        group: "Reminders",
        href: "/reminders",
        icon: <BellRing className="h-4 w-4 text-chart-5" />,
      });

    const filtered = term
      ? out.filter((h) => (h.label + h.sub).toLowerCase().includes(term))
      : out.slice(0, 6);
    return filtered.slice(0, 20);
  }, [q, state]);

  const go = (h: Hit) => {
    navigate(h.href);
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, hits.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter" && hits[active]) {
        go(hits[active]);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hits, active]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-pop"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                placeholder="Search people, clients, meetings, tasks…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Kbd>Esc</Kbd>
            </div>
            <div className="max-h-[52vh] overflow-y-auto p-2">
              {hits.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  No results for "{q}".
                </p>
              ) : (
                hits.map((h, i) => (
                  <button
                    key={h.group + h.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(h)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-primary/10" : "hover:bg-muted",
                    )}
                  >
                    <div className="rounded-md bg-muted p-1.5">{h.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{h.label}</p>
                      <p className="truncate text-xs text-muted-foreground">{h.sub}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{h.group}</span>
                    {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
