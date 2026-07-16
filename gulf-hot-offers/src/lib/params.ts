import type { CountryCode } from './types';
import type { OfferFilters, SortKey } from './queries';
import { isCountry } from '@/i18n/config';

export type SP = Record<string, string | string[] | undefined>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const many = (v: string | string[] | undefined) =>
  v == null ? [] : Array.isArray(v) ? v.flatMap((x) => x.split(',')) : v.split(',');
const num = (v: string | string[] | undefined) => {
  const n = Number(one(v));
  return Number.isFinite(n) ? n : undefined;
};
const bool = (v: string | string[] | undefined) => one(v) === '1' || one(v) === 'true';

export const SORT_KEYS: SortKey[] = ['discount', 'price-asc', 'price-desc', 'popular', 'rating', 'recent', 'ending', 'lowest-ever'];

export function parseFilters(sp: SP, fallbackCountry: CountryCode): OfferFilters {
  const countryRaw = one(sp.country);
  return {
    country: isCountry(countryRaw) ? countryRaw : fallbackCountry,
    q: one(sp.q),
    retailers: many(sp.retailer),
    categories: many(sp.category),
    brands: many(sp.brand),
    minPrice: num(sp.min),
    maxPrice: num(sp.max),
    minDiscount: num(sp.discount),
    minRating: num(sp.rating),
    freeShipping: bool(sp.free),
    inStock: bool(sp.stock),
    coupon: bool(sp.coupon),
    endingSoon: bool(sp.ending),
    verified: bool(sp.verified),
    newOnly: bool(sp.new),
    lowestEver: bool(sp.lowest),
  };
}

export function parseSort(sp: SP): SortKey {
  const s = one(sp.sort) as SortKey;
  return SORT_KEYS.includes(s) ? s : 'discount';
}

export function parsePage(sp: SP): number {
  const p = num(sp.page) ?? 1;
  return Math.max(1, Math.floor(p));
}

export function parseView(sp: SP): 'grid' | 'list' {
  return one(sp.view) === 'list' ? 'list' : 'grid';
}
