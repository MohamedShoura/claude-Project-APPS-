import {
  LayoutDashboard,
  CalendarDays,
  BellRing,
  Users,
  BarChart3,
  Video,
  Sparkles,
  Settings as SettingsIcon,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const navGroups: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/insights", label: "AI Insights", icon: Sparkles },
      { to: "/kpis", label: "KPI Analytics", icon: BarChart3 },
    ],
  },
  {
    heading: "Plan",
    items: [
      { to: "/planner", label: "Planner", icon: CalendarDays },
      { to: "/reminders", label: "Reminders", icon: BellRing },
      { to: "/meetings", label: "Meetings", icon: Video },
    ],
  },
  {
    heading: "Team",
    items: [{ to: "/team", label: "Team & Sales", icon: Users }],
  },
];

export const settingsNav: NavItem = {
  to: "/settings",
  label: "Settings",
  icon: SettingsIcon,
};
