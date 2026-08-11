"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  productIds: string[];
  add: (id: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      add: (id) => {
        const filtered = get().productIds.filter((p) => p !== id);
        set({ productIds: [id, ...filtered].slice(0, 12) });
      },
    }),
    { name: "neel-recently-viewed" }
  )
);
