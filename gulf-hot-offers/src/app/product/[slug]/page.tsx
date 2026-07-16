import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { OFFERS } from '@/data/offers';
import { offerBySlug, comparisonGroup, similarOffers } from '@/lib/queries';
import { retailerBySlug, categoryBySlug, brandBySlug } from '@/data/reference';
import { formatPrice, discountPercent, timeAgo, formatDate } from '@/lib/format';
import { dealScore, priceStats } from '@/lib/deal-score';
import { ProductGallery } from '@/components/product-gallery';
import { PriceHistoryChart } from '@/components/price-history-chart';
import { PriceAlertForm, ShareRow, ReportPriceButton, TrackView } from '@/components/product-actions';
import { DealScoreBadge, StarRating, Countdown } from '@/components/ui';
import { FavouriteButton } from '@/components/offer-card';
import { OfferGrid } from '@/components/rails';

export function generateStaticParams() {
  return OFFERS.slice(0, 40).map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offer = offerBySlug(slug);
  if (!offer) return {};
  const disc = discountPercent(offer.price, offer.previousPrice);
  return {
    title: `${offer.title.en} — ${disc}% off`,
    description: `${offer.title.en} at ${formatPrice(offer.price, offer.currency, 'en')} (was ${formatPrice(offer.previousPrice, offer.currency, 'en')}). Compare deals on Gulf Hot Offers.`,
    alternates: { canonical: `/product/${slug}` },
    openGraph: { images: [offer.images[0]], title: offer.title.en },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offerBySlug(slug);
  if (!offer) notFound();

  const { locale } = await getPrefs();
  const retailer = retailerBySlug(offer.retailer);
  const category = categoryBySlug(offer.category);
  const brand = brandBySlug(offer.brand);
  const disc = discountPercent(offer.price, offer.previousPrice);
  const saved = offer.previousPrice - offer.price;
  const score = dealScore(offer, locale);
  const stats = priceStats(offer);
  const group = comparisonGroup(offer).sort((a, b) => (a.price + a.shippingFee) - (b.price + b.shippingFee));
  const others = group.filter((o) => o.id !== offer.id);
  const cheaper = others.filter((o) => o.price + o.shippingFee < offer.price + offer.shippingFee);
  const similar = similarOffers(offer);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: offer.title.en,
    image: offer.images[0],
    description: offer.description.en,
    brand: { '@type': 'Brand', name: brand?.name ?? offer.brand },
    sku: offer.sku,
    gtin: offer.gtin,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: offer.rating, reviewCount: offer.reviews },
    offers: {
      '@type': 'Offer',
      price: offer.price,
      priceCurrency: offer.currency,
      availability: offer.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: offer.externalUrl,
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: category?.name.en, item: `/deals?category=${offer.category}` },
      { '@type': 'ListItem', position: 3, name: offer.title.en },
    ],
  };

  return (
    <div className="py-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <TrackView slug={offer.slug} />

      {/* Breadcrumb */}
      <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-ink-muted">
        <Link href="/" className="hover:text-hot">{t(dict.nav.home, locale)}</Link>
        <span>/</span>
        {category && <><Link href={`/deals?category=${category.slug}`} className="hover:text-hot">{t(category.name, locale)}</Link><span>/</span></>}
        <span className="text-ink-soft">{t(offer.title, locale)}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,42%)_1fr]">
        <div>
          <ProductGallery offer={offer} locale={locale} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              {brand && <Link href={`/deals?brand=${brand.slug}`} className="text-sm font-semibold text-hot">{brand.name}</Link>}
              <h1 className="text-2xl font-black text-ink">{t(offer.title, locale)}</h1>
            </div>
            <FavouriteButton slug={offer.slug} locale={locale} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StarRating value={offer.rating} reviews={offer.reviews} locale={locale} reviewsLabel={t(dict.card.reviews, locale)} />
            <DealScoreBadge score={score} locale={locale} />
            {offer.verified && <span className="chip text-verified">✓ {t(dict.card.verified, locale)}</span>}
          </div>

          {/* Price block */}
          <div className="card p-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-ink">{formatPrice(offer.price, offer.currency, locale)}</span>
              {offer.previousPrice > offer.price && <span className="text-lg text-ink-muted line-through">{formatPrice(offer.previousPrice, offer.currency, locale)}</span>}
              {disc > 0 && <span className="rounded-lg bg-hot px-2 py-0.5 text-sm font-bold text-white">-{disc}%</span>}
            </div>
            {saved > 0 && <p className="mt-1 text-sm font-semibold text-verified">{t(dict.product.amountSaved, locale)} {formatPrice(saved, offer.currency, locale)}</p>}

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink-soft sm:grid-cols-4">
              <div className="rounded-lg bg-surface-soft p-2"><p className="text-ink-muted">{t(dict.product.stock, locale)}</p><p className={`font-bold ${offer.inStock ? 'text-verified' : 'text-hot'}`}>{offer.inStock ? t(dict.card.inStock, locale) : t(dict.card.outOfStock, locale)}</p></div>
              <div className="rounded-lg bg-surface-soft p-2"><p className="text-ink-muted">{t(dict.product.delivery, locale)}</p><p className="font-bold">{offer.freeShipping ? t(dict.card.freeShipping, locale) : formatPrice(offer.shippingFee, offer.currency, locale)}</p></div>
              <div className="rounded-lg bg-surface-soft p-2"><p className="text-ink-muted">{t(dict.compare.delivery, locale)}</p><p className="font-bold">{offer.estimatedDeliveryDays} {t(dict.product.days, locale)}</p></div>
              <div className="rounded-lg bg-surface-soft p-2"><p className="text-ink-muted">{t(dict.card.lastUpdated, locale)}</p><p className="font-bold">{timeAgo(offer.lastUpdated, locale)}</p></div>
            </div>

            {offer.expiresAt && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-hot-soft p-2">
                <span className="text-sm font-semibold text-hot">⏰ {t(dict.card.endsIn, locale)}</span>
                <Countdown target={offer.expiresAt} locale={locale} />
              </div>
            )}

            {offer.couponCode && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-ink-soft">🏷️ {t(dict.card.coupon, locale)}:</span>
                <span className="rounded-lg border border-dashed border-hot bg-hot-soft px-3 py-1 text-sm font-bold text-hot">{offer.couponCode}</span>
              </div>
            )}

            <a href={offer.externalUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary mt-4 w-full py-3 text-base">
              {t(dict.product.goToStore, locale)} — {retailer ? t(retailer.name, locale) : offer.retailer} ↗
            </a>
            <p className="mt-2 text-[11px] text-ink-muted">🔗 {t(dict.footer.affiliateDisclosure, locale)}</p>
            <p className="text-[11px] text-ink-muted">⚠️ {t(dict.footer.priceNotice, locale)}</p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <Link href={`/compare?product=${offer.slug}`} className="btn-outline py-2 text-xs">⚖️ {t(dict.product.compareRetailers, locale)}</Link>
              <ReportPriceButton locale={locale} />
            </div>
          </div>

          <PriceAlertForm offer={offer} locale={locale} />
          <div className="card p-3"><ShareRow title={t(offer.title, locale)} locale={locale} /></div>
        </div>
      </div>

      {/* Price history */}
      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="card p-4">
          <h2 className="section-title mb-2">{t(dict.product.priceHistory, locale)}</h2>
          <PriceHistoryChart history={offer.priceHistory} currency={offer.currency} locale={locale} />
        </div>
        <div className="card grid grid-cols-2 gap-2 p-4 text-sm lg:grid-cols-1">
          {[
            [t(dict.product.current, locale), stats.current, 'text-ink'],
            [t(dict.product.lowest, locale), stats.lowest, 'text-verified'],
            [t(dict.product.highest, locale), stats.highest, 'text-hot'],
            [t(dict.product.average, locale), stats.average, 'text-ink-soft'],
          ].map(([label, val, cls]) => (
            <div key={label as string} className="flex items-center justify-between">
              <span className="text-ink-muted">{label as string}</span>
              <span className={`font-bold ${cls as string}`}>{formatPrice(val as number, offer.currency, locale)}</span>
            </div>
          ))}
          {stats.isLowestEver && <span className="chip text-verified">🎯 {t(dict.filters.lowestEver, locale)}</span>}
        </div>
      </section>

      {/* Description & features */}
      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="section-title mb-2">{t(dict.product.description, locale)}</h2>
          <p className="text-sm text-ink-soft">{t(offer.description, locale)}</p>
          <dl className="mt-3 grid grid-cols-2 gap-1 text-xs">
            {[['Brand', brand?.name], ['Model', offer.model], ['SKU', offer.sku], ['GTIN', offer.gtin], ['Storage', offer.storage], ['Color', offer.color], ['Size', offer.size]]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k as string} className="flex justify-between border-b border-surface-border py-1"><dt className="text-ink-muted">{k as string}</dt><dd className="font-semibold text-ink-soft">{v as string}</dd></div>
              ))}
          </dl>
        </div>
        <div className="card p-4">
          <h2 className="section-title mb-2">{t(dict.product.features, locale)}</h2>
          <ul className="space-y-1.5 text-sm text-ink-soft">
            {offer.features[locale].map((f, i) => <li key={i} className="flex gap-2"><span className="text-verified">✓</span>{f}</li>)}
          </ul>
        </div>
      </section>

      {/* Other retailers */}
      {others.length > 0 && (
        <section className="mt-6">
          <h2 className="section-title mb-3">{t(dict.product.otherRetailers, locale)}</h2>
          <div className="card divide-y divide-surface-border">
            {group.map((o) => {
              const r = retailerBySlug(o.retailer);
              const total = o.price + o.shippingFee;
              const isCheapest = o.id === group[0].id;
              return (
                <div key={o.id} className={`flex flex-wrap items-center gap-3 p-3 ${o.id === offer.id ? 'bg-surface-soft' : ''}`}>
                  <span className="chip" style={{ borderColor: r?.logoColor }}>{r ? t(r.name, locale) : o.retailer}</span>
                  <span className="font-bold text-ink">{formatPrice(o.price, o.currency, locale)}</span>
                  <span className="text-xs text-ink-muted">+ {o.freeShipping ? t(dict.card.freeShipping, locale) : formatPrice(o.shippingFee, o.currency, locale)}</span>
                  <span className="text-xs text-ink-muted">{o.estimatedDeliveryDays} {t(dict.product.days, locale)}</span>
                  {isCheapest && <span className="chip text-verified">✓ {t(dict.compare.lowestTotal, locale)}</span>}
                  <span className="ms-auto text-sm font-bold text-ink-soft">= {formatPrice(total, o.currency, locale)}</span>
                  <a href={o.externalUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary py-1.5 text-xs">{t(dict.compare.visit, locale)}</a>
                </div>
              );
            })}
          </div>
          {cheaper.length > 0 && <p className="mt-2 text-sm font-semibold text-verified">💡 {t(dict.product.betterPrice, locale)}: {cheaper.length}</p>}
        </section>
      )}

      {/* Similar offers */}
      {similar.length > 0 && (
        <section className="mt-8">
          <h2 className="section-title mb-3">{t(dict.product.similar, locale)}</h2>
          <OfferGrid offers={similar} locale={locale} />
        </section>
      )}
    </div>
  );
}
