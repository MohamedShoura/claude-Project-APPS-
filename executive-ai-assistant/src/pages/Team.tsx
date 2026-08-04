import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Phone,
  Users2,
  Trophy,
  Pencil,
  Trash2,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/misc";
import { EmployeeDialog } from "@/components/editors/EmployeeDialog";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import { closingRate, commissionValue, performancePct, remainingToTarget } from "@/lib/engine";
import { formatAED } from "@/lib/utils";
import type { ClientStage, Employee } from "@/types";

const stageTone: Record<ClientStage, "default" | "info" | "warning" | "success" | "secondary" | "destructive"> = {
  lead: "secondary",
  qualified: "info",
  proposal: "warning",
  negotiation: "default",
  won: "success",
  lost: "destructive",
};

export default function Team() {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  const filtered = useMemo(
    () =>
      state.employees.filter(
        (e) =>
          (dept === "all" || e.department === dept) &&
          (e.name + e.position).toLowerCase().includes(q.toLowerCase()),
      ),
    [state.employees, q, dept],
  );

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (e: Employee) => {
    setEditing(e);
    setOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Team & Sales"
        subtitle="Track every rep's target, activity, and pipeline in one place."
        actions={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" /> Add employee
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search team…" className="pl-9" />
        </div>
        <Select value={dept} onChange={(e) => setDept(e.target.value)} className="w-40">
          <option value="all">All departments</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Success">Success</option>
          <option value="Ops">Ops</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Users2 className="h-8 w-8" />} title="No team members found" hint="Try a different search or add someone new." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e, i) => {
            const pct = performancePct(e);
            const tone = pct >= 100 ? "success" : pct >= 75 ? "primary" : pct >= 50 ? "warning" : "destructive";
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="group h-full">
                  <CardContent className="flex flex-col gap-4 p-5">
                    <div className="flex items-start gap-3">
                      <Avatar name={e.name} photo={e.photo} size={48} status={e.status} />
                      <div className="min-w-0 flex-1">
                        <Link to={`/team/${e.id}`} className="font-semibold hover:text-primary hover:underline">
                          {e.name}
                        </Link>
                        <p className="truncate text-xs text-muted-foreground">{e.position}</p>
                        <Badge tone="secondary" className="mt-1">
                          {e.department}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => openEdit(e)} className="rounded-md p-1 text-muted-foreground hover:bg-muted" aria-label="Edit">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            dispatch({ type: "DELETE_EMPLOYEE", id: e.id });
                            toast({ tone: "info", title: "Employee removed", detail: e.name });
                          }}
                          className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Target attainment</span>
                        <span className="tabular font-semibold">{pct}%</span>
                      </div>
                      <Progress value={pct} tone={tone === "primary" ? "primary" : (tone as "success" | "warning" | "destructive")} />
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        <span className="tabular font-medium text-foreground">{formatAED(e.achievedSales, true)}</span> of{" "}
                        {formatAED(e.monthlyTarget, true)} ·{" "}
                        {remainingToTarget(e) > 0 ? `${formatAED(remainingToTarget(e), true)} to go` : "target met"}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                      <div>
                        <p className="tabular text-sm font-semibold">{e.deals}</p>
                        <p className="text-[11px] text-muted-foreground">Deals</p>
                      </div>
                      <div>
                        <p className="tabular text-sm font-semibold">{closingRate(e)}%</p>
                        <p className="text-[11px] text-muted-foreground">Close rate</p>
                      </div>
                      <div>
                        <p className="tabular text-sm font-semibold">{formatAED(commissionValue(e), true)}</p>
                        <p className="text-[11px] text-muted-foreground">Commission</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {e.calls} calls
                      </span>
                      <Link to={`/team/${e.id}`} className="font-medium text-primary hover:underline">
                        View profile →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pipeline / clients */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Client pipeline</h2>
          <Badge tone="secondary">{state.clients.length} deals</Badge>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active & recent deals</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-2.5 font-medium">Company</th>
                    <th className="px-5 py-2.5 font-medium">Owner</th>
                    <th className="px-5 py-2.5 font-medium">Stage</th>
                    <th className="px-5 py-2.5 text-right font-medium">Value</th>
                    <th className="px-5 py-2.5 font-medium">Last contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {state.clients.map((c) => {
                    const owner = state.employees.find((e) => e.id === c.ownerId);
                    return (
                      <tr key={c.id} className="transition-colors hover:bg-muted/40">
                        <td className="px-5 py-3">
                          <p className="font-medium">{c.company}</p>
                          <p className="text-xs text-muted-foreground">{c.name}</p>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {owner && <Avatar name={owner.name} size={22} />}
                            <span className="text-xs">{owner?.name.split(" ")[0] ?? "—"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <Badge tone={stageTone[c.stage]} className="capitalize">
                            {c.stage}
                          </Badge>
                        </td>
                        <td className="tabular px-5 py-3 text-right font-medium">{formatAED(c.value, true)}</td>
                        <td className="px-5 py-3 text-xs text-muted-foreground">{c.lastContact}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-primary/[0.04] p-4 text-sm">
        <Trophy className="h-5 w-5 text-warning" />
        <span className="text-muted-foreground">
          Full ranking, top and bottom performers, and trend charts live on the{" "}
          <Link to="/kpis" className="font-medium text-primary hover:underline">
            KPI Analytics
          </Link>{" "}
          page.
        </span>
      </div>

      <EmployeeDialog open={open} onClose={() => setOpen(false)} employee={editing} />
    </div>
  );
}
