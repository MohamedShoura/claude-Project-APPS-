"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { orders as seedOrders } from "@/data/orders";
import { products as seedProducts } from "@/data/products";
import { coupons as seedCoupons } from "@/data/customers";
import { governorates as seedGovernorates } from "@/data/governorates";
import type { Order, OrderStatus, Product, Coupon, Governorate, CategorySlug } from "@/data/types";

interface PaymentSettings {
  cod: boolean;
  card: boolean;
  wallet: boolean;
  instapay: boolean;
}

interface MarketingSettings {
  metaPixelId: string;
  gaId: string;
  gtmId: string;
  tiktokPixelId: string;
}

interface AdminState {
  orders: Order[];
  products: Product[];
  coupons: Coupon[];
  governorates: Governorate[];
  freeShippingThreshold: number;
  payments: PaymentSettings;
  marketing: MarketingSettings;
  categoryNames: Partial<Record<CategorySlug, { nameEn: string; nameAr: string }>>;
  setCategoryName: (slug: CategorySlug, names: { nameEn: string; nameAr: string }) => void;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  updateStock: (id: string, stock: number) => void;
  toggleProductFlag: (id: string, flag: "isNew" | "isBestSeller" | "isFlashDeal") => void;
  deleteProduct: (id: string) => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  updateGovernorateFee: (nameEn: string, fee: number) => void;
  setFreeShippingThreshold: (value: number) => void;
  setPayments: (payments: Partial<PaymentSettings>) => void;
  setMarketing: (marketing: Partial<MarketingSettings>) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      orders: seedOrders,
      products: seedProducts,
      coupons: seedCoupons,
      governorates: seedGovernorates,
      freeShippingThreshold: 2000,
      payments: { cod: true, card: true, wallet: true, instapay: true },
      marketing: { metaPixelId: "", gaId: "", gtmId: "", tiktokPixelId: "" },
      categoryNames: {},

      setCategoryName: (slug, names) => set({ categoryNames: { ...get().categoryNames, [slug]: names } }),

      setOrderStatus: (id, status) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)) }),

      updateStock: (id, stock) =>
        set({ products: get().products.map((p) => (p.id === id ? { ...p, stock } : p)) }),

      toggleProductFlag: (id, flag) =>
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, [flag]: !p[flag] } : p)),
        }),

      deleteProduct: (id) => set({ products: get().products.filter((p) => p.id !== id) }),

      addCoupon: (coupon) => set({ coupons: [coupon, ...get().coupons] }),

      toggleCoupon: (code) =>
        set({
          coupons: get().coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c)),
        }),

      updateGovernorateFee: (nameEn, fee) =>
        set({ governorates: get().governorates.map((g) => (g.nameEn === nameEn ? { ...g, fee } : g)) }),

      setFreeShippingThreshold: (value) => set({ freeShippingThreshold: value }),

      setPayments: (payments) => set({ payments: { ...get().payments, ...payments } }),

      setMarketing: (marketing) => set({ marketing: { ...get().marketing, ...marketing } }),
    }),
    { name: "neel-admin" }
  )
);
