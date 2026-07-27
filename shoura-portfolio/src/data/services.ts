import type { Localized } from "@/i18n/types";

/** Consulting services — each with challenge / solution / outcome. */
export interface Service {
  slug: string;
  icon: string;
  title: Localized;
  challenge: Localized;
  solution: Localized;
  outcome: Localized;
}

export const services: Service[] = [
  {
    slug: "ai-transformation",
    icon: "Rocket",
    title: { en: "AI Transformation Consulting", ar: "استشارات التحول بالذكاء الاصطناعي" },
    challenge: {
      en: "Organizations know AI matters but struggle to adopt it strategically.",
      ar: "تدرك المؤسسات أهمية الذكاء الاصطناعي لكنها تعجز عن تبنّيه استراتيجيًا.",
    },
    solution: {
      en: "A clear AI roadmap, prioritized use cases and a governance framework.",
      ar: "خارطة طريق واضحة للذكاء الاصطناعي وحالات استخدام مُرتّبة وإطار حوكمة.",
    },
    outcome: {
      en: "Measurable productivity gains and a future-ready organization.",
      ar: "مكاسب إنتاجية قابلة للقياس ومؤسسة جاهزة للمستقبل.",
    },
  },
  {
    slug: "ai-workflow-design",
    icon: "Workflow",
    title: { en: "AI Workflow Design", ar: "تصميم سير عمل الذكاء الاصطناعي" },
    challenge: {
      en: "Teams waste hours on repetitive tasks that AI could handle.",
      ar: "تهدر الفرق ساعات في مهام متكررة يمكن للذكاء الاصطناعي إنجازها.",
    },
    solution: {
      en: "Custom AI workflows and automations mapped to real processes.",
      ar: "سير عمل وأتمتة مخصصة مرتبطة بالعمليات الفعلية.",
    },
    outcome: {
      en: "Hours saved every week and consistent quality.",
      ar: "توفير ساعات أسبوعيًا وجودة متسقة.",
    },
  },
  {
    slug: "marketing-strategy",
    icon: "Target",
    title: { en: "Marketing Strategy", ar: "استراتيجية التسويق" },
    challenge: {
      en: "Marketing spend without clear positioning or measurable return.",
      ar: "إنفاق تسويقي دون تموضع واضح أو عائد قابل للقياس.",
    },
    solution: {
      en: "A focused strategy: positioning, channels, messaging and KPIs.",
      ar: "استراتيجية مركّزة: التموضع والقنوات والرسائل ومؤشرات الأداء.",
    },
    outcome: {
      en: "Clear direction and a measurable growth engine.",
      ar: "اتجاه واضح ومحرك نمو قابل للقياس.",
    },
  },
  {
    slug: "sales-development",
    icon: "LineChart",
    title: { en: "Sales Development", ar: "تطوير المبيعات" },
    challenge: {
      en: "Inconsistent sales results and no repeatable process.",
      ar: "نتائج مبيعات غير متسقة وغياب عملية قابلة للتكرار.",
    },
    solution: {
      en: "A structured sales system, playbooks and team enablement.",
      ar: "نظام مبيعات منظم وأدلة عمل وتمكين للفريق.",
    },
    outcome: {
      en: "Predictable pipeline and higher conversion.",
      ar: "خط مبيعات متوقع ومعدلات تحويل أعلى.",
    },
  },
  {
    slug: "business-growth",
    icon: "TrendingUp",
    title: { en: "Business Growth Consulting", ar: "استشارات نمو الأعمال" },
    challenge: {
      en: "Growth has plateaued and priorities are unclear.",
      ar: "توقّف النمو وتشوّشت الأولويات.",
    },
    solution: {
      en: "A growth diagnosis and prioritized action plan.",
      ar: "تشخيص للنمو وخطة عمل مُرتّبة بالأولويات.",
    },
    outcome: {
      en: "Renewed momentum and focused execution.",
      ar: "زخم متجدد وتنفيذ مُركّز.",
    },
  },
  {
    slug: "customer-journey",
    icon: "Route",
    title: { en: "Customer Journey Development", ar: "تطوير رحلة العميل" },
    challenge: {
      en: "Disconnected touchpoints hurt experience and retention.",
      ar: "نقاط تواصل مفككة تضر بالتجربة والاحتفاظ.",
    },
    solution: {
      en: "An end-to-end journey design with clear ownership.",
      ar: "تصميم رحلة متكامل مع مسؤوليات واضحة.",
    },
    outcome: {
      en: "Smoother experiences and higher loyalty.",
      ar: "تجارب أكثر سلاسة وولاء أعلى.",
    },
  },
  {
    slug: "corporate-dashboards",
    icon: "LayoutDashboard",
    title: { en: "Corporate Dashboards", ar: "لوحات المعلومات المؤسسية" },
    challenge: {
      en: "Decisions made without timely, reliable data.",
      ar: "قرارات تُتخذ دون بيانات موثوقة وفي الوقت المناسب.",
    },
    solution: {
      en: "Tailored dashboards that surface the metrics that matter.",
      ar: "لوحات مخصصة تُبرز المؤشرات المهمة.",
    },
    outcome: {
      en: "Faster, data-driven decisions.",
      ar: "قرارات أسرع ومبنية على البيانات.",
    },
  },
  {
    slug: "automation-strategy",
    icon: "Cog",
    title: { en: "Automation Strategy", ar: "استراتيجية الأتمتة" },
    challenge: {
      en: "Manual processes slow the business and introduce errors.",
      ar: "العمليات اليدوية تبطئ العمل وتُدخل الأخطاء.",
    },
    solution: {
      en: "An automation roadmap prioritized by impact and effort.",
      ar: "خارطة طريق للأتمتة مُرتّبة حسب الأثر والجهد.",
    },
    outcome: {
      en: "Lower cost, fewer errors, more capacity.",
      ar: "تكلفة أقل وأخطاء أقل وطاقة أكبر.",
    },
  },
  {
    slug: "employee-productivity",
    icon: "Zap",
    title: { en: "Employee Productivity Systems", ar: "أنظمة إنتاجية الموظفين" },
    challenge: {
      en: "Teams are busy but not productive or aligned.",
      ar: "الفرق مشغولة لكنها غير منتجة أو متوائمة.",
    },
    solution: {
      en: "Productivity systems, tools and AI-assisted workflows.",
      ar: "أنظمة إنتاجية وأدوات وسير عمل مدعوم بالذكاء الاصطناعي.",
    },
    outcome: {
      en: "More output with less friction.",
      ar: "إنتاج أكبر باحتكاك أقل.",
    },
  },
  {
    slug: "lead-generation",
    icon: "Magnet",
    title: { en: "Lead Generation Systems", ar: "أنظمة توليد العملاء" },
    challenge: {
      en: "Not enough qualified leads reaching the sales team.",
      ar: "عدد غير كافٍ من العملاء المؤهلين يصل لفريق المبيعات.",
    },
    solution: {
      en: "A repeatable lead-gen engine across the right channels.",
      ar: "محرك توليد عملاء قابل للتكرار عبر القنوات المناسبة.",
    },
    outcome: {
      en: "A steady flow of qualified opportunities.",
      ar: "تدفق ثابت من الفرص المؤهلة.",
    },
  },
  {
    slug: "digital-marketing",
    icon: "Globe",
    title: { en: "Digital Marketing Consulting", ar: "استشارات التسويق الرقمي" },
    challenge: {
      en: "Digital channels underperforming or poorly integrated.",
      ar: "أداء ضعيف أو تكامل ضعيف للقنوات الرقمية.",
    },
    solution: {
      en: "An integrated digital strategy with clear measurement.",
      ar: "استراتيجية رقمية متكاملة مع قياس واضح.",
    },
    outcome: {
      en: "Better reach, engagement and ROI.",
      ar: "وصول وتفاعل وعائد أفضل.",
    },
  },
  {
    slug: "training-department",
    icon: "GraduationCap",
    title: { en: "Training Department Development", ar: "تطوير إدارة التدريب" },
    challenge: {
      en: "Training is ad-hoc, unmeasured and disconnected from goals.",
      ar: "التدريب عشوائي وغير مُقاس وبعيد عن الأهداف.",
    },
    solution: {
      en: "A structured L&D function with needs analysis and measurement.",
      ar: "وظيفة تعلّم وتطوير منظمة مع تحليل الاحتياجات والقياس.",
    },
    outcome: {
      en: "Training that delivers real business results.",
      ar: "تدريب يحقق نتائج أعمال حقيقية.",
    },
  },
];

/** Corporate training delivery formats. */
export const trainingFormats: { icon: string; label: Localized }[] = [
  { icon: "Building2", label: { en: "In-house Corporate Training", ar: "تدريب مؤسسي داخلي" } },
  { icon: "Video", label: { en: "Online Live Training", ar: "تدريب أونلاين مباشر" } },
  { icon: "UserCog", label: { en: "Private Executive Sessions", ar: "جلسات تنفيذية خاصة" } },
  { icon: "Presentation", label: { en: "Public Workshops", ar: "ورش عمل عامة" } },
  { icon: "Settings2", label: { en: "Customized Programs", ar: "برامج مخصصة" } },
  { icon: "ClipboardList", label: { en: "Training Needs Analysis", ar: "تحليل الاحتياجات التدريبية" } },
  { icon: "MessageSquare", label: { en: "Post-training Consultation", ar: "استشارة بعد التدريب" } },
  { icon: "LayoutDashboard", label: { en: "Team Dashboards & AI Workflows", ar: "لوحات الفرق وسير عمل الذكاء الاصطناعي" } },
];

/** Customization dimensions. */
export const customizationFactors: Localized[] = [
  { en: "Company industry", ar: "قطاع الشركة" },
  { en: "Team size", ar: "حجم الفريق" },
  { en: "Business objectives", ar: "أهداف العمل" },
  { en: "Employee roles", ar: "أدوار الموظفين" },
  { en: "Current challenges", ar: "التحديات الحالية" },
  { en: "Required practical projects", ar: "المشاريع العملية المطلوبة" },
];
