'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePrefs } from './providers';
import { POPULAR_SEARCHES, searchSuggestions, type SearchSuggestion } from '@/lib/search-index';
import { dict, t } from '@/i18n/dictionaries';

const RECENT_KEY = 'gho_recent_searches';

export function SearchBox({ autoFocus }: { autoFocus?: boolean }) {
  const { locale } = usePrefs();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    setSuggestions(searchSuggestions(q, locale));
  }, [q, locale]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submit = (term: string) => {
    const value = term.trim();
    if (!value) return;
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 6);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setOpen(false);
    router.push(`/deals?q=${encodeURIComponent(value)}`);
  };

  return (
    <div ref={boxRef} className="relative w-full">
      <form
        onSubmit={(e) => { e.preventDefault(); submit(q); }}
        className="flex items-center gap-2 rounded-xl border border-surface-border bg-white px-3 py-2 shadow-sm focus-within:border-hot"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={t(dict.searchPlaceholder, locale)}
          aria-label={t(dict.search, locale)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
        />
        <button type="submit" className="hidden rounded-lg bg-hot px-3 py-1.5 text-xs font-semibold text-white sm:block">{t(dict.search, locale)}</button>
      </form>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-auto rounded-xl border border-surface-border bg-white p-2 shadow-pop">
          {q && suggestions.length > 0 && (
            <ul className="mb-1">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => router.push(s.href)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm hover:bg-surface-soft"
                  >
                    <span className="text-ink-muted">{s.type === 'brand' ? '🏷️' : s.type === 'category' ? '📂' : '🔎'}</span>
                    <span className="font-medium text-ink">{locale === 'ar' ? s.label_ar : s.label_en}</span>
                    <span className="ms-auto text-[10px] uppercase text-ink-muted">{s.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {q && suggestions.length === 0 && (
            <p className="px-3 py-2 text-sm text-ink-muted">{locale === 'ar' ? 'لا اقتراحات — اضغط بحث' : 'No suggestions — press search'}</p>
          )}
          {!q && recent.length > 0 && (
            <div className="mb-1">
              <p className="px-3 py-1 text-[11px] font-semibold uppercase text-ink-muted">{locale === 'ar' ? 'عمليات بحث حديثة' : 'Recent searches'}</p>
              {recent.map((r) => (
                <button key={r} onClick={() => submit(r)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm hover:bg-surface-soft">
                  <span className="text-ink-muted">🕘</span>{r}
                </button>
              ))}
            </div>
          )}
          {!q && (
            <div>
              <p className="px-3 py-1 text-[11px] font-semibold uppercase text-ink-muted">{locale === 'ar' ? 'الأكثر بحثاً' : 'Popular searches'}</p>
              <div className="flex flex-wrap gap-1.5 p-2">
                {POPULAR_SEARCHES.map((p) => (
                  <button key={p.en} onClick={() => submit(locale === 'ar' ? p.ar : p.en)} className="chip hover:border-hot">{locale === 'ar' ? p.ar : p.en}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
