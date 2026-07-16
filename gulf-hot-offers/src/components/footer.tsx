'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePrefs, useToast } from './providers';
import { dict, t } from '@/i18n/dictionaries';
import { CATEGORIES, COUNTRIES, RETAILERS } from '@/data/reference';

export function NewsletterForm({ compact }: { compact?: boolean }) {
  const { locale } = usePrefs();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (!email) return; setDone(true); toast.show(locale === 'ar' ? 'تم الاشتراك!' : 'Subscribed!'); }}
      className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-2 sm:flex-row'}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
        className="w-full rounded-xl border border-surface-border bg-white px-3 py-2.5 text-sm outline-none focus:border-hot"
      />
      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1 whitespace-nowrap">{done ? (locale === 'ar' ? '✓ مشترك' : '✓ Subscribed') : t(dict.footer.subscribe, locale)}</button>
        <a href="https://wa.me/" target="_blank" rel="noopener" className="btn-outline whitespace-nowrap text-verified">💬 {t(dict.footer.whatsapp, locale)}</a>
      </div>
    </form>
  );
}

export function Footer() {
  const { locale } = usePrefs();
  const legal: [string, string][] = [
    ['/about', t(dict.footer.about, locale)],
    ['/contact', t(dict.footer.contact, locale)],
    ['/privacy', t(dict.footer.privacy, locale)],
    ['/terms', t(dict.footer.terms, locale)],
    ['/cookies', t(dict.footer.cookies, locale)],
    ['/affiliate-disclosure', t(dict.footer.affiliate, locale)],
    ['/how-we-rank', t(dict.footer.ranking, locale)],
    ['/report', t(dict.footer.report, locale)],
  ];
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t border-surface-border bg-white pb-24 md:pb-8">
      <div className="container-page py-8">
        {/* Newsletter */}
        <div className="card mb-8 flex flex-col gap-3 bg-gradient-to-br from-ink to-ink-soft p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">{t(dict.footer.newsletter, locale)}</p>
            <p className="text-sm text-white/70">{t(dict.sections.topCoupons, locale)} · {t(dict.sections.flash, locale)}</p>
          </div>
          <div className="sm:w-[420px]"><NewsletterForm /></div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-hot font-black text-white">G</span>
              <span className="font-extrabold text-ink">{t(dict.brand, locale)}</span>
            </div>
            <p className="mt-3 text-sm text-ink-muted">{t(dict.footer.independentNotice, locale)}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-ink">{t(dict.nav.categories, locale)}</p>
            <ul className="space-y-1 text-sm text-ink-muted">
              {CATEGORIES.slice(0, 7).map((c) => (
                <li key={c.slug}><Link href={`/deals?category=${c.slug}`} className="hover:text-hot">{t(c.name, locale)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-ink">{t(dict.sections.retailers, locale)}</p>
            <ul className="space-y-1 text-sm text-ink-muted">
              {RETAILERS.map((r) => (
                <li key={r.slug}><Link href={`/retailer/${r.slug}`} className="hover:text-hot">{t(r.name, locale)}</Link></li>
              ))}
            </ul>
            <p className="mb-1 mt-3 text-sm font-bold text-ink">{t(dict.common.selectCountry, locale)}</p>
            <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
              {COUNTRIES.map((c) => <li key={c.code}><Link href={`/${c.code}`} className="chip hover:border-hot">{c.flag} {t(c.name, locale)}</Link></li>)}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-ink">{t(dict.footer.report, locale)}</p>
            <ul className="space-y-1 text-sm text-ink-muted">
              {legal.map(([href, label]) => (
                <li key={href}><Link href={href} className="hover:text-hot">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust notices */}
        <div className="mt-8 space-y-2 rounded-xl border border-surface-border bg-surface-soft p-4 text-xs text-ink-muted">
          <p>⚠️ {t(dict.footer.priceNotice, locale)}</p>
          <p>🔗 {t(dict.footer.affiliateDisclosure, locale)}</p>
          <p>ℹ️ {t(dict.footer.independentNotice, locale)}</p>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">© {year} {t(dict.brand, locale)}. {t(dict.footer.rights, locale)}</p>
      </div>
    </footer>
  );
}
