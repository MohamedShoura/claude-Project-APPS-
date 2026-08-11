"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "./SectionHeading";

export function BestSellers() {
  const { locale, dict } = useLocale();
  const items = products.filter((p) => p.isBestSeller);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <SectionHeading
        title={dict.bestSellers.title}
        subtitle={dict.bestSellers.subtitle}
        locale={locale}
        viewAllHref={localePath(locale, "/best-sellers")}
        viewAllLabel={dict.common.viewAll}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
