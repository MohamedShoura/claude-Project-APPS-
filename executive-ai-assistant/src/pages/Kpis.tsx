import { useMemo } from "react";
import {
  ResponsiveContainer,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import {
  DollarSign,
  Target,
  Wallet,
  Percent,
  Phone,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { ChartCard, chartTheme } from "@/components/shared/ChartCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import {
  aggregateMonthlySales,
  departmentSplit,
  performancePct,
  pipelineByStage,
  ranked,
  teamKpis,
  topPerformer,
  worstPerformer,
} from "@/lib/engine";
import { formatAED } from "@/lib/utils";

export default function Kpis() {
  const { state } = useApp();
  const k = teamKpis(state);
  const monthly = useMemo(() => aggregateMonthlySales(state), [state]);
  const pipeline = useMemo(() => pipelineByStage(state), [state]);
  const depts = useMemo(() => departmentSplit(state), [state]);
  const board = useMemo(() => ranked(state), [state]);
  const top = topPerformer(state);
  const worst = worstPerformer(state);

  const spark = monthly.map((m) => m.sales);
  const collectionSpark = monthly.map((m) => m.collection);

  return (
    <div>
      <PageHeader title="KPI Analytics" subtitle="The numbers behind the team — revenue, pipeline, and activity." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard index={0} label="Revenue" value={formatAED(k.sales, true)} delta={12} icon={DollarSign} spark={spark} accent="hsl(var(--chart-1))" />
        <KpiCard index={1} label="Attainment" value={`${k.attainment}%`} delta={4} icon={Target} accent="hsl(var(--chart-3))" />
        <KpiCard index={2} label="Collection" value={formatAED(k.collection, true)} delta={8} icon={Wallet} spark={collectionSpark} accent="hsl(var(--chart-4))" />
        <KpiCard index={3} label="Conversion" value={`${k.conversion}%`} delta={-3} icon={Percent} accent="hsl(var(--chart-2))" />
        <KpiCard index={4} label="Calls" value={String(k.calls)} delta={6} icon={Phone} accent="hsl(var(--chart-5))" />
        <KpiCard index={5} label="Meetings" value={String(k.meetings)} delta={2} icon={CalendarCheck} accent="hsl(var(--chart-1))" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales vs target trend */}
        <ChartCard className="lg:col-span-2" title="Revenue vs target" description="Team sales against the combined monthly target.">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthly} margin={{ left: -8, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} />
                <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={chartTheme.tooltipStyle} formatter={(v: number) => formatAED(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="sales" name="Sales" stroke="hsl(var(--chart-1))" strokeWidth={2.5} fill="url(#rev)" />
                <Line type="monotone" dataKey="target" name="Target" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Department split */}
        <ChartCard title="Revenue by department" description="Share of sales across teams.">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={depts} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3} stroke="hsl(var(--card))" strokeWidth={2}>
                  {depts.map((_, i) => (
                    <Cell key={i} fill={chartTheme.series[i % chartTheme.series.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTheme.tooltipStyle} formatter={(v: number) => formatAED(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Pipeline by stage */}
        <ChartCard className="lg:col-span-2" title="Pipeline by stage" description="Deal value distributed across the funnel.">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipeline} margin={{ left: -8, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} />
                <XAxis dataKey="stage" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={chartTheme.tooltipStyle} cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }} formatter={(v: number) => formatAED(v)} />
                <Bar dataKey="value" name="Deal value" fill="hsl(var(--chart-3))" radius={[6, 6, 0, 0]} maxBarSize={64} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Activity: calls vs meetings */}
        <ChartCard title="Activity by rep" description="Calls and meetings this month.">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={state.employees.map((e) => ({ name: e.name.split(" ")[0], calls: e.calls, meetings: e.meetings }))}
                margin={{ left: -18, right: 6, top: 6 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} />
                <XAxis dataKey="name" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTheme.tooltipStyle} cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="calls" name="Calls" fill="hsl(var(--chart-5))" radius={[5, 5, 0, 0]} maxBarSize={22} />
                <Bar dataKey="meetings" name="Meetings" fill="hsl(var(--chart-1))" radius={[5, 5, 0, 0]} maxBarSize={22} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Leaderboard + top/worst */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Employee ranking</h3>
            <div className="flex flex-col gap-3">
              {board.map((e, i) => {
                const pct = performancePct(e);
                const barTone = pct >= 100 ? "bg-success" : pct >= 75 ? "bg-primary" : pct >= 50 ? "bg-warning" : "bg-destructive";
                return (
                  <div key={e.id} className="flex items-center gap-3">
                    <span className="tabular w-5 text-sm font-bold text-muted-foreground">{i + 1}</span>
                    <Avatar name={e.name} size={32} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate font-medium">{e.name}</span>
                        <span className="tabular font-semibold">{pct}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${barTone}`} style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {top && (
            <Card className="border-success/30 bg-success/[0.04]">
              <CardContent className="flex items-center gap-4 p-5">
                <Avatar name={top.name} size={52} />
                <div className="flex-1">
                  <Badge tone="success" className="mb-1">
                    <TrendingUp className="h-3 w-3" /> Top performer
                  </Badge>
                  <p className="font-semibold">{top.name}</p>
                  <p className="text-sm text-muted-foreground">{performancePct(top)}% of target · {formatAED(top.achievedSales, true)}</p>
                </div>
              </CardContent>
            </Card>
          )}
          {worst && (
            <Card className="border-destructive/30 bg-destructive/[0.04]">
              <CardContent className="flex items-center gap-4 p-5">
                <Avatar name={worst.name} size={52} />
                <div className="flex-1">
                  <Badge tone="destructive" className="mb-1">
                    <TrendingDown className="h-3 w-3" /> Needs support
                  </Badge>
                  <p className="font-semibold">{worst.name}</p>
                  <p className="text-sm text-muted-foreground">{performancePct(worst)}% of target · behind by {formatAED(worst.monthlyTarget - worst.achievedSales, true)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
