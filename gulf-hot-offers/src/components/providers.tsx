'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CountryCode, Locale } from '@/lib/types';
import { COUNTRY_COOKIE, LOCALE_COOKIE, dirFor } from '@/i18n/config';

// ---------------------------------------------------------------------------
// Preferences context (locale + selected country)
// ---------------------------------------------------------------------------
interface PrefsCtx {
  locale: Locale;
  country: CountryCode;
  setLocale: (l: Locale) => void;
  setCountry: (c: CountryCode) => void;
}
const PrefsContext = createContext<PrefsCtx | null>(null);

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function PrefsProvider({
  initialLocale,
  initialCountry,
  children,
}: {
  initialLocale: Locale;
  initialCountry: CountryCode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [country, setCountryState] = useState<CountryCode>(initialCountry);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    setCookie(LOCALE_COOKIE, l);
    document.documentElement.lang = l;
    document.documentElement.dir = dirFor(l);
    router.refresh();
  }, [router]);

  const setCountry = useCallback((c: CountryCode) => {
    setCountryState(c);
    setCookie(COUNTRY_COOKIE, c);
    router.refresh();
  }, [router]);

  const value = useMemo(() => ({ locale, country, setLocale, setCountry }), [locale, country, setLocale, setCountry]);
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs must be used within PrefsProvider');
  return ctx;
}

// Keeps the cookie/context in sync when a visitor lands on a /[country] URL.
export function CountrySync({ country }: { country: CountryCode }) {
  const { country: current, setCountry } = usePrefs();
  useEffect(() => {
    if (current !== country) setCountry(country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);
  return null;
}

// ---------------------------------------------------------------------------
// Local persistence: favourites, price alerts, recently viewed, auth (demo)
// ---------------------------------------------------------------------------
export interface PriceAlert {
  id: string;
  offerSlug: string;
  title: string;
  target: number;
  currency: string;
  createdAt: string;
}
export interface DemoUser {
  email: string;
  provider: 'email' | 'google' | 'apple';
}

interface UserCtx {
  favourites: string[];
  toggleFavourite: (slug: string) => void;
  isFavourite: (slug: string) => boolean;
  alerts: PriceAlert[];
  addAlert: (a: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  removeAlert: (id: string) => void;
  recentlyViewed: string[];
  pushRecent: (slug: string) => void;
  user: DemoUser | null;
  signIn: (u: DemoUser) => void;
  signOut: () => void;
  ready: boolean;
}
const UserContext = createContext<UserCtx | null>(null);

function useLocalArray<T>(key: string): [T[], (v: T[]) => void, boolean] {
  const [state, setState] = useState<T[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch { /* ignore */ }
    setReady(true);
  }, [key]);
  const set = useCallback((v: T[]) => {
    setState(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ }
  }, [key]);
  return [state, set, ready];
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites, r1] = useLocalArray<string>('gho_favourites');
  const [alerts, setAlerts, r2] = useLocalArray<PriceAlert>('gho_alerts');
  const [recentlyViewed, setRecent, r3] = useLocalArray<string>('gho_recent');
  const [userArr, setUserArr, r4] = useLocalArray<DemoUser>('gho_user');

  const toggleFavourite = useCallback((slug: string) => {
    setFavourites(favourites.includes(slug) ? favourites.filter((s) => s !== slug) : [slug, ...favourites]);
  }, [favourites, setFavourites]);

  const addAlert = useCallback((a: Omit<PriceAlert, 'id' | 'createdAt'>) => {
    const alert: PriceAlert = { ...a, id: `al_${Date.now()}`, createdAt: new Date().toISOString() };
    setAlerts([alert, ...alerts]);
  }, [alerts, setAlerts]);

  const removeAlert = useCallback((id: string) => setAlerts(alerts.filter((a) => a.id !== id)), [alerts, setAlerts]);

  const pushRecent = useCallback((slug: string) => {
    setRecent([slug, ...recentlyViewed.filter((s) => s !== slug)].slice(0, 12));
  }, [recentlyViewed, setRecent]);

  const value = useMemo<UserCtx>(() => ({
    favourites,
    toggleFavourite,
    isFavourite: (slug: string) => favourites.includes(slug),
    alerts,
    addAlert,
    removeAlert,
    recentlyViewed,
    pushRecent,
    user: userArr[0] ?? null,
    signIn: (u: DemoUser) => setUserArr([u]),
    signOut: () => setUserArr([]),
    ready: r1 && r2 && r3 && r4,
  }), [favourites, toggleFavourite, alerts, addAlert, removeAlert, recentlyViewed, pushRecent, userArr, setUserArr, r1, r2, r3, r4]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

// ---------------------------------------------------------------------------
// Toast (used by copy-to-clipboard etc.)
// ---------------------------------------------------------------------------
const ToastContext = createContext<{ show: (msg: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const show = useCallback((m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 1800);
  }, []);
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {msg && (
        <div className="fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 sm:bottom-8">
          <div className="animate-fade-up rounded-full bg-ink px-4 py-2 text-sm font-medium text-white shadow-pop">{msg}</div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { show: () => {} };
  return ctx;
}

export function AppProviders({
  initialLocale,
  initialCountry,
  children,
}: {
  initialLocale: Locale;
  initialCountry: CountryCode;
  children: React.ReactNode;
}) {
  return (
    <PrefsProvider initialLocale={initialLocale} initialCountry={initialCountry}>
      <UserProvider>
        <ToastProvider>{children}</ToastProvider>
      </UserProvider>
    </PrefsProvider>
  );
}
