"use client";

import { customers } from "@/data/customers";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export function AdminCustomers() {
  const sorted = [...customers].sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Customers" subtitle={`${customers.length} registered customers`} />
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-start text-xs font-bold uppercase text-neutral-400">
              <th className="px-4 py-3 text-start">Name</th>
              <th className="px-4 py-3 text-start">Phone</th>
              <th className="px-4 py-3 text-start">Email</th>
              <th className="px-4 py-3 text-start">Orders</th>
              <th className="px-4 py-3 text-start">Total Spent</th>
              <th className="px-4 py-3 text-start">Last Purchase</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-b border-neutral-50 last:border-0">
                <td className="px-4 py-3 font-semibold text-neutral-800">{c.name}</td>
                <td className="px-4 py-3 text-neutral-500" dir="ltr">{c.phone}</td>
                <td className="px-4 py-3 text-neutral-500">{c.email}</td>
                <td className="px-4 py-3 text-neutral-500">{c.ordersCount}</td>
                <td className="px-4 py-3 font-bold text-brand-700">{c.totalSpent.toLocaleString()} EGP</td>
                <td className="px-4 py-3 text-neutral-500">{new Date(c.lastPurchaseISO).toLocaleDateString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
