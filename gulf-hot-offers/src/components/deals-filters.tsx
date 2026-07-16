'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { usePrefs } from './providers';
import { dict, t } from '@/i18n/dictionaries';
import { BRANDS, CATEGORIES, COUNTRIES, RETAILERS } from '@/data/reference';
import { SORT_KEYS } from '@/lib/params';
import type { Locale } from '@/lib/types';

function useParamHelpers() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const commit = useCallback((next: URLSearchParams) => {
    next.delete('page');
    router.push(`${pathname}?${next.toString()}`);
  }, [router, pathname]);

  const setSingle = useCallback((key: string, value?: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value == null || value === '') next.delete(key);
    else next.set(key, value);
    commit(next);
  }, [sp, commit]);

  const toggleMulti = useCallback((key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    const current = (next.get(key)?.split(',').filter(Boolean)) ?? [];
    const has = current.includes(value);
    const updated = has ? current.filter((v) => v !== value) : [...current, value];
    if (updated.length) next.set(key, updated.join(','));
    else next.delete(key);
    commit(next);
  }, [sp, commit]);

  const toggleBool = useCallback((key: string) => {
    const next = new URLSearchParams(sp.toString());
    if (next.get(key) === '1') next.delete(key);
    else next.set(key, '1');
    commit(next);
  }, [sp, commit]);

  return { sp, setSingle, toggleMulti, toggleBool, router, pathname };
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-surface-border py-3">
      <p className="mb-2 text-sm font-bold text-ink">{title}</p>
      {children}
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-ink-soft">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-hot" />
      {label}
    </label>
  );
}

function FilterPanel({ locale }: { locale: Locale }) {
  const { sp, setSingle, toggleMulti, toggleBool } = useParamHelpers();
  const f = dict.filters;
  const selRetailers = sp.get('retailer')?.split(',') ?? [];
  const selCategories = sp.get('category')?.split(',') ?? [];
  const selBrands = sp.get('brand')?.split(',') ?? [];
  const country = sp.get('country') ?? '';

  return (
    <div className="text-sm">
      <Group title={t(f.country, locale)}>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setSingle('country', '')} className={`chip ${!country ? 'border-hot text-hot' : ''}`}>{t(dict.coupons.all, locale)}</button>
          {COUNTRIES.map((c) => (
            <button key={c.code} onClick={() => setSingle('country', c.code)} className={`chip ${country === c.code ? 'border-hot text-hot' : ''}`}>{c.flag} {t(c.name, locale)}</button>
          ))}
        </div>
      </Group>

      <Group title={t(f.retailer, locale)}>
        {RETAILERS.map((r) => <Check key={r.slug} label={t(r.name, locale)} checked={selRetailers.includes(r.slug)} onChange={() => toggleMulti('retailer', r.slug)} />)}
      </Group>

      <Group title={t(f.category, locale)}>
        <div className="max-h-48 overflow-auto pe-1">
          {CATEGORIES.map((c) => <Check key={c.slug} label={`${c.icon} ${t(c.name, locale)}`} checked={selCategories.includes(c.slug)} onChange={() => toggleMulti('category', c.slug)} />)}
        </div>
      </Group>

      <Group title={t(f.brand, locale)}>
        <div className="max-h-40 overflow-auto pe-1">
          {BRANDS.map((b) => <Check key={b.slug} label={b.name} checked={selBrands.includes(b.slug)} onChange={() => toggleMulti('brand', b.slug)} />)}
        </div>
      </Group>

      <Group title={t(f.price, locale)}>
        <div className="flex items-center gap-2">
          <input type="number" defaultValue={sp.get('min') ?? ''} placeholder={t(f.min, locale)} onBlur={(e) => setSingle('min', e.target.value)} className="w-full rounded-lg border border-surface-border px-2 py-1.5 text-sm" />
          <span className="text-ink-muted">—</span>
          <input type="number" defaultValue={sp.get('max') ?? ''} placeholder={t(f.max, locale)} onBlur={(e) => setSingle('max', e.target.value)} className="w-full rounded-lg border border-surface-border px-2 py-1.5 text-sm" />
        </div>
      </Group>

      <Group title={t(f.discount, locale)}>
        <div className="flex flex-wrap gap-1.5">
          {[10, 25, 40, 50].map((d) => (
            <button key={d} onClick={() => setSingle('discount', sp.get('discount') === String(d) ? '' : String(d))} className={`chip ${sp.get('discount') === String(d) ? 'border-hot text-hot' : ''}`}>{d}%+</button>
          ))}
        </div>
      </Group>

      <Group title={t(f.rating, locale)}>
        <div className="flex flex-wrap gap-1.5">
          {[3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setSingle('rating', sp.get('rating') === String(r) ? '' : String(r))} className={`chip ${sp.get('rating') === String(r) ? 'border-hot text-hot' : ''}`}>★ {r}+</button>
          ))}
        </div>
      </Group>

      <Group title="•">
        {[
          ['free', t(f.freeShipping, locale)],
          ['stock', t(f.inStock, locale)],
          ['coupon', t(f.coupon, locale)],
          ['ending', t(f.endingSoon, locale)],
          ['verified', t(f.verified, locale)],
          ['new', t(f.newOnly, locale)],
          ['lowest', t(f.lowestEver, locale)],
        ].map(([key, label]) => (
          <Check key={key} label={label} checked={sp.get(key) === '1'} onChange={() => toggleBool(key)} />
        ))}
      </Group>
    </div>
  );
}

export function DealsSidebar() {
  const { locale } = usePrefs();
  return (
    <aside className="card sticky top-40 hidden h-fit max-h-[calc(100vh-11rem)] overflow-auto p-4 lg:block">
      <div className="mb-1 flex items-center justify-between">
        <p className="font-bold text-ink">{t(dict.filters.title, locale)}</p>
        <ClearAll />
      </div>
      <FilterPanel locale={locale} />
    </aside>
  );
}

function ClearAll() {
  const { locale } = usePrefs();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const keep = new URLSearchParams();
  const view = sp.get('view');
  const sort = sp.get('sort');
  if (view) keep.set('view', view);
  if (sort) keep.set('sort', sort);
  return (
    <button onClick={() => router.push(`${pathname}?${keep.toString()}`)} className="text-xs font-semibold text-hot hover:underline">
      {t(dict.filters.clear, locale)}
    </button>
  );
}

export function DealsToolbar({ count }: { count: number }) {
  const { locale } = usePrefs();
  const { sp, setSingle } = useParamHelpers();
  const [drawer, setDrawer] = useState(false);
  const view = sp.get('view') === 'list' ? 'list' : 'grid';
  const sort = sp.get('sort') ?? 'discount';

  const nf = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');

  return (
    <>
      <div className="sticky top-[8.5rem] z-30 mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-surface-border bg-white/95 p-2 backdrop-blur">
        <button onClick={() => setDrawer(true)} className="btn-outline py-1.5 text-xs lg:hidden">☰ {t(dict.filters.title, locale)}</button>
        <span className="text-sm font-semibold text-ink-soft">{nf.format(count)} {t(dict.filters.results, locale)}</span>
        <div className="ms-auto flex items-center gap-2">
          <label className="text-xs text-ink-muted">{t(dict.filters.sortBy, locale)}</label>
          <select value={sort} onChange={(e) => setSingle('sort', e.target.value)} className="rounded-lg border border-surface-border bg-white px-2 py-1.5 text-sm">
            {SORT_KEYS.map((k) => <option key={k} value={k}>{t(dict.sort[k], locale)}</option>)}
          </select>
          <div className="flex overflow-hidden rounded-lg border border-surface-border">
            <button onClick={() => setSingle('view', 'grid')} className={`px-2.5 py-1.5 text-xs ${view === 'grid' ? 'bg-hot text-white' : 'text-ink-soft'}`}>▦</button>
            <button onClick={() => setSingle('view', 'list')} className={`px-2.5 py-1.5 text-xs ${view === 'list' ? 'bg-hot text-white' : 'text-ink-soft'}`}>☰</button>
          </div>
        </div>
      </div>

      <ActiveTags />

      {drawer && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 start-0 w-[85%] max-w-sm overflow-auto bg-white p-4 shadow-pop">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-bold text-ink">{t(dict.filters.title, locale)}</p>
              <button onClick={() => setDrawer(false)} className="text-sm font-semibold text-ink-muted">✕ {t(dict.common.close, locale)}</button>
            </div>
            <FilterPanel locale={locale} />
            <button onClick={() => setDrawer(false)} className="btn-primary mt-3 w-full">{t(dict.filters.apply, locale)}</button>
          </div>
        </div>
      )}
    </>
  );
}

function ActiveTags() {
  const { locale } = usePrefs();
  const { sp, router, pathname } = useParamHelpers() as any;
  const params = new URLSearchParams(sp.toString());
  const tags: { key: string; value: string; label: string }[] = [];
  const push = (key: string, value: string, label: string) => tags.push({ key, value, label });

  params.forEach((val: string, key: string) => {
    if (['sort', 'view', 'page'].includes(key)) return;
    if (['retailer', 'category', 'brand'].includes(key)) {
      val.split(',').forEach((v) => {
        const label =
          key === 'retailer' ? t(RETAILERS.find((r) => r.slug === v)?.name ?? { en: v, ar: v }, locale)
          : key === 'category' ? t(CATEGORIES.find((c) => c.slug === v)?.name ?? { en: v, ar: v }, locale)
          : BRANDS.find((b) => b.slug === v)?.name ?? v;
        push(key, v, label);
      });
    } else {
      push(key, val, `${key}: ${val}`);
    }
  });

  if (!tags.length) return null;

  const remove = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (['retailer', 'category', 'brand'].includes(key)) {
      const rest = (next.get(key)?.split(',') ?? []).filter((v) => v !== value);
      if (rest.length) next.set(key, rest.join(','));
      else next.delete(key);
    } else next.delete(key);
    next.delete('page');
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {tags.map((tag, i) => (
        <button key={i} onClick={() => remove(tag.key, tag.value)} className="chip border-hot/40 text-hot">
          {tag.label} <span className="text-xs">✕</span>
        </button>
      ))}
    </div>
  );
}
