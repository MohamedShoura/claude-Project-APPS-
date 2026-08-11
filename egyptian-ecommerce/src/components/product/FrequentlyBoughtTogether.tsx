"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { Product } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatPrice } from "@/i18n/format";
import { useCartStore } from "@/store/cart";

export function FrequentlyBoughtTogether({ main, extras }: { main: Product; extras: Product[] }) {
  const { locale, dict } = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const all = [main, ...extras];
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(all.map((p) => [p.id, true]))
  );

  const total = all.filter((p) => checked[p.id]).reduce((sum, p) => sum + p.price, 0);

  function addBundle() {
    all
      .filter((p) => checked[p.id])
      .forEach((p) =>
        addItem({
          productId: p.id,
          slug: p.slug,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          image: p.images[0],
          price: p.price,
          originalPrice: p.originalPrice,
        })
      );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-4 text-xl font-extrabold text-neutral-900">{dict.product.frequentlyBought}</h2>
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-neutral-100 p-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {all.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              {i > 0 && <Plus size={16} className="text-neutral-300" />}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!checked[p.id]}
                  onChange={(e) => setChecked((c) => ({ ...c, [p.id]: e.target.checked }))}
                  className="h-4 w-4 accent-brand-600"
                />
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="line-clamp-1 max-w-32 text-xs font-semibold text-neutral-700">
                    {locale === "ar" ? p.nameAr : p.nameEn}
                  </p>
                  <p className="text-xs font-bold text-brand-700">{formatPrice(p.price, locale)}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:items-end">
          <p className="text-sm text-neutral-500">
            {dict.cart.total}: <span className="text-lg font-extrabold text-neutral-900">{formatPrice(total, locale)}</span>
          </p>
          <button onClick={addBundle} className="w-full rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-800 sm:w-auto">
            {dict.product.addBundle}
          </button>
        </div>
      </div>
    </section>
  );
}
