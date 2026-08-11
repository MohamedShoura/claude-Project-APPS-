"use client";

import { useState } from "react";
import { Plus, Zap, Package, Users } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { cn } from "@/lib/utils";
import type { Coupon } from "@/data/types";

export function AdminOffers() {
  const coupons = useAdminStore((s) => s.coupons);
  const addCoupon = useAdminStore((s) => s.addCoupon);
  const toggleCoupon = useAdminStore((s) => s.toggleCoupon);
  const products = useAdminStore((s) => s.products);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", type: "percentage" as Coupon["type"], value: "", minOrder: "", usageLimit: "500" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code) return;
    addCoupon({
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value) || 0,
      minOrder: Number(form.minOrder) || undefined,
      usageCount: 0,
      usageLimit: Number(form.usageLimit) || 100,
      active: true,
      expiresISO: new Date(Date.now() + 30 * 86400000).toISOString(),
    });
    setForm({ code: "", type: "percentage", value: "", minOrder: "", usageLimit: "500" });
    setOpen(false);
  }

  const flashCount = products.filter((p) => p.isFlashDeal).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Offers & Promotions"
        subtitle="Coupons, flash sales, and promotional campaigns"
        action={
          <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800">
            <Plus size={16} />
            New Coupon
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta-50 text-cta-700">
            <Zap size={18} />
          </div>
          <div>
            <p className="text-lg font-extrabold text-neutral-900">{flashCount} products</p>
            <p className="text-xs text-neutral-500">Active in Flash Deals — manage from Products page</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <Package size={18} />
          </div>
          <div>
            <p className="text-lg font-extrabold text-neutral-900">Bundle Offers</p>
            <p className="text-xs text-neutral-500">Shown as &ldquo;Frequently Bought Together&rdquo; on product pages</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Users size={18} />
          </div>
          <div>
            <p className="text-lg font-extrabold text-neutral-900">Buy One Get One</p>
            <p className="text-xs text-neutral-500">Configure via a 100% fixed-value coupon on eligible SKUs</p>
          </div>
        </div>
      </div>

      {open && (
        <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
          <input placeholder="CODE" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm uppercase outline-none focus:border-brand-500" />
          <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Coupon["type"] }))} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500">
            <option value="percentage">Percentage %</option>
            <option value="fixed">Fixed Amount</option>
            <option value="free_shipping">Free Shipping</option>
          </select>
          <input type="number" placeholder="Value" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <input type="number" placeholder="Min. order (EGP)" value={form.minOrder} onChange={(e) => setForm((f) => ({ ...f, minOrder: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <button type="submit" className="rounded-lg bg-cta-500 px-4 py-2 text-sm font-bold text-white hover:bg-cta-600">
            Create
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-start text-xs font-bold uppercase text-neutral-400">
              <th className="px-4 py-3 text-start">Code</th>
              <th className="px-4 py-3 text-start">Type</th>
              <th className="px-4 py-3 text-start">Value</th>
              <th className="px-4 py-3 text-start">Usage</th>
              <th className="px-4 py-3 text-start">Expires</th>
              <th className="px-4 py-3 text-start">Status</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-b border-neutral-50 last:border-0">
                <td className="px-4 py-3 font-bold text-neutral-800">{c.code}</td>
                <td className="px-4 py-3 capitalize text-neutral-500">{c.type.replace("_", " ")}</td>
                <td className="px-4 py-3 text-neutral-500">{c.type === "percentage" ? `${c.value}%` : c.type === "fixed" ? `${c.value} EGP` : "—"}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {c.usageCount}/{c.usageLimit}
                </td>
                <td className="px-4 py-3 text-neutral-500">{new Date(c.expiresISO).toLocaleDateString("en-US")}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleCoupon(c.code)}
                    className={cn("rounded-full px-2.5 py-1 text-xs font-bold", c.active ? "bg-brand-50 text-brand-700" : "bg-neutral-100 text-neutral-400")}
                  >
                    {c.active ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
