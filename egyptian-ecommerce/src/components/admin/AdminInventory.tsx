"use client";

import Image from "next/image";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { KpiCard } from "@/components/admin/KpiCard";

export function AdminInventory() {
  const products = useAdminStore((s) => s.products);
  const updateStock = useAdminStore((s) => s.updateStock);

  const available = products.filter((p) => p.stock > 5);
  const low = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const out = products.filter((p) => p.stock === 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Inventory" subtitle="Track stock levels across your catalog" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard icon={CheckCircle2} label="Available Stock" value={String(available.length)} accent="brand" />
        <KpiCard icon={AlertTriangle} label="Low Stock" value={String(low.length)} accent="gold" />
        <KpiCard icon={XCircle} label="Out of Stock" value={String(out.length)} accent="cta" />
      </div>

      {[
        { title: "Low Stock Products", items: low, tone: "text-gold-700" },
        { title: "Out of Stock Products", items: out, tone: "text-cta-700" },
      ].map((group) => (
        <div key={group.title} className="mt-6">
          <h3 className={`mb-3 text-sm font-bold ${group.tone}`}>{group.title}</h3>
          {group.items.length === 0 ? (
            <p className="text-sm text-neutral-400">Nothing here — all good.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full text-sm">
                <tbody>
                  {group.items.map((p) => (
                    <tr key={p.id} className="border-b border-neutral-50 last:border-0">
                      <td className="w-14 px-4 py-2.5">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-neutral-100">
                          <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                      </td>
                      <td className="px-2 py-2.5 font-semibold text-neutral-800">{p.nameEn}</td>
                      <td className="px-2 py-2.5 text-neutral-400">{p.sku}</td>
                      <td className="px-4 py-2.5">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, Math.max(0, Number(e.target.value)))}
                          className="w-20 rounded-lg border border-neutral-200 px-2 py-1 text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
