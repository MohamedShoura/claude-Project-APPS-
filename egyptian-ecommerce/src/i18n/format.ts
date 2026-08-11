import type { Locale } from "./config";

export function formatPrice(amount: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return locale === "ar" ? `${formatted} ج.م` : `${formatted} EGP`;
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function discountPercent(original: number, sale: number): number {
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

export function savings(original: number, sale: number): number {
  return Math.max(0, original - sale);
}
