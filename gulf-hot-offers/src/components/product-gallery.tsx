'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Locale, Offer } from '@/lib/types';
import { discountPercent } from '@/lib/format';
import { dict, t } from '@/i18n/dictionaries';

export function ProductGallery({ offer, locale }: { offer: Offer; locale: Locale }) {
  const [active, setActive] = useState(0);
  const discount = discountPercent(offer.price, offer.previousPrice);
  return (
    <div>
      <div className="card relative aspect-square overflow-hidden">
        <Image src={offer.images[active]} alt={t(offer.title, locale)} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" priority />
        {discount > 0 && <span className="absolute start-3 top-3 rounded-lg bg-hot px-2.5 py-1 text-sm font-extrabold text-white">-{discount}%</span>}
        <span className="absolute bottom-3 end-3 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">{t(dict.demoBadge, locale)}</span>
      </div>
      <div className="mt-2 flex gap-2">
        {offer.images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)} className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${i === active ? 'border-hot' : 'border-surface-border'}`}>
            <Image src={img} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
