import { useMemo, useState } from "react";
import { format, isPast, parseISO } from "date-fns";
import {
  Plus,
  Video,
  MapPin,
  Users,
  Wand2,
  Check,
  Trash2,
  FileText,
  CalendarClock,
  Building2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea, Select, Field } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/misc";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import { cn, uid } from "@/lib/utils";
import type { Meeting, MeetingStatus } from "@/types";

const statusTone: Record<MeetingStatus, "default" | "success" | "warning" | "secondary"> = {
  scheduled: "default",
  in_progress: "warning",
  completed: "success",
  cancelled: "secondary",
};

export default function Meetings() {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const meetings = useMemo(
    () => [...state.meetings].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [state.meetings],
  );
  const [selectedId, setSelectedId] = useState<string | null>(meetings[0]?.id ?? null);
  const selected = meetings.find((m) => m.id === selectedId) ?? null;

  const save = (m: Meeting) => dispatch({ type: "UPSERT_MEETING", meeting: m });

  const createMeeting = () => {
    const m: Meeting = {
      id: uid("mtg"),
      name: "Untitled meeting",
      participants: [],
      agenda: "",
      notes: "",
      actionItems: [],
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00",
      durationMin: 30,
      status: "scheduled",
      location: "",
    };
    save(m);
    setSelectedId(m.id);
    toast({ tone: "success", title: "Meeting created", detail: "Fill in the details on the right." });
  };

  const convertNotes = (m: Meeting) => {
    const lines = (m.notes ?? "")
      .split("\n")
      .map((l) => l.trim().replace(/^[-*•]\s*/, ""))
      .filter(Boolean);
    if (lines.length === 0) {
      toast({ tone: "warning", title: "No notes to convert", detail: "Write meeting notes first." });
      return;
    }
    const newItems = lines.map((text) => ({ id: uid("ai"), text, done: false }));
    save({ ...m, actionItems: [...m.actionItems, ...newItems] });
    toast({ tone: "success", title: "Action items created", detail: `${newItems.length} item(s) added from notes.` });
  };

  return (
    <div>
      <PageHeader
        title="Meeting Manager"
        subtitle="Agendas, notes, and action items — turn conversations into follow-through."
        actions={
          <Button onClick={createMeeting}>
            <Plus className="h-4 w-4" /> New meeting
          </Button>
        }
      />

      {meetings.length === 0 ? (
        <EmptyState
          icon={<Video className="h-8 w-8" />}
          title="No meetings yet"
          hint="Create a meeting to capture its agenda and action items."
          action={<Button onClick={createMeeting}>New meeting</Button>}
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          {/* List */}
          <div className="flex flex-col gap-2">
            {meetings.map((m) => {
              const past = isPast(parseISO(`${m.date}T${m.time}`)) && m.status !== "scheduled";
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-xl border p-3.5 text-left transition-colors",
                    m.id === selectedId ? "border-primary bg-primary/[0.05]" : "border-border bg-card hover:bg-muted/50",
                    past && "opacity-70",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">{m.name}</p>
                    <Badge tone={statusTone[m.status]} className="shrink-0 capitalize">
                      {m.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="h-3 w-3" /> {format(parseISO(m.date), "MMM d")} · {m.time}
                    </span>
                    {m.company && (
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {m.company}
                      </span>
                    )}
                  </div>
                  {m.actionItems.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {m.actionItems.filter((a) => a.done).length}/{m.actionItems.length} action items done
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail */}
          {selected && <MeetingDetail meeting={selected} onSave={save} onConvert={convertNotes} />}
        </div>
      )}
    </div>
  );
}

function MeetingDetail({
  meeting,
  onSave,
  onConvert,
}: {
  meeting: Meeting;
  onSave: (m: Meeting) => void;
  onConvert: (m: Meeting) => void;
}) {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const set = <K extends keyof Meeting>(k: K, v: Meeting[K]) => onSave({ ...meeting, [k]: v });

  const toggleItem = (id: string) =>
    onSave({
      ...meeting,
      actionItems: meeting.actionItems.map((a) => (a.id === id ? { ...a, done: !a.done } : a)),
    });
  const removeItem = (id: string) =>
    onSave({ ...meeting, actionItems: meeting.actionItems.filter((a) => a.id !== id) });
  const [newItem, setNewItem] = useState("");
  const addItem = () => {
    if (!newItem.trim()) return;
    onSave({ ...meeting, actionItems: [...meeting.actionItems, { id: uid("ai"), text: newItem.trim(), done: false }] });
    setNewItem("");
  };

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <Input
            value={meeting.name}
            onChange={(e) => set("name", e.target.value)}
            className="h-auto border-0 bg-transparent px-0 text-lg font-semibold focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              dispatch({ type: "DELETE_MEETING", id: meeting.id });
              toast({ tone: "info", title: "Meeting deleted" });
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Date">
            <Input type="date" value={meeting.date} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Time">
            <Input type="time" value={meeting.time} onChange={(e) => set("time", e.target.value)} />
          </Field>
          <Field label="Company">
            <Input value={meeting.company ?? ""} onChange={(e) => set("company", e.target.value)} placeholder="Client / company" />
          </Field>
          <Field label="Status">
            <Select value={meeting.status} onChange={(e) => set("status", e.target.value as MeetingStatus)}>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </Field>
          <Field label="Location">
            <Input value={meeting.location ?? ""} onChange={(e) => set("location", e.target.value)} placeholder="Room / platform" />
          </Field>
          <Field label="Meeting link">
            <Input value={meeting.link ?? ""} onChange={(e) => set("link", e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="Agenda" className="sm:col-span-2">
            <Textarea value={meeting.agenda ?? ""} onChange={(e) => set("agenda", e.target.value)} placeholder="What will you cover?" />
          </Field>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" /> Participants
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {state.employees.map((e) => {
              const on = meeting.participants.includes(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() =>
                    set(
                      "participants",
                      on ? meeting.participants.filter((p) => p !== e.id) : [...meeting.participants, e.id],
                    )
                  }
                  className={cn(
                    "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-medium transition-colors",
                    on ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Avatar name={e.name} size={22} />
                  {e.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
          {meeting.externalParticipants && meeting.externalParticipants.length > 0 && (
            <p className="text-xs text-muted-foreground">
              External: {meeting.externalParticipants.join(", ")}
            </p>
          )}
          {meeting.location && (
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {meeting.location}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Notes → action items */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" /> Notes
          </CardTitle>
          <Button size="sm" variant="secondary" onClick={() => onConvert(meeting)}>
            <Wand2 className="h-3.5 w-3.5" /> Convert notes to tasks
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            value={meeting.notes ?? ""}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Jot down decisions and next steps, one per line…"
            className="min-h-[120px]"
          />

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Action items ({meeting.actionItems.filter((a) => a.done).length}/{meeting.actionItems.length})
            </p>
            <div className="flex flex-col gap-1.5">
              {meeting.actionItems.map((a) => (
                <div key={a.id} className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/30 p-2.5">
                  <button
                    onClick={() => toggleItem(a.id)}
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      a.done ? "border-success bg-success text-success-foreground" : "border-muted-foreground/40",
                    )}
                    aria-label="Toggle"
                  >
                    {a.done && <Check className="h-3 w-3" />}
                  </button>
                  <span className={cn("flex-1 text-sm", a.done && "line-through text-muted-foreground")}>{a.text}</span>
                  <button onClick={() => removeItem(a.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="Add an action item…"
              />
              <Button onClick={addItem} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {meeting.files && meeting.files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meeting.files.map((f) => (
                <Badge key={f} tone="secondary">
                  <FileText className="h-3 w-3" /> {f}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
