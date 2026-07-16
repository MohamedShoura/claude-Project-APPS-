'use client';

import { useEffect, useState } from 'react';
import type { Locale, Offer } from '@/lib/types';
import { dict, t } from '@/i18n/dictionaries';
import { formatPrice } from '@/lib/format';
import { useToast, useUser } from './providers';

export function TrackView({ slug }: { slug: string }) {
  const { pushRecent, ready } = useUser();
  useEffect(() => { if (ready) pushRecent(slug); /* eslint-disable-next-line */ }, [ready, slug]);
  return null;
}

export function PriceAlertForm({ offer, locale }: { offer: Offer; locale: Locale }) {
  const { addAlert } = useUser();
  const toast = useToast();
  const [target, setTarget] = useState(Math.round(offer.price * 0.9));
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addAlert({ offerSlug: offer.slug, title: t(offer.title, locale), target, currency: offer.currency });
        setDone(true);
        toast.show(locale === 'ar' ? 'تم إنشاء التنبيه' : 'Alert created');
      }}
      className="card flex flex-col gap-2 p-3"
    >
      <label className="text-sm font-semibold text-ink">🔔 {t(dict.account.createAlert, locale)}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="w-full rounded-lg border border-surface-border px-3 py-2 text-sm"
        />
        <span className="text-sm font-semibold text-ink-muted">{offer.currency}</span>
        <button type="submit" className="btn-primary whitespace-nowrap py-2 text-xs">{done ? '✓' : t(dict.product.setAlert, locale)}</button>
      </div>
      <p className="text-[11px] text-ink-muted">
        {locale === 'ar' ? `مثال: أبلغني عندما ينخفض تحت ${formatPrice(target, offer.currency, locale)}` : `e.g. Notify me when it drops below ${formatPrice(target, offer.currency, locale)}`}
      </p>
    </form>
  );
}

export function ShareRow({ title, locale }: { title: string; locale: Locale }) {
  const toast = useToast();
  const [url, setUrl] = useState('');
  useEffect(() => setUrl(window.location.href), []);
  const enc = encodeURIComponent(`${title} — ${url}`);
  const links: { label: string; href: string; icon: string }[] = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc}`, icon: '💬' },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${enc}`, icon: '𝕏' },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: 'f' },
    { label: 'Telegram', href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, icon: '✈️' },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-ink-soft">{t(dict.product.share, locale)}:</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener" className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-border text-sm hover:border-hot" aria-label={l.label}>{l.icon}</a>
      ))}
      <button
        onClick={async () => { try { await navigator.clipboard.writeText(url); toast.show(t(dict.card.copied, locale)); } catch { /* ignore */ } }}
        className="chip hover:border-hot"
      >🔗 {t(dict.card.copy, locale)}</button>
    </div>
  );
}

export function ReportPriceButton({ locale }: { locale: Locale }) {
  const toast = useToast();
  const [sent, setSent] = useState(false);
  return (
    <button
      onClick={() => { setSent(true); toast.show(locale === 'ar' ? 'شكراً على الإبلاغ' : 'Thanks for reporting'); }}
      className="text-xs font-semibold text-ink-muted underline hover:text-hot"
    >
      🚩 {sent ? (locale === 'ar' ? 'تم الإبلاغ' : 'Reported') : t(dict.product.reportPrice, locale)}
    </button>
  );
}
