import { differenceInCalendarDays, format, isToday, parseISO } from "date-fns";
import type {
  AppNotification,
  AppState,
  Client,
  Employee,
  Meeting,
  Task,
} from "@/types";
import { formatAED, uid } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Derived analytics + the rule-based "AI" engines.
 * These functions are pure: given the app state (and "now"), they produce
 * notifications, insights, and follow-up suggestions. Swapping the rule
 * engine for a real LLM call later means replacing only this file.
 * ------------------------------------------------------------------ */

export interface Insight {
  id: string;
  tone: "positive" | "warning" | "critical" | "info";
  text: string;
}

export interface FollowUp {
  id: string;
  title: string;
  detail: string;
  priority: "low" | "medium" | "high" | "urgent";
}

const today = () => new Date();

export function performancePct(e: Employee): number {
  return Math.round((e.achievedSales / e.monthlyTarget) * 100);
}

export function closingRate(e: Employee): number {
  if (e.meetings === 0) return 0;
  return Math.round((e.deals / e.meetings) * 100);
}

export function commissionValue(e: Employee): number {
  return Math.round(e.achievedSales * e.commissionRate);
}

export function remainingToTarget(e: Employee): number {
  return Math.max(0, e.monthlyTarget - e.achievedSales);
}

/** Aggregate top-line KPIs across the whole team. */
export function teamKpis(state: AppState) {
  const emp = state.employees;
  const sales = sum(emp, (e) => e.achievedSales);
  const target = sum(emp, (e) => e.monthlyTarget);
  const collection = sum(emp, (e) => e.collection);
  const calls = sum(emp, (e) => e.calls);
  const meetings = sum(emp, (e) => e.meetings);
  const deals = sum(emp, (e) => e.deals);
  const pipeline = sum(state.clients, (c) => (c.stage === "won" || c.stage === "lost" ? 0 : c.value));
  const conversion = meetings ? Math.round((deals / meetings) * 100) : 0;
  const attainment = target ? Math.round((sales / target) * 100) : 0;
  return { sales, target, collection, calls, meetings, deals, pipeline, conversion, attainment };
}

export function ranked(state: AppState): Employee[] {
  return [...state.employees].sort((a, b) => performancePct(b) - performancePct(a));
}

export function topPerformer(state: AppState): Employee | undefined {
  return ranked(state)[0];
}
export function worstPerformer(state: AppState): Employee | undefined {
  return ranked(state).at(-1);
}

/** A 0..100 productivity score for the executive, from today's task hygiene. */
export function productivityScore(state: AppState): number {
  const todays = state.tasks.filter((t) => isToday(parseISO(t.date)));
  if (todays.length === 0) return 78;
  const done = todays.filter((t) => t.status === "done").length;
  const overdue = overdueTasks(state).length;
  const base = (done / todays.length) * 100;
  return Math.max(0, Math.min(100, Math.round(base - overdue * 6 + 30)));
}

export function overdueTasks(state: AppState): Task[] {
  const now = today();
  return state.tasks.filter(
    (t) =>
      t.status !== "done" &&
      differenceInCalendarDays(now, parseISO(t.date)) > 0,
  );
}

export function todaysMeetings(state: AppState): Meeting[] {
  return state.meetings
    .filter((m) => isToday(parseISO(m.date)) && m.status !== "cancelled")
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function staleClients(state: AppState, days = 5): Client[] {
  const now = today();
  return state.clients
    .filter(
      (c) =>
        c.stage !== "won" &&
        c.stage !== "lost" &&
        differenceInCalendarDays(now, parseISO(c.lastContact)) >= days,
    )
    .sort(
      (a, b) =>
        differenceInCalendarDays(now, parseISO(b.lastContact)) -
        differenceInCalendarDays(now, parseISO(a.lastContact)),
    );
}

function sum<T>(arr: T[], f: (x: T) => number): number {
  return arr.reduce((acc, x) => acc + f(x), 0);
}

/* --------------------------- Notifications --------------------------- */

export function buildNotifications(state: AppState): AppNotification[] {
  const out: AppNotification[] = [];
  const now = today();

  for (const m of todaysMeetings(state)) {
    if (m.status === "scheduled") {
      out.push({
        id: `ntf_mtg_${m.id}`,
        kind: "meeting",
        title: `Meeting at ${m.time}`,
        detail: m.name,
        time: now.toISOString(),
        read: false,
        priority: "high",
        href: "/meetings",
      });
    }
  }

  for (const t of overdueTasks(state)) {
    out.push({
      id: `ntf_task_${t.id}`,
      kind: "task_late",
      title: "Task overdue",
      detail: t.title,
      time: now.toISOString(),
      read: false,
      priority: t.priority,
      href: "/planner",
    });
  }

  for (const e of state.employees) {
    if (performancePct(e) < 70) {
      out.push({
        id: `ntf_target_${e.id}`,
        kind: "target_alert",
        title: `${e.name.split(" ")[0]} behind target`,
        detail: `${performancePct(e)}% attainment — needs ${formatAED(remainingToTarget(e), true)} more`,
        time: now.toISOString(),
        read: false,
        priority: "high",
        href: `/team/${e.id}`,
      });
    }
  }

  for (const c of staleClients(state, 5)) {
    out.push({
      id: `ntf_follow_${c.id}`,
      kind: "follow_up",
      title: "Overdue follow-up",
      detail: `${c.company} — ${differenceInCalendarDays(now, parseISO(c.lastContact))} days since last contact`,
      time: now.toISOString(),
      read: false,
      priority: c.priority,
      href: "/team",
    });
  }

  for (const c of state.clients) {
    if (c.nextRenewal) {
      const days = differenceInCalendarDays(parseISO(c.nextRenewal), now);
      if (days >= 0 && days <= 14) {
        out.push({
          id: `ntf_renew_${c.id}`,
          kind: "renewal",
          title: "Contract renewal soon",
          detail: `${c.company} renews in ${days} day${days === 1 ? "" : "s"} (${formatAED(c.value, true)})`,
          time: now.toISOString(),
          read: false,
          priority: days <= 5 ? "urgent" : "medium",
          href: "/team",
        });
      }
    }
  }

  for (const r of state.reminders) {
    if (r.status === "missed") {
      out.push({
        id: `ntf_rem_${r.id}`,
        kind: "reminder_missed",
        title: "Missed reminder",
        detail: r.title,
        time: now.toISOString(),
        read: false,
        priority: r.priority,
        href: "/reminders",
      });
    }
  }

  const order = { urgent: 0, high: 1, medium: 2, low: 3 } as const;
  return out.sort((a, b) => order[a.priority] - order[b.priority]);
}

/* ------------------------------ Insights ----------------------------- */

export function buildInsights(state: AppState): Insight[] {
  const out: Insight[] = [];
  const k = teamKpis(state);

  // Month-over-month change from history (last two team totals).
  const totalsByMonth = aggregateMonthlySales(state);
  if (totalsByMonth.length >= 2) {
    const last = totalsByMonth.at(-1)!.sales;
    const prev = totalsByMonth.at(-2)!.sales;
    const pct = prev ? Math.round(((last - prev) / prev) * 100) : 0;
    out.push({
      id: uid("ins"),
      tone: pct >= 0 ? "positive" : "warning",
      text:
        pct >= 0
          ? `Team sales are up ${pct}% month over month.`
          : `Team sales are down ${Math.abs(pct)}% month over month — worth a pipeline review.`,
    });
  }

  const behind = state.employees.filter((e) => performancePct(e) < 90);
  for (const e of behind.slice(0, 1)) {
    out.push({
      id: uid("ins"),
      tone: performancePct(e) < 70 ? "critical" : "warning",
      text: `${e.name.split(" ")[0]} needs only ${formatAED(remainingToTarget(e), true)} to reach target.`,
    });
  }

  const worstFollow = staleClients(state, 5)[0];
  if (worstFollow) {
    const owner = state.employees.find((e) => e.id === worstFollow.ownerId);
    out.push({
      id: uid("ins"),
      tone: "warning",
      text: `${owner?.name.split(" ")[0] ?? "Someone"} has an overdue follow-up with ${worstFollow.company}.`,
    });
  }

  const mtgs = todaysMeetings(state);
  if (mtgs.length) {
    out.push({
      id: uid("ins"),
      tone: "info",
      text: `You have ${mtgs.length} meeting${mtgs.length === 1 ? "" : "s"} today — the first is at ${mtgs[0].time}.`,
    });
  }

  out.push({
    id: uid("ins"),
    tone: "info",
    text: `Open pipeline stands at ${formatAED(k.pipeline, true)} across ${state.clients.filter((c) => c.stage !== "won" && c.stage !== "lost").length} active deals.`,
  });

  return out;
}

/* ---------------------------- Follow-ups ----------------------------- */

export function buildFollowUps(state: AppState): FollowUp[] {
  const out: FollowUp[] = [];

  const stale = staleClients(state, 4);
  for (const c of stale.slice(0, 3)) {
    const owner = state.employees.find((e) => e.id === c.ownerId);
    out.push({
      id: uid("fu"),
      title: `Call ${c.company}`,
      detail: `Owned by ${owner?.name ?? "—"} · ${differenceInCalendarDays(today(), parseISO(c.lastContact))} days quiet · ${formatAED(c.value, true)} deal`,
      priority: c.priority,
    });
  }

  const behind = [...state.employees]
    .filter((e) => performancePct(e) < 80)
    .sort((a, b) => performancePct(a) - performancePct(b))[0];
  if (behind) {
    out.push({
      id: uid("fu"),
      title: `Coach ${behind.name.split(" ")[0]}`,
      detail: `${performancePct(behind)}% to target — schedule a pipeline 1:1`,
      priority: "high",
    });
  }

  const prep = todaysMeetings(state).find((m) => !m.notes && m.status === "scheduled");
  if (prep) {
    out.push({
      id: uid("fu"),
      title: `Prep for "${prep.name}"`,
      detail: `At ${prep.time} · no notes yet — add an agenda before it starts`,
      priority: "high",
    });
  }

  const od = overdueTasks(state)[0];
  if (od) {
    out.push({
      id: uid("fu"),
      title: `Clear overdue task`,
      detail: od.title,
      priority: od.priority,
    });
  }

  return out;
}

/* ------------------------- Chart aggregations ------------------------ */

export function aggregateMonthlySales(state: AppState) {
  const map = new Map<string, { sales: number; target: number; collection: number }>();
  const order: string[] = [];
  for (const e of state.employees) {
    for (const h of e.history) {
      if (!map.has(h.month)) {
        map.set(h.month, { sales: 0, target: 0, collection: 0 });
        order.push(h.month);
      }
      const agg = map.get(h.month)!;
      agg.sales += h.sales;
      agg.target += h.target;
      agg.collection += h.collection;
    }
  }
  return order.map((m) => ({ month: m, ...map.get(m)! }));
}

export function pipelineByStage(state: AppState) {
  const stages: { key: Client["stage"]; label: string }[] = [
    { key: "lead", label: "Lead" },
    { key: "qualified", label: "Qualified" },
    { key: "proposal", label: "Proposal" },
    { key: "negotiation", label: "Negotiation" },
    { key: "won", label: "Won" },
  ];
  return stages.map((s) => ({
    stage: s.label,
    value: sum(
      state.clients.filter((c) => c.stage === s.key),
      (c) => c.value,
    ),
    count: state.clients.filter((c) => c.stage === s.key).length,
  }));
}

export function departmentSplit(state: AppState) {
  const map = new Map<string, number>();
  for (const e of state.employees) {
    map.set(e.department, (map.get(e.department) ?? 0) + e.achievedSales);
  }
  return [...map.entries()].map(([name, value]) => ({ name, value }));
}

export const fmtDay = (d: Date) => format(d, "EEEE, MMMM d");
