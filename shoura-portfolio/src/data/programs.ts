import type { Localized, LocalizedList } from "@/i18n/types";

export type ProgramCategory =
  | "ai"
  | "marketing"
  | "sales"
  | "management"
  | "hr"
  | "finance"
  | "cx";

export interface ProgramCategoryMeta {
  key: ProgramCategory;
  label: Localized;
}

export const programCategories: ProgramCategoryMeta[] = [
  { key: "ai", label: { en: "AI Programs", ar: "برامج الذكاء الاصطناعي" } },
  { key: "marketing", label: { en: "Marketing", ar: "التسويق" } },
  { key: "sales", label: { en: "Sales", ar: "المبيعات" } },
  { key: "management", label: { en: "Management", ar: "الإدارة" } },
  { key: "hr", label: { en: "HR", ar: "الموارد البشرية" } },
  { key: "finance", label: { en: "Finance", ar: "المالية" } },
  { key: "cx", label: { en: "Customer Experience", ar: "تجربة العملاء" } },
];

export interface Program {
  slug: string;
  icon: string;
  category: ProgramCategory;
  featured: boolean;
  title: Localized;
  overview: Localized;
  audience: Localized;
  formats: LocalizedList;
  duration: Localized;
  outcomes: LocalizedList;
  modules: LocalizedList;
}

const commonFormats: LocalizedList = {
  en: ["In-house", "Online Live", "Public Workshop", "Executive Session"],
  ar: ["داخل المؤسسة", "أونلاين مباشر", "ورشة عامة", "جلسة تنفيذية"],
};

export const programs: Program[] = [
  {
    slug: "claude-for-business",
    icon: "Sparkles",
    category: "ai",
    featured: true,
    title: { en: "Claude for Business", ar: "Claude للأعمال" },
    overview: {
      en: "A hands-on program to deploy Claude and generative AI safely and productively across business teams, with real workflows and prompt engineering.",
      ar: "برنامج تطبيقي لتوظيف Claude والذكاء الاصطناعي التوليدي بأمان وإنتاجية عبر فرق العمل، مع سير عمل حقيقي وهندسة الأوامر.",
    },
    audience: {
      en: "Managers, teams and knowledge workers adopting AI.",
      ar: "المديرون والفرق وموظفو المعرفة الذين يتبنون الذكاء الاصطناعي.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Confidently use Claude for daily work",
        "Build reusable prompts and workflows",
        "Apply AI safely with clear governance",
      ],
      ar: [
        "استخدام Claude بثقة في العمل اليومي",
        "بناء أوامر وسير عمل قابلة لإعادة الاستخدام",
        "تطبيق الذكاء الاصطناعي بأمان وحوكمة واضحة",
      ],
    },
    modules: {
      en: [
        "Foundations of generative AI",
        "Prompt engineering essentials",
        "Business workflows & automation",
        "Governance, safety & ethics",
      ],
      ar: [
        "أساسيات الذكاء الاصطناعي التوليدي",
        "أساسيات هندسة الأوامر",
        "سير عمل الأعمال والأتمتة",
        "الحوكمة والأمان والأخلاقيات",
      ],
    },
  },
  {
    slug: "ai-for-sales",
    icon: "TrendingUp",
    category: "sales",
    featured: true,
    title: { en: "AI for Sales", ar: "الذكاء الاصطناعي للمبيعات" },
    overview: {
      en: "Equip sales teams to prospect, qualify and close faster using AI-assisted research, messaging and pipeline management.",
      ar: "تمكين فرق المبيعات من الاستكشاف والتأهيل والإغلاق بشكل أسرع عبر البحث والرسائل وإدارة خط المبيعات المدعومة بالذكاء الاصطناعي.",
    },
    audience: {
      en: "Sales teams, account managers and sales leaders.",
      ar: "فرق المبيعات ومديرو الحسابات وقادة المبيعات.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Automate prospecting and research",
        "Personalize outreach at scale",
        "Shorten the sales cycle",
      ],
      ar: [
        "أتمتة الاستكشاف والبحث",
        "تخصيص التواصل على نطاق واسع",
        "تقصير دورة المبيعات",
      ],
    },
    modules: {
      en: [
        "AI prospecting & lead research",
        "AI-assisted outreach & messaging",
        "Pipeline & CRM productivity",
        "Objection handling with AI",
      ],
      ar: [
        "الاستكشاف والبحث عن العملاء بالذكاء الاصطناعي",
        "التواصل والرسائل المدعومة بالذكاء الاصطناعي",
        "إنتاجية خط المبيعات وإدارة العلاقات",
        "معالجة الاعتراضات بالذكاء الاصطناعي",
      ],
    },
  },
  {
    slug: "ai-for-marketing",
    icon: "Megaphone",
    category: "marketing",
    featured: true,
    title: { en: "AI for Marketing", ar: "الذكاء الاصطناعي للتسويق" },
    overview: {
      en: "Transform marketing productivity with generative AI for content, campaigns, SEO and personalization.",
      ar: "حوّل إنتاجية التسويق بالذكاء الاصطناعي التوليدي للمحتوى والحملات وتحسين محركات البحث والتخصيص.",
    },
    audience: {
      en: "Marketing teams, content creators and brand managers.",
      ar: "فرق التسويق وصنّاع المحتوى ومديرو العلامات.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Produce quality content faster",
        "Run smarter, targeted campaigns",
        "Lower cost per result",
      ],
      ar: [
        "إنتاج محتوى عالي الجودة بشكل أسرع",
        "تشغيل حملات أذكى وأكثر استهدافًا",
        "خفض تكلفة النتيجة",
      ],
    },
    modules: {
      en: [
        "AI content creation",
        "Campaign ideation & planning",
        "SEO & analytics with AI",
        "Personalization at scale",
      ],
      ar: [
        "إنشاء المحتوى بالذكاء الاصطناعي",
        "توليد أفكار الحملات وتخطيطها",
        "تحسين محركات البحث والتحليلات بالذكاء الاصطناعي",
        "التخصيص على نطاق واسع",
      ],
    },
  },
  {
    slug: "ai-for-hr",
    icon: "Users",
    category: "hr",
    featured: true,
    title: { en: "AI for HR", ar: "الذكاء الاصطناعي للموارد البشرية" },
    overview: {
      en: "Modernize HR with AI for hiring, onboarding, policy drafting and people analytics.",
      ar: "حدّث الموارد البشرية بالذكاء الاصطناعي للتوظيف والتأهيل وصياغة السياسات وتحليلات الموظفين.",
    },
    audience: {
      en: "HR professionals, recruiters and people managers.",
      ar: "متخصصو الموارد البشرية والموظفون ومديرو الأفراد.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Cut administrative workload",
        "Improve candidate screening",
        "Draft policies and communications faster",
      ],
      ar: [
        "تقليل العبء الإداري",
        "تحسين فرز المرشحين",
        "صياغة السياسات والمراسلات بشكل أسرع",
      ],
    },
    modules: {
      en: [
        "AI in recruitment & screening",
        "Onboarding & training content",
        "HR policy & document drafting",
        "People analytics basics",
      ],
      ar: [
        "الذكاء الاصطناعي في التوظيف والفرز",
        "محتوى التأهيل والتدريب",
        "صياغة سياسات ووثائق الموارد البشرية",
        "أساسيات تحليلات الموظفين",
      ],
    },
  },
  {
    slug: "ai-for-finance",
    icon: "Calculator",
    category: "finance",
    featured: true,
    title: { en: "AI for Finance", ar: "الذكاء الاصطناعي للمالية" },
    overview: {
      en: "Apply AI to forecasting, reporting, analysis and financial communication for faster, sharper decisions.",
      ar: "طبّق الذكاء الاصطناعي على التنبؤ والتقارير والتحليل والتواصل المالي لقرارات أسرع وأدق.",
    },
    audience: {
      en: "Finance teams, analysts and controllers.",
      ar: "فرق المالية والمحللون والمراقبون الماليون.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Automate routine analysis",
        "Generate clear financial narratives",
        "Speed up reporting cycles",
      ],
      ar: [
        "أتمتة التحليلات الروتينية",
        "إنشاء سرد مالي واضح",
        "تسريع دورات إعداد التقارير",
      ],
    },
    modules: {
      en: [
        "AI for financial analysis",
        "Automated reporting",
        "Forecasting support",
        "Communicating numbers with AI",
      ],
      ar: [
        "الذكاء الاصطناعي للتحليل المالي",
        "التقارير الآلية",
        "دعم التنبؤ",
        "توصيل الأرقام بالذكاء الاصطناعي",
      ],
    },
  },
  {
    slug: "ai-for-customer-service",
    icon: "Headphones",
    category: "cx",
    featured: true,
    title: { en: "AI for Customer Service", ar: "الذكاء الاصطناعي لخدمة العملاء" },
    overview: {
      en: "Build AI-assisted support workflows that resolve issues faster and delight customers.",
      ar: "ابنِ سير عمل دعم مدعوم بالذكاء الاصطناعي يحل المشكلات أسرع ويُسعد العملاء.",
    },
    audience: {
      en: "Support teams, CX leaders and contact centers.",
      ar: "فرق الدعم وقادة تجربة العملاء ومراكز الاتصال.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Faster response and resolution",
        "Consistent, on-brand replies",
        "Higher customer satisfaction",
      ],
      ar: [
        "استجابة وحل أسرع",
        "ردود متسقة تعكس العلامة",
        "رضا أعلى للعملاء",
      ],
    },
    modules: {
      en: [
        "AI support assistants",
        "Knowledge base automation",
        "Tone & quality control",
        "Measuring CX impact",
      ],
      ar: [
        "مساعدو الدعم بالذكاء الاصطناعي",
        "أتمتة قاعدة المعرفة",
        "ضبط النبرة والجودة",
        "قياس أثر تجربة العملاء",
      ],
    },
  },
  {
    slug: "ai-for-managers",
    icon: "Briefcase",
    category: "management",
    featured: true,
    title: { en: "AI for Managers", ar: "الذكاء الاصطناعي للمديرين" },
    overview: {
      en: "Help managers lead AI adoption, make better decisions and boost team productivity responsibly.",
      ar: "ساعد المديرين على قيادة تبني الذكاء الاصطناعي واتخاذ قرارات أفضل ورفع إنتاجية الفريق بمسؤولية.",
    },
    audience: {
      en: "Team leads, managers and executives.",
      ar: "قادة الفرق والمديرون والتنفيذيون.",
    },
    formats: commonFormats,
    duration: { en: "1 day", ar: "يوم واحد" },
    outcomes: {
      en: [
        "Lead AI initiatives with confidence",
        "Identify high-value use cases",
        "Manage AI risk and change",
      ],
      ar: [
        "قيادة مبادرات الذكاء الاصطناعي بثقة",
        "تحديد حالات الاستخدام عالية القيمة",
        "إدارة مخاطر الذكاء الاصطناعي والتغيير",
      ],
    },
    modules: {
      en: [
        "The manager's AI playbook",
        "Use-case identification",
        "Team enablement",
        "Risk & change management",
      ],
      ar: [
        "دليل المدير للذكاء الاصطناعي",
        "تحديد حالات الاستخدام",
        "تمكين الفريق",
        "إدارة المخاطر والتغيير",
      ],
    },
  },
  {
    slug: "ai-for-content-creators",
    icon: "PenTool",
    category: "marketing",
    featured: false,
    title: { en: "AI for Content Creators", ar: "الذكاء الاصطناعي لصنّاع المحتوى" },
    overview: {
      en: "A creator-focused program on producing high-quality written, visual and video content with AI.",
      ar: "برنامج موجّه للمبدعين لإنتاج محتوى مكتوب ومرئي وفيديو عالي الجودة بالذكاء الاصطناعي.",
    },
    audience: {
      en: "Content creators, social media and creative teams.",
      ar: "صنّاع المحتوى وفرق التواصل الاجتماعي والإبداع.",
    },
    formats: commonFormats,
    duration: { en: "1 day", ar: "يوم واحد" },
    outcomes: {
      en: [
        "Create faster without losing quality",
        "Scale content across channels",
        "Develop a personal creative workflow",
      ],
      ar: [
        "إنشاء أسرع دون فقدان الجودة",
        "توسيع المحتوى عبر القنوات",
        "تطوير سير عمل إبداعي شخصي",
      ],
    },
    modules: {
      en: [
        "AI writing & ideation",
        "Visual & video with AI",
        "Repurposing content",
        "Building a content system",
      ],
      ar: [
        "الكتابة وتوليد الأفكار بالذكاء الاصطناعي",
        "الصور والفيديو بالذكاء الاصطناعي",
        "إعادة توظيف المحتوى",
        "بناء نظام محتوى",
      ],
    },
  },
  {
    slug: "ai-for-tourism",
    icon: "Plane",
    category: "ai",
    featured: false,
    title: { en: "AI for Tourism", ar: "الذكاء الاصطناعي للسياحة" },
    overview: {
      en: "Tailored AI applications for tourism and hospitality — from guest experience to operations and marketing.",
      ar: "تطبيقات ذكاء اصطناعي مخصصة للسياحة والضيافة — من تجربة الضيف إلى العمليات والتسويق.",
    },
    audience: {
      en: "Tourism, travel and hospitality professionals.",
      ar: "محترفو السياحة والسفر والضيافة.",
    },
    formats: commonFormats,
    duration: { en: "1 day", ar: "يوم واحد" },
    outcomes: {
      en: [
        "Enhance guest experiences",
        "Automate bookings and support",
        "Localize marketing with AI",
      ],
      ar: [
        "تحسين تجارب الضيوف",
        "أتمتة الحجوزات والدعم",
        "توطين التسويق بالذكاء الاصطناعي",
      ],
    },
    modules: {
      en: [
        "AI in guest experience",
        "Operations automation",
        "Tourism marketing with AI",
        "Multilingual support",
      ],
      ar: [
        "الذكاء الاصطناعي في تجربة الضيف",
        "أتمتة العمليات",
        "تسويق السياحة بالذكاء الاصطناعي",
        "الدعم متعدد اللغات",
      ],
    },
  },
  {
    slug: "marketing-psychology",
    icon: "Brain",
    category: "marketing",
    featured: false,
    title: { en: "Marketing Psychology", ar: "سيكولوجيا التسويق" },
    overview: {
      en: "Master the behavioral science behind persuasion, decision-making and brand loyalty.",
      ar: "أتقن علم السلوك وراء الإقناع واتخاذ القرار والولاء للعلامة.",
    },
    audience: {
      en: "Marketers, brand and sales professionals.",
      ar: "المسوّقون ومحترفو العلامة والمبيعات.",
    },
    formats: commonFormats,
    duration: { en: "1–2 days", ar: "يوم إلى يومين" },
    outcomes: {
      en: [
        "Craft messaging that converts",
        "Apply cognitive biases ethically",
        "Build lasting brand loyalty",
      ],
      ar: [
        "صياغة رسائل تحقق التحويل",
        "تطبيق التحيزات المعرفية بأخلاقية",
        "بناء ولاء دائم للعلامة",
      ],
    },
    modules: {
      en: [
        "Principles of persuasion",
        "Behavioral triggers",
        "Pricing psychology",
        "Loyalty & habit design",
      ],
      ar: [
        "مبادئ الإقناع",
        "المحفزات السلوكية",
        "سيكولوجيا التسعير",
        "تصميم الولاء والعادات",
      ],
    },
  },
  {
    slug: "customer-experience-masterclass",
    icon: "Heart",
    category: "cx",
    featured: false,
    title: { en: "Customer Experience Masterclass", ar: "ماستر كلاس تجربة العملاء" },
    overview: {
      en: "An end-to-end masterclass on designing, measuring and improving customer experience.",
      ar: "ماستر كلاس متكامل لتصميم وقياس وتحسين تجربة العملاء.",
    },
    audience: {
      en: "CX leaders, service and operations teams.",
      ar: "قادة تجربة العملاء وفرق الخدمة والعمليات.",
    },
    formats: commonFormats,
    duration: { en: "2 days", ar: "يومان" },
    outcomes: {
      en: [
        "Map and optimize customer journeys",
        "Measure CX with the right metrics",
        "Build a customer-centric culture",
      ],
      ar: [
        "رسم وتحسين رحلات العملاء",
        "قياس التجربة بالمقاييس الصحيحة",
        "بناء ثقافة تتمحور حول العميل",
      ],
    },
    modules: {
      en: [
        "Journey mapping",
        "Voice of customer",
        "CX metrics & measurement",
        "Culture & implementation",
      ],
      ar: [
        "رسم رحلة العميل",
        "صوت العميل",
        "مقاييس وقياس التجربة",
        "الثقافة والتنفيذ",
      ],
    },
  },
  {
    slug: "strategic-marketing-management",
    icon: "Target",
    category: "marketing",
    featured: false,
    title: { en: "Strategic Marketing Management", ar: "الإدارة الاستراتيجية للتسويق" },
    overview: {
      en: "Build and execute a marketing strategy that aligns with business goals and drives measurable growth.",
      ar: "ابنِ ونفّذ استراتيجية تسويق متوافقة مع أهداف العمل وتحقق نموًا قابلًا للقياس.",
    },
    audience: {
      en: "Marketing managers and business leaders.",
      ar: "مديرو التسويق وقادة الأعمال.",
    },
    formats: commonFormats,
    duration: { en: "2 days", ar: "يومان" },
    outcomes: {
      en: [
        "Develop a clear marketing strategy",
        "Align marketing with revenue goals",
        "Build a practical execution plan",
      ],
      ar: [
        "تطوير استراتيجية تسويق واضحة",
        "مواءمة التسويق مع أهداف الإيرادات",
        "بناء خطة تنفيذ عملية",
      ],
    },
    modules: {
      en: [
        "Market & competitor analysis",
        "Positioning & segmentation",
        "Marketing mix & budgeting",
        "Execution & measurement",
      ],
      ar: [
        "تحليل السوق والمنافسين",
        "التموضع والتقسيم",
        "المزيج التسويقي والميزانية",
        "التنفيذ والقياس",
      ],
    },
  },
  {
    slug: "ai-for-kids",
    icon: "GraduationCap",
    category: "ai",
    featured: false,
    title: { en: "AI for Kids", ar: "الذكاء الاصطناعي للأطفال" },
    overview: {
      en: "A safe, engaging introduction to AI for young learners — building creativity and future-ready skills.",
      ar: "مقدمة آمنة وممتعة للذكاء الاصطناعي للمتعلمين الصغار — لبناء الإبداع ومهارات المستقبل.",
    },
    audience: {
      en: "Students, schools and young learners.",
      ar: "الطلاب والمدارس والمتعلمون الصغار.",
    },
    formats: {
      en: ["In-house", "Online Live", "School Workshop"],
      ar: ["داخل المؤسسة", "أونلاين مباشر", "ورشة مدرسية"],
    },
    duration: { en: "Half day – 1 day", ar: "نصف يوم – يوم" },
    outcomes: {
      en: [
        "Understand AI concepts simply",
        "Use AI creatively and safely",
        "Build curiosity and confidence",
      ],
      ar: [
        "فهم مفاهيم الذكاء الاصطناعي ببساطة",
        "استخدام الذكاء الاصطناعي بإبداع وأمان",
        "بناء الفضول والثقة",
      ],
    },
    modules: {
      en: [
        "What is AI?",
        "Creative AI activities",
        "Staying safe with AI",
        "AI & the future",
      ],
      ar: [
        "ما هو الذكاء الاصطناعي؟",
        "أنشطة إبداعية بالذكاء الاصطناعي",
        "البقاء آمنًا مع الذكاء الاصطناعي",
        "الذكاء الاصطناعي والمستقبل",
      ],
    },
  },
  {
    slug: "ai-for-lawyers",
    icon: "Scale",
    category: "ai",
    featured: false,
    title: { en: "AI for Lawyers", ar: "الذكاء الاصطناعي للمحامين" },
    overview: {
      en: "Practical AI for legal professionals — research, drafting and document review with proper safeguards.",
      ar: "ذكاء اصطناعي عملي للمحترفين القانونيين — البحث والصياغة ومراجعة الوثائق مع الضوابط المناسبة.",
    },
    audience: {
      en: "Lawyers, legal teams and law firms.",
      ar: "المحامون والفرق القانونية ومكاتب المحاماة.",
    },
    formats: commonFormats,
    duration: { en: "1 day", ar: "يوم واحد" },
    outcomes: {
      en: [
        "Accelerate legal research",
        "Draft and review documents faster",
        "Apply AI within ethical limits",
      ],
      ar: [
        "تسريع البحث القانوني",
        "صياغة ومراجعة الوثائق بشكل أسرع",
        "تطبيق الذكاء الاصطناعي ضمن الحدود الأخلاقية",
      ],
    },
    modules: {
      en: [
        "Legal research with AI",
        "Document drafting & review",
        "Confidentiality & ethics",
        "Building legal AI workflows",
      ],
      ar: [
        "البحث القانوني بالذكاء الاصطناعي",
        "صياغة ومراجعة الوثائق",
        "السرية والأخلاقيات",
        "بناء سير عمل قانوني بالذكاء الاصطناعي",
      ],
    },
  },
  {
    slug: "ai-for-real-estate",
    icon: "Building2",
    category: "sales",
    featured: false,
    title: { en: "AI for Real Estate", ar: "الذكاء الاصطناعي للعقارات" },
    overview: {
      en: "AI applications for real estate — lead generation, listings, client communication and market analysis.",
      ar: "تطبيقات ذكاء اصطناعي للعقارات — توليد العملاء والقوائم والتواصل مع العملاء وتحليل السوق.",
    },
    audience: {
      en: "Real estate agents, brokers and developers.",
      ar: "وكلاء ووسطاء العقارات والمطورون.",
    },
    formats: commonFormats,
    duration: { en: "1 day", ar: "يوم واحد" },
    outcomes: {
      en: [
        "Generate and qualify leads faster",
        "Create compelling listings",
        "Analyze markets with AI",
      ],
      ar: [
        "توليد وتأهيل العملاء بشكل أسرع",
        "إنشاء قوائم عقارية جذابة",
        "تحليل الأسواق بالذكاء الاصطناعي",
      ],
    },
    modules: {
      en: [
        "AI lead generation",
        "Listing & content creation",
        "Client communication",
        "Market & pricing analysis",
      ],
      ar: [
        "توليد العملاء بالذكاء الاصطناعي",
        "إنشاء القوائم والمحتوى",
        "التواصل مع العملاء",
        "تحليل السوق والتسعير",
      ],
    },
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getFeaturedPrograms(): Program[] {
  return programs.filter((p) => p.featured);
}

export function getRelatedPrograms(program: Program, limit = 3): Program[] {
  return programs
    .filter((p) => p.slug !== program.slug && p.category === program.category)
    .slice(0, limit);
}
