"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/data/types";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "popular" | "newest" | "price-low" | "price-high" | "rating";

export function ProductListing({
  mode = "all",
}: {
  mode?: "all" | "best-sellers" | "new-arrivals" | "offers";
}) {
  const { locale, dict } = useLocale();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as CategorySlug | null;
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [bestOnly, setBestOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("popular");

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);

  const base = useMemo(() => {
    if (mode === "best-sellers") return products.filter((p) => p.isBestSeller);
    if (mode === "new-arrivals") return products.filter((p) => p.isNew);
    if (mode === "offers") return products.filter((p) => p.originalPrice > p.price);
    return products;
  }, [mode]);

  const filtered = useMemo(() => {
    let list = base;
    if (query) {
      list = list.filter(
        (p) =>
          p.nameAr.includes(query) ||
          p.nameEn.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.category.includes(query) ||
          p.tags.some((t) => t.includes(query))
      );
    }
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    list = list.filter((p) => p.price <= maxPrice);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (onSaleOnly) list = list.filter((p) => p.originalPrice > p.price);
    if (newOnly) list = list.filter((p) => p.isNew);
    if (bestOnly) list = list.filter((p) => p.isBestSeller);

    const sorted = [...list];
    switch (sort) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [base, query, selectedCategories, selectedBrands, maxPrice, minRating, inStockOnly, onSaleOnly, newOnly, bestOnly, sort]);

  function toggleCategory(slug: CategorySlug) {
    setSelectedCategories((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]));
  }
  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }
  function clearAll() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMaxPrice(20000);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setNewOnly(false);
    setBestOnly(false);
  }

  const FiltersPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-bold text-neutral-900">{dict.filters.category}</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.slug)}
                onChange={() => toggleCategory(c.slug)}
                className="h-4 w-4 accent-brand-600"
              />
              {locale === "ar" ? c.nameAr : c.nameEn}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-neutral-900">{dict.filters.price}</h3>
        <input
          type="range"
          min={100}
          max={20000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <p className="mt-1 text-xs text-neutral-500">
          {locale === "ar" ? "حتى" : "Up to"} {maxPrice.toLocaleString()} {dict.common.egp}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-neutral-900">{dict.filters.brand}</h3>
        <div className="max-h-40 space-y-2 overflow-y-auto pe-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="h-4 w-4 accent-brand-600"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-neutral-900">{dict.filters.rating}</h3>
        <div className="flex flex-wrap gap-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold",
                minRating === r ? "border-brand-600 bg-brand-600 text-white" : "border-neutral-200 text-neutral-600"
              )}
            >
              {r}+ ★
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4 accent-brand-600" />
          {dict.filters.availability}
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} className="h-4 w-4 accent-brand-600" />
          {dict.filters.discount}
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" checked={newOnly} onChange={(e) => setNewOnly(e.target.checked)} className="h-4 w-4 accent-brand-600" />
          {dict.filters.newArrivals}
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" checked={bestOnly} onChange={(e) => setBestOnly(e.target.checked)} className="h-4 w-4 accent-brand-600" />
          {dict.filters.bestSellers}
        </label>
      </div>

      <button onClick={clearAll} className="w-full rounded-lg border border-neutral-200 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">
        {dict.filters.clear}
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {filtered.length} {dict.filters.results}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenFilters(true)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold lg:hidden"
          >
            <SlidersHorizontal size={14} />
            {dict.filters.title}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700"
          >
            <option value="popular">{dict.filters.sortPopular}</option>
            <option value="newest">{dict.filters.sortNewest}</option>
            <option value="price-low">{dict.filters.sortPriceLow}</option>
            <option value="price-high">{dict.filters.sortPriceHigh}</option>
            <option value="rating">{dict.filters.sortRating}</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{FiltersPanel}</aside>

        {openFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpenFilters(false)} />
            <div className="absolute inset-y-0 start-0 w-80 max-w-[85vw] overflow-y-auto bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">{dict.filters.title}</h2>
                <button onClick={() => setOpenFilters(false)}>
                  <X size={20} />
                </button>
              </div>
              {FiltersPanel}
              <button
                onClick={() => setOpenFilters(false)}
                className="mt-4 w-full rounded-lg bg-brand-700 py-2.5 text-sm font-bold text-white"
              >
                {dict.filters.apply}
              </button>
            </div>
          </div>
        )}

        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 py-20 text-center">
              <p className="text-neutral-500">{dict.filters.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
