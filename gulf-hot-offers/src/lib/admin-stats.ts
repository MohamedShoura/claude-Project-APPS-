import { OFFERS } from '@/data/offers';
import { COUPONS } from '@/data/coupons';
import { RETAILERS, CATEGORIES, COUNTRIES } from '@/data/reference';
import { discountPercent } from './format';
import { dealScore } from './deal-score';

// Deterministic demo analytics derived from the offer dataset.
export function adminStats() {
  const now = Date.now();
  const active = OFFERS.filter((o) => !o.expiresAt || new Date(o.expiresAt).getTime() > now);
  const expired = OFFERS.length - active.length;
  const updatedToday = OFFERS.filter((o) => now - new Date(o.lastUpdated).getTime() < 86400000).length;
  const brokenLinks = Math.round(OFFERS.length * 0.03);
  const needVerify = OFFERS.filter((o) => !o.verified).length;
  const suspicious = OFFERS.filter((o) => dealScore(o).label === 'suspicious').length;

  // Deterministic click/conversion figures seeded from views.
  const totalViews = OFFERS.reduce((a, o) => a + o.views, 0);
  const outboundClicks = Math.round(totalViews * 0.18);
  const conversions = Math.round(outboundClicks * 0.045);
  const ctr = ((outboundClicks / totalViews) * 100).toFixed(1);

  const revenueByCountry = COUNTRIES.map((c) => {
    const clicks = OFFERS.filter((o) => o.country === c.code).reduce((a, o) => a + o.views, 0) * 0.18;
    return { country: c, revenue: Math.round(clicks * 0.045 * 42), clicks: Math.round(clicks) };
  });

  const revenueByRetailer = RETAILERS.map((r) => {
    const clicks = OFFERS.filter((o) => o.retailer === r.slug).reduce((a, o) => a + o.views, 0) * 0.18;
    return { retailer: r, revenue: Math.round(clicks * 0.045 * 42), clicks: Math.round(clicks) };
  }).sort((a, b) => b.revenue - a.revenue);

  const popularCategories = CATEGORIES.map((c) => ({
    category: c,
    count: OFFERS.filter((o) => o.category === c.slug).length,
    views: OFFERS.filter((o) => o.category === c.slug).reduce((a, o) => a + o.views, 0),
  })).filter((c) => c.count > 0).sort((a, b) => b.views - a.views).slice(0, 8);

  const topConverting = [...OFFERS].sort((a, b) => b.views - a.views).slice(0, 6).map((o) => ({
    offer: o,
    clicks: Math.round(o.views * 0.18),
    conversions: Math.round(o.views * 0.18 * 0.045),
    discount: discountPercent(o.price, o.previousPrice),
  }));

  return {
    totalOffers: OFFERS.length,
    activeOffers: active.length,
    expiredOffers: expired,
    retailersConnected: RETAILERS.length,
    updatedToday,
    brokenLinks,
    needVerify,
    suspicious,
    coupons: COUPONS.length,
    outboundClicks,
    conversions,
    ctr,
    estCommission: revenueByCountry.reduce((a, r) => a + r.revenue, 0),
    revenueByCountry,
    revenueByRetailer,
    popularCategories,
    topConverting,
  };
}
