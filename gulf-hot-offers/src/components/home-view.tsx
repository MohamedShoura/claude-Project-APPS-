import Link from 'next/link';
import type { CountryCode, Locale } from '@/lib/types';
import { dict, t } from '@/i18n/dictionaries';
import { CATEGORIES, COUNTRIES, RETAILERS, countryByCode } from '@/data/reference';
import { COUPONS } from '@/data/coupons';
import {
  flashDeals, topDiscounts, endingSoon, byCategory, trending, mostViewed, recentlyAdded,
} from '@/lib/queries';
import { OfferRail } from './rails';
import { Section } from './ui';
import { CouponCard } from './coupon-card';

function Hero({ country, locale }: { country: CountryCode; locale: Locale }) {
  const c = countryByCode(country)!;
  return (
    <section className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-ink to-[#1e3a5f] px-6 py-10 text-white sm:px-10 sm:py-14">
      <div className="absolute -end-16 -top-16 h-64 w-64 rounded-full bg-hot/25 blur-3xl" />
      <div className="absolute -bottom-20 -start-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative max-w-2xl">
        <span className="chip mb-3 border-white/20 bg-white/10 text-white">🔥 {c.flag} {t(c.name, locale)} · {c.currency}</span>
        <h1 className="text-3xl font-black leading-tight sm:text-5xl">{t(dict.tagline, locale)}</h1>
        <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
          {locale === 'ar'
            ? 'اكتشف وقارن أهم الخصومات من نون وأمازون وسنونو عبر قطر والسعودية والإمارات.'
            : 'Discover and compare the hottest discounts from Noon, Amazon and Snoonu across Qatar, Saudi Arabia and the UAE.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/deals" className="btn-primary">{t(dict.nav.deals, locale)} →</Link>
          <Link href="/coupons" className="btn-outline bg-white/10 text-white hover:border-white/40">{t(dict.nav.coupons, locale)}</Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/70">
          <span>✓ {RETAILERS.length} {locale === 'ar' ? 'متاجر' : 'retailers'}</span>
          <span>✓ {locale === 'ar' ? '3 دول خليجية' : '3 Gulf countries'}</span>
          <span>✓ {locale === 'ar' ? 'مقارنة أسعار فورية' : 'Instant price comparison'}</span>
        </div>
      </div>
    </section>
  );
}

function CountryTabs({ country, locale }: { country: CountryCode; locale: Locale }) {
  return (
    <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
      {COUNTRIES.map((c) => (
        <Link
          key={c.code}
          href={`/${c.code}`}
          className={`chip whitespace-nowrap ${c.code === country ? 'border-hot bg-hot-soft font-bold text-hot' : ''}`}
        >
          {c.flag} {t(c.name, locale)}
        </Link>
      ))}
    </div>
  );
}

function CategoryStrip({ locale }: { locale: Locale }) {
  return (
    <div className="no-scrollbar -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      {CATEGORIES.filter((c) => !c.parent).map((c) => (
        <Link key={c.slug} href={`/deals?category=${c.slug}`} className="flex w-20 shrink-0 flex-col items-center gap-1.5 rounded-xl border border-surface-border bg-white p-2 text-center hover:border-hot">
          <span className="text-2xl">{c.icon}</span>
          <span className="text-[11px] font-semibold text-ink-soft">{t(c.name, locale)}</span>
        </Link>
      ))}
    </div>
  );
}

function RetailerLogos({ locale }: { locale: Locale }) {
  return (
    <Section title={t(dict.sections.retailers, locale)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {RETAILERS.map((r) => (
          <Link key={r.slug} href={`/retailer/${r.slug}`} className="card flex items-center gap-2 p-3 hover:border-hot">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold" style={{ background: r.logoColor, color: '#1a1a1a' }}>{t(r.name, locale).slice(0, 2)}</span>
            <span className="min-w-0 text-xs font-semibold text-ink-soft">{t(r.name, locale)}</span>
          </Link>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-ink-muted">{t(dict.footer.independentNotice, locale)}</p>
    </Section>
  );
}

export function HomeView({ country, locale }: { country: CountryCode; locale: Locale }) {
  const flash = flashDeals(country);
  const countryCoupons = COUPONS.filter((c) => c.countries.includes(country)).slice(0, 4);

  const sections: { key: string; title: string; offers: ReturnType<typeof topDiscounts>; accent?: 'hot' | 'gold' | 'verified' }[] = [
    { key: 'top', title: t(dict.sections.topDiscounts, locale), offers: topDiscounts(country), accent: 'hot' },
    { key: 'ending', title: t(dict.sections.endingSoon, locale), offers: endingSoon(country), accent: 'gold' },
    { key: 'electronics', title: t(dict.sections.electronics, locale), offers: byCategory(country, 'electronics') },
    { key: 'mobiles', title: t(dict.sections.mobiles, locale), offers: byCategory(country, 'smartphones') },
    { key: 'fashion', title: t(dict.sections.fashion, locale), offers: byCategory(country, 'fashion') },
    { key: 'beauty', title: t(dict.sections.beauty, locale), offers: byCategory(country, 'beauty') },
    { key: 'home', title: t(dict.sections.home, locale), offers: byCategory(country, 'home-kitchen') },
    { key: 'grocery', title: t(dict.sections.grocery, locale), offers: byCategory(country, 'grocery') },
    { key: 'baby', title: t(dict.sections.baby, locale), offers: byCategory(country, 'baby-kids') },
    { key: 'gaming', title: t(dict.sections.gaming, locale), offers: byCategory(country, 'gaming') },
    { key: 'trending', title: t(dict.sections.trending, locale), offers: trending(country), accent: 'verified' },
    { key: 'mostviewed', title: t(dict.sections.mostViewed, locale), offers: mostViewed(country) },
    { key: 'recent', title: t(dict.sections.recent, locale), offers: recentlyAdded(country) },
  ];

  return (
    <div>
      <Hero country={country} locale={locale} />
      <CountryTabs country={country} locale={locale} />
      <CategoryStrip locale={locale} />

      {flash.length > 0 && (
        <Section title={`⚡ ${t(dict.sections.flash, locale)}`} href="/deals?ending=1" viewAllLabel={t(dict.common.viewAll, locale)} accent="hot">
          <OfferRail offers={flash} locale={locale} />
        </Section>
      )}

      {sections.filter((s) => s.offers.length > 0).map((s) => (
        <Section key={s.key} title={s.title} href={`/deals`} viewAllLabel={t(dict.common.viewAll, locale)} accent={s.accent}>
          <OfferRail offers={s.offers} locale={locale} />
        </Section>
      ))}

      {countryCoupons.length > 0 && (
        <Section title={t(dict.sections.topCoupons, locale)} href="/coupons" viewAllLabel={t(dict.common.viewAll, locale)} accent="gold">
          <div className="grid gap-3 sm:grid-cols-2">
            {countryCoupons.map((c) => <CouponCard key={c.id} coupon={c} locale={locale} />)}
          </div>
        </Section>
      )}

      <RetailerLogos locale={locale} />
    </div>
  );
}
