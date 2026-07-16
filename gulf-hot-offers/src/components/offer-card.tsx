'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Locale, Offer } from '@/lib/types';
import { dict, t } from '@/i18n/dictionaries';
import { formatPrice, discountPercent, timeAgo } from '@/lib/format';
import { dealScore } from '@/lib/deal-score';
import { retailerBySlug } from '@/data/reference';
import { useUser } from './providers';
import { Countdown, DealScoreBadge, StarRating } from './ui';

export function FavouriteButton({ slug, locale, className }: { slug: string; locale: Locale; className?: string }) {
  const { isFavourite, toggleFavourite, ready } = useUser();
  const active = ready && isFavourite(slug);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={t(dict.card.favourite, locale)}
      onClick={(e) => { e.preventDefault(); toggleFavourite(slug); }}
      className={className ?? `flex h-9 w-9 items-center justify-center rounded-full border transition ${active ? 'border-hot bg-hot text-white' : 'border-surface-border bg-white/90 text-ink-soft hover:border-hot'}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2 4.5 5.5 4.5c2 0 3.4 1.2 4.5 2.6C11.1 5.7 12.5 4.5 14.5 4.5 18 4.5 19.6 8.3 22 11.7 19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}

export function OfferCard({ offer, locale, view = 'grid' }: { offer: Offer; locale: Locale; view?: 'grid' | 'list' }) {
  const retailer = retailerBySlug(offer.retailer);
  const discount = discountPercent(offer.price, offer.previousPrice);
  const score = dealScore(offer, locale);
  const saved = offer.previousPrice - offer.price;
  const href = `/product/${offer.slug}`;

  const priceBlock = (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className="text-lg font-extrabold text-ink">{formatPrice(offer.price, offer.currency, locale)}</span>
      {offer.previousPrice > offer.price && (
        <span className="text-sm text-ink-muted line-through">{formatPrice(offer.previousPrice, offer.currency, locale)}</span>
      )}
    </div>
  );

  if (view === 'list') {
    return (
      <div className="card flex gap-4 p-3">
        <Link href={href} className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-surface-soft">
          <Image src={offer.images[0]} alt={t(offer.title, locale)} fill sizes="112px" className="object-cover" />
          {discount > 0 && <span className="absolute start-1.5 top-1.5 rounded-md bg-hot px-1.5 py-0.5 text-[11px] font-bold text-white">-{discount}%</span>}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={href} className="line-clamp-2 font-semibold text-ink hover:text-hot">{t(offer.title, locale)}</Link>
            <FavouriteButton slug={offer.slug} locale={locale} />
          </div>
          <StarRating value={offer.rating} reviews={offer.reviews} locale={locale} reviewsLabel={t(dict.card.reviews, locale)} />
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
            {priceBlock}
            <div className="flex items-center gap-2">
              <DealScoreBadge score={score} locale={locale} />
              <a href={offer.externalUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary py-1.5 text-xs">{t(dict.card.goToStore, locale)}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group flex h-full flex-col overflow-hidden transition hover:shadow-pop">
      <div className="relative">
        <Link href={href} className="relative block aspect-square overflow-hidden bg-surface-soft">
          <Image src={offer.images[0]} alt={t(offer.title, locale)} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" />
        </Link>
        {discount > 0 && (
          <span className="absolute start-2 top-2 rounded-lg bg-hot px-2 py-1 text-xs font-extrabold text-white shadow">-{discount}% {t(dict.card.off, locale)}</span>
        )}
        <div className="absolute end-2 top-2">
          <FavouriteButton slug={offer.slug} locale={locale} />
        </div>
        {offer.demo && (
          <span className="absolute bottom-2 end-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">{t(dict.demoBadge, locale)}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="chip" style={{ borderColor: retailer?.logoColor }}>
            <span className="h-2 w-2 rounded-full" style={{ background: retailer?.logoColor }} />
            {retailer ? t(retailer.name, locale) : offer.retailer}
          </span>
          <DealScoreBadge score={score} locale={locale} compact />
        </div>

        <Link href={href} className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-ink hover:text-hot">
          {t(offer.title, locale)}
        </Link>

        <StarRating value={offer.rating} reviews={offer.reviews} locale={locale} reviewsLabel={t(dict.card.reviews, locale)} />

        {priceBlock}
        {saved > 0 && (
          <span className="text-xs font-semibold text-verified">{t(dict.card.save, locale)} {formatPrice(saved, offer.currency, locale)}</span>
        )}

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-muted">
          {offer.freeShipping && <span className="chip text-verified">🚚 {t(dict.card.freeShipping, locale)}</span>}
          {offer.couponCode && <span className="chip">🏷️ {offer.couponCode}</span>}
          {!offer.inStock && <span className="chip text-hot">{t(dict.card.outOfStock, locale)}</span>}
        </div>

        {offer.expiresAt && (
          <div className="flex items-center gap-1">
            <Countdown target={offer.expiresAt} locale={locale} label={t(dict.card.endsIn, locale)} />
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link href={href} className="btn-outline flex-1 py-2 text-xs">{t(dict.card.viewDeal, locale)}</Link>
          <a href={offer.externalUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary flex-1 py-2 text-xs">{t(dict.card.goToStore, locale)}</a>
        </div>
        <span className="text-[10px] text-ink-muted">{t(dict.card.lastUpdated, locale)} {timeAgo(offer.lastUpdated, locale)}</span>
      </div>
    </div>
  );
}
