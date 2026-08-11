"use client";

import { Banknote, CreditCard, Wallet, Landmark } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { cn } from "@/lib/utils";

const METHODS = [
  { key: "cod" as const, icon: Banknote, title: "Cash on Delivery", desc: "Pay in cash when the order is delivered" },
  { key: "card" as const, icon: CreditCard, title: "Online Card Payment", desc: "Visa / Mastercard via Paymob or Fawry gateway" },
  { key: "wallet" as const, icon: Wallet, title: "Mobile Wallet", desc: "Vodafone Cash, Orange Money, Etisalat Cash" },
  { key: "instapay" as const, icon: Landmark, title: "InstaPay / Bank Transfer", desc: "Instant bank transfer via InstaPay" },
];

export function AdminPayments() {
  const payments = useAdminStore((s) => s.payments);
  const setPayments = useAdminStore((s) => s.setPayments);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Payment Methods" subtitle="Enable or disable payment options available at checkout" />

      <div className="grid gap-4 sm:grid-cols-2">
        {METHODS.map((m) => (
          <div key={m.key} className="flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <m.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-800">{m.title}</p>
                <p className="text-xs text-neutral-500">{m.desc}</p>
              </div>
            </div>
            <button
              onClick={() => setPayments({ [m.key]: !payments[m.key] })}
              className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", payments[m.key] ? "bg-brand-600" : "bg-neutral-200")}
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                  payments[m.key] ? "start-6" : "start-1"
                )}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 max-w-xl rounded-2xl border border-neutral-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-neutral-800">Gateway Configuration</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Paymob API Key</label>
            <input placeholder="pk_live_••••••••" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Fawry Merchant Code</label>
            <input placeholder="FAWRY-••••" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-neutral-400">Connect your payment provider credentials to accept live card and wallet payments.</p>
      </div>
    </div>
  );
}
