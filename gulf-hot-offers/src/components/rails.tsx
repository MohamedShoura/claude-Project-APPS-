import type { Locale, Offer } from '@/lib/types';
import { OfferCard } from './offer-card';

// Horizontally-swipeable rail (used on the homepage sections).
export function OfferRail({ offers, locale }: { offers: Offer[]; locale: Locale }) {
  if (!offers.length) return null;
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {offers.map((o) => (
        <div key={o.id} className="w-[46%] shrink-0 snap-start sm:w-[240px]">
          <OfferCard offer={o} locale={locale} />
        </div>
      ))}
    </div>
  );
}

// Responsive grid (used on listing pages).
export function OfferGrid({ offers, locale, view = 'grid' }: { offers: Offer[]; locale: Locale; view?: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {offers.map((o) => <OfferCard key={o.id} offer={o} locale={locale} view="list" />)}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {offers.map((o) => <OfferCard key={o.id} offer={o} locale={locale} />)}
    </div>
  );
}
