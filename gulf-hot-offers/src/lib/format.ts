import type { Currency, Locale } from './types';

const CURRENCY_LABEL: Record<Currency, Record<Locale, string>> = {
  QAR: { en: 'QAR', ar: 'ر.ق' },
  SAR: { en: 'SAR', ar: 'ر.س' },
  AED: { en: 'AED', ar: 'د.إ' },
};

export function formatPrice(amount: number, currency: Currency, locale: Locale): string {
  const num = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  const label = CURRENCY_LABEL[currency][locale];
  return locale === 'ar' ? `${num} ${label}` : `${label} ${num}`;
}

export function discountPercent(price: number, previous: number): number {
  if (previous <= 0 || price >= previous) return 0;
  return Math.round(((previous - price) / previous) * 100);
}

export function timeAgo(isoStr: string, locale: Locale): string {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return locale === 'ar' ? 'الآن' : 'just now';
  if (mins < 60) return locale === 'ar' ? `قبل ${mins} دقيقة` : `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return locale === 'ar' ? `قبل ${hours} ساعة` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return locale === 'ar' ? `قبل ${days} يوم` : `${days}d ago`;
}

export function formatDate(isoStr: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoStr));
}
