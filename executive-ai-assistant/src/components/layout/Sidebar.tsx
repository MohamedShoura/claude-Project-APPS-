import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups, settingsNav } from "./nav";

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-soft">
        <span className="text-lg font-bold">A</span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight">Executive AI</p>
        <p className="text-[11px] text-muted-foreground">Assistant</p>
      </div>
    </div>
  );
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group.heading} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            {group.heading}
          </p>
          {group.items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={onNavigate}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-primary"
                    />
                  )}
                  <item.icon className="h-4.5 w-4.5 shrink-0" strokeWidth={2} size={18} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      ))}
      <div className="mt-auto">
        <NavLink to={settingsNav.to} className={linkClass} onClick={onNavigate}>
          <settingsNav.icon size={18} className="shrink-0" />
          {settingsNav.label}
        </NavLink>
      </div>
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/50 lg:flex">
      <div className="flex h-16 items-center border-b border-border px-3">
        <BrandMark />
      </div>
      <NavItems />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        exit={{ x: -280 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative flex h-full w-64 flex-col border-r border-border bg-card"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-3">
          <BrandMark />
          <button onClick={onClose} className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <NavItems onNavigate={onClose} />
      </motion.aside>
    </div>
  );
}
