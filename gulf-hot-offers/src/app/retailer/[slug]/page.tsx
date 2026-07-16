import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { RETAILERS, retailerBySlug, countryByCode, CATEGORIES } from '@/data/reference';
import { OFFERS } from '@/data/offers';
import { sortOffers } from '@/lib/queries';
import { COUPONS } from '@/data/coupons';
import { OfferGrid } from '@/components/rails';
import { CouponCard } from '@/components/coupon-card';
import { Section } from '@/components/ui';

export function generateStaticParams() {
  return RETAILERS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = retailerBySlug(slug);
  if (!r) return {};
  return {
    title: `${r.name.en} Deals & Coupons`,
    description: `${r.name.en} deals, discounts and coupon codes on Gulf Hot Offers. Independent — not the official ${r.name.en} website.`,
    alternates: { canonical: `/retailer/${slug}` },
  };
}

export default async function RetailerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const retailer = retailerBySlug(slug);
  if (!retailer) notFound();
  const { locale } = await getPrefs();

  const offers = OFFERS.filter((o) => o.retailer === slug);
  const topDeals = sortOffers(offers, 'discount').slice(0, 8);
  const mostViewed = sortOffers(offers, 'popular').slice(0, 8);
  const recent = sortOffers(offers, 'recent').slice(0, 4);
  const coupons = COUPONS.filter((c) => c.retailer === slug);
  const topCategories = [...new Set(offers.map((o) => o.category))].map((s) => CATEGORIES.find((c) => c.slug === s)).filter(Boolean).slice(0, 8);

  return (
    <div className="py-4">
      {/* Overview */}
      <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl text-xl font-black" style={{ background: retailer.logoColor, color: '#1a1a1a' }}>{t(retailer.name, locale).slice(0, 2)}</span>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-ink">{t(retailer.name, locale)}</h1>
          <p className="text-sm text-ink-muted">{t(retailer.overview, locale)}</p>
          <p className="mt-1 text-xs text-ink-muted">{retailer.countries.map((c) => `${countryByCode(c)?.flag} ${t(countryByCode(c)!.name, locale)}`).join(' · ')}</p>
        </div>
        <a href={retailer.externalBaseUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary">{t(dict.compare.visit, locale)} ↗</a>
      </div>

      <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
        ℹ️ {locale === 'ar'
          ? `عروض الخليج الساخنة موقع مستقل وليس الموقع الرسمي لـ ${t(retailer.name, locale)}.`
          : `Gulf Hot Offers is independent and is not the official ${t(retailer.name, locale)} website.`}
      </div>

      {/* Top categories */}
      {topCategories.length > 0 && (
        <Section title={locale === 'ar' ? 'أهم الفئات' : 'Top categories'}>
          <div className="flex flex-wrap gap-2">
            {topCategories.map((c) => c && <Link key={c.slug} href={`/deals?retailer=${slug}&category=${c.slug}`} className="chip hover:border-hot">{c.icon} {t(c.name, locale)}</Link>)}
          </div>
        </Section>
      )}

      {topDeals.length > 0 && (
        <Section title={t(dict.sections.topDiscounts, locale)} href={`/deals?retailer=${slug}`} viewAllLabel={t(dict.common.viewAll, locale)} accent="hot">
          <OfferGrid offers={topDeals} locale={locale} />
        </Section>
      )}

      {coupons.length > 0 && (
        <Section title={t(dict.sections.topCoupons, locale)} accent="gold">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{coupons.map((c) => <CouponCard key={c.id} coupon={c} locale={locale} />)}</div>
        </Section>
      )}

      {mostViewed.length > 0 && (
        <Section title={t(dict.sections.mostViewed, locale)}>
          <OfferGrid offers={mostViewed} locale={locale} />
        </Section>
      )}

      {recent.length > 0 && (
        <Section title={t(dict.sections.recent, locale)}>
          <OfferGrid offers={recent} locale={locale} />
        </Section>
      )}
    </div>
  );
}
