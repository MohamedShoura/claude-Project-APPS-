"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { formatPrice } from "@/i18n/format";
import { trackEvent } from "@/lib/analytics";

export function SearchBar({ onNavigate }: { onNavigate?: () => void }) {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results =
    query.trim().length > 0
      ? products
          .filter((p) => {
            const q = query.trim().toLowerCase();
            return (
              p.nameAr.includes(query.trim()) ||
              p.nameEn.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q) ||
              p.category.includes(q) ||
              p.tags.some((t) => t.includes(q))
            );
          })
          .slice(0, 6)
      : [];

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    onNavigate?.();
    trackEvent("search", { search_term: query.trim() });
    router.push(`${localePath(locale, "/search")}?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={submit} className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={dict.nav.search}
          className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 ps-10 pe-9 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-white"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-neutral-400"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {open && results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-xl">
          {results.map((p) => (
            <Link
              key={p.id}
              href={localePath(locale, `/product/${p.slug}`)}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-3 border-b border-neutral-50 p-2.5 last:border-0 hover:bg-neutral-50"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-800">
                  {locale === "ar" ? p.nameAr : p.nameEn}
                </p>
                <p className="text-xs text-neutral-400">{p.brand}</p>
              </div>
              <span className="text-sm font-bold text-brand-700">{formatPrice(p.price, locale)}</span>
            </Link>
          ))}
          <button
            onClick={() => submit()}
            className="w-full bg-neutral-50 p-2.5 text-center text-sm font-semibold text-brand-700 hover:bg-neutral-100"
          >
            {locale === "ar" ? `عرض كل نتائج "${query}"` : `View all results for "${query}"`}
          </button>
        </div>
      )}
    </div>
  );
}
