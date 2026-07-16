import type { Metadata } from 'next';
import Link from 'next/link';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { filterOffers, sortOffers } from '@/lib/queries';
import { parseFilters, parseSort, parsePage, parseView, type SP } from '@/lib/params';
import { DealsSidebar, DealsToolbar } from '@/components/deals-filters';
import { OfferGrid } from '@/components/rails';

export const metadata: Metadata = {
  title: 'All Deals',
  description: 'Browse and filter every deal across Qatar, Saudi Arabia and the UAE.',
};

const PAGE_SIZE = 16;

export default async function DealsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const { locale, country } = await getPrefs();

  const filters = parseFilters(sp, country);
  const sort = parseSort(sp);
  const page = parsePage(sp);
  const view = parseView(sp);

  const all = sortOffers(filterOffers(filters), sort);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const buildPageHref = (p: number) => {
    const q = new URLSearchParams(Object.entries(sp).flatMap(([k, v]) => (v == null ? [] : [[k, Array.isArray(v) ? v.join(',') : v]])) as [string, string][]);
    q.set('page', String(p));
    return `/deals?${q.toString()}`;
  };

  return (
    <div className="py-4">
      <h1 className="mb-1 text-2xl font-black text-ink">{filters.q ? `“${filters.q}”` : t(dict.nav.deals, locale)}</h1>
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <DealsSidebar />
        <div>
          <DealsToolbar count={all.length} />
          {pageItems.length === 0 ? (
            <div className="card p-10 text-center text-ink-muted">
              <p className="text-4xl">🔍</p>
              <p className="mt-2 font-semibold">{t(dict.filters.noResults, locale)}</p>
              <Link href="/deals" className="btn-outline mt-4">{t(dict.filters.clear, locale)}</Link>
            </div>
          ) : (
            <OfferGrid offers={pageItems} locale={locale} view={view} />
          )}

          {totalPages > 1 && (
            <nav className="mt-6 flex items-center justify-center gap-1">
              {current > 1 && <Link href={buildPageHref(current - 1)} className="btn-outline px-3 py-1.5 text-sm">←</Link>}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - current) <= 2 || p === 1 || p === totalPages)
                .map((p, idx, arr) => (
                  <span key={p} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-ink-muted">…</span>}
                    <Link href={buildPageHref(p)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${p === current ? 'bg-hot text-white' : 'border border-surface-border bg-white text-ink-soft hover:border-hot'}`}>{p}</Link>
                  </span>
                ))}
              {current < totalPages && <Link href={buildPageHref(current + 1)} className="btn-outline px-3 py-1.5 text-sm">→</Link>}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
