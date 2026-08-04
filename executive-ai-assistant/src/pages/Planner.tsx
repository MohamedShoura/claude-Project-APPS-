import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ListChecks,
  Clock3,
  LayoutGrid,
  Pencil,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/misc";
import { TaskDialog } from "@/components/editors/TaskDialog";
import { useApp } from "@/store/AppContext";
import { cn } from "@/lib/utils";
import type { Task, ViewMode } from "@/types";

const iso = (d: Date) => format(d, "yyyy-MM-dd");

/** A draggable task chip; dropping it onto a day reschedules it. */
function TaskChip({
  task,
  onEdit,
  compact,
}: {
  task: Task;
  onEdit: (t: Task) => void;
  compact?: boolean;
}) {
  const { dispatch } = useApp();
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
      onClick={() => onEdit(task)}
      className={cn(
        "group cursor-grab rounded-lg border border-border bg-card p-2 text-left shadow-soft transition-shadow hover:shadow-card active:cursor-grabbing",
        task.status === "done" && "opacity-60",
      )}
      style={{ borderLeft: `3px solid ${task.color}` }}
    >
      <div className="flex items-center gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: "UPSERT_TASK",
              task: { ...task, status: task.status === "done" ? "todo" : "done" },
            });
          }}
          className={cn(
            "h-3.5 w-3.5 shrink-0 rounded-full border-2",
            task.status === "done" ? "border-success bg-success" : "border-muted-foreground/40",
          )}
          aria-label="Toggle done"
        />
        <p className={cn("flex-1 truncate text-xs font-medium", task.status === "done" && "line-through")}>
          {task.title}
        </p>
      </div>
      {!compact && (
        <p className="tabular mt-1 pl-5 text-[11px] text-muted-foreground">{task.time}</p>
      )}
    </div>
  );
}

function DayColumn({
  day,
  tasks,
  onEdit,
  onAdd,
}: {
  day: Date;
  tasks: Task[];
  onEdit: (t: Task) => void;
  onAdd: (date: string) => void;
}) {
  const { dispatch } = useApp();
  const [over, setOver] = useState(false);
  const dayTasks = tasks
    .filter((t) => isSameDay(parseISO(t.date), day))
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain");
        const t = tasks.find((x) => x.id === id);
        if (t) dispatch({ type: "UPSERT_TASK", task: { ...t, date: iso(day) } });
      }}
      className={cn(
        "flex min-h-[220px] flex-col gap-2 rounded-xl border p-2 transition-colors",
        over ? "border-primary bg-primary/5" : "border-border bg-muted/30",
      )}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium uppercase text-muted-foreground">{format(day, "EEE")}</span>
          <span
            className={cn(
              "tabular text-sm font-semibold",
              isToday(day) && "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground",
            )}
          >
            {format(day, "d")}
          </span>
        </div>
        <button
          onClick={() => onAdd(iso(day))}
          className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
          aria-label="Add task"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        {dayTasks.map((t) => (
          <TaskChip key={t.id} task={t} onEdit={onEdit} compact />
        ))}
      </div>
    </div>
  );
}

export default function Planner() {
  const { state } = useApp();
  const [view, setView] = useState<ViewMode>(state.settings.defaultView === "calendar" ? "month" : state.settings.defaultView);
  const [cursor, setCursor] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [presetDate, setPresetDate] = useState<string | undefined>();

  const tasks = state.tasks;

  const openEdit = (t: Task) => {
    setEditing(t);
    setPresetDate(undefined);
    setDialogOpen(true);
  };
  const openNew = (date?: string) => {
    setEditing(null);
    setPresetDate(date);
    setDialogOpen(true);
  };

  const weekDays = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(cursor, { weekStartsOn: 0 }),
        end: endOfWeek(cursor, { weekStartsOn: 0 }),
      }),
    [cursor],
  );

  const monthGrid = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 }),
        end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 }),
      }),
    [cursor],
  );

  const agenda = useMemo(() => {
    const groups = new Map<string, Task[]>();
    [...tasks]
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
      .forEach((t) => {
        const list = groups.get(t.date) ?? [];
        list.push(t);
        groups.set(t.date, list);
      });
    return [...groups.entries()];
  }, [tasks]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00–19:00
  const todayTasks = tasks
    .filter((t) => isSameDay(parseISO(t.date), new Date()))
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));

  const shift = (dir: number) => {
    if (view === "month") setCursor((c) => (dir > 0 ? addDays(endOfMonth(c), 1) : addDays(startOfMonth(c), -1)));
    else setCursor((c) => addWeeks(c, dir));
  };

  const rangeLabel =
    view === "month"
      ? format(cursor, "MMMM yyyy")
      : `${format(weekDays[0], "MMM d")} – ${format(weekDays[6], "MMM d")}`;

  return (
    <div>
      <PageHeader
        title="Daily Planner"
        subtitle="Plan your day and week. Drag tasks between days to reschedule."
        actions={
          <Button onClick={() => openNew()}>
            <Plus className="h-4 w-4" /> Add task
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={view}
          onChange={(v) => setView(v as ViewMode)}
          items={[
            { key: "timeline", label: "Timeline", icon: <Clock3 className="h-3.5 w-3.5" /> },
            { key: "agenda", label: "Agenda", icon: <ListChecks className="h-3.5 w-3.5" /> },
            { key: "week", label: "Week", icon: <CalendarDays className="h-3.5 w-3.5" /> },
            { key: "month", label: "Month", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
          ]}
        />
        {(view === "week" || view === "month") && (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={() => shift(-1)} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[9rem] text-center text-sm font-medium">{rangeLabel}</span>
            <Button size="icon" variant="outline" onClick={() => shift(1)} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Timeline (today) */}
      {view === "timeline" && (
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">{format(new Date(), "EEEE, MMMM d")}</h3>
          {todayTasks.length === 0 ? (
            <EmptyState
              icon={<Clock3 className="h-8 w-8" />}
              title="Nothing scheduled today"
              hint="Add a task to fill your timeline."
              action={<Button onClick={() => openNew(iso(new Date()))}>Add task</Button>}
            />
          ) : (
            <div className="relative">
              {hours.map((h) => {
                const slot = todayTasks.filter((t) => Number((t.time ?? "00:00").split(":")[0]) === h);
                return (
                  <div key={h} className="flex gap-4 border-t border-border py-2 first:border-t-0">
                    <span className="tabular w-14 shrink-0 pt-1 text-xs font-medium text-muted-foreground">
                      {String(h).padStart(2, "0")}:00
                    </span>
                    <div className="flex flex-1 flex-col gap-2">
                      {slot.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => openEdit(t)}
                          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left shadow-soft transition-shadow hover:shadow-card"
                          style={{ borderLeft: `3px solid ${t.color}` }}
                        >
                          <div className="flex-1">
                            <p className={cn("text-sm font-medium", t.status === "done" && "line-through opacity-60")}>
                              {t.title}
                            </p>
                            <p className="text-xs capitalize text-muted-foreground">
                              {t.time} · {t.category.replace("_", " ")}
                            </p>
                          </div>
                          <PriorityBadge priority={t.priority} />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}

      {/* Agenda */}
      {view === "agenda" && (
        <div className="flex flex-col gap-5">
          {agenda.length === 0 ? (
            <EmptyState icon={<ListChecks className="h-8 w-8" />} title="No tasks yet" />
          ) : (
            agenda.map(([date, list]) => (
              <div key={date}>
                <div className="mb-2 flex items-center gap-2">
                  <p className={cn("text-sm font-semibold", isToday(parseISO(date)) && "text-primary")}>
                    {format(parseISO(date), "EEEE, MMMM d")}
                  </p>
                  {isToday(parseISO(date)) && <span className="text-xs text-primary">Today</span>}
                </div>
                <Card className="divide-y divide-border">
                  {list.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => openEdit(t)}
                      className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-muted/50"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.color }} />
                      <span className="tabular w-14 shrink-0 text-xs text-muted-foreground">{t.time}</span>
                      <span className={cn("flex-1 text-sm font-medium", t.status === "done" && "line-through opacity-60")}>
                        {t.title}
                      </span>
                      <PriorityBadge priority={t.priority} />
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </Card>
              </div>
            ))
          )}
        </div>
      )}

      {/* Week */}
      {view === "week" && (
        <div className="group grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {weekDays.map((d) => (
            <DayColumn key={iso(d)} day={d} tasks={tasks} onEdit={openEdit} onAdd={openNew} />
          ))}
        </div>
      )}

      {/* Month */}
      {view === "month" && (
        <Card className="overflow-hidden p-2">
          <div className="grid grid-cols-7 border-b border-border pb-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <span key={d} className="text-xs font-medium text-muted-foreground">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthGrid.map((d) => {
              const dayTasks = tasks.filter((t) => isSameDay(parseISO(t.date), d));
              return (
                <motion.button
                  key={iso(d)}
                  onClick={() => openNew(iso(d))}
                  whileHover={{ scale: 0.98 }}
                  className={cn(
                    "flex min-h-[92px] flex-col gap-1 border-b border-r border-border p-1.5 text-left transition-colors hover:bg-muted/50",
                    !isSameMonth(d, cursor) && "bg-muted/20 text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "tabular ml-auto text-xs font-medium",
                      isToday(d) && "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
                    )}
                  >
                    {format(d, "d")}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {dayTasks.slice(0, 3).map((t) => (
                      <span
                        key={t.id}
                        className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
                        style={{ background: t.color }}
                      >
                        {t.title}
                      </span>
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{dayTasks.length - 3} more</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Card>
      )}

      <TaskDialog open={dialogOpen} onClose={() => setDialogOpen(false)} task={editing} presetDate={presetDate} />
    </div>
  );
}
