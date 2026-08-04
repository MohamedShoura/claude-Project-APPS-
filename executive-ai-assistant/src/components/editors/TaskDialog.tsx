import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Field } from "@/components/ui/input";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import { CATEGORIES, CATEGORY_COLORS, PRIORITIES, TASK_COLORS } from "@/lib/constants";
import { cn, uid } from "@/lib/utils";
import type { Category, Priority, Task, TaskStatus } from "@/types";

const empty = (): Task => ({
  id: uid("tsk"),
  title: "",
  description: "",
  date: format(new Date(), "yyyy-MM-dd"),
  time: "09:00",
  priority: "medium",
  category: "admin",
  status: "todo",
  color: CATEGORY_COLORS.admin,
  createdAt: format(new Date(), "yyyy-MM-dd"),
});

export function TaskDialog({
  open,
  onClose,
  task,
  presetDate,
}: {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  presetDate?: string;
}) {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const [draft, setDraft] = useState<Task>(empty());

  useEffect(() => {
    if (open) setDraft(task ? { ...task } : { ...empty(), date: presetDate ?? empty().date });
  }, [open, task, presetDate]);

  const set = <K extends keyof Task>(k: K, v: Task[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const save = () => {
    if (!draft.title.trim()) {
      toast({ tone: "warning", title: "Add a title", detail: "A task needs a name to be saved." });
      return;
    }
    dispatch({ type: "UPSERT_TASK", task: draft });
    toast({ tone: "success", title: task ? "Task updated" : "Task added", detail: draft.title });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={task ? "Edit task" : "New task"}
      description="Schedule work, assign an owner, and set its priority."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>{task ? "Save changes" : "Add task"}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Title">
          <Input value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Send revised proposal" />
        </Field>
        <Field label="Description">
          <Textarea value={draft.description} onChange={(e) => set("description", e.target.value)} placeholder="Optional details…" />
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
          <Field label="Assign to">
            <Select value={draft.assignedTo ?? ""} onChange={(e) => set("assignedTo", e.target.value || undefined)}>
              <option value="">Unassigned</option>
              {state.employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={draft.status} onChange={(e) => set("status", e.target.value as TaskStatus)}>
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </Select>
          </Field>
        </div>
        <Field label="Color">
          <div className="flex flex-wrap gap-2">
            {TASK_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => set("color", c)}
                className={cn(
                  "h-7 w-7 rounded-full ring-offset-2 ring-offset-card transition-transform hover:scale-110",
                  draft.color === c && "ring-2 ring-foreground",
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
