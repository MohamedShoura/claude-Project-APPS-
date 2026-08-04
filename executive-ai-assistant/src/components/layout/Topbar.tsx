import { format } from "date-fns";
import { Menu, Moon, Sun, Search } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { useNow } from "@/lib/useNow";
import { NotificationCenter } from "./NotificationCenter";
import { Kbd } from "@/components/ui/misc";
import { Avatar } from "@/components/ui/avatar";

export function Topbar({
  onMenu,
  onSearch,
}: {
  onMenu: () => void;
  onSearch: () => void;
}) {
  const { state, toggleTheme } = useApp();
  const now = useNow();
  const dark = state.settings.theme === "dark";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border glass px-4">
      <button
        onClick={onMenu}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search trigger */}
      <button
        onClick={onSearch}
        className="group flex h-10 flex-1 items-center gap-2 rounded-lg border border-border bg-background/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:max-w-xs"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search everything…</span>
        <span className="hidden sm:inline">
          <Kbd>⌘K</Kbd>
        </span>
      </button>

      <div className="flex-1" />

      {/* Live clock */}
      <div className="mr-1 hidden text-right sm:block">
        <p className="tabular text-sm font-semibold leading-none">{format(now, "h:mm:ss a")}</p>
        <p className="text-[11px] text-muted-foreground">{format(now, "EEE, MMM d")}</p>
      </div>

      <button
        onClick={toggleTheme}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <NotificationCenter />

      <div className="ml-1 hidden items-center gap-2 rounded-lg border border-border bg-background/60 py-1 pl-1 pr-3 sm:flex">
        <Avatar name={state.settings.userName} size={30} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">{state.settings.userName}</p>
          <p className="text-[10px] text-muted-foreground">Executive</p>
        </div>
      </div>
    </header>
  );
}
