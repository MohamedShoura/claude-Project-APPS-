import type { Metadata } from 'next';
import Link from 'next/link';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { RETAILERS, countryByCode } from '@/data/reference';
import { offersByCountry } from '@/lib/queries';
import { OFFERS } from '@/data/offers';

export const metadata: Metadata = { title: 'Retailers', description: 'Deals from Noon, Amazon and Snoonu across the Gulf.' };

export default async function RetailersPage() {
  const { locale } = await getPrefs();
  return (
    <div className="py-4">
      <h1 className="mb-4 text-2xl font-black text-ink">🏬 {t(dict.sections.retailers, locale)}</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RETAILERS.map((r) => {
          const count = OFFERS.filter((o) => o.retailer === r.slug).length;
          return (
            <Link key={r.slug} href={`/retailer/${r.slug}`} className="card flex flex-col gap-2 p-4 hover:border-hot">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold" style={{ background: r.logoColor, color: '#1a1a1a' }}>{t(r.name, locale).slice(0, 2)}</span>
                <div>
                  <p className="font-bold text-ink">{t(r.name, locale)}</p>
                  <p className="text-xs text-ink-muted">{r.countries.map((c) => countryByCode(c)?.flag).join(' ')} · {count} {t(dict.filters.results, locale)}</p>
                </div>
              </div>
              <p className="line-clamp-2 text-xs text-ink-muted">{t(r.overview, locale)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
