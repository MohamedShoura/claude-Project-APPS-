import { OFFERS, productKey } from '@/data/offers';
import { BRANDS, CATEGORIES } from '@/data/reference';

export interface SearchSuggestion {
  label_en: string;
  label_ar: string;
  href: string;
  type: 'product' | 'brand' | 'category';
  keywords: string;
}

// A slim, string-only index safe to ship to the client (no images/prices).
function build(): SearchSuggestion[] {
  const out: SearchSuggestion[] = [];
  const seen = new Set<string>();
  for (const o of OFFERS) {
    const k = productKey(o);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({
      label_en: o.title.en,
      label_ar: o.title.ar,
      href: `/product/${o.slug}`,
      type: 'product',
      keywords: `${o.title.en} ${o.title.ar} ${o.brand} ${o.model ?? ''} ${o.sku ?? ''}`.toLowerCase(),
    });
  }
  for (const b of BRANDS) {
    out.push({ label_en: b.name, label_ar: b.name, href: `/deals?brand=${b.slug}`, type: 'brand', keywords: b.name.toLowerCase() });
  }
  for (const c of CATEGORIES) {
    out.push({ label_en: c.name.en, label_ar: c.name.ar, href: `/deals?category=${c.slug}`, type: 'category', keywords: `${c.name.en} ${c.name.ar}`.toLowerCase() });
  }
  return out;
}

export const SEARCH_INDEX: SearchSuggestion[] = build();

export const POPULAR_SEARCHES = [
  { en: 'iPhone 17 Pro', ar: 'آيفون 17 برو' },
  { en: 'Samsung TV', ar: 'تلفزيون سامسونج' },
  { en: 'PlayStation 5', ar: 'بلايستيشن 5' },
  { en: 'Perfume deals', ar: 'عروض العطور' },
  { en: 'Laptop offers', ar: 'عروض اللابتوب' },
  { en: 'AirPods Pro', ar: 'إيربودز برو' },
];

export function searchSuggestions(q: string, locale: 'en' | 'ar', limit = 8): SearchSuggestion[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const toks = needle.split(/\s+/);
  return SEARCH_INDEX
    .filter((s) => toks.every((tk) => s.keywords.includes(tk) || s.keywords.includes(tk.slice(0, Math.max(3, tk.length - 1)))))
    .slice(0, limit);
}
