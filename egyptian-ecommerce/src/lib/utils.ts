import type { Locale } from "@/i18n/config";

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function swapLocaleInPath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  parts[0] = target;
  return `/${parts.join("/")}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
