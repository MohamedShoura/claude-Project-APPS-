"use client";

import { Zap } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

export function FlashDeals() {
  const { locale, dict } = useLocale();
  const deals = products.filter((p) => p.isFlashDeal);
  const endsAt = deals[0]?.flashDealEndsISO ?? new Date().toISOString();

  return (
    <section className="bg-neutral-950 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap size={22} className="fill-cta-500 text-cta-500" />
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{dict.flash.title}</h2>
            </div>
            <p className="mt-1 text-sm text-neutral-400">{dict.flash.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-neutral-300">{dict.flash.endsIn}</span>
            <CountdownTimer target={endsAt} variant="dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} showBuyNow />
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={`${localePath(locale, "/offers")}`}
            className="inline-block rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            {dict.common.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
