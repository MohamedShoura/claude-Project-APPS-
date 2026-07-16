import type { Metadata } from 'next';
import Link from 'next/link';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { adminStats } from '@/lib/admin-stats';
import { OFFERS } from '@/data/offers';
import { RETAILERS, countryByCode, retailerBySlug, categoryBySlug } from '@/data/reference';
import { formatPrice, discountPercent, timeAgo } from '@/lib/format';
import { dealScore } from '@/lib/deal-score';

export const metadata: Metadata = { title: 'Admin Dashboard', robots: { index: false, follow: false } };

function Stat({ label, value, sub, tone }: { label: string; value: string | number; sub?: string; tone?: 'hot' | 'verified' | 'gold' }) {
  const color = tone === 'hot' ? 'text-hot' : tone === 'verified' ? 'text-verified' : tone === 'gold' ? 'text-gold' : 'text-ink';
  return (
    <div className="card p-4">
      <p className="text-xs text-ink-muted">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-[11px] text-ink-muted">{sub}</p>}
    </div>
  );
}

export default async function AdminPage() {
  const { locale } = await getPrefs();
  const s = adminStats();
  const statusColor: Record<string, string> = {
    demo: 'bg-amber-100 text-amber-800', connected: 'bg-verified-soft text-verified',
    error: 'bg-hot-soft text-hot', disabled: 'bg-surface-soft text-ink-muted',
  };

  return (
    <div className="py-4">
      <div className="mb-3 flex items-center gap-3">
        <h1 className="text-2xl font-black text-ink">🛠️ {t(dict.admin.title, locale)}</h1>
        <span className="chip bg-amber-100 text-amber-800">🧪 {t(dict.demoBadge, locale)}</span>
        <Link href="/" className="ms-auto text-sm text-hot hover:underline">← {t(dict.nav.home, locale)}</Link>
      </div>
      <p className="mb-4 text-xs text-ink-muted">{t(dict.demoNotice, locale)}</p>

      {/* Overview */}
      <section className="mb-6">
        <h2 className="section-title mb-2">{t(dict.admin.overview, locale)}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label={locale === 'ar' ? 'إجمالي العروض' : 'Total offers'} value={s.totalOffers} />
          <Stat label={locale === 'ar' ? 'عروض نشطة' : 'Active offers'} value={s.activeOffers} tone="verified" />
          <Stat label={locale === 'ar' ? 'عروض منتهية' : 'Expired'} value={s.expiredOffers} tone="hot" />
          <Stat label={locale === 'ar' ? 'متاجر متصلة' : 'Retailers'} value={s.retailersConnected} />
          <Stat label={locale === 'ar' ? 'حُدّثت اليوم' : 'Updated today'} value={s.updatedToday} />
          <Stat label={locale === 'ar' ? 'كوبونات' : 'Coupons'} value={s.coupons} />
          <Stat label={locale === 'ar' ? 'نقرات خارجية' : 'Outbound clicks'} value={s.outboundClicks.toLocaleString()} tone="gold" />
          <Stat label={locale === 'ar' ? 'معدل النقر' : 'CTR'} value={`${s.ctr}%`} />
          <Stat label={locale === 'ar' ? 'تحويلات' : 'Conversions'} value={s.conversions.toLocaleString()} tone="verified" />
          <Stat label={locale === 'ar' ? 'عمولة تقديرية' : 'Est. commission'} value={`$${s.estCommission.toLocaleString()}`} tone="gold" />
          <Stat label={locale === 'ar' ? 'روابط معطّلة' : 'Broken links'} value={s.brokenLinks} tone="hot" />
          <Stat label={locale === 'ar' ? 'بحاجة لتحقق' : 'Need verify'} value={s.needVerify} />
        </div>
      </section>

      {/* Connectors */}
      <section className="mb-6">
        <h2 className="section-title mb-2">{t(dict.admin.connectors, locale)}</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-surface-border bg-surface-soft text-xs uppercase text-ink-muted">
                {['Retailer', 'Country', 'Type', 'Status', 'Last update', 'Imported', 'Failed', ''].map((h) => <th key={h} className="px-3 py-2 text-start font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {RETAILERS.map((r) => {
                const imported = OFFERS.filter((o) => o.retailer === r.slug).length;
                return (
                  <tr key={r.slug} className="border-b border-surface-border last:border-0">
                    <td className="px-3 py-2 font-semibold text-ink">{t(r.name, locale)}</td>
                    <td className="px-3 py-2">{r.countries.map((c) => countryByCode(c)?.flag).join(' ')}</td>
                    <td className="px-3 py-2 text-ink-muted">{r.integration}</td>
                    <td className="px-3 py-2"><span className={`chip ${statusColor[r.connectorStatus]}`}>{r.connectorStatus}</span></td>
                    <td className="px-3 py-2 text-ink-muted">{timeAgo(OFFERS.find((o) => o.retailer === r.slug)?.lastUpdated ?? new Date().toISOString(), locale)}</td>
                    <td className="px-3 py-2">{imported}</td>
                    <td className="px-3 py-2 text-ink-muted">0</td>
                    <td className="px-3 py-2"><button className="btn-outline py-1 text-xs">↻ Sync</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-1 text-[11px] text-ink-muted">{locale === 'ar' ? 'كل الموصلات تعمل على طبقة البيانات التجريبية حتى يتم ربط واجهات برمجة رسمية.' : 'All connectors run on the demo data layer until official APIs are connected (see README).'}</p>
      </section>

      {/* Affiliate analytics */}
      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="section-title mb-3">{locale === 'ar' ? 'الإيراد حسب الدولة' : 'Revenue by country'}</h2>
          {s.revenueByCountry.map((r) => (
            <div key={r.country.code} className="mb-2">
              <div className="flex justify-between text-sm"><span>{r.country.flag} {t(r.country.name, locale)}</span><span className="font-bold">${r.revenue.toLocaleString()}</span></div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-border"><div className="h-full bg-verified" style={{ width: `${(r.revenue / s.revenueByCountry[0].revenue) * 100}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="card p-4">
          <h2 className="section-title mb-3">{locale === 'ar' ? 'الإيراد حسب المتجر' : 'Revenue by retailer'}</h2>
          {s.revenueByRetailer.map((r) => (
            <div key={r.retailer.slug} className="mb-2">
              <div className="flex justify-between text-sm"><span>{t(r.retailer.name, locale)}</span><span className="font-bold">${r.revenue.toLocaleString()}</span></div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-border"><div className="h-full bg-hot" style={{ width: `${(r.revenue / s.revenueByRetailer[0].revenue) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* Top converting */}
      <section className="mb-6">
        <h2 className="section-title mb-2">{locale === 'ar' ? 'أفضل العروض تحويلاً' : 'Top-converting deals'}</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="border-b border-surface-border bg-surface-soft text-xs uppercase text-ink-muted">{['Product', 'Retailer', 'Discount', 'Clicks', 'Conversions', 'Score'].map((h) => <th key={h} className="px-3 py-2 text-start font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {s.topConverting.map(({ offer, clicks, conversions, discount }) => (
                <tr key={offer.id} className="border-b border-surface-border last:border-0">
                  <td className="px-3 py-2"><Link href={`/product/${offer.slug}`} className="font-semibold text-ink hover:text-hot">{t(offer.title, locale)}</Link></td>
                  <td className="px-3 py-2 text-ink-muted">{t(retailerBySlug(offer.retailer)?.name ?? { en: offer.retailer, ar: offer.retailer }, locale)}</td>
                  <td className="px-3 py-2"><span className="chip text-hot">-{discount}%</span></td>
                  <td className="px-3 py-2">{clicks.toLocaleString()}</td>
                  <td className="px-3 py-2 font-bold text-verified">{conversions}</td>
                  <td className="px-3 py-2">{dealScore(offer).score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Offer management (sample) */}
      <section>
        <h2 className="section-title mb-2">{t(dict.admin.offers, locale)} · {locale === 'ar' ? 'إدارة (عرض تجريبي)' : 'management (demo view)'}</h2>
        <div className="mb-2 flex flex-wrap gap-2 text-xs">
          {['+ Add offer', 'Import CSV/Excel', 'Approve imported', 'Merge duplicates', 'Remove expired'].map((b) => <button key={b} className="btn-outline py-1.5">{b}</button>)}
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="border-b border-surface-border bg-surface-soft text-xs uppercase text-ink-muted">{['Product', 'Category', 'Retailer', 'Price', 'Discount', 'Status', 'Updated'].map((h) => <th key={h} className="px-3 py-2 text-start font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {OFFERS.slice(0, 12).map((o) => {
                const label = dealScore(o).label;
                return (
                  <tr key={o.id} className="border-b border-surface-border last:border-0">
                    <td className="px-3 py-2"><Link href={`/product/${o.slug}`} className="font-semibold text-ink hover:text-hot">{t(o.title, locale)}</Link></td>
                    <td className="px-3 py-2 text-ink-muted">{t(categoryBySlug(o.category)?.name ?? { en: o.category, ar: o.category }, locale)}</td>
                    <td className="px-3 py-2 text-ink-muted">{t(retailerBySlug(o.retailer)?.name ?? { en: o.retailer, ar: o.retailer }, locale)}</td>
                    <td className="px-3 py-2 font-bold">{formatPrice(o.price, o.currency, locale)}</td>
                    <td className="px-3 py-2"><span className="chip text-hot">-{discountPercent(o.price, o.previousPrice)}%</span></td>
                    <td className="px-3 py-2">{label === 'suspicious' ? <span className="chip text-amber-700">⚠️ review</span> : o.verified ? <span className="chip text-verified">✓ live</span> : <span className="chip">pending</span>}</td>
                    <td className="px-3 py-2 text-xs text-ink-muted">{timeAgo(o.lastUpdated, locale)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
