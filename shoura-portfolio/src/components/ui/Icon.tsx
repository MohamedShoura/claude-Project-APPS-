import {
  Brain,
  BrainCircuit,
  Briefcase,
  Building2,
  Calculator,
  ClipboardList,
  Cog,
  Crown,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  LayoutDashboard,
  LineChart,
  Magnet,
  Megaphone,
  MessageSquare,
  PenTool,
  Plane,
  Presentation,
  Rocket,
  Route,
  Scale,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  UserCog,
  Users,
  Video,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry mapping the string `icon` fields used across `src/data/*` to
 * lucide-react components. Add new entries here as content grows.
 */
const registry: Record<string, LucideIcon> = {
  Brain,
  BrainCircuit,
  Briefcase,
  Building2,
  Calculator,
  ClipboardList,
  Cog,
  Crown,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  LayoutDashboard,
  LineChart,
  Magnet,
  Megaphone,
  MessageSquare,
  PenTool,
  Plane,
  Presentation,
  Rocket,
  Route,
  Scale,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  UserCog,
  Users,
  Video,
  Workflow,
  Zap,
};

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Component = registry[name] ?? Sparkles;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden />;
}
