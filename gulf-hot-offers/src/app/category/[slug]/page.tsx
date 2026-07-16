import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { CATEGORIES, categoryBySlug, countryByCode } from '@/data/reference';
import { filterOffers, sortOffers } from '@/lib/queries';
import { OfferGrid } from '@/components/rails';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.name.en} Deals`,
    description: `The best ${c.name.en} deals and discounts across Qatar, Saudi Arabia and the UAE.`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const { locale, country } = await getPrefs();
  const c = countryByCode(country)!;
  const offers = sortOffers(filterOffers({ country, categories: [slug] }), 'discount');

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Where can I find the best ${category.name.en} deals in ${c.name.en}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Gulf Hot Offers aggregates ${category.name.en} deals from multiple retailers in ${c.name.en} so you can compare prices in one place.` },
      },
    ],
  };

  return (
    <div className="py-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <nav className="mb-2 text-xs text-ink-muted">
        <Link href="/categories" className="hover:text-hot">{t(dict.nav.categories, locale)}</Link> / <span className="text-ink-soft">{t(category.name, locale)}</span>
      </nav>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-ink">{t(category.name, locale)}</h1>
          <p className="text-sm text-ink-muted">{c.flag} {t(c.name, locale)} · {offers.length} {t(dict.filters.results, locale)}</p>
        </div>
        <Link href={`/deals?category=${slug}`} className="btn-outline ms-auto py-2 text-xs">{t(dict.filters.title, locale)} →</Link>
      </div>
      {offers.length ? <OfferGrid offers={offers} locale={locale} /> : <div className="card p-10 text-center text-ink-muted">{t(dict.filters.noResults, locale)}</div>}
    </div>
  );
}
