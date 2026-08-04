import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, isSameDay, parseISO } from "date-fns";
import {
  Plus,
  BellPlus,
  DollarSign,
  Target,
  Handshake,
  Layers,
  CalendarClock,
  CheckCircle2,
  Circle,
  Flame,
  Sparkles,
  ArrowRight,
  Video,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Gauge, Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { QuickNotes } from "@/components/dashboard/QuickNotes";
import { ClockWidget, WeatherWidget } from "@/components/dashboard/Widgets";
import { TaskDialog } from "@/components/editors/TaskDialog";
import { ReminderDialog } from "@/components/editors/ReminderDialog";
import { useApp } from "@/store/AppContext";
import { useNow } from "@/lib/useNow";
import {
  aggregateMonthlySales,
  buildInsights,
  performancePct,
  productivityScore,
  ranked,
  teamKpis,
  todaysMeetings,
} from "@/lib/engine";
import { formatAED } from "@/lib/utils";

function greeting(h: number) {
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const now = useNow(1000 * 30);
  const [taskOpen, setTaskOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);

  const k = teamKpis(state);
  const score = productivityScore(state);
  const insights = useMemo(() => buildInsights(state).slice(0, 3), [state]);
  const board = useMemo(() => ranked(state).slice(0, 4), [state]);
  const monthly = useMemo(() => aggregateMonthlySales(state), [state]);
  const spark = monthly.map((m) => m.sales);

  const today = new Date();
  const meetings = todaysMeetings(state);
  const todaysTasks = state.tasks
    .filter((t) => isSameDay(parseISO(t.date), today))
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
  const pending = todaysTasks.filter((t) => t.status !== "done");
  const completed = todaysTasks.filter((t) => t.status === "done");
  const priorities = state.tasks
    .filter((t) => t.status !== "done" && (t.priority === "urgent" || t.priority === "high"))
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, 5);

  // Merge tasks + meetings into a single time-ordered schedule for today.
  const schedule = [
    ...meetings.map((m) => ({ id: m.id, time: m.time, title: m.name, kind: "meeting" as const, color: "#4f46e5" })),
    ...todaysTasks.map((t) => ({ id: t.id, time: t.time ?? "", title: t.title, kind: "task" as const, color: t.color, done: t.status === "done" })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  const toggleTask = (id: string) => {
    const t = state.tasks.find((x) => x.id === id);
    if (t) dispatch({ type: "UPSERT_TASK", task: { ...t, status: t.status === "done" ? "todo" : "done" } });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="overflow-hidden">
          <div className="relative grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full brand-gradient opacity-10 blur-2xl" />
            <div className="relative">
              <p className="text-sm font-medium text-muted-foreground">{format(now, "EEEE, MMMM d · h:mm a")}</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {greeting(now.getHours())}, {state.settings.userName}.
              </h1>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                You have{" "}
                <span className="font-medium text-foreground">{meetings.length} meeting{meetings.length === 1 ? "" : "s"}</span>,{" "}
                <span className="font-medium text-foreground">{pending.length} task{pending.length === 1 ? "" : "s"}</span> pending, and{" "}
                <span className="font-medium text-foreground">{k.attainment}%</span> team attainment today.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => setTaskOpen(true)}>
                  <Plus className="h-4 w-4" /> Quick task
                </Button>
                <Button variant="outline" onClick={() => setReminderOpen(true)}>
                  <BellPlus className="h-4 w-4" /> Reminder
                </Button>
                <Link to="/insights">
                  <Button variant="ghost">
                    <Sparkles className="h-4 w-4" /> AI brief
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center gap-4">
              <Gauge value={score} sublabel="Productivity" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard index={0} label="Revenue (MTD)" value={formatAED(k.sales, true)} delta={12} icon={DollarSign} spark={spark} accent="hsl(var(--chart-1))" />
        <KpiCard index={1} label="Target attainment" value={`${k.attainment}%`} delta={4} icon={Target} accent="hsl(var(--chart-3))" />
        <KpiCard index={2} label="Deals closed" value={String(k.deals)} delta={9} icon={Handshake} accent="hsl(var(--chart-4))" />
        <KpiCard index={3} label="Open pipeline" value={formatAED(k.pipeline, true)} delta={-3} icon={Layers} accent="hsl(var(--chart-2))" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: schedule + priorities */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Today's schedule */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-primary" /> Today's schedule
              </CardTitle>
              <Link to="/planner" className="text-xs font-medium text-primary hover:underline">
                Open planner →
              </Link>
            </CardHeader>
            <CardContent>
              {schedule.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Nothing scheduled — enjoy the clear day.</p>
              ) : (
                <div className="flex flex-col">
                  {schedule.map((s, i) => (
                    <motion.div
                      key={s.kind + s.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 border-b border-border py-2.5 last:border-0"
                    >
                      <span className="tabular w-14 shrink-0 text-xs font-medium text-muted-foreground">{s.time || "—"}</span>
                      {s.kind === "task" ? (
                        <button onClick={() => toggleTask(s.id)} aria-label="Toggle task">
                          {s.done ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground/50" />
                          )}
                        </button>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Video className="h-3 w-3" />
                        </span>
                      )}
                      <span className={`flex-1 text-sm font-medium ${s.kind === "task" && s.done ? "text-muted-foreground line-through" : ""}`}>
                        {s.title}
                      </span>
                      <Badge tone={s.kind === "meeting" ? "default" : "secondary"} className="capitalize">
                        {s.kind}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending / completed summary */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Pending tasks</p>
                  <Badge tone="warning">{pending.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {pending.slice(0, 4).map((t) => (
                    <button key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center gap-2 text-left text-sm">
                      <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      <span className="flex-1 truncate">{t.title}</span>
                    </button>
                  ))}
                  {pending.length === 0 && <p className="text-sm text-muted-foreground">All done for today. 🎉</p>}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <Badge tone="success">{completed.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {completed.slice(0, 4).map((t) => (
                    <div key={t.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      <span className="flex-1 truncate line-through">{t.title}</span>
                    </div>
                  ))}
                  {completed.length === 0 && <p className="text-sm text-muted-foreground">Nothing completed yet.</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Priorities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-destructive" /> Today's priorities
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {priorities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No high-priority items outstanding.</p>
              ) : (
                priorities.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{format(parseISO(t.date), "MMM d")} · {t.time}</p>
                    </div>
                    <PriorityBadge priority={t.priority} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: team, insights, meetings */}
        <div className="flex flex-col gap-6">
          {/* AI insights teaser */}
          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" /> AI insights
              </CardTitle>
              <Link to="/insights" className="text-xs font-medium text-primary hover:underline">
                All →
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              {insights.map((ins) => (
                <p key={ins.id} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {ins.text}
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Team performance */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-sm">Team performance</CardTitle>
              <Link to="/kpis" className="text-xs font-medium text-primary hover:underline">
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {board.map((e) => {
                const pct = performancePct(e);
                return (
                  <Link key={e.id} to={`/team/${e.id}`} className="group flex items-center gap-3">
                    <Avatar name={e.name} size={34} status={e.status} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate font-medium group-hover:text-primary">{e.name.split(" ")[0]}</span>
                        <span className="tabular flex items-center gap-1 font-semibold">
                          {pct >= 100 ? <TrendingUp className="h-3 w-3 text-success" /> : pct < 70 ? <TrendingDown className="h-3 w-3 text-destructive" /> : null}
                          {pct}%
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className="mt-1"
                        tone={pct >= 100 ? "success" : pct >= 70 ? "primary" : "warning"}
                      />
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Upcoming meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Upcoming meetings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {meetings.filter((m) => m.status === "scheduled").length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming meetings today.</p>
              ) : (
                meetings
                  .filter((m) => m.status === "scheduled")
                  .map((m) => (
                    <div key={m.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                      <div className="flex flex-col items-center rounded-md bg-primary/10 px-2 py-1 text-primary">
                        <span className="tabular text-xs font-bold">{m.time}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.location ?? "—"}</p>
                      </div>
                    </div>
                  ))
              )}
              <Link to="/meetings" className="mt-1 text-center text-xs font-medium text-primary hover:underline">
                Manage meetings →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Widget strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ClockWidget />
        <WeatherWidget />
        <div className="sm:col-span-2">
          <QuickNotes />
        </div>
      </div>

      <TaskDialog open={taskOpen} onClose={() => setTaskOpen(false)} />
      <ReminderDialog open={reminderOpen} onClose={() => setReminderOpen(false)} />
    </div>
  );
}
