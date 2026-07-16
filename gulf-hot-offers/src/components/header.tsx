'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePrefs } from './providers';
import { SearchBox } from './search-box';
import { COUNTRIES } from '@/data/reference';
import { dict, t } from '@/i18n/dictionaries';
import type { CountryCode } from '@/lib/types';

function CountrySwitcher() {
  const { locale, country, setCountry } = usePrefs();
  const [open, setOpen] = useState(false);
  const current = COUNTRIES.find((c) => c.code === country)!;
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-white px-2.5 py-1.5 text-sm font-semibold hover:border-ink-muted">
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{t(current.name, locale)}</span>
        <span className="hidden text-xs text-ink-muted sm:inline">{current.currency}</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute end-0 z-50 mt-1 w-56 rounded-xl border border-surface-border bg-white p-1 shadow-pop">
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase text-ink-muted">{t(dict.common.selectCountry, locale)}</p>
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => { setCountry(c.code as CountryCode); setOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm hover:bg-surface-soft ${c.code === country ? 'font-bold text-hot' : ''}`}
              >
                <span className="text-lg">{c.flag}</span>
                <span>{t(c.name, locale)}</span>
                <span className="ms-auto text-xs text-ink-muted">{c.currency}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = usePrefs();
  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
      className="rounded-lg border border-surface-border bg-white px-2.5 py-1.5 text-sm font-semibold hover:border-ink-muted"
      aria-label={t(dict.common.language, locale)}
    >
      {locale === 'en' ? 'العربية' : 'EN'}
    </button>
  );
}

export function Header() {
  const { locale } = usePrefs();
  const nav = dict.nav;
  const links: [string, string][] = [
    ['/deals', t(nav.deals, locale)],
    ['/coupons', t(nav.coupons, locale)],
    ['/categories', t(nav.categories, locale)],
    ['/compare', t(nav.compare, locale)],
    ['/retailers', t(nav.retailers, locale)],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-white/95 backdrop-blur">
      {/* Demo data notice */}
      <div className="bg-ink text-center text-[11px] text-white/90">
        <div className="container-page py-1">{t(dict.demoNotice, locale)}</div>
      </div>

      <div className="container-page">
        <div className="flex items-center gap-3 py-2.5">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-hot text-lg font-black text-white">G</span>
            <span className="hidden text-base font-extrabold leading-tight text-ink sm:block">
              {t(dict.brand, locale)}
              <span className="block text-[10px] font-medium text-ink-muted">{t(dict.tagline, locale)}</span>
            </span>
          </Link>

          <div className="hidden flex-1 md:block">
            <SearchBox />
          </div>

          <div className="ms-auto flex items-center gap-2">
            <CountrySwitcher />
            <LanguageSwitcher />
            <Link href="/account" className="hidden rounded-lg border border-surface-border bg-white px-2.5 py-1.5 text-sm font-semibold hover:border-ink-muted sm:inline-flex">
              {t(nav.account, locale)}
            </Link>
            <Link href="/admin" className="hidden rounded-lg bg-ink px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-ink-soft lg:inline-flex">
              {t(nav.admin, locale)}
            </Link>
          </div>
        </div>

        {/* Mobile sticky search */}
        <div className="pb-2.5 md:hidden">
          <SearchBox />
        </div>

        {/* Category / nav strip */}
        <nav className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-surface-soft hover:text-hot">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
