'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePrefs, useUser } from '@/components/providers';
import { dict, t } from '@/i18n/dictionaries';
import { OFFERS_LITE, type OfferLite } from '@/data/offers-lite';
import { COUNTRIES } from '@/data/reference';
import { formatPrice } from '@/lib/format';

function OfferRow({ lite, locale, onRemove }: { lite: OfferLite; locale: 'en' | 'ar'; onRemove?: () => void }) {
  return (
    <div className="flex items-center gap-3 border-b border-surface-border py-2 last:border-0">
      <Link href={`/product/${lite.slug}`} className="relative h-12 w-12 overflow-hidden rounded-lg bg-surface-soft">
        <Image src={lite.image} alt="" fill sizes="48px" className="object-cover" />
      </Link>
      <Link href={`/product/${lite.slug}`} className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-semibold text-ink">{locale === 'ar' ? lite.title_ar : lite.title_en}</p>
        <p className="text-xs font-bold text-ink-soft">{formatPrice(lite.price, lite.currency as any, locale)}</p>
      </Link>
      <a href={lite.externalUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary py-1.5 text-xs">{t(dict.card.goToStore, locale)}</a>
      {onRemove && <button onClick={onRemove} className="text-xs text-ink-muted hover:text-hot">{t(dict.account.remove, locale)}</button>}
    </div>
  );
}

function SignIn() {
  const { locale } = usePrefs();
  const { signIn } = useUser();
  const [email, setEmail] = useState('');
  return (
    <div className="mx-auto max-w-md py-10">
      <div className="card p-6">
        <h1 className="text-xl font-black text-ink">{t(dict.account.signIn, locale)}</h1>
        <p className="mt-1 text-xs text-ink-muted">{t(dict.account.demoAuthNote, locale)}</p>
        <div className="mt-4 flex flex-col gap-2">
          <button onClick={() => signIn({ email: 'user@gmail.com', provider: 'google' })} className="btn-outline">🅶 {t(dict.account.signInGoogle, locale)}</button>
          <button onClick={() => signIn({ email: 'user@icloud.com', provider: 'apple' })} className="btn-outline"> {t(dict.account.signInApple, locale)}</button>
        </div>
        <div className="my-4 flex items-center gap-2 text-xs text-ink-muted"><span className="h-px flex-1 bg-surface-border" />OR<span className="h-px flex-1 bg-surface-border" /></div>
        <form onSubmit={(e) => { e.preventDefault(); if (email) signIn({ email, provider: 'email' }); }} className="flex flex-col gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t(dict.account.email, locale)} className="rounded-xl border border-surface-border px-3 py-2.5 text-sm" />
          <button type="submit" className="btn-primary">{t(dict.account.signIn, locale)}</button>
        </form>
      </div>
    </div>
  );
}

export function AccountView() {
  const { locale, country, setCountry, setLocale } = usePrefs();
  const { user, signOut, favourites, alerts, removeAlert, recentlyViewed, toggleFavourite, ready } = useUser();

  if (!ready) return <div className="py-16 text-center text-ink-muted">…</div>;
  if (!user) return <SignIn />;

  const favLites = favourites.map((s) => OFFERS_LITE[s]).filter(Boolean);
  const recentLites = recentlyViewed.map((s) => OFFERS_LITE[s]).filter(Boolean);

  return (
    <div className="py-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-ink">{t(dict.account.title, locale)}</h1>
          <p className="text-sm text-ink-muted">{user.email} · {user.provider}</p>
        </div>
        <button onClick={signOut} className="btn-outline py-2 text-xs">{locale === 'ar' ? 'تسجيل الخروج' : 'Sign out'}</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Preferences */}
        <div className="card p-4">
          <h2 className="section-title mb-3">{t(dict.account.preferences, locale)}</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">{t(dict.common.selectCountry, locale)}</span>
              <select value={country} onChange={(e) => setCountry(e.target.value as any)} className="rounded-lg border border-surface-border px-2 py-1.5">
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {t(c.name, locale)}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">{t(dict.common.language, locale)}</span>
              <div className="flex gap-1">
                <button onClick={() => setLocale('en')} className={`chip ${locale === 'en' ? 'border-hot text-hot' : ''}`}>English</button>
                <button onClick={() => setLocale('ar')} className={`chip ${locale === 'ar' ? 'border-hot text-hot' : ''}`}>العربية</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">{locale === 'ar' ? 'إشعارات البريد / واتساب / المتصفح' : 'Email / WhatsApp / browser alerts'}</span>
              <span className="chip text-verified">✓ {locale === 'ar' ? 'مفعّلة' : 'On'}</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="card p-4">
          <h2 className="section-title mb-3">🔔 {t(dict.account.alerts, locale)}</h2>
          {alerts.length === 0 ? (
            <p className="text-sm text-ink-muted">{t(dict.account.noAlerts, locale)}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {alerts.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg bg-surface-soft p-2 text-sm">
                  <div className="min-w-0">
                    <Link href={`/product/${a.offerSlug}`} className="line-clamp-1 font-semibold text-ink hover:text-hot">{a.title}</Link>
                    <p className="text-xs text-ink-muted">{t(dict.account.createAlert, locale)} {formatPrice(a.target, a.currency as any, locale)}</p>
                  </div>
                  <button onClick={() => removeAlert(a.id)} className="text-xs text-ink-muted hover:text-hot">{t(dict.account.remove, locale)}</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favourites */}
        <div className="card p-4">
          <h2 className="section-title mb-3">❤️ {t(dict.account.favourites, locale)}</h2>
          {favLites.length === 0 ? (
            <p className="text-sm text-ink-muted">{t(dict.account.noFavourites, locale)}</p>
          ) : favLites.map((l) => <OfferRow key={l.slug} lite={l} locale={locale} onRemove={() => toggleFavourite(l.slug)} />)}
        </div>

        {/* Recently viewed */}
        <div className="card p-4">
          <h2 className="section-title mb-3">🕘 {t(dict.account.recentlyViewed, locale)}</h2>
          {recentLites.length === 0 ? (
            <p className="text-sm text-ink-muted">—</p>
          ) : recentLites.map((l) => <OfferRow key={l.slug} lite={l} locale={locale} />)}
        </div>
      </div>
    </div>
  );
}
