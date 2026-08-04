import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Field } from "@/components/ui/input";
import { useApp } from "@/store/AppContext";
import { useToast } from "@/components/ui/toast";
import { uid } from "@/lib/utils";
import type { Department, Employee } from "@/types";

const DEPARTMENTS: Department[] = ["Sales", "Marketing", "Success", "Ops"];

const empty = (): Employee => ({
  id: uid("emp"),
  name: "",
  position: "",
  department: "Sales",
  email: "",
  phone: "",
  joinedAt: format(new Date(), "yyyy-MM-dd"),
  monthlyTarget: 80000,
  achievedSales: 0,
  collection: 0,
  calls: 0,
  meetings: 0,
  deals: 0,
  commissionRate: 0.03,
  attendanceRate: 100,
  status: "available",
  notes: "",
  history: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((month) => ({
    month,
    sales: 0,
    target: 80000,
    collection: 0,
  })),
  achievements: [],
  warnings: [],
});

export function EmployeeDialog({
  open,
  onClose,
  employee,
}: {
  open: boolean;
  onClose: () => void;
  employee?: Employee | null;
}) {
  const { dispatch } = useApp();
  const toast = useToast();
  const [draft, setDraft] = useState<Employee>(empty());

  useEffect(() => {
    if (open) setDraft(employee ? { ...employee } : empty());
  }, [open, employee]);

  const set = <K extends keyof Employee>(k: K, v: Employee[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const num = (v: string) => (v === "" ? 0 : Number(v));

  const save = () => {
    if (!draft.name.trim()) {
      toast({ tone: "warning", title: "Add a name" });
      return;
    }
    // Reflect the latest sales figure into the final history point for charts.
    const history = draft.history.map((h, i) =>
      i === draft.history.length - 1
        ? { ...h, sales: draft.achievedSales, target: draft.monthlyTarget, collection: draft.collection }
        : h,
    );
    dispatch({ type: "UPSERT_EMPLOYEE", employee: { ...draft, history } });
    toast({ tone: "success", title: employee ? "Employee updated" : "Employee added", detail: draft.name });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={employee ? "Edit employee" : "Add employee"}
      description="Team members appear across the dashboard, KPIs, and leaderboard."
      className="sm:max-w-xl"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>{employee ? "Save changes" : "Add employee"}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full name">
            <Input value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
          </Field>
          <Field label="Position">
            <Input value={draft.position} onChange={(e) => set("position", e.target.value)} placeholder="Account Executive" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Department">
            <Select value={draft.department} onChange={(e) => set("department", e.target.value as Department)}>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={draft.status} onChange={(e) => set("status", e.target.value as Employee["status"])}>
              <option value="available">Available</option>
              <option value="in_meeting">In meeting</option>
              <option value="busy">Busy</option>
              <option value="on_leave">On leave</option>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <Input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" />
          </Field>
          <Field label="Phone">
            <Input value={draft.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+971 …" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Monthly target (AED)">
            <Input type="number" value={draft.monthlyTarget} onChange={(e) => set("monthlyTarget", num(e.target.value))} />
          </Field>
          <Field label="Achieved sales (AED)">
            <Input type="number" value={draft.achievedSales} onChange={(e) => set("achievedSales", num(e.target.value))} />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Collection">
            <Input type="number" value={draft.collection} onChange={(e) => set("collection", num(e.target.value))} />
          </Field>
          <Field label="Calls">
            <Input type="number" value={draft.calls} onChange={(e) => set("calls", num(e.target.value))} />
          </Field>
          <Field label="Meetings">
            <Input type="number" value={draft.meetings} onChange={(e) => set("meetings", num(e.target.value))} />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Deals">
            <Input type="number" value={draft.deals} onChange={(e) => set("deals", num(e.target.value))} />
          </Field>
          <Field label="Commission %">
            <Input
              type="number"
              step="0.5"
              value={draft.commissionRate * 100}
              onChange={(e) => set("commissionRate", num(e.target.value) / 100)}
            />
          </Field>
          <Field label="Attendance %">
            <Input type="number" value={draft.attendanceRate} onChange={(e) => set("attendanceRate", num(e.target.value))} />
          </Field>
        </div>
        <Field label="Notes">
          <Textarea value={draft.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Coaching notes, context…" />
        </Field>
      </div>
    </Dialog>
  );
}
