import type { DealScore, Offer, PriceStats } from './types';
import { retailerBySlug } from '@/data/reference';
import { discountPercent } from './format';

export function priceStats(offer: Offer): PriceStats {
  const prices = offer.priceHistory.map((p) => p.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const average = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  const now = Date.now();
  const within = (days: number) => {
    const cut = now - days * 86400000;
    const pts = offer.priceHistory.filter((p) => new Date(p.date).getTime() >= cut);
    const arr = pts.length ? pts : offer.priceHistory.slice(-1);
    return Math.round(arr.reduce((a, b) => a + b.price, 0) / arr.length);
  };

  return {
    current: offer.price,
    lowest,
    highest,
    average,
    last7: within(7),
    last30: within(30),
    last90: within(90),
    isLowestEver: offer.price <= lowest,
  };
}

// ---------------------------------------------------------------------------
// Deal Score (0-100). A weighted blend of signals — NOT the displayed discount
// alone. A large discount off an inflated "previous price" is explicitly
// penalised so it cannot be labelled "exceptional".
// ---------------------------------------------------------------------------
export function dealScore(offer: Offer, locale: 'ar' | 'en' = 'en'): DealScore {
  const stats = priceStats(offer);
  const reasons: string[] = [];
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const discount = discountPercent(offer.price, offer.previousPrice);

  // 1) Discount vs. real market average (not just the struck-through price).
  const vsAverage = stats.average > 0 ? (stats.average - offer.price) / stats.average : 0;
  let discountScore = Math.max(0, Math.min(1, vsAverage * 2.2)); // saving vs 90d average

  // Suspicious-discount guard: if the "previous price" is far above the 90d
  // average, the headline discount is likely inflated — dampen its contribution.
  const inflation = offer.previousPrice / Math.max(stats.average, 1);
  let suspicious = false;
  if (inflation > 1.35 && discount > 40) {
    suspicious = true;
    discountScore *= 0.4;
    reasons.push(t('Previous price looks inflated vs. history', 'السعر السابق يبدو مبالغاً فيه مقارنة بالسجل'));
  }

  // 2) Lowest-ever bonus.
  const lowestBonus = stats.isLowestEver ? 1 : Math.max(0, 1 - (offer.price - stats.lowest) / Math.max(stats.lowest, 1) * 3);
  if (stats.isLowestEver) reasons.push(t('Lowest recorded price', 'أدنى سعر مُسجّل'));

  // 3) Retailer reliability.
  const reliability = (retailerBySlug(offer.retailer)?.reliability ?? 70) / 100;

  // 4) Product rating & review depth.
  const ratingScore = offer.rating / 5;
  const reviewScore = Math.min(1, offer.reviews / 1500);

  // 5) Availability, shipping and coupon perks.
  const stockScore = offer.inStock ? 1 : 0.2;
  const shippingScore = offer.freeShipping ? 1 : 0.6;
  const couponScore = offer.couponCode ? 1 : 0.7;

  // 6) Urgency (expiring soon adds a little weight).
  const urgency = offer.expiresAt
    ? Math.max(0, Math.min(1, 1 - (new Date(offer.expiresAt).getTime() - Date.now()) / (72 * 3600000)))
    : 0.3;

  const score01 =
    0.30 * discountScore +
    0.14 * lowestBonus +
    0.14 * reliability +
    0.12 * ratingScore +
    0.08 * reviewScore +
    0.08 * stockScore +
    0.06 * shippingScore +
    0.04 * couponScore +
    0.04 * urgency;

  let score = Math.round(Math.max(0, Math.min(1, score01)) * 100);
  if (!offer.inStock) score = Math.min(score, 45);

  let label: DealScore['label'];
  if (suspicious) label = 'suspicious';
  else if (score >= 85) label = 'exceptional';
  else if (score >= 70) label = 'hot';
  else if (score >= 55) label = 'good';
  else label = 'regular';

  if (discount > 0) reasons.unshift(t(`${discount}% off the listed price`, `خصم ${discount}% عن السعر المعلن`));
  if (reliability >= 0.9) reasons.push(t('Highly reliable retailer', 'متجر موثوق للغاية'));

  return { score, label, reasons };
}

export const DEAL_LABEL_TEXT: Record<DealScore['label'], Record<'en' | 'ar', string>> = {
  exceptional: { en: 'Exceptional Deal', ar: 'صفقة استثنائية' },
  hot: { en: 'Hot Deal', ar: 'صفقة رائجة' },
  good: { en: 'Good Deal', ar: 'صفقة جيدة' },
  regular: { en: 'Regular Price', ar: 'سعر عادي' },
  suspicious: { en: 'Possible Inflated Discount', ar: 'خصم قد يكون مبالغاً فيه' },
};
