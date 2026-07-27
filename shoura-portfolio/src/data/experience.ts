import type { Localized } from "@/i18n/types";

/** Countries where training / consulting has been delivered. */
export interface Country {
  code: string;
  name: Localized;
  region: Localized;
}

export const countries: Country[] = [
  { code: "EG", name: { en: "Egypt", ar: "مصر" }, region: { en: "Africa", ar: "أفريقيا" } },
  { code: "QA", name: { en: "Qatar", ar: "قطر" }, region: { en: "GCC", ar: "الخليج" } },
  { code: "AE", name: { en: "UAE", ar: "الإمارات" }, region: { en: "GCC", ar: "الخليج" } },
  { code: "SA", name: { en: "Saudi Arabia", ar: "السعودية" }, region: { en: "GCC", ar: "الخليج" } },
  { code: "KW", name: { en: "Kuwait", ar: "الكويت" }, region: { en: "GCC", ar: "الخليج" } },
  { code: "JO", name: { en: "Jordan", ar: "الأردن" }, region: { en: "Levant", ar: "الشام" } },
  { code: "ZA", name: { en: "South Africa", ar: "جنوب أفريقيا" }, region: { en: "Africa", ar: "أفريقيا" } },
  { code: "NG", name: { en: "Nigeria", ar: "نيجيريا" }, region: { en: "Africa", ar: "أفريقيا" } },
  { code: "UG", name: { en: "Uganda", ar: "أوغندا" }, region: { en: "Africa", ar: "أفريقيا" } },
  { code: "MY", name: { en: "Malaysia", ar: "ماليزيا" }, region: { en: "Asia", ar: "آسيا" } },
];

/** Timeline of major training & consulting activities (placeholder years). */
export interface TimelineEntry {
  year: string;
  title: Localized;
  description: Localized;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2024",
    title: { en: "AI Adoption Programs across the GCC", ar: "برامج تبني الذكاء الاصطناعي عبر الخليج" },
    description: {
      en: "Leading corporate AI training and Claude for Business rollouts for enterprise teams.",
      ar: "قيادة تدريب مؤسسي على الذكاء الاصطناعي وتطبيق Claude للأعمال لفرق المؤسسات.",
    },
  },
  {
    year: "2022",
    title: { en: "Founded Nahj for Consulting & Training", ar: "تأسيس نهج للاستشارات والتدريب" },
    description: {
      en: "Established a Qatar-based practice focused on AI, training and business consulting.",
      ar: "تأسيس كيان في قطر يركز على الذكاء الاصطناعي والتدريب واستشارات الأعمال.",
    },
  },
  {
    year: "2019",
    title: { en: "Expanded Marketing Growth Hub — MGH", ar: "توسّع ماركتنج جروث هَب — MGH" },
    description: {
      en: "Grew marketing consulting and digital delivery across the UAE and Egypt.",
      ar: "توسيع استشارات التسويق والحلول الرقمية عبر الإمارات ومصر.",
    },
  },
  {
    year: "2015",
    title: { en: "International Training Engagements", ar: "ارتباطات تدريبية دولية" },
    description: {
      en: "Delivered programs across Africa and Asia for multinational and government clients.",
      ar: "تقديم برامج عبر أفريقيا وآسيا لعملاء متعددي الجنسيات وجهات حكومية.",
    },
  },
  {
    year: "2008",
    title: { en: "Started Corporate Training Career", ar: "بداية مسيرة التدريب المؤسسي" },
    description: {
      en: "Began delivering marketing, sales and management training programs.",
      ar: "البدء بتقديم برامج تدريبية في التسويق والمبيعات والإدارة.",
    },
  },
];
