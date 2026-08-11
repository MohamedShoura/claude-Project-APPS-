"use client";

import { BadgeCheck, Quote } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { allReviews } from "@/data/products";
import { StarRating } from "@/components/shared/StarRating";

export function Testimonials() {
  const { locale, dict } = useLocale();
  const featured = allReviews.filter((r) => r.rating >= 4 && r.verified).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{dict.reviews.title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{dict.reviews.subtitle}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
            <Quote size={22} className="text-brand-200" />
            <StarRating rating={r.rating} size={14} />
            <p className="text-sm leading-relaxed text-neutral-700">
              {locale === "ar" ? r.textAr : r.textEn}
            </p>
            <div className="mt-1 flex items-center justify-between border-t border-neutral-50 pt-3">
              <div>
                <p className="text-sm font-bold text-neutral-900">{r.customerName}</p>
                <p className="text-xs text-neutral-400">{r.productPurchased}</p>
              </div>
              {r.verified && (
                <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700">
                  <BadgeCheck size={12} /> {dict.reviews.verified}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
