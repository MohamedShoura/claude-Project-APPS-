import type { Metadata } from 'next';
import Link from 'next/link';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { CATEGORIES } from '@/data/reference';
import { filterOffers } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse deals by category across Qatar, Saudi Arabia and the UAE.',
};

export default async function CategoriesPage() {
  const { locale, country } = await getPrefs();
  return (
    <div className="py-4">
      <h1 className="mb-4 text-2xl font-black text-ink">📂 {t(dict.nav.categories, locale)}</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const count = filterOffers({ country, categories: [c.slug] }).length;
          return (
            <Link key={c.slug} href={`/category/${c.slug}`} className="card flex flex-col items-center gap-2 p-5 text-center hover:border-hot">
              <span className="text-4xl">{c.icon}</span>
              <span className="font-semibold text-ink">{t(c.name, locale)}</span>
              <span className="text-xs text-ink-muted">{count} {t(dict.filters.results, locale)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
