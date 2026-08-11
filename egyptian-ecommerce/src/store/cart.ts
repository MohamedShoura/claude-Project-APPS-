"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  image: string;
  price: number;
  originalPrice: number;
  qty: number;
  variationLabel?: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,
      addItem: (item, qty = 1) => {
        const key = `${item.productId}-${item.variationLabel ?? "default"}`;
        const existing = get().items.find((i) => i.key === key);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.key === key ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, key, qty }] });
        }
      },
      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),
      updateQty: (key, qty) =>
        set({
          items: get().items.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)),
        }),
      clear: () => set({ items: [], couponCode: null, couponDiscount: 0 }),
      applyCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),
      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),
    }),
    { name: "neel-cart" }
  )
);

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}
