import type { Localized } from "@/i18n/types";

export type ArticleCategory =
  | "ai"
  | "business"
  | "marketing"
  | "sales"
  | "leadership"
  | "cx";

export interface ArticleCategoryMeta {
  key: ArticleCategory;
  label: Localized;
}

export const articleCategories: ArticleCategoryMeta[] = [
  { key: "ai", label: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" } },
  { key: "business", label: { en: "Business Growth", ar: "نمو الأعمال" } },
  { key: "marketing", label: { en: "Marketing", ar: "التسويق" } },
  { key: "sales", label: { en: "Sales", ar: "المبيعات" } },
  { key: "leadership", label: { en: "Leadership", ar: "القيادة" } },
  { key: "cx", label: { en: "Customer Experience", ar: "تجربة العملاء" } },
];

/**
 * Blog articles. All content is PLACEHOLDER / sample material, clearly
 * labelled. Replace `body` paragraphs with real articles before publishing.
 */
export interface Article {
  slug: string;
  category: ArticleCategory;
  title: Localized;
  excerpt: Localized;
  cover: string;
  date: string; // ISO date
  readingMinutes: number;
  body: { en: string[]; ar: string[] };
  placeholder: boolean;
}

const placeholderBody = {
  en: [
    "This is placeholder article content. Replace it with a real article before publishing. It demonstrates the layout, typography and reading experience of the blog.",
    "Each article supports multiple paragraphs, clear structure and SEO metadata. Use this space to share practical insights, frameworks and examples for your audience.",
    "When you replace this text, keep paragraphs focused and skimmable. Add subheadings, lists and examples where they help the reader apply the ideas immediately.",
  ],
  ar: [
    "هذا محتوى مقال مؤقت. استبدله بمقال حقيقي قبل النشر. وهو يوضح التنسيق والطباعة وتجربة القراءة للمدونة.",
    "يدعم كل مقال فقرات متعددة وبنية واضحة وبيانات تحسين لمحركات البحث. استخدم هذه المساحة لمشاركة رؤى وأطر وأمثلة عملية لجمهورك.",
    "عند استبدال هذا النص، اجعل الفقرات مركّزة وسهلة التصفح. أضف عناوين فرعية وقوائم وأمثلة حيث تساعد القارئ على التطبيق الفوري.",
  ],
};

export const articles: Article[] = [
  {
    slug: "ai-adoption-gcc-companies",
    category: "ai",
    title: {
      en: "How GCC Companies Can Adopt AI the Right Way",
      ar: "كيف تتبنى شركات الخليج الذكاء الاصطناعي بالطريقة الصحيحة",
    },
    excerpt: {
      en: "A practical framework for adopting AI in the GCC — from use cases to governance.",
      ar: "إطار عملي لتبني الذكاء الاصطناعي في الخليج — من حالات الاستخدام إلى الحوكمة.",
    },
    cover: "/images/blog/ai-adoption.jpg",
    date: "2025-11-10",
    readingMinutes: 6,
    body: placeholderBody,
    placeholder: true,
  },
  {
    slug: "claude-for-business-guide",
    category: "ai",
    title: {
      en: "A Practical Guide to Claude for Business",
      ar: "دليل عملي لاستخدام Claude في الأعمال",
    },
    excerpt: {
      en: "How teams can use Claude safely and productively in daily work.",
      ar: "كيف يمكن للفرق استخدام Claude بأمان وإنتاجية في العمل اليومي.",
    },
    cover: "/images/blog/claude-business.jpg",
    date: "2025-10-22",
    readingMinutes: 7,
    body: placeholderBody,
    placeholder: true,
  },
  {
    slug: "marketing-psychology-that-converts",
    category: "marketing",
    title: {
      en: "Marketing Psychology That Actually Converts",
      ar: "سيكولوجيا التسويق التي تحقق التحويل فعليًا",
    },
    excerpt: {
      en: "Behavioral principles that make messaging more persuasive — ethically.",
      ar: "مبادئ سلوكية تجعل الرسائل أكثر إقناعًا — بأخلاقية.",
    },
    cover: "/images/blog/marketing-psychology.jpg",
    date: "2025-09-30",
    readingMinutes: 5,
    body: placeholderBody,
    placeholder: true,
  },
  {
    slug: "ai-sales-productivity",
    category: "sales",
    title: {
      en: "Using AI to Boost Sales Productivity",
      ar: "استخدام الذكاء الاصطناعي لرفع إنتاجية المبيعات",
    },
    excerpt: {
      en: "Where AI creates the biggest wins across the sales cycle.",
      ar: "أين يحقق الذكاء الاصطناعي أكبر المكاسب عبر دورة المبيعات.",
    },
    cover: "/images/blog/ai-sales.jpg",
    date: "2025-09-05",
    readingMinutes: 6,
    body: placeholderBody,
    placeholder: true,
  },
  {
    slug: "leadership-in-the-ai-era",
    category: "leadership",
    title: {
      en: "Leadership in the AI Era",
      ar: "القيادة في عصر الذكاء الاصطناعي",
    },
    excerpt: {
      en: "What leaders must do to guide teams through AI-driven change.",
      ar: "ما الذي يجب على القادة فعله لتوجيه الفرق خلال التغيير المدفوع بالذكاء الاصطناعي.",
    },
    cover: "/images/blog/leadership-ai.jpg",
    date: "2025-08-18",
    readingMinutes: 5,
    body: placeholderBody,
    placeholder: true,
  },
  {
    slug: "customer-experience-that-retains",
    category: "cx",
    title: {
      en: "Designing Customer Experience That Retains",
      ar: "تصميم تجربة عملاء تحافظ عليهم",
    },
    excerpt: {
      en: "Turning customer journeys into loyalty and advocacy.",
      ar: "تحويل رحلات العملاء إلى ولاء ومناصرة.",
    },
    cover: "/images/blog/cx-retention.jpg",
    date: "2025-07-28",
    readingMinutes: 6,
    body: placeholderBody,
    placeholder: true,
  },
  {
    slug: "business-growth-fundamentals",
    category: "business",
    title: {
      en: "The Fundamentals of Sustainable Business Growth",
      ar: "أساسيات نمو الأعمال المستدام",
    },
    excerpt: {
      en: "The core levers that drive durable, profitable growth.",
      ar: "الركائز الأساسية التي تقود نموًا مستدامًا ومربحًا.",
    },
    cover: "/images/blog/business-growth.jpg",
    date: "2025-07-02",
    readingMinutes: 7,
    body: placeholderBody,
    placeholder: true,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const sameCategory = articles.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
