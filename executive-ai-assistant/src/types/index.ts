/**
 * Domain model for the Executive AI Assistant.
 * These interfaces are the single source of truth shared by mock data,
 * the local-storage layer, and every component/page.
 */

export type Priority = "low" | "medium" | "high" | "urgent";
export type ID = string;

export type TaskStatus = "todo" | "in_progress" | "done";
export type Category =
  | "meeting"
  | "call"
  | "follow_up"
  | "admin"
  | "personal"
  | "deal"
  | "review";

/** A schedulable to-do item shown in the planner and dashboard. */
export interface Task {
  id: ID;
  title: string;
  description?: string;
  date: string; // ISO date (yyyy-MM-dd)
  time?: string; // HH:mm
  durationMin?: number;
  priority: Priority;
  category: Category;
  status: TaskStatus;
  color: string; // hex or hsl
  assignedTo?: ID; // employee id
  clientId?: ID;
  createdAt: string;
}

export type RepeatRule = "none" | "daily" | "weekly" | "monthly";
export type ReminderStatus = "scheduled" | "done" | "snoozed" | "missed";
/** Minutes-before options for automatic pre-alerts. */
export type LeadMinutes = 5 | 10 | 30 | 60 | 1440;

/** A rich reminder with pre-alerts, location, and meeting link. */
export interface Reminder {
  id: ID;
  title: string;
  description?: string;
  date: string; // ISO date
  time: string; // HH:mm
  priority: Priority;
  category: Category;
  color: string;
  sound: string;
  repeat: RepeatRule;
  location?: string;
  meetingLink?: string;
  attachment?: string; // file name (mock)
  status: ReminderStatus;
  leadMinutes: LeadMinutes[]; // alerts before the event
  createdAt: string;
}

export type MeetingStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ActionItem {
  id: ID;
  text: string;
  done: boolean;
  ownerId?: ID;
  due?: string;
}

export interface Meeting {
  id: ID;
  name: string;
  company?: string;
  participants: ID[]; // employee ids
  externalParticipants?: string[];
  agenda?: string;
  notes?: string;
  actionItems: ActionItem[];
  date: string;
  time: string;
  durationMin: number;
  status: MeetingStatus;
  location?: string;
  link?: string;
  files?: string[];
  clientId?: ID;
}

export type Department = "Sales" | "Marketing" | "Success" | "Ops";
export type EmployeeStatus = "available" | "in_meeting" | "on_leave" | "busy";

export interface Achievement {
  id: ID;
  label: string;
  date: string;
}

export interface Warning {
  id: ID;
  label: string;
  date: string;
  severity: Priority;
}

/** A monthly performance datapoint for an employee (for trend charts). */
export interface MonthlyPoint {
  month: string; // e.g. "Mar"
  sales: number;
  target: number;
  collection: number;
}

export interface Employee {
  id: ID;
  name: string;
  photo?: string; // url; falls back to initials avatar
  position: string;
  department: Department;
  email: string;
  phone: string;
  joinedAt: string;
  monthlyTarget: number;
  achievedSales: number;
  collection: number;
  calls: number;
  meetings: number;
  deals: number;
  commissionRate: number; // e.g. 0.03
  attendanceRate: number; // 0..100
  status: EmployeeStatus;
  notes?: string;
  history: MonthlyPoint[];
  achievements: Achievement[];
  warnings: Warning[];
}

export type ClientStage =
  | "lead"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Client {
  id: ID;
  name: string;
  company: string;
  value: number; // deal value
  stage: ClientStage;
  ownerId: ID; // employee id
  lastContact: string; // ISO date
  nextRenewal?: string;
  priority: Priority;
  email: string;
}

export type NotificationKind =
  | "meeting"
  | "task_late"
  | "reminder_missed"
  | "target_alert"
  | "follow_up"
  | "birthday"
  | "renewal"
  | "payment";

export interface AppNotification {
  id: ID;
  kind: NotificationKind;
  title: string;
  detail: string;
  time: string; // ISO datetime
  read: boolean;
  priority: Priority;
  href?: string;
}

export type ViewMode = "timeline" | "calendar" | "agenda" | "week" | "month";

export interface Settings {
  theme: "light" | "dark";
  language: "en" | "ar";
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  workStart: string; // HH:mm
  workEnd: string; // HH:mm
  weekend: string[]; // e.g. ["Fri", "Sat"]
  defaultReminderLead: LeadMinutes;
  defaultView: ViewMode;
  userName: string;
  currency: string;
}

/** The complete persisted application state. */
export interface AppState {
  employees: Employee[];
  clients: Client[];
  meetings: Meeting[];
  tasks: Task[];
  reminders: Reminder[];
  notifications: AppNotification[];
  settings: Settings;
}
