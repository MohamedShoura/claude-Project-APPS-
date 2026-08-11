"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import { type Dictionary, getDictionary } from "./dictionaries";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  dir: "rtl" | "ltr";
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value: LocaleContextValue = {
    locale,
    dict: getDictionary(locale),
    dir: locale === "ar" ? "rtl" : "ltr",
  };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
