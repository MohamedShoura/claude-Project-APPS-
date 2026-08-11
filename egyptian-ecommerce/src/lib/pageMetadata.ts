import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function listingMetadata(
  params: Promise<{ locale: string }>,
  path: string,
  titleKey: "shop" | "offers" | "newArrivals" | "bestSellers"
): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const title = dict.pages[titleKey];
  return {
    title,
    alternates: { canonical: `/${locale}${path}` },
  };
}
