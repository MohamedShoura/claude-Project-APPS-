import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrefs } from '@/i18n';
import { t } from '@/i18n/dictionaries';
import { LEGAL } from '@/data/legal';
import { formatDate } from '@/lib/format';

export function legalMetadata(slug: string): Metadata {
  const doc = LEGAL[slug];
  if (!doc) return {};
  return { title: doc.title.en, description: doc.body.en[0]?.text?.slice(0, 150), alternates: { canonical: `/${slug}` } };
}

export async function LegalPage({ slug }: { slug: string }) {
  const doc = LEGAL[slug];
  if (!doc) notFound();
  const { locale } = await getPrefs();
  return (
    <article className="mx-auto max-w-3xl py-6">
      <h1 className="text-3xl font-black text-ink">{t(doc.title, locale)}</h1>
      <p className="mt-1 text-xs text-ink-muted">{locale === 'ar' ? 'آخر تحديث' : 'Last updated'}: {formatDate(doc.updated, locale)}</p>
      <div className="mt-6 space-y-5">
        {doc.body[locale].map((sec, i) => (
          <section key={i}>
            {sec.heading && <h2 className="mb-1 text-lg font-bold text-ink">{sec.heading}</h2>}
            <p className="text-sm leading-relaxed text-ink-soft">{sec.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
