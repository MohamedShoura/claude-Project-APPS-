import type { CountryCode, Offer } from './types';
import { OFFERS, productKey } from '@/data/offers';
import { discountPercent } from './format';
import { dealScore, priceStats } from './deal-score';

export interface OfferFilters {
  country?: CountryCode;
  q?: string;
  retailers?: string[];
  categories?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  minRating?: number;
  freeShipping?: boolean;
  inStock?: boolean;
  coupon?: boolean;
  endingSoon?: boolean;
  verified?: boolean;
  newOnly?: boolean;
  lowestEver?: boolean;
}

export type SortKey =
  | 'discount'
  | 'price-asc'
  | 'price-desc'
  | 'popular'
  | 'rating'
  | 'recent'
  | 'ending'
  | 'lowest-ever';

const DAY = 86400000;

function matchesText(offer: Offer, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const hay = [
    offer.title.en, offer.title.ar, offer.brand, offer.category,
    offer.retailer, offer.model ?? '', offer.sku ?? '', offer.gtin ?? '',
  ].join(' ').toLowerCase();
  // token-based match with light typo tolerance (prefix match per token)
  return needle.split(/\s+/).every((tok) =>
    hay.includes(tok) || hay.split(/\s+/).some((w) => w.startsWith(tok.slice(0, Math.max(3, tok.length - 1))))
  );
}

export function filterOffers(filters: OfferFilters): Offer[] {
  return OFFERS.filter((o) => {
    if (filters.country && o.country !== filters.country) return false;
    if (filters.q && !matchesText(o, filters.q)) return false;
    if (filters.retailers?.length && !filters.retailers.includes(o.retailer)) return false;
    if (filters.categories?.length && !filters.categories.includes(o.category)) return false;
    if (filters.brands?.length && !filters.brands.includes(o.brand)) return false;
    if (filters.minPrice != null && o.price < filters.minPrice) return false;
    if (filters.maxPrice != null && o.price > filters.maxPrice) return false;
    if (filters.minDiscount != null && discountPercent(o.price, o.previousPrice) < filters.minDiscount) return false;
    if (filters.minRating != null && o.rating < filters.minRating) return false;
    if (filters.freeShipping && !o.freeShipping) return false;
    if (filters.inStock && !o.inStock) return false;
    if (filters.coupon && !o.couponCode) return false;
    if (filters.verified && !o.verified) return false;
    if (filters.newOnly && Date.now() - new Date(o.addedAt).getTime() > 7 * DAY) return false;
    if (filters.endingSoon) {
      if (!o.expiresAt) return false;
      const left = new Date(o.expiresAt).getTime() - Date.now();
      if (left <= 0 || left > 48 * 3600000) return false;
    }
    if (filters.lowestEver && !priceStats(o).isLowestEver) return false;
    return true;
  });
}

export function sortOffers(offers: Offer[], sort: SortKey): Offer[] {
  const arr = [...offers];
  switch (sort) {
    case 'discount':
      return arr.sort((a, b) => discountPercent(b.price, b.previousPrice) - discountPercent(a.price, a.previousPrice));
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    case 'popular':
      return arr.sort((a, b) => b.views - a.views);
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating);
    case 'recent':
      return arr.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    case 'ending':
      return arr.sort((a, b) => {
        const at = a.expiresAt ? new Date(a.expiresAt).getTime() : Infinity;
        const bt = b.expiresAt ? new Date(b.expiresAt).getTime() : Infinity;
        return at - bt;
      });
    case 'lowest-ever':
      return arr.sort((a, b) => dealScore(b).score - dealScore(a).score);
    default:
      return arr;
  }
}

// ---- convenience selectors for homepage sections ----
export const offersByCountry = (country: CountryCode) => OFFERS.filter((o) => o.country === country);

export const flashDeals = (country: CountryCode) =>
  sortOffers(filterOffers({ country, endingSoon: true }), 'ending').slice(0, 8);

export const topDiscounts = (country: CountryCode) =>
  sortOffers(offersByCountry(country), 'discount').slice(0, 8);

export const endingSoon = (country: CountryCode) =>
  sortOffers(offersByCountry(country).filter((o) => o.expiresAt), 'ending').slice(0, 8);

export const byCategory = (country: CountryCode, category: string, limit = 8) =>
  sortOffers(filterOffers({ country, categories: [category] }), 'discount').slice(0, limit);

export const trending = (country: CountryCode) =>
  sortOffers(offersByCountry(country), 'popular').slice(0, 8);

export const mostViewed = (country: CountryCode) =>
  sortOffers(offersByCountry(country), 'popular').slice(0, 12);

export const recentlyAdded = (country: CountryCode) =>
  sortOffers(offersByCountry(country), 'recent').slice(0, 8);

export const featuredOffers = (country: CountryCode) =>
  offersByCountry(country).filter((o) => o.featured).slice(0, 8);

export const offerBySlug = (slug: string) => OFFERS.find((o) => o.slug === slug);

// All retailer offers for the same underlying product (price comparison).
export const comparisonGroup = (offer: Offer) =>
  OFFERS.filter((o) => productKey(o) === productKey(offer) && o.country === offer.country);

export const similarOffers = (offer: Offer, limit = 4) =>
  OFFERS.filter((o) => o.category === offer.category && o.id !== offer.id && o.country === offer.country).slice(0, limit);

export const uniqueProducts = (country?: CountryCode) => {
  const seen = new Map<string, Offer>();
  for (const o of OFFERS) {
    if (country && o.country !== country) continue;
    const k = productKey(o);
    const existing = seen.get(k);
    if (!existing || o.price < existing.price) seen.set(k, o);
  }
  return [...seen.values()];
};
