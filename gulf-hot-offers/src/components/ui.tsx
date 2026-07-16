'use client';

import React, { useEffect, useState } from 'react';
import type { DealScore, Locale } from '@/lib/types';
import { DEAL_LABEL_TEXT } from '@/lib/deal-score';
import { useToast } from './providers';

// ---- Star rating ----
export function StarRating({ value, reviews, locale, reviewsLabel }: { value: number; reviews?: number; locale: Locale; reviewsLabel?: string }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1 text-xs text-ink-muted" dir="ltr">
      <span className="text-gold" aria-hidden>
        {'★'.repeat(full)}
        <span className="text-surface-border">{'★'.repeat(5 - full)}</span>
      </span>
      <span className="font-semibold text-ink-soft">{value.toFixed(1)}</span>
      {reviews != null && <span>({new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(reviews)} {reviewsLabel})</span>}
    </span>
  );
}

// ---- Deal score badge ----
export function DealScoreBadge({ score, locale, compact }: { score: DealScore; locale: Locale; compact?: boolean }) {
  const styles: Record<DealScore['label'], string> = {
    exceptional: 'bg-verified text-white',
    hot: 'bg-hot text-white',
    good: 'bg-flame text-white',
    regular: 'bg-surface-soft text-ink-soft border border-surface-border',
    suspicious: 'bg-amber-100 text-amber-800 border border-amber-300',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[score.label]}`}>
      {!compact && <span className="tabular-nums">{score.score}</span>}
      <span>{DEAL_LABEL_TEXT[score.label][locale]}</span>
    </span>
  );
}

// ---- Countdown timer ----
export function Countdown({ target, locale, label, compact }: { target: string; locale: Locale; label?: string; compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <span className="tabular-nums text-xs text-ink-muted">—</span>;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return <span className="text-xs font-semibold text-ink-muted">{locale === 'ar' ? 'انتهى' : 'Ended'}</span>;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-hot" dir="ltr">
      {label && <span className="font-medium text-ink-muted">{label}</span>}
      <span className="tabular-nums rounded bg-hot-soft px-1.5 py-0.5">{pad(h)}:{pad(m)}:{pad(s)}</span>
    </span>
  );
}

// ---- Copy-to-clipboard button (touch-friendly) ----
export function CopyButton({ text, label, copiedLabel, className }: { text: string; label: string; copiedLabel: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    toast.show(copiedLabel);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className={className ?? 'inline-flex items-center gap-1.5 rounded-lg border border-dashed border-hot bg-hot-soft px-3 py-1.5 text-sm font-bold text-hot transition active:scale-95'}
    >
      <span className="tabular-nums tracking-wide">{text}</span>
      <span className="text-xs">{copied ? copiedLabel : label}</span>
    </button>
  );
}

// ---- Section shell with optional horizontal rail ----
export function Section({
  title,
  href,
  viewAllLabel,
  children,
  accent,
}: {
  title: string;
  href?: string;
  viewAllLabel?: string;
  children: React.ReactNode;
  accent?: 'hot' | 'gold' | 'verified';
}) {
  const bar = accent === 'gold' ? 'bg-gold' : accent === 'verified' ? 'bg-verified' : 'bg-hot';
  return (
    <section className="py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="section-title flex items-center gap-2">
          <span className={`h-5 w-1.5 rounded-full ${bar}`} />
          {title}
        </h2>
        {href && viewAllLabel && (
          <a href={href} className="text-sm font-semibold text-hot hover:underline">{viewAllLabel} →</a>
        )}
      </div>
      {children}
    </section>
  );
}
