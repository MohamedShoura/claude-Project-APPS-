import type { Category, Priority } from "@/types";

export const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "meeting", label: "Meeting" },
  { value: "call", label: "Call" },
  { value: "follow_up", label: "Follow-up" },
  { value: "deal", label: "Deal" },
  { value: "review", label: "Review" },
  { value: "admin", label: "Admin" },
  { value: "personal", label: "Personal" },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  meeting: "#4f46e5",
  call: "#0ea5e9",
  follow_up: "#f59e0b",
  deal: "#8b5cf6",
  review: "#14b8a6",
  admin: "#64748b",
  personal: "#ec4899",
};

export const REMINDER_SOUNDS = ["Chime", "Bell", "Soft", "Ping", "Marimba"];

export const LEAD_OPTIONS: { value: number; label: string }[] = [
  { value: 5, label: "5 min before" },
  { value: 10, label: "10 min before" },
  { value: 30, label: "30 min before" },
  { value: 60, label: "1 hour before" },
  { value: 1440, label: "1 day before" },
];

export const TASK_COLORS = [
  "#4f46e5",
  "#0ea5e9",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];
