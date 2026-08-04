import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Phone,
  CalendarClock,
  CheckSquare,
  Users,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import {
  buildFollowUps,
  buildInsights,
  overdueTasks,
  performancePct,
  staleClients,
  todaysMeetings,
} from "@/lib/engine";
import { formatAED } from "@/lib/utils";
import type { Insight } from "@/lib/engine";

const toneStyle: Record<Insight["tone"], { icon: React.ReactNode; ring: string }> = {
  positive: { icon: <TrendingUp className="h-4 w-4 text-success" />, ring: "border-success/30 bg-success/[0.05]" },
  warning: { icon: <AlertTriangle className="h-4 w-4 text-warning" />, ring: "border-warning/30 bg-warning/[0.05]" },
  critical: { icon: <TrendingDown className="h-4 w-4 text-destructive" />, ring: "border-destructive/30 bg-destructive/[0.05]" },
  info: { icon: <Info className="h-4 w-4 text-primary" />, ring: "border-primary/25 bg-primary/[0.04]" },
};

export default function Insights() {
  const { state } = useApp();
  const insights = useMemo(() => buildInsights(state), [state]);
  const followUps = useMemo(() => buildFollowUps(state), [state]);

  const meetings = todaysMeetings(state);
  const overdue = overdueTasks(state);
  const stale = staleClients(state, 4);
  const behind = state.employees.filter((e) => performancePct(e) < 80);
  const todaysTasks = state.tasks.filter((t) => t.date === new Date().toISOString().slice(0, 10));
  const expectedSales = state.clients
    .filter((c) => c.stage === "negotiation" || c.stage === "proposal")
    .reduce((a, c) => a + c.value, 0);

  return (
    <div>
      <PageHeader
        title="AI Insights"
        subtitle="Your assistant reads the data and tells you what to act on today."
      />

      {/* Insight cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {insights.map((ins, i) => (
          <motion.div
            key={ins.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-3 rounded-xl border p-4 ${toneStyle[ins.tone].ring}`}
          >
            <div className="mt-0.5 rounded-lg bg-card p-1.5 shadow-soft">{toneStyle[ins.tone].icon}</div>
            <p className="text-sm font-medium leading-relaxed">{ins.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Follow-up assistant */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Follow-up assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {followUps.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing urgent — you're on top of it.</p>
            ) : (
              followUps.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"
                >
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{f.detail}</p>
                  </div>
                  <PriorityBadge priority={f.priority} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Daily executive brief */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> Daily executive brief
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <BriefTile icon={<CalendarClock className="h-4 w-4" />} label="Meetings today" value={meetings.length} to="/meetings" />
            <BriefTile icon={<CheckSquare className="h-4 w-4" />} label="Tasks today" value={todaysTasks.length} to="/planner" />
            <BriefTile icon={<AlertTriangle className="h-4 w-4" />} label="Overdue tasks" value={overdue.length} to="/planner" tone="warning" />
            <BriefTile icon={<Phone className="h-4 w-4" />} label="Pending follow-ups" value={stale.length} to="/team" tone="warning" />
            <BriefTile icon={<Users className="h-4 w-4" />} label="Reps needing support" value={behind.length} to="/kpis" tone={behind.length ? "warning" : "default"} />
            <BriefTile icon={<TrendingUp className="h-4 w-4" />} label="Expected sales" value={formatAED(expectedSales, true)} to="/team" />
          </CardContent>
        </Card>
      </div>

      {/* Prioritized action lists */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Who to call today</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {stale.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{c.company}</span>
                <Badge tone="warning">{formatAED(c.value, true)}</Badge>
              </div>
            ))}
            {stale.length === 0 && <p className="text-sm text-muted-foreground">No overdue contacts.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Meetings to prepare</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {meetings.filter((m) => m.status === "scheduled").map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{m.name}</span>
                <span className="tabular text-xs text-muted-foreground">{m.time}</span>
              </div>
            ))}
            {meetings.length === 0 && <p className="text-sm text-muted-foreground">No meetings today.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Reps behind target</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {behind.map((e) => (
              <Link key={e.id} to={`/team/${e.id}`} className="flex items-center justify-between gap-2 text-sm hover:text-primary">
                <span className="truncate">{e.name}</span>
                <Badge tone="destructive">{performancePct(e)}%</Badge>
              </Link>
            ))}
            {behind.length === 0 && <p className="text-sm text-muted-foreground">Everyone's on track. 🎯</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BriefTile({
  icon,
  label,
  value,
  to,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  to: string;
  tone?: "default" | "warning";
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-1 rounded-xl border border-border p-3 transition-colors hover:bg-muted/40"
    >
      <div className="flex items-center justify-between">
        <span className={tone === "warning" ? "text-warning" : "text-muted-foreground"}>{icon}</span>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <span className="tabular text-xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </Link>
  );
}
