import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import {
  Plus,
  BellRing,
  MapPin,
  Video,
  Paperclip,
  Repeat,
  Check,
  Pencil,
  Trash2,
  Volume2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { Tabs } from "@/components/ui/tabs";
import { ReminderDialog } from "@/components/editors/ReminderDialog";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import { LEAD_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Reminder } from "@/types";

const leadLabel = (m: number) => LEAD_OPTIONS.find((o) => o.value === m)?.label ?? `${m}m`;

export default function Reminders() {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Reminder | null>(null);
  const [filter, setFilter] = useState("all");

  const reminders = useMemo(
    () =>
      [...state.reminders]
        .filter((r) => (filter === "all" ? true : r.status === filter))
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [state.reminders, filter],
  );

  const edit = (r: Reminder) => {
    setEditing(r);
    setOpen(true);
  };
  const create = () => {
    setEditing(null);
    setOpen(true);
  };
  const complete = (r: Reminder) => {
    dispatch({
      type: "UPSERT_REMINDER",
      reminder: { ...r, status: r.status === "done" ? "scheduled" : "done" },
    });
  };
  const remove = (r: Reminder) => {
    dispatch({ type: "DELETE_REMINDER", id: r.id });
    toast({ tone: "info", title: "Reminder deleted", detail: r.title });
  };

  const counts = {
    all: state.reminders.length,
    scheduled: state.reminders.filter((r) => r.status === "scheduled").length,
    done: state.reminders.filter((r) => r.status === "done").length,
  };

  return (
    <div>
      <PageHeader
        title="Reminders"
        subtitle="Never miss a call, deadline, or renewal — with alerts ahead of time."
        actions={
          <Button onClick={create}>
            <Plus className="h-4 w-4" /> New reminder
          </Button>
        }
      />

      <Tabs
        className="mb-5"
        value={filter}
        onChange={setFilter}
        items={[
          { key: "all", label: `All · ${counts.all}` },
          { key: "scheduled", label: `Scheduled · ${counts.scheduled}` },
          { key: "done", label: `Done · ${counts.done}` },
        ]}
      />

      {reminders.length === 0 ? (
        <EmptyState
          icon={<BellRing className="h-8 w-8" />}
          title="No reminders here"
          hint="Create a reminder to get alerted before it's due."
          action={
            <Button onClick={create}>
              <Plus className="h-4 w-4" /> New reminder
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3">
          {reminders.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={cn("flex items-start gap-4 p-4", r.status === "done" && "opacity-70")}>
                <button
                  onClick={() => complete(r)}
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    r.status === "done"
                      ? "border-success bg-success text-success-foreground"
                      : "border-border hover:border-primary",
                  )}
                  aria-label={r.status === "done" ? "Mark as scheduled" : "Mark as done"}
                >
                  {r.status === "done" && <Check className="h-3.5 w-3.5" />}
                </button>

                <span className="mt-1 h-full w-1 shrink-0 self-stretch rounded-full" style={{ background: r.color }} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={cn("font-medium", r.status === "done" && "line-through")}>{r.title}</p>
                    <PriorityBadge priority={r.priority} />
                    {r.repeat !== "none" && (
                      <Badge tone="secondary" className="capitalize">
                        <Repeat className="h-3 w-3" /> {r.repeat}
                      </Badge>
                    )}
                  </div>
                  {r.description && <p className="mt-0.5 text-sm text-muted-foreground">{r.description}</p>}

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="tabular font-medium text-foreground">
                      {format(parseISO(r.date), "EEE, MMM d")} · {r.time}
                    </span>
                    {r.leadMinutes.map((m) => (
                      <span key={m} className="inline-flex items-center gap-1">
                        <BellRing className="h-3 w-3" /> {leadLabel(m)}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1">
                      <Volume2 className="h-3 w-3" /> {r.sound}
                    </span>
                    {r.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {r.location}
                      </span>
                    )}
                    {r.meetingLink && (
                      <a
                        href={r.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Video className="h-3 w-3" /> Join
                      </a>
                    )}
                    {r.attachment && (
                      <span className="inline-flex items-center gap-1">
                        <Paperclip className="h-3 w-3" /> {r.attachment}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button size="icon" variant="ghost" onClick={() => edit(r)} aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(r)} aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <ReminderDialog open={open} onClose={() => setOpen(false)} reminder={editing} />
    </div>
  );
}
