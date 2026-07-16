import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { offerBySlug, comparisonGroup, uniqueProducts } from '@/lib/queries';
import { retailerBySlug } from '@/data/reference';
import { formatPrice, discountPercent, timeAgo } from '@/lib/format';
import type { SP } from '@/lib/params';

export const metadata: Metadata = {
  title: 'Price Comparison',
  description: 'Compare one product across every Gulf retailer including shipping and coupons.',
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const { locale, country } = await getPrefs();
  const selectedSlug = Array.isArray(sp.product) ? sp.product[0] : sp.product;
  const selected = selectedSlug ? offerBySlug(selectedSlug) : undefined;

  return (
    <div className="py-4">
      <h1 className="text-2xl font-black text-ink">⚖️ {t(dict.compare.title, locale)}</h1>
      <p className="mt-1 text-sm text-ink-muted">{t(dict.compare.subtitle, locale)}</p>
      <p className="mt-1 text-xs text-ink-muted">
        {locale === 'ar'
          ? 'المقارنة تعتمد على معرّفات المنتج (SKU / GTIN / الموديل / السعة / اللون) وليس على تشابه العناوين فقط.'
          : 'Matching uses product identifiers (SKU / GTIN / model / storage / colour) — not just similar titles.'}
      </p>

      {!selected ? (
        <ProductPicker country={country} locale={locale} />
      ) : (
        <ComparisonTable slug={selected.slug} country={country} locale={locale} />
      )}
    </div>
  );
}

function ProductPicker({ country, locale }: { country: 'qa' | 'sa' | 'ae'; locale: 'en' | 'ar' }) {
  const products = uniqueProducts(country);
  return (
    <div className="mt-5">
      <p className="mb-3 font-semibold text-ink-soft">{t(dict.compare.pickProduct, locale)}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((o) => {
          const n = comparisonGroup(o).length;
          return (
            <Link key={o.id} href={`/compare?product=${o.slug}`} className="card flex flex-col gap-2 p-3 hover:border-hot">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-soft">
                <Image src={o.images[0]} alt={t(o.title, locale)} fill sizes="200px" className="object-cover" />
              </div>
              <p className="line-clamp-2 text-sm font-semibold text-ink">{t(o.title, locale)}</p>
              <p className="text-xs text-ink-muted">{n} {locale === 'ar' ? 'متاجر' : 'retailers'} · {t(dict.common.from, locale)} {formatPrice(o.price, o.currency, locale)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonTable({ slug, country, locale }: { slug: string; country: 'qa' | 'sa' | 'ae'; locale: 'en' | 'ar' }) {
  const base = offerBySlug(slug)!;
  const group = comparisonGroup(base);
  const rows = group.map((o) => {
    const couponSaving = o.couponCode ? Math.round(o.price * 0.1) : 0; // demo coupon effect
    const total = o.price + o.shippingFee - couponSaving;
    return { o, couponSaving, total };
  });
  const lowestPrice = Math.min(...rows.map((r) => r.o.price));
  const lowestTotal = Math.min(...rows.map((r) => r.total));
  const fastest = Math.min(...rows.map((r) => r.o.estimatedDeliveryDays));
  const bestRated = Math.max(...rows.map((r) => r.o.rating));
  const h = dict.compare;

  const highlight = (label: string, value: string, cls: string) => (
    <div className={`rounded-xl border p-3 ${cls}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );

  return (
    <div className="mt-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-surface-soft">
          <Image src={base.images[0]} alt={t(base.title, locale)} fill sizes="64px" className="object-cover" />
        </div>
        <div>
          <h2 className="font-bold text-ink">{t(base.title, locale)}</h2>
          <Link href="/compare" className="text-xs font-semibold text-hot hover:underline">← {t(h.pickProduct, locale)}</Link>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {highlight(t(h.lowestPrice, locale), formatPrice(lowestPrice, base.currency, locale), 'border-verified/40 bg-verified-soft text-verified')}
        {highlight(t(h.lowestTotal, locale), formatPrice(lowestTotal, base.currency, locale), 'border-hot/40 bg-hot-soft text-hot')}
        {highlight(t(h.fastest, locale), `${fastest} ${t(dict.product.days, locale)}`, 'border-gold/40 bg-gold-soft text-gold')}
        {highlight(locale === 'ar' ? 'الأعلى تقييماً' : 'Top rated', `★ ${bestRated.toFixed(1)}`, 'border-surface-border bg-surface-soft text-ink-soft')}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-surface-soft text-start text-xs uppercase text-ink-muted">
              {[h.retailer, h.price, h.previous, h.discount, h.shipping, h.delivery, h.coupon, h.total, h.stock, h.lastChecked].map((c, i) => (
                <th key={i} className="whitespace-nowrap px-3 py-2 text-start font-semibold">{t(c, locale)}</th>
              ))}
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.sort((a, b) => a.total - b.total).map(({ o, couponSaving, total }) => {
              const r = retailerBySlug(o.retailer);
              const disc = discountPercent(o.price, o.previousPrice);
              return (
                <tr key={o.id} className="border-b border-surface-border last:border-0 hover:bg-surface-soft">
                  <td className="px-3 py-2"><span className="chip" style={{ borderColor: r?.logoColor }}>{r ? t(r.name, locale) : o.retailer}</span></td>
                  <td className={`px-3 py-2 font-bold ${o.price === lowestPrice ? 'text-verified' : 'text-ink'}`}>{formatPrice(o.price, o.currency, locale)}</td>
                  <td className="px-3 py-2 text-ink-muted line-through">{formatPrice(o.previousPrice, o.currency, locale)}</td>
                  <td className="px-3 py-2"><span className="rounded bg-hot px-1.5 py-0.5 text-xs font-bold text-white">-{disc}%</span></td>
                  <td className="px-3 py-2">{o.freeShipping ? <span className="text-verified">{t(dict.card.freeShipping, locale)}</span> : formatPrice(o.shippingFee, o.currency, locale)}</td>
                  <td className="px-3 py-2">{o.estimatedDeliveryDays === fastest ? <span className="font-bold text-gold">{o.estimatedDeliveryDays} {t(dict.product.days, locale)}</span> : `${o.estimatedDeliveryDays} ${t(dict.product.days, locale)}`}</td>
                  <td className="px-3 py-2">{o.couponCode ? <span className="chip text-hot">{o.couponCode} (-{formatPrice(couponSaving, o.currency, locale)})</span> : '—'}</td>
                  <td className={`px-3 py-2 font-extrabold ${total === lowestTotal ? 'text-hot' : 'text-ink'}`}>{formatPrice(total, o.currency, locale)}</td>
                  <td className="px-3 py-2">{o.inStock ? <span className="text-verified">✓</span> : <span className="text-hot">✕</span>}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-ink-muted">{timeAgo(o.lastUpdated, locale)}</td>
                  <td className="px-3 py-2"><a href={o.externalUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary py-1.5 text-xs">{t(h.visit, locale)}</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-ink-muted">⚠️ {t(dict.footer.priceNotice, locale)} · {t(dict.demoNotice, locale)}</p>
    </div>
  );
}
