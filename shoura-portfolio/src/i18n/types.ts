export type Locale = "en" | "ar";

/** A field that carries both English and Arabic values. */
export interface Localized {
  en: string;
  ar: string;
}

/** An array field with both language variants. */
export interface LocalizedList {
  en: string[];
  ar: string[];
}

/** Pick the correct string for the active locale. */
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

/** Pick the correct array for the active locale. */
export function pickList(value: LocalizedList, locale: Locale): string[] {
  return value[locale] ?? value.en;
}
