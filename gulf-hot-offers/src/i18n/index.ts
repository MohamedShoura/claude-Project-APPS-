import { cookies } from 'next/headers';
import type { CountryCode, Locale } from '@/lib/types';
import { DEFAULT_COUNTRY, DEFAULT_LOCALE, LOCALE_COOKIE, COUNTRY_COOKIE, isLocale, isCountry } from './config';

export * from './config';

/** Server-side reader for the visitor's locale + selected country. */
export async function getPrefs(): Promise<{ locale: Locale; country: CountryCode }> {
  const store = await cookies();
  const l = store.get(LOCALE_COOKIE)?.value;
  const c = store.get(COUNTRY_COOKIE)?.value;
  return {
    locale: isLocale(l) ? l : DEFAULT_LOCALE,
    country: isCountry(c) ? c : DEFAULT_COUNTRY,
  };
}
