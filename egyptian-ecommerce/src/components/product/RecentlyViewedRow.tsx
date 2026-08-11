"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function RecentlyViewedRow({ excludeId }: { excludeId?: string }) {
  const { dict } = useLocale();
  const ids = useRecentlyViewedStore((s) => s.productIds);
  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-4 text-xl font-extrabold text-neutral-900">{dict.product.recentlyViewed}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
