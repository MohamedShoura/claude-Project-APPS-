'use client';

import { useState } from 'react';
import type { Coupon, Locale } from '@/lib/types';
import { dict, t } from '@/i18n/dictionaries';
import { retailerBySlug } from '@/data/reference';
import { formatDate } from '@/lib/format';
import { CopyButton } from './ui';

export function CouponCard({ coupon, locale }: { coupon: Coupon; locale: Locale }) {
  const retailer = retailerBySlug(coupon.retailer);
  const [votes, setVotes] = useState({ worked: coupon.worked, didnt: coupon.didntWork });
  const [voted, setVoted] = useState<null | 'worked' | 'didnt'>(null);
  const total = votes.worked + votes.didnt;
  const rate = total ? Math.round((votes.worked / total) * 100) : coupon.successRate;
  const vote = (kind: 'worked' | 'didnt') => {
    if (voted) return;
    setVoted(kind);
    setVotes((v) => (kind === 'worked' ? { ...v, worked: v.worked + 1 } : { ...v, didnt: v.didnt + 1 }));
  };
  return (
    <div className="card flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: retailer?.logoColor, color: '#1a1a1a' }}>
            {retailer ? t(retailer.name, locale).slice(0, 2) : '?'}
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{retailer ? t(retailer.name, locale) : coupon.retailer}</p>
            <p className="text-xs text-ink-muted">{t(coupon.description, locale)}</p>
          </div>
        </div>
        {coupon.verified ? (
          <span className="chip whitespace-nowrap text-verified">✓ {t(dict.card.verified, locale)}</span>
        ) : (
          <span className="chip whitespace-nowrap text-amber-600">⏳</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 rounded-xl bg-surface-soft p-2">
        <CopyButton text={coupon.code} label={t(dict.card.copy, locale)} copiedLabel={t(dict.card.copied, locale)} />
        <div className="text-end">
          <div className="flex items-center gap-1">
            <span className="text-sm font-extrabold text-verified">{rate}%</span>
            <span className="text-[11px] text-ink-muted">{t(dict.coupons.successRate, locale)}</span>
          </div>
          <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-surface-border">
            <div className="h-full bg-verified" style={{ width: `${rate}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-muted">
        {coupon.minOrder && <span className="chip">{t(dict.coupons.minOrder, locale)}: {coupon.minOrder}</span>}
        {coupon.expiresAt && <span className="chip">{t(dict.coupons.expires, locale)}: {formatDate(coupon.expiresAt, locale)}</span>}
        {coupon.countries.map((c) => <span key={c} className="chip uppercase">{c}</span>)}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button onClick={() => vote('worked')} disabled={!!voted} className={`chip ${voted === 'worked' ? 'border-verified text-verified' : ''} disabled:opacity-60`}>👍 {t(dict.coupons.worked, locale)} ({votes.worked})</button>
          <button onClick={() => vote('didnt')} disabled={!!voted} className={`chip ${voted === 'didnt' ? 'border-hot text-hot' : ''} disabled:opacity-60`}>👎 ({votes.didnt})</button>
        </div>
        <a href={`/deals?coupon=1&retailer=${coupon.retailer}`} className="text-xs font-semibold text-hot hover:underline">{t(dict.coupons.seeProducts, locale)} →</a>
      </div>
    </div>
  );
}
