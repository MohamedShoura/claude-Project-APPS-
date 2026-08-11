"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import type { Product } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/shared/StarRating";

export function ProductTabs({ product }: { product: Product }) {
  const { locale, dict } = useLocale();
  const [tab, setTab] = useState<"desc" | "specs" | "delivery" | "reviews">("desc");

  const tabs = [
    { key: "desc" as const, label: dict.product.description },
    { key: "specs" as const, label: dict.product.specifications },
    { key: "delivery" as const, label: dict.product.delivery },
    { key: "reviews" as const, label: `${dict.product.reviewsTab} (${product.reviewCount})` },
  ];

  return (
    <div className="mt-10">
      <div className="flex gap-1 overflow-x-auto border-b border-neutral-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap",
              tab === t.key ? "border-brand-700 text-brand-700" : "border-transparent text-neutral-500"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {tab === "desc" && (
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
        )}

        {tab === "specs" && (
          <div className="max-w-2xl divide-y divide-neutral-100 overflow-hidden rounded-xl border border-neutral-100">
            {product.specs.map((s, i) => (
              <div key={i} className="flex justify-between gap-4 bg-white px-4 py-3 text-sm odd:bg-neutral-50">
                <span className="font-semibold text-neutral-500">{locale === "ar" ? s.keyAr : s.keyEn}</span>
                <span className="text-neutral-800">{locale === "ar" ? s.valueAr : s.valueEn}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "delivery" && (
          <div className="max-w-2xl space-y-3 text-sm text-neutral-700">
            <p>{dict.product.deliveryText}</p>
          </div>
        )}

        {tab === "reviews" && (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-4 rounded-xl bg-neutral-50 p-4">
              <span className="text-4xl font-extrabold text-neutral-900">{product.rating}</span>
              <div>
                <StarRating rating={product.rating} size={16} />
                <p className="mt-1 text-xs text-neutral-500">
                  {product.reviewCount} {dict.product.reviewsCount}
                </p>
              </div>
            </div>
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b border-neutral-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-900">{r.customerName}</span>
                  {r.verified && (
                    <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                      <BadgeCheck size={12} /> {dict.reviews.verified}
                    </span>
                  )}
                </div>
                <StarRating rating={r.rating} size={12} className="mt-1" />
                <p className="mt-2 text-sm text-neutral-600">{locale === "ar" ? r.textAr : r.textEn}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
