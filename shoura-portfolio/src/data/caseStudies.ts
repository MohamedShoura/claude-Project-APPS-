import type { Localized, LocalizedList } from "@/i18n/types";

/**
 * Case studies. Content is illustrative PLACEHOLDER material — replace
 * with verified client stories before publishing. Testimonials are
 * clearly labelled placeholders.
 */
export interface CaseStudy {
  slug: string;
  icon: string;
  client: Localized;
  category: Localized;
  challenge: Localized;
  solution: Localized;
  tools: LocalizedList;
  approach: LocalizedList;
  result: Localized;
  testimonial: Localized;
  placeholder: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-sales-team",
    icon: "TrendingUp",
    client: { en: "GCC Sales Organization", ar: "مؤسسة مبيعات خليجية" },
    category: { en: "AI Implementation — Sales", ar: "تطبيق الذكاء الاصطناعي — المبيعات" },
    challenge: {
      en: "A sales team spent excessive time on manual prospecting and follow-ups, limiting selling time.",
      ar: "أهدر فريق المبيعات وقتًا كبيرًا في الاستكشاف والمتابعة اليدوية، ما قلّص وقت البيع.",
    },
    solution: {
      en: "Designed AI-assisted prospecting and messaging workflows integrated with the CRM.",
      ar: "تصميم سير عمل استكشاف ورسائل مدعوم بالذكاء الاصطناعي ومتكامل مع نظام إدارة العلاقات.",
    },
    tools: {
      en: ["Claude", "CRM Automation", "Custom Prompts"],
      ar: ["Claude", "أتمتة إدارة العلاقات", "أوامر مخصصة"],
    },
    approach: {
      en: [
        "Mapped the existing sales process",
        "Built reusable AI prompts and templates",
        "Trained the team and measured adoption",
      ],
      ar: [
        "رسم عملية المبيعات الحالية",
        "بناء أوامر وقوالب ذكاء اصطناعي قابلة لإعادة الاستخدام",
        "تدريب الفريق وقياس التبني",
      ],
    },
    result: {
      en: "Significantly more selling time and faster follow-up (illustrative placeholder result).",
      ar: "وقت بيع أكبر بكثير ومتابعة أسرع (نتيجة توضيحية مؤقتة).",
    },
    testimonial: {
      en: "[Placeholder testimonial — to be replaced with a verified client quote.]",
      ar: "[شهادة مؤقتة — سيتم استبدالها بشهادة عميل مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    slug: "hr-claude-workflow",
    icon: "Users",
    client: { en: "Enterprise HR Department", ar: "إدارة موارد بشرية مؤسسية" },
    category: { en: "Claude Workflow — HR", ar: "سير عمل Claude — الموارد البشرية" },
    challenge: {
      en: "HR was overloaded with document drafting and repetitive candidate communication.",
      ar: "كانت الموارد البشرية مثقلة بصياغة الوثائق والتواصل المتكرر مع المرشحين.",
    },
    solution: {
      en: "Implemented a Claude-based workflow for policy drafting, JD creation and screening support.",
      ar: "تطبيق سير عمل قائم على Claude لصياغة السياسات وإنشاء الوصف الوظيفي ودعم الفرز.",
    },
    tools: {
      en: ["Claude", "Document Templates", "Screening Rubrics"],
      ar: ["Claude", "قوالب المستندات", "معايير الفرز"],
    },
    approach: {
      en: [
        "Audited HR document workflows",
        "Created governed AI templates",
        "Enabled the team with training",
      ],
      ar: [
        "مراجعة سير عمل وثائق الموارد البشرية",
        "إنشاء قوالب ذكاء اصطناعي منضبطة",
        "تمكين الفريق بالتدريب",
      ],
    },
    result: {
      en: "Faster drafting and consistent communication (illustrative placeholder result).",
      ar: "صياغة أسرع وتواصل متسق (نتيجة توضيحية مؤقتة).",
    },
    testimonial: {
      en: "[Placeholder testimonial — to be replaced with a verified client quote.]",
      ar: "[شهادة مؤقتة — سيتم استبدالها بشهادة عميل مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    slug: "gcc-marketing-strategy",
    icon: "Target",
    client: { en: "GCC Business", ar: "شركة خليجية" },
    category: { en: "Marketing Strategy", ar: "استراتيجية التسويق" },
    challenge: {
      en: "Marketing spend lacked clear positioning and measurable return.",
      ar: "افتقر الإنفاق التسويقي إلى تموضع واضح وعائد قابل للقياس.",
    },
    solution: {
      en: "Developed a focused marketing strategy with positioning, channels and KPIs.",
      ar: "تطوير استراتيجية تسويق مركّزة بالتموضع والقنوات ومؤشرات الأداء.",
    },
    tools: {
      en: ["Market Analysis", "Positioning Framework", "KPI Dashboard"],
      ar: ["تحليل السوق", "إطار التموضع", "لوحة مؤشرات الأداء"],
    },
    approach: {
      en: [
        "Ran market and competitor analysis",
        "Defined positioning and messaging",
        "Built an execution and measurement plan",
      ],
      ar: [
        "إجراء تحليل السوق والمنافسين",
        "تحديد التموضع والرسائل",
        "بناء خطة تنفيذ وقياس",
      ],
    },
    result: {
      en: "Clearer direction and improved marketing focus (illustrative placeholder result).",
      ar: "اتجاه أوضح وتركيز تسويقي أفضل (نتيجة توضيحية مؤقتة).",
    },
    testimonial: {
      en: "[Placeholder testimonial — to be replaced with a verified client quote.]",
      ar: "[شهادة مؤقتة — سيتم استبدالها بشهادة عميل مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    slug: "tourism-dashboard",
    icon: "Plane",
    client: { en: "Tourism Company", ar: "شركة سياحة" },
    category: { en: "Dashboards & Analytics", ar: "لوحات المعلومات والتحليلات" },
    challenge: {
      en: "Leadership lacked a real-time view of key operational metrics.",
      ar: "افتقرت الإدارة لرؤية لحظية لأهم المؤشرات التشغيلية.",
    },
    solution: {
      en: "Built a tailored dashboard surfacing the metrics that drive decisions.",
      ar: "بناء لوحة مخصصة تُبرز المؤشرات التي تقود القرارات.",
    },
    tools: {
      en: ["Dashboard Design", "Data Integration", "AI Workflows"],
      ar: ["تصميم اللوحات", "تكامل البيانات", "سير عمل الذكاء الاصطناعي"],
    },
    approach: {
      en: [
        "Defined the key metrics",
        "Integrated data sources",
        "Delivered a clear, actionable dashboard",
      ],
      ar: [
        "تحديد المؤشرات الرئيسية",
        "دمج مصادر البيانات",
        "تسليم لوحة واضحة وقابلة للتنفيذ",
      ],
    },
    result: {
      en: "Faster, data-driven decisions (illustrative placeholder result).",
      ar: "قرارات أسرع مبنية على البيانات (نتيجة توضيحية مؤقتة).",
    },
    testimonial: {
      en: "[Placeholder testimonial — to be replaced with a verified client quote.]",
      ar: "[شهادة مؤقتة — سيتم استبدالها بشهادة عميل مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    slug: "task-management-system",
    icon: "ClipboardList",
    client: { en: "Corporate Operations Team", ar: "فريق عمليات مؤسسي" },
    category: { en: "Productivity Systems", ar: "أنظمة الإنتاجية" },
    challenge: {
      en: "Task tracking was fragmented across tools and messages.",
      ar: "كان تتبع المهام مبعثرًا عبر أدوات ورسائل مختلفة.",
    },
    solution: {
      en: "Implemented an employee task management system with clear ownership.",
      ar: "تطبيق نظام إدارة مهام للموظفين مع مسؤوليات واضحة.",
    },
    tools: {
      en: ["Workflow Design", "Automation", "Reporting"],
      ar: ["تصميم سير العمل", "الأتمتة", "التقارير"],
    },
    approach: {
      en: [
        "Mapped team workflows",
        "Standardized task processes",
        "Automated reporting and reminders",
      ],
      ar: [
        "رسم سير عمل الفريق",
        "توحيد عمليات المهام",
        "أتمتة التقارير والتذكيرات",
      ],
    },
    result: {
      en: "Improved accountability and visibility (illustrative placeholder result).",
      ar: "تحسّن المساءلة والوضوح (نتيجة توضيحية مؤقتة).",
    },
    testimonial: {
      en: "[Placeholder testimonial — to be replaced with a verified client quote.]",
      ar: "[شهادة مؤقتة — سيتم استبدالها بشهادة عميل مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    slug: "customer-service-training",
    icon: "Headphones",
    client: { en: "Service Organization", ar: "مؤسسة خدمية" },
    category: { en: "AI Customer Service Training", ar: "تدريب خدمة العملاء بالذكاء الاصطناعي" },
    challenge: {
      en: "Support responses were slow and inconsistent in tone.",
      ar: "كانت ردود الدعم بطيئة وغير متسقة في النبرة.",
    },
    solution: {
      en: "Delivered AI-powered customer service training and response workflows.",
      ar: "تقديم تدريب خدمة عملاء مدعوم بالذكاء الاصطناعي وسير عمل للردود.",
    },
    tools: {
      en: ["Claude", "Response Templates", "Quality Rubrics"],
      ar: ["Claude", "قوالب الردود", "معايير الجودة"],
    },
    approach: {
      en: [
        "Assessed current support quality",
        "Introduced AI response workflows",
        "Trained agents and measured improvement",
      ],
      ar: [
        "تقييم جودة الدعم الحالية",
        "إدخال سير عمل ردود بالذكاء الاصطناعي",
        "تدريب الموظفين وقياس التحسن",
      ],
    },
    result: {
      en: "Faster, more consistent support (illustrative placeholder result).",
      ar: "دعم أسرع وأكثر اتساقًا (نتيجة توضيحية مؤقتة).",
    },
    testimonial: {
      en: "[Placeholder testimonial — to be replaced with a verified client quote.]",
      ar: "[شهادة مؤقتة — سيتم استبدالها بشهادة عميل مُعتمدة.]",
    },
    placeholder: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
