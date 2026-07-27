import type { Localized } from "@/i18n/types";

/**
 * Public contact + social configuration.
 *
 * Values are read from environment variables (see `.env.example`) so that
 * private numbers never live in the codebase. Safe fallbacks are provided
 * for local development — replace them via `.env.local` in production.
 */
export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@mohamedshoura.com",

  phones: [
    {
      country: { en: "UAE", ar: "الإمارات" } satisfies Localized,
      value: process.env.NEXT_PUBLIC_PHONE_UAE || "+971 000 000 000",
    },
    {
      country: { en: "Qatar", ar: "قطر" } satisfies Localized,
      value: process.env.NEXT_PUBLIC_PHONE_QATAR || "+974 000 000 000",
    },
    {
      country: { en: "Egypt", ar: "مصر" } satisfies Localized,
      value: process.env.NEXT_PUBLIC_PHONE_EGYPT || "+20 000 000 000",
    },
  ],

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "971000000000",

  social: {
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN ||
      "https://www.linkedin.com/in/mohamedshoura",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM ||
      "https://www.instagram.com/mohamedshoura",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@mohamedshoura",
  },

  offices: [
    {
      city: { en: "Doha, Qatar", ar: "الدوحة، قطر" } satisfies Localized,
      org: { en: "Nahj for Consulting & Training", ar: "نهج للاستشارات والتدريب" } satisfies Localized,
    },
    {
      city: { en: "Dubai, UAE", ar: "دبي، الإمارات" } satisfies Localized,
      org: { en: "Marketing Growth Hub — MGH", ar: "ماركتنج جروث هَب — MGH" } satisfies Localized,
    },
    {
      city: { en: "Cairo, Egypt", ar: "القاهرة، مصر" } satisfies Localized,
      org: { en: "Marketing Growth Hub — MGH", ar: "ماركتنج جروث هَب — MGH" } satisfies Localized,
    },
  ],

  workingHours: {
    en: "Sunday – Thursday, 9:00 AM – 6:00 PM (GST)",
    ar: "الأحد – الخميس، 9:00 ص – 6:00 م (بتوقيت الخليج)",
  } satisfies Localized,
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedshoura.com";

/** Endpoint the lead/contact forms POST to. Empty = built-in mock handler. */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
