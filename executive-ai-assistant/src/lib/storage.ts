import type { AppState } from "@/types";
import { buildInitialState } from "@/data/mockData";

/**
 * Local-storage persistence layer.
 * Kept deliberately thin and swappable — the same read/write surface can be
 * pointed at Supabase/Firebase later without touching the UI (see README).
 */
const STORAGE_KEY = "eaa.state.v1";

export function loadState(): AppState {
  if (typeof window === "undefined") return buildInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = buildInitialState();
      saveState(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw) as Partial<AppState>;
    // Merge with a fresh baseline so new fields survive schema evolution.
    const base = buildInitialState();
    return {
      ...base,
      ...parsed,
      settings: { ...base.settings, ...parsed.settings },
    };
  } catch {
    return buildInitialState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  try {
    // Notifications are derived, not persisted.
    const { notifications: _omit, ...persisted } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    /* storage full or unavailable — non-fatal for a demo app */
  }
}

export function resetState(): AppState {
  const fresh = buildInitialState();
  saveState(fresh);
  return fresh;
}
