import type { Localized } from "@/i18n/types";

/**
 * Client logo grid. These are PLACEHOLDERS — replace `logo` with real
 * client logos and set `name` once content is verified. Do not invent
 * client names publicly; keep placeholders until confirmed.
 */
export interface Client {
  id: string;
  name: Localized;
  logo: string;
  placeholder: boolean;
}

export const clients: Client[] = Array.from({ length: 12 }, (_, i) => ({
  id: `client-${i + 1}`,
  name: {
    en: `Client Placeholder ${i + 1}`,
    ar: `عميل مؤقت ${i + 1}`,
  },
  logo: `/logos/clients/client-${i + 1}.svg`,
  placeholder: true,
}));

/** Industries served. */
export const industries: Localized[] = [
  { en: "Tourism", ar: "السياحة" },
  { en: "Legal", ar: "القانون" },
  { en: "Technology", ar: "التقنية" },
  { en: "Government", ar: "الحكومة" },
  { en: "Education", ar: "التعليم" },
  { en: "Healthcare", ar: "الرعاية الصحية" },
  { en: "Retail", ar: "التجزئة" },
  { en: "Corporate Services", ar: "الخدمات المؤسسية" },
  { en: "Manufacturing", ar: "التصنيع" },
  { en: "Real Estate", ar: "العقارات" },
];
