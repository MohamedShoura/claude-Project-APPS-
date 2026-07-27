import type { Localized, LocalizedList } from "@/i18n/types";

/**
 * Companies founded by Dr. Mohamed Shoura.
 * Replace `logo` paths with the official logos (do NOT recolor or distort).
 */
export interface Company {
  slug: string;
  name: Localized;
  logo: string;
  location: Localized;
  description: Localized;
  focus: LocalizedList;
  accent: "burgundy" | "gold";
}

export const companies: Company[] = [
  {
    slug: "nahj",
    name: { en: "Nahj for Consulting & Training", ar: "نهج للاستشارات والتدريب" },
    logo: "/logos/nahj-logo.svg",
    location: { en: "Qatar", ar: "قطر" },
    description: {
      en: "A Qatar-based consulting and training firm helping organizations adopt AI, upskill their people and grow their business.",
      ar: "شركة استشارات وتدريب مقرها قطر تساعد المؤسسات على تبني الذكاء الاصطناعي وتطوير كوادرها وتنمية أعمالها.",
    },
    focus: {
      en: ["AI Solutions", "Corporate Training", "Business Consulting", "Professional Development"],
      ar: ["حلول الذكاء الاصطناعي", "التدريب المؤسسي", "استشارات الأعمال", "التطوير المهني"],
    },
    accent: "burgundy",
  },
  {
    slug: "mgh",
    name: { en: "Marketing Growth Hub — MGH", ar: "ماركتنج جروث هَب — MGH" },
    logo: "/logos/mgh-logo.svg",
    location: { en: "UAE & Egypt", ar: "الإمارات ومصر" },
    description: {
      en: "A marketing consultancy delivering strategy, digital solutions and business growth for brands across the region.",
      ar: "استشارات تسويقية تقدّم الاستراتيجية والحلول الرقمية ونمو الأعمال لعلامات عبر المنطقة.",
    },
    focus: {
      en: ["Marketing Consulting", "Corporate Training", "Digital Solutions", "Business Growth", "Web & Digital Projects"],
      ar: ["استشارات التسويق", "التدريب المؤسسي", "الحلول الرقمية", "نمو الأعمال", "مشاريع الويب والرقمية"],
    },
    accent: "gold",
  },
];
