"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (id) => {
        const exists = get().productIds.includes(id);
        set({
          productIds: exists
            ? get().productIds.filter((p) => p !== id)
            : [...get().productIds, id],
        });
      },
      has: (id) => get().productIds.includes(id),
      remove: (id) => set({ productIds: get().productIds.filter((p) => p !== id) }),
    }),
    { name: "neel-wishlist" }
  )
);
