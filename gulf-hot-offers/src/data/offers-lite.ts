import { OFFERS } from './offers';

// A trimmed, client-safe projection of offers for account widgets
// (favourites / recently viewed) where the full offer object isn't needed.
export interface OfferLite {
  slug: string;
  title_en: string;
  title_ar: string;
  price: number;
  previousPrice: number;
  currency: string;
  retailer: string;
  image: string;
  rating: number;
  externalUrl: string;
}

export const OFFERS_LITE: Record<string, OfferLite> = Object.fromEntries(
  OFFERS.map((o) => [o.slug, {
    slug: o.slug,
    title_en: o.title.en,
    title_ar: o.title.ar,
    price: o.price,
    previousPrice: o.previousPrice,
    currency: o.currency,
    retailer: o.retailer,
    image: o.images[0],
    rating: o.rating,
    externalUrl: o.externalUrl,
  }]),
);
