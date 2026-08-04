import { useState } from "react";
import { RotateCcw, Palette, Bell, Clock, Languages, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, Input, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/misc";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import { LEAD_OPTIONS } from "@/lib/constants";
import type { LeadMinutes, ViewMode } from "@/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Row({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { state, dispatch, toggleTheme } = useApp();
  const s = state.settings;
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const patch = (p: Partial<typeof s>) => dispatch({ type: "UPDATE_SETTINGS", patch: p });

  const toggleWeekend = (day: string) =>
    patch({
      weekend: s.weekend.includes(day) ? s.weekend.filter((d) => d !== day) : [...s.weekend, day],
    });

  return (
    <div>
      <PageHeader title="Settings" subtitle="Personalize the workspace to how you run your day." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance & language</CardTitle>
            <CardDescription>Theme and locale preferences.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <Row icon={<Palette className="h-4 w-4" />} title="Dark mode" desc="Switch between light and dark themes.">
              <Switch checked={s.theme === "dark"} onChange={toggleTheme} label="Dark mode" />
            </Row>
            <Row icon={<Languages className="h-4 w-4" />} title="Language" desc="Interface language.">
              <Select
                className="w-36"
                value={s.language}
                onChange={(e) => patch({ language: e.target.value as "en" | "ar" })}
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </Select>
            </Row>
            <Row icon={<Eye className="h-4 w-4" />} title="Default planner view" desc="Which view opens first.">
              <Select
                className="w-36"
                value={s.defaultView}
                onChange={(e) => patch({ defaultView: e.target.value as ViewMode })}
              >
                <option value="timeline">Timeline</option>
                <option value="agenda">Agenda</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </Select>
            </Row>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control alerts and reminder sounds.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <Row icon={<Bell className="h-4 w-4" />} title="In-app notifications" desc="Show the notification center badge.">
              <Switch checked={s.notificationsEnabled} onChange={(v) => patch({ notificationsEnabled: v })} />
            </Row>
            <Row icon={<Bell className="h-4 w-4" />} title="Reminder sounds" desc="Play a sound when reminders fire.">
              <Switch checked={s.soundEnabled} onChange={(v) => patch({ soundEnabled: v })} />
            </Row>
            <Row icon={<Clock className="h-4 w-4" />} title="Default reminder lead" desc="How early to alert by default.">
              <Select
                className="w-40"
                value={s.defaultReminderLead}
                onChange={(e) => patch({ defaultReminderLead: Number(e.target.value) as LeadMinutes })}
              >
                {LEAD_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Row>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Working hours</CardTitle>
            <CardDescription>Used to lay out the planner timeline.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start">
                <Input type="time" value={s.workStart} onChange={(e) => patch({ workStart: e.target.value })} />
              </Field>
              <Field label="End">
                <Input type="time" value={s.workEnd} onChange={(e) => patch({ workEnd: e.target.value })} />
              </Field>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Weekend</p>
              <div className="flex flex-wrap gap-1.5">
                {WEEKDAYS.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleWeekend(d)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      s.weekend.includes(d)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile & data</CardTitle>
            <CardDescription>Your name and local data controls.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Display name">
              <Input value={s.userName} onChange={(e) => patch({ userName: e.target.value })} />
            </Field>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Reset demo data</p>
                <p className="text-xs text-muted-foreground">Restore the original sample dataset.</p>
              </div>
              <Button variant="outline" onClick={() => setConfirmReset(true)}>
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset all data?"
        description="This clears everything stored locally and restores the sample dataset."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                dispatch({ type: "RESET" });
                setConfirmReset(false);
                toast({ tone: "info", title: "Data reset", detail: "Sample data restored." });
              }}
            >
              Reset data
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          Your employees, meetings, tasks, and reminders will be replaced with the original demo
          content. This cannot be undone.
        </p>
      </Dialog>
    </div>
  );
}
