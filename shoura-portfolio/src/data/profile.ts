import type { Localized, LocalizedList } from "@/i18n/types";

/**
 * Core profile / biography content.
 * Edit these values to update the hero, about section and metadata.
 */
export interface Stat {
  value: string;
  suffix: string;
  label: Localized;
}

export const profile = {
  name: { en: "Dr. Mohamed Shoura", ar: "د. محمد شورى" } satisfies Localized,
  shortName: { en: "Mohamed Shoura", ar: "محمد شورى" } satisfies Localized,

  role: {
    en: "International Corporate Trainer & AI Consultant",
    ar: "مدرب مؤسسي دولي ومستشار ذكاء اصطناعي",
  } satisfies Localized,

  // Rotating animated titles in the hero.
  titles: {
    en: [
      "AI Consultant",
      "International Corporate Trainer",
      "Marketing & Business Consultant",
      "Founder of Nahj & MGH",
    ],
    ar: [
      "مستشار ذكاء اصطناعي",
      "مدرب مؤسسي دولي",
      "مستشار تسويق وأعمال",
      "مؤسس نهج و MGH",
    ],
  } satisfies LocalizedList,

  heroHeadline: {
    en: "Empowering Businesses and Professionals Through AI, Marketing and Business Innovation",
    ar: "تمكين الشركات والمحترفين من خلال الذكاء الاصطناعي والتسويق وابتكار الأعمال",
  } satisfies Localized,

  heroSubtext: {
    en: "International Corporate Trainer, AI Consultant and Business Growth Expert with more than 16 years of experience delivering training and consulting solutions across multiple countries and industries.",
    ar: "مدرب مؤسسي دولي ومستشار ذكاء اصطناعي وخبير نمو أعمال، بخبرة تتجاوز 16 عامًا في تقديم حلول التدريب والاستشارات عبر دول وصناعات متعددة.",
  } satisfies Localized,

  // Professional photo — replace with the real portrait in /public/images.
  photo: "/images/shoura-portrait.jpg",
  photoAlt: {
    en: "Portrait of Dr. Mohamed Shoura",
    ar: "صورة د. محمد شورى",
  } satisfies Localized,

  // Downloadable profile / CV placeholder.
  profilePdf: "/downloads/mohamed-shoura-profile.pdf",

  stats: [
    {
      value: "16",
      suffix: "+",
      label: { en: "Years of Experience", ar: "سنوات الخبرة" },
    },
    {
      value: "22",
      suffix: "+",
      label: { en: "Nationalities Trained", ar: "جنسية تم تدريبها" },
    },
    {
      value: "14",
      suffix: "+",
      label: { en: "Countries", ar: "دولة" },
    },
    {
      value: "40",
      suffix: "+",
      label: { en: "Corporate Programs", ar: "برنامج مؤسسي" },
    },
  ] satisfies Stat[],

  // About section — multi-paragraph biography.
  bio: {
    en: [
      "Dr. Mohamed Shoura is an international corporate trainer, AI consultant, marketing consultant and business development expert who helps organizations turn emerging technology into measurable growth. Over more than 16 years he has partnered with corporations, government entities and professionals to modernize how they work, market and sell.",
      "His work sits at the intersection of artificial intelligence for business, corporate training, marketing strategy, sales development, business consulting, digital transformation, customer experience and leadership and management development. He is known for translating complex concepts into practical, immediately applicable systems that teams actually adopt.",
      "Dr. Shoura has delivered professional training and consulting services in Egypt, Qatar, the UAE, Saudi Arabia, Kuwait, Jordan, South Africa, Nigeria, Uganda, Malaysia and other international markets — building a reputation as a trusted advisor across the GCC, Africa and beyond.",
    ],
    ar: [
      "د. محمد شورى مدرب مؤسسي دولي ومستشار ذكاء اصطناعي ومستشار تسويق وخبير تطوير أعمال، يساعد المؤسسات على تحويل التقنيات الناشئة إلى نمو قابل للقياس. على مدى أكثر من 16 عامًا عمل مع الشركات والجهات الحكومية والمحترفين لتحديث طريقة عملهم وتسويقهم ومبيعاتهم.",
      "يجمع عمله بين الذكاء الاصطناعي للأعمال والتدريب المؤسسي واستراتيجية التسويق وتطوير المبيعات واستشارات الأعمال والتحول الرقمي وتجربة العملاء وتطوير القيادة والإدارة. ويُعرف بقدرته على تبسيط المفاهيم المعقدة إلى أنظمة عملية قابلة للتطبيق الفوري تتبناها الفرق فعليًا.",
      "قدّم د. شورى خدمات تدريبية واستشارية احترافية في مصر وقطر والإمارات والسعودية والكويت والأردن وجنوب أفريقيا ونيجيريا وأوغندا وماليزيا وأسواق دولية أخرى — ليبني سمعة كمستشار موثوق عبر الخليج وأفريقيا وخارجها.",
    ],
  } satisfies LocalizedList,

  focusAreas: {
    en: [
      "Artificial Intelligence for Business",
      "Corporate Training",
      "Marketing Strategy",
      "Sales Development",
      "Business Consulting",
      "Digital Transformation",
      "Customer Experience",
      "Leadership & Management Development",
    ],
    ar: [
      "الذكاء الاصطناعي للأعمال",
      "التدريب المؤسسي",
      "استراتيجية التسويق",
      "تطوير المبيعات",
      "استشارات الأعمال",
      "التحول الرقمي",
      "تجربة العملاء",
      "تطوير القيادة والإدارة",
    ],
  } satisfies LocalizedList,
};
