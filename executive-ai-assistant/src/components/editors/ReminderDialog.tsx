import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Paperclip } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Field } from "@/components/ui/input";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  LEAD_OPTIONS,
  PRIORITIES,
  REMINDER_SOUNDS,
  TASK_COLORS,
} from "@/lib/constants";
import { cn, uid } from "@/lib/utils";
import type { Category, LeadMinutes, Priority, Reminder, RepeatRule } from "@/types";

const empty = (): Reminder => ({
  id: uid("rem"),
  title: "",
  description: "",
  date: format(new Date(), "yyyy-MM-dd"),
  time: "09:00",
  priority: "medium",
  category: "personal",
  color: CATEGORY_COLORS.personal,
  sound: "Chime",
  repeat: "none",
  location: "",
  meetingLink: "",
  status: "scheduled",
  leadMinutes: [30],
  createdAt: format(new Date(), "yyyy-MM-dd"),
});

export function ReminderDialog({
  open,
  onClose,
  reminder,
}: {
  open: boolean;
  onClose: () => void;
  reminder?: Reminder | null;
}) {
  const { dispatch } = useApp();
  const toast = useToast();
  const [draft, setDraft] = useState<Reminder>(empty());

  useEffect(() => {
    if (open) setDraft(reminder ? { ...reminder } : empty());
  }, [open, reminder]);

  const set = <K extends keyof Reminder>(k: K, v: Reminder[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const toggleLead = (m: LeadMinutes) =>
    setDraft((d) => ({
      ...d,
      leadMinutes: d.leadMinutes.includes(m)
        ? d.leadMinutes.filter((x) => x !== m)
        : [...d.leadMinutes, m].sort((a, b) => a - b),
    }));

  const save = () => {
    if (!draft.title.trim()) {
      toast({ tone: "warning", title: "Add a title", detail: "A reminder needs a name." });
      return;
    }
    dispatch({ type: "UPSERT_REMINDER", reminder: draft });
    toast({ tone: "success", title: reminder ? "Reminder updated" : "Reminder set", detail: `${draft.date} at ${draft.time}` });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={reminder ? "Edit reminder" : "New reminder"}
      description="Get alerted ahead of time, with sound and repeat options."
      className="sm:max-w-xl"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>{reminder ? "Save changes" : "Set reminder"}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Title">
          <Input value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Call the client" />
        </Field>
        <Field label="Description">
          <Textarea value={draft.description} onChange={(e) => set("description", e.target.value)} placeholder="Optional notes…" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <Input type="date" value={draft.date} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Time">
            <Input type="time" value={draft.time} onChange={(e) => set("time", e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Priority">
            <Select value={draft.priority} onChange={(e) => set("priority", e.target.value as Priority)}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p} className="capitalize">
                  {p}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Category">
            <Select
              value={draft.category}
              onChange={(e) => {
                const c = e.target.value as Category;
                set("category", c);
                set("color", CATEGORY_COLORS[c]);
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Sound">
            <Select value={draft.sound} onChange={(e) => set("sound", e.target.value)}>
              {REMINDER_SOUNDS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Repeat">
            <Select value={draft.repeat} onChange={(e) => set("repeat", e.target.value as RepeatRule)}>
              <option value="none">Does not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
          </Field>
        </div>
        <Field label="Alert me before">
          <div className="flex flex-wrap gap-2">
            {LEAD_OPTIONS.map((o) => {
              const active = draft.leadMinutes.includes(o.value as LeadMinutes);
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggleLead(o.value as LeadMinutes)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Location">
            <Input value={draft.location} onChange={(e) => set("location", e.target.value)} placeholder="Optional" />
          </Field>
          <Field label="Meeting link">
            <Input value={draft.meetingLink} onChange={(e) => set("meetingLink", e.target.value)} placeholder="https://…" />
          </Field>
        </div>
        <Field label="Attachment">
          <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 text-sm text-muted-foreground hover:bg-muted">
            <Paperclip className="h-4 w-4" />
            <span className="flex-1 truncate">{draft.attachment || "Attach a file (mock)"}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => set("attachment", e.target.files?.[0]?.name)}
            />
          </label>
        </Field>
        <Field label="Color">
          <div className="flex flex-wrap gap-2">
            {TASK_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => set("color", c)}
                className={cn(
                  "h-7 w-7 rounded-full transition-transform hover:scale-110",
                  draft.color === c && "ring-2 ring-foreground ring-offset-2 ring-offset-card",
                )}
                style={{ background: c }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
        </Field>
      </div>
    </Dialog>
  );
}
