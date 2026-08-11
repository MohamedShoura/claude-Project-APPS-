"use client";

import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const REGION_LABELS: Record<string, string> = {
  cairo: "Cairo",
  giza: "Giza",
  alex: "Alexandria",
  delta: "Delta",
  upper: "Upper Egypt",
  other: "Other Governorates",
};

export function AdminShipping() {
  const governorates = useAdminStore((s) => s.governorates);
  const updateGovernorateFee = useAdminStore((s) => s.updateGovernorateFee);
  const freeShippingThreshold = useAdminStore((s) => s.freeShippingThreshold);
  const setFreeShippingThreshold = useAdminStore((s) => s.setFreeShippingThreshold);

  const regions = Object.keys(REGION_LABELS);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Shipping" subtitle="Configure delivery fees by governorate" />

      <div className="mb-6 max-w-sm rounded-2xl border border-neutral-200 bg-white p-4">
        <label className="mb-1 block text-xs font-bold text-neutral-500">Free Shipping Threshold (EGP)</label>
        <input
          type="number"
          value={freeShippingThreshold}
          onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <p className="mt-1 text-xs text-neutral-400">Orders above this amount get free delivery.</p>
      </div>

      <div className="space-y-6">
        {regions.map((region) => (
          <div key={region}>
            <h3 className="mb-2 text-sm font-bold text-neutral-800">{REGION_LABELS[region]}</h3>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full text-sm">
                <tbody>
                  {governorates
                    .filter((g) => g.region === region)
                    .map((g) => (
                      <tr key={g.nameEn} className="border-b border-neutral-50 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-neutral-700">{g.nameEn}</td>
                        <td className="px-4 py-2.5 text-neutral-400">{g.etaDays} days</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={g.fee}
                              onChange={(e) => updateGovernorateFee(g.nameEn, Number(e.target.value))}
                              className="w-24 rounded-lg border border-neutral-200 px-2 py-1 text-sm"
                            />
                            <span className="text-xs text-neutral-400">EGP</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
