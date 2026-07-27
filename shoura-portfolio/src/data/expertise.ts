import type { Localized } from "@/i18n/types";

/**
 * Areas of expertise cards. `icon` matches a lucide-react icon name
 * resolved in the ExpertiseCard component.
 */
export interface Expertise {
  slug: string;
  icon: string;
  title: Localized;
  description: Localized;
  outcome: Localized;
}

export const expertise: Expertise[] = [
  {
    slug: "ai-for-business",
    icon: "BrainCircuit",
    title: { en: "AI for Business", ar: "الذكاء الاصطناعي للأعمال" },
    description: {
      en: "Practical adoption of AI to streamline operations, decisions and productivity.",
      ar: "تبنّي عملي للذكاء الاصطناعي لتبسيط العمليات والقرارات والإنتاجية.",
    },
    outcome: {
      en: "Faster workflows and data-driven decisions.",
      ar: "سير عمل أسرع وقرارات مبنية على البيانات.",
    },
  },
  {
    slug: "ai-for-sales",
    icon: "TrendingUp",
    title: { en: "AI for Sales", ar: "الذكاء الاصطناعي للمبيعات" },
    description: {
      en: "AI-assisted prospecting, pipeline management and deal acceleration.",
      ar: "استكشاف العملاء وإدارة خط المبيعات وتسريع الصفقات بالذكاء الاصطناعي.",
    },
    outcome: {
      en: "Higher conversion and shorter sales cycles.",
      ar: "معدلات تحويل أعلى ودورات بيع أقصر.",
    },
  },
  {
    slug: "ai-for-marketing",
    icon: "Megaphone",
    title: { en: "AI for Marketing", ar: "الذكاء الاصطناعي للتسويق" },
    description: {
      en: "Content, campaigns and personalization powered by generative AI.",
      ar: "محتوى وحملات وتخصيص مدعوم بالذكاء الاصطناعي التوليدي.",
    },
    outcome: {
      en: "More output, better targeting, lower cost.",
      ar: "إنتاج أكبر واستهداف أدق وتكلفة أقل.",
    },
  },
  {
    slug: "ai-for-hr",
    icon: "Users",
    title: { en: "AI for Human Resources", ar: "الذكاء الاصطناعي للموارد البشرية" },
    description: {
      en: "Smarter hiring, onboarding and people workflows with AI.",
      ar: "توظيف وتأهيل وإدارة أذكى للموظفين بالذكاء الاصطناعي.",
    },
    outcome: {
      en: "Reduced admin load and better talent decisions.",
      ar: "تقليل الأعباء الإدارية وقرارات مواهب أفضل.",
    },
  },
  {
    slug: "ai-for-finance",
    icon: "Calculator",
    title: { en: "AI for Finance", ar: "الذكاء الاصطناعي للمالية" },
    description: {
      en: "AI for forecasting, reporting and financial analysis.",
      ar: "الذكاء الاصطناعي للتنبؤ والتقارير والتحليل المالي.",
    },
    outcome: {
      en: "Sharper forecasts and faster reporting.",
      ar: "تنبؤات أدق وتقارير أسرع.",
    },
  },
  {
    slug: "ai-for-customer-service",
    icon: "Headphones",
    title: { en: "AI for Customer Service", ar: "الذكاء الاصطناعي لخدمة العملاء" },
    description: {
      en: "AI assistants and workflows that elevate customer support.",
      ar: "مساعدون وأنظمة ذكاء اصطناعي ترتقي بدعم العملاء.",
    },
    outcome: {
      en: "Faster resolution and higher satisfaction.",
      ar: "حل أسرع ورضا أعلى.",
    },
  },
  {
    slug: "claude-for-business",
    icon: "Sparkles",
    title: { en: "Claude for Business", ar: "Claude للأعمال" },
    description: {
      en: "Deploying Claude and generative AI safely across business teams.",
      ar: "توظيف Claude والذكاء الاصطناعي التوليدي بأمان عبر فرق العمل.",
    },
    outcome: {
      en: "A practical, governed AI adoption roadmap.",
      ar: "خارطة طريق عملية ومنضبطة لتبني الذكاء الاصطناعي.",
    },
  },
  {
    slug: "marketing-strategy",
    icon: "Target",
    title: { en: "Marketing Strategy", ar: "استراتيجية التسويق" },
    description: {
      en: "Positioning, brand and go-to-market strategy that drives growth.",
      ar: "تموضع وعلامة واستراتيجية دخول للسوق تدفع النمو.",
    },
    outcome: {
      en: "Clear positioning and a growth engine.",
      ar: "تموضع واضح ومحرك نمو فعّال.",
    },
  },
  {
    slug: "sales-strategy",
    icon: "LineChart",
    title: { en: "Sales Strategy", ar: "استراتيجية المبيعات" },
    description: {
      en: "Building sales systems, processes and high-performing teams.",
      ar: "بناء أنظمة وعمليات مبيعات وفرق عالية الأداء.",
    },
    outcome: {
      en: "Predictable, scalable revenue.",
      ar: "إيرادات قابلة للتنبؤ والتوسع.",
    },
  },
  {
    slug: "customer-experience",
    icon: "Heart",
    title: { en: "Customer Experience", ar: "تجربة العملاء" },
    description: {
      en: "Designing journeys that turn customers into advocates.",
      ar: "تصميم رحلات تحوّل العملاء إلى سفراء للعلامة.",
    },
    outcome: {
      en: "Higher retention and loyalty.",
      ar: "احتفاظ وولاء أعلى.",
    },
  },
  {
    slug: "business-development",
    icon: "Briefcase",
    title: { en: "Business Development", ar: "تطوير الأعمال" },
    description: {
      en: "Identifying opportunities and building partnerships for growth.",
      ar: "اكتشاف الفرص وبناء الشراكات لتحقيق النمو.",
    },
    outcome: {
      en: "New revenue streams and partnerships.",
      ar: "مصادر إيراد وشراكات جديدة.",
    },
  },
  {
    slug: "digital-transformation",
    icon: "Rocket",
    title: { en: "Digital Transformation", ar: "التحول الرقمي" },
    description: {
      en: "Modernizing processes, tools and culture for the digital era.",
      ar: "تحديث العمليات والأدوات والثقافة لعصر رقمي.",
    },
    outcome: {
      en: "An organization ready for the future.",
      ar: "مؤسسة جاهزة للمستقبل.",
    },
  },
  {
    slug: "corporate-leadership",
    icon: "Crown",
    title: { en: "Corporate Leadership", ar: "القيادة المؤسسية" },
    description: {
      en: "Developing leaders who inspire, align and deliver results.",
      ar: "تطوير قادة يُلهمون ويوحّدون ويحققون النتائج.",
    },
    outcome: {
      en: "Stronger, more resilient leadership.",
      ar: "قيادة أقوى وأكثر مرونة.",
    },
  },
  {
    slug: "marketing-psychology",
    icon: "Brain",
    title: { en: "Marketing Psychology", ar: "سيكولوجيا التسويق" },
    description: {
      en: "Applying behavioral science to influence and persuade ethically.",
      ar: "تطبيق علم السلوك للتأثير والإقناع بأخلاقية.",
    },
    outcome: {
      en: "Messaging that genuinely resonates.",
      ar: "رسائل تلامس الجمهور فعليًا.",
    },
  },
];
