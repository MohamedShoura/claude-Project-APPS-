import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AppState,
  Client,
  Employee,
  Meeting,
  Reminder,
  Settings,
  Task,
} from "@/types";
import { loadState, resetState, saveState } from "@/lib/storage";
import { buildNotifications } from "@/lib/engine";

/* Action set — a small, explicit CRUD surface over the app state. */
type Action =
  | { type: "UPSERT_TASK"; task: Task }
  | { type: "DELETE_TASK"; id: string }
  | { type: "UPSERT_REMINDER"; reminder: Reminder }
  | { type: "DELETE_REMINDER"; id: string }
  | { type: "UPSERT_MEETING"; meeting: Meeting }
  | { type: "DELETE_MEETING"; id: string }
  | { type: "UPSERT_EMPLOYEE"; employee: Employee }
  | { type: "DELETE_EMPLOYEE"; id: string }
  | { type: "UPSERT_CLIENT"; client: Client }
  | { type: "UPDATE_SETTINGS"; patch: Partial<Settings> }
  | { type: "MARK_NOTIF_READ"; id: string }
  | { type: "MARK_ALL_NOTIF_READ" }
  | { type: "REFRESH_NOTIFS" }
  | { type: "RESET" };

function upsert<T extends { id: string }>(list: T[], item: T): T[] {
  const i = list.findIndex((x) => x.id === item.id);
  if (i === -1) return [item, ...list];
  const copy = [...list];
  copy[i] = item;
  return copy;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "UPSERT_TASK":
      return { ...state, tasks: upsert(state.tasks, action.task) };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "UPSERT_REMINDER":
      return { ...state, reminders: upsert(state.reminders, action.reminder) };
    case "DELETE_REMINDER":
      return { ...state, reminders: state.reminders.filter((r) => r.id !== action.id) };
    case "UPSERT_MEETING":
      return { ...state, meetings: upsert(state.meetings, action.meeting) };
    case "DELETE_MEETING":
      return { ...state, meetings: state.meetings.filter((m) => m.id !== action.id) };
    case "UPSERT_EMPLOYEE":
      return { ...state, employees: upsert(state.employees, action.employee) };
    case "DELETE_EMPLOYEE":
      return { ...state, employees: state.employees.filter((e) => e.id !== action.id) };
    case "UPSERT_CLIENT":
      return { ...state, clients: upsert(state.clients, action.client) };
    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case "MARK_NOTIF_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n,
        ),
      };
    case "MARK_ALL_NOTIF_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    case "REFRESH_NOTIFS": {
      const fresh = buildNotifications(state);
      const readIds = new Set(state.notifications.filter((n) => n.read).map((n) => n.id));
      return {
        ...state,
        notifications: fresh.map((n) => (readIds.has(n.id) ? { ...n, read: true } : n)),
      };
    }
    case "RESET":
      return { ...resetState(), notifications: [] };
    default:
      return state;
  }
}

interface Store {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  toggleTheme: () => void;
}

const AppCtx = createContext<Store | null>(null);

function init(): AppState {
  const loaded = loadState();
  return { ...loaded, notifications: buildNotifications(loaded) };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  // Persist on every change (notifications excluded inside saveState).
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Apply the theme to the document root.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", state.settings.theme === "dark");
    root.style.colorScheme = state.settings.theme;
  }, [state.settings.theme]);

  // Recompute derived notifications whenever the underlying data changes.
  useEffect(() => {
    dispatch({ type: "REFRESH_NOTIFS" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tasks, state.meetings, state.employees, state.clients, state.reminders]);

  const value = useMemo<Store>(
    () => ({
      state,
      dispatch,
      toggleTheme: () =>
        dispatch({
          type: "UPDATE_SETTINGS",
          patch: { theme: state.settings.theme === "dark" ? "light" : "dark" },
        }),
    }),
    [state],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): Store {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
