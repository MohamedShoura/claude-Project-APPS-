'use client';

import { useState } from 'react';
import { usePrefs } from '@/components/providers';
import { CouponCard } from '@/components/coupon-card';
import { COUPONS } from '@/data/coupons';
import { dict, t } from '@/i18n/dictionaries';
import { COUNTRIES } from '@/data/reference';

const CATS: { key: string; en: string; ar: string }[] = [
  { key: 'all', en: 'All', ar: 'الكل' },
  { key: 'electronics', en: 'Electronics', ar: 'الإلكترونيات' },
  { key: 'fashion', en: 'Fashion', ar: 'الأزياء' },
  { key: 'beauty', en: 'Beauty', ar: 'الجمال' },
  { key: 'grocery', en: 'Grocery', ar: 'البقالة' },
  { key: 'home', en: 'Home', ar: 'المنزل' },
  { key: 'new-customer', en: 'New customer', ar: 'عميل جديد' },
  { key: 'free-shipping', en: 'Free shipping', ar: 'شحن مجاني' },
  { key: 'bank-card', en: 'Bank-card', ar: 'بطاقات بنكية' },
];

export function CouponsList() {
  const { locale, country } = usePrefs();
  const [cat, setCat] = useState('all');
  const [countryFilter, setCountryFilter] = useState<string>(country);

  const list = COUPONS.filter((c) => (countryFilter === 'all' || c.countries.includes(countryFilter as any)) && (cat === 'all' || c.category === cat));

  return (
    <div>
      <div className="no-scrollbar -mx-4 mb-3 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <button onClick={() => setCountryFilter('all')} className={`chip whitespace-nowrap ${countryFilter === 'all' ? 'border-hot text-hot' : ''}`}>🌐 {t(dict.coupons.all, locale)}</button>
        {COUNTRIES.map((c) => (
          <button key={c.code} onClick={() => setCountryFilter(c.code)} className={`chip whitespace-nowrap ${countryFilter === c.code ? 'border-hot text-hot' : ''}`}>{c.flag} {t(c.name, locale)}</button>
        ))}
      </div>

      <div className="no-scrollbar -mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {CATS.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)} className={`chip whitespace-nowrap ${cat === c.key ? 'border-hot bg-hot-soft text-hot' : ''}`}>{locale === 'ar' ? c.ar : c.en}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="card p-10 text-center text-ink-muted">{t(dict.filters.noResults, locale)}</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => <CouponCard key={c.id} coupon={c} locale={locale} />)}
        </div>
      )}
    </div>
  );
}
