import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";
import {
  ArrowLeft,
  Mail,
  Phone,
  Pencil,
  Trophy,
  AlertTriangle,
  Target,
  CalendarClock,
  CheckSquare,
  Building2,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { Stat, EmptyState } from "@/components/ui/misc";
import { chartTheme } from "@/components/shared/ChartCard";
import { EmployeeDialog } from "@/components/editors/EmployeeDialog";
import { useApp } from "@/store/AppContext";
import {
  closingRate,
  commissionValue,
  performancePct,
  remainingToTarget,
} from "@/lib/engine";
import { formatAED } from "@/lib/utils";

const TABS = [
  { key: "overview", label: "Overview", icon: <Activity className="h-3.5 w-3.5" /> },
  { key: "tasks", label: "Tasks", icon: <CheckSquare className="h-3.5 w-3.5" /> },
  { key: "clients", label: "Clients", icon: <Building2 className="h-3.5 w-3.5" /> },
  { key: "meetings", label: "Meetings", icon: <CalendarClock className="h-3.5 w-3.5" /> },
];

export default function EmployeeProfile() {
  const { id } = useParams();
  const { state } = useApp();
  const [tab, setTab] = useState("overview");
  const [edit, setEdit] = useState(false);

  const emp = state.employees.find((e) => e.id === id);

  const tasks = useMemo(() => state.tasks.filter((t) => t.assignedTo === id), [state.tasks, id]);
  const clients = useMemo(() => state.clients.filter((c) => c.ownerId === id), [state.clients, id]);
  const meetings = useMemo(
    () => state.meetings.filter((m) => m.participants.includes(id ?? "")),
    [state.meetings, id],
  );

  if (!emp) {
    return (
      <EmptyState
        title="Employee not found"
        hint="This profile may have been removed."
        action={
          <Link to="/team">
            <Button variant="outline">Back to team</Button>
          </Link>
        }
      />
    );
  }

  const pct = performancePct(emp);
  const tone = pct >= 100 ? "success" : pct >= 75 ? "primary" : pct >= 50 ? "warning" : "destructive";

  return (
    <div>
      <Link to="/team" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to team
      </Link>

      {/* Header */}
      <Card className="mb-6 overflow-hidden">
        <div className="h-20 brand-gradient" />
        <CardContent className="p-5">
          <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="rounded-full ring-4 ring-card">
                <Avatar name={emp.name} photo={emp.photo} size={80} status={emp.status} />
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold tracking-tight">{emp.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {emp.position} · {emp.department}
                </p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <a href={`mailto:${emp.email}`} className="inline-flex items-center gap-1 hover:text-foreground">
                    <Mail className="h-3 w-3" /> {emp.email}
                  </a>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {emp.phone}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setEdit(true)}>
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          </div>

          {/* Stat strip */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4 lg:grid-cols-6">
            <Stat label="Attainment" value={`${pct}%`} />
            <Stat label="Sales" value={formatAED(emp.achievedSales, true)} />
            <Stat label="Collection" value={formatAED(emp.collection, true)} />
            <Stat label="Deals" value={emp.deals} sub={`${closingRate(emp)}% close`} />
            <Stat label="Commission" value={formatAED(commissionValue(emp), true)} />
            <Stat label="Attendance" value={`${emp.attendanceRate}%`} />
          </div>
        </CardContent>
      </Card>

      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />

      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={emp.history} margin={{ left: -12, right: 6, top: 6 }}>
                    <defs>
                      <linearGradient id="empSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} />
                    <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={chartTheme.tooltipStyle}
                      formatter={(v: number) => formatAED(v)}
                    />
                    <Area type="monotone" dataKey="sales" name="Sales" stroke="hsl(var(--chart-1))" strokeWidth={2.5} fill="url(#empSales)" />
                    <Line type="monotone" dataKey="target" name="Target" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4" /> Goal progress
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Progress value={pct} tone={tone === "primary" ? "primary" : (tone as "success" | "warning" | "destructive")} />
                <p className="text-sm text-muted-foreground">
                  <span className="tabular font-semibold text-foreground">{formatAED(remainingToTarget(emp), true)}</span>{" "}
                  {remainingToTarget(emp) > 0 ? "remaining to hit monthly target." : "— target achieved. 🎉"}
                </p>
                {emp.notes && <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">{emp.notes}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-warning" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {emp.achievements.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No achievements recorded yet.</p>
                ) : (
                  emp.achievements.map((a) => (
                    <div key={a.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="inline-flex items-center gap-2">
                        <Trophy className="h-3.5 w-3.5 text-warning" /> {a.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{a.date}</span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {emp.warnings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-destructive" /> Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {emp.warnings.map((w) => (
                    <div key={w.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="inline-flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive" /> {w.label}
                      </span>
                      <PriorityBadge priority={w.severity} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {tab === "tasks" && (
        <Card>
          <CardContent className="p-0">
            {tasks.length === 0 ? (
              <div className="p-6">
                <EmptyState title="No tasks assigned" hint="Assign tasks to this rep from the planner." />
              </div>
            ) : (
              <div className="divide-y divide-border">
                {tasks.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 p-4">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {t.date} · {t.status.replace("_", " ")}
                      </p>
                    </div>
                    <PriorityBadge priority={t.priority} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "clients" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {clients.length === 0 ? (
            <EmptyState title="No clients owned" />
          ) : (
            clients.map((c) => (
              <Card key={c.id}>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium">{c.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.name} · last contact {c.lastContact}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tabular font-semibold">{formatAED(c.value, true)}</p>
                    <Badge tone="secondary" className="mt-1 capitalize">
                      {c.stage}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {tab === "meetings" && (
        <Card>
          <CardContent className="p-0">
            {meetings.length === 0 ? (
              <div className="p-6">
                <EmptyState title="No meetings" />
              </div>
            ) : (
              <div className="divide-y divide-border">
                {meetings.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-4">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.date} · {m.time}
                      </p>
                    </div>
                    <Badge tone="secondary" className="capitalize">
                      {m.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <EmployeeDialog open={edit} onClose={() => setEdit(false)} employee={emp} />
    </div>
  );
}
