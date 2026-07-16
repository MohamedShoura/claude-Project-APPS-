import type { CountryCode, Locale } from '@/lib/types';

// Pure, client-safe locale/country helpers (NO next/headers import here).
export const LOCALES: Locale[] = ['en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'en';
export const DEFAULT_COUNTRY: CountryCode = 'qa';

export const LOCALE_COOKIE = 'gho_locale';
export const COUNTRY_COOKIE = 'gho_country';

export function isLocale(v: string | undefined): v is Locale {
  return v === 'en' || v === 'ar';
}
export function isCountry(v: string | undefined): v is CountryCode {
  return v === 'qa' || v === 'sa' || v === 'ae';
}

export const dirFor = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');
