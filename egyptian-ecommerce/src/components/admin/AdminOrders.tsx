"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/data/types";

const TABS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
  { key: "returned", label: "Returned" },
];

const STATUS_OPTIONS: OrderStatus[] = ["new", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled", "returned"];

export function AdminOrders() {
  const orders = useAdminStore((s) => s.orders);
  const setOrderStatus = useAdminStore((s) => s.setOrderStatus);
  const [tab, setTab] = useState<OrderStatus | "all">("all");

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Orders" subtitle={`${orders.length} total orders`} />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold",
              tab === t.key ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600"
            )}
          >
            {t.label}
            {t.key !== "all" && (
              <span className="ms-1 opacity-60">({orders.filter((o) => o.status === t.key).length})</span>
            )}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-start text-xs font-bold uppercase text-neutral-400">
              <th className="px-4 py-3 text-start">Order</th>
              <th className="px-4 py-3 text-start">Customer</th>
              <th className="px-4 py-3 text-start">Date</th>
              <th className="px-4 py-3 text-start">Items</th>
              <th className="px-4 py-3 text-start">Payment</th>
              <th className="px-4 py-3 text-start">Total</th>
              <th className="px-4 py-3 text-start">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-neutral-50 last:border-0">
                <td className="px-4 py-3 font-semibold text-neutral-800">#{o.orderNumber}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-neutral-700">{o.customerName}</p>
                  <p className="text-xs text-neutral-400" dir="ltr">{o.mobile}</p>
                </td>
                <td className="px-4 py-3 text-neutral-500">{new Date(o.createdAtISO).toLocaleDateString("en-US")}</td>
                <td className="px-4 py-3 text-neutral-500">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td className="px-4 py-3 uppercase text-neutral-500">{o.paymentMethod}</td>
                <td className="px-4 py-3 font-bold text-neutral-800">{o.total.toLocaleString()} EGP</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => setOrderStatus(o.id, e.target.value as OrderStatus)}
                    className="rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-semibold"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
