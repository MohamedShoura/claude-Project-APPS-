"use client";

import Image from "next/image";
import { useState } from "react";
import { Save } from "lucide-react";
import { categories } from "@/data/categories";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export function AdminCategories() {
  const products = useAdminStore((s) => s.products);
  const categoryNames = useAdminStore((s) => s.categoryNames);
  const setCategoryName = useAdminStore((s) => s.setCategoryName);
  const [drafts, setDrafts] = useState<Record<string, { nameEn: string; nameAr: string }>>({});

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Categories" subtitle="Manage storefront category names shown in navigation" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const overridden = categoryNames[c.slug];
          const draft = drafts[c.slug] ?? { nameEn: overridden?.nameEn ?? c.nameEn, nameAr: overridden?.nameAr ?? c.nameAr };
          const count = products.filter((p) => p.category === c.slug).length;

          return (
            <div key={c.slug} className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={c.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">{c.slug}</p>
                  <p className="text-xs text-neutral-400">{count} products</p>
                </div>
              </div>
              <div className="space-y-2">
                <input
                  value={draft.nameEn}
                  onChange={(e) => setDrafts((d) => ({ ...d, [c.slug]: { ...draft, nameEn: e.target.value } }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
                <input
                  value={draft.nameAr}
                  dir="rtl"
                  onChange={(e) => setDrafts((d) => ({ ...d, [c.slug]: { ...draft, nameAr: e.target.value } }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
                <button
                  onClick={() => setCategoryName(c.slug, draft)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 py-2 text-xs font-bold text-white hover:bg-neutral-800"
                >
                  <Save size={13} />
                  Save
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
