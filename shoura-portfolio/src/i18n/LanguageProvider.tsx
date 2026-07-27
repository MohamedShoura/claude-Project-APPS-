"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Localized,
  type LocalizedList,
  type Locale,
  pick,
  pickList,
} from "./types";
import { type DictionaryKey, translate } from "./dictionary";

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Translate a UI dictionary key. */
  t: (key: DictionaryKey) => string;
  /** Localize a `{ en, ar }` data field. */
  tl: (value: Localized) => string;
  /** Localize a `{ en: [], ar: [] }` data field. */
  tlList: (value: LocalizedList) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "shoura-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Hydrate from storage on mount (English is the SSR default).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "ar" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  // Keep the document element in sync for RTL + a11y.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "ar" : "en";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      isRTL: locale === "ar",
      setLocale,
      toggleLocale,
      t: (key: DictionaryKey) => translate(key, locale),
      tl: (v: Localized) => pick(v, locale),
      tlList: (v: LocalizedList) => pickList(v, locale),
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
