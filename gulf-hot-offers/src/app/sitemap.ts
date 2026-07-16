import type { MetadataRoute } from 'next';
import { OFFERS } from '@/data/offers';
import { CATEGORIES, RETAILERS, COUNTRIES } from '@/data/reference';
import { LEGAL_SLUGS } from '@/data/legal';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gulfhotoffers.example';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => ({ url: `${BASE}${path}`, lastModified: now });

  return [
    url('/'),
    url('/deals'),
    url('/coupons'),
    url('/categories'),
    url('/compare'),
    url('/retailers'),
    ...COUNTRIES.map((c) => url(`/${c.code}`)),
    ...CATEGORIES.map((c) => url(`/category/${c.slug}`)),
    ...RETAILERS.map((r) => url(`/retailer/${r.slug}`)),
    ...OFFERS.map((o) => url(`/product/${o.slug}`)),
    ...LEGAL_SLUGS.map((s) => url(`/${s}`)),
  ];
}
