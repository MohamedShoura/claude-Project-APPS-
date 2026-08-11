"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderItem } from "@/data/types";

interface PlaceOrderInput {
  customerName: string;
  mobile: string;
  email?: string;
  governorate: string;
  city: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: Order["paymentMethod"];
  couponCode?: string;
}

interface OrdersState {
  orders: Order[];
  placeOrder: (input: PlaceOrderInput) => Order;
  findOrder: (orderNumber: string, mobile: string) => Order | undefined;
}

let counter = 10500;

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (input) => {
        counter += 1;
        const order: Order = {
          id: `local-${counter}`,
          orderNumber: `NS-${counter}`,
          status: "confirmed",
          createdAtISO: new Date().toISOString(),
          ...input,
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
      findOrder: (orderNumber, mobile) =>
        get().orders.find(
          (o) =>
            o.orderNumber.trim().toLowerCase() === orderNumber.trim().toLowerCase() &&
            o.mobile.replace(/\s/g, "") === mobile.replace(/\s/g, "")
        ),
    }),
    { name: "neel-orders" }
  )
);
