import type { Locale } from "./types";

/**
 * Central dictionary of UI strings (labels, buttons, section titles).
 * Page & data content lives in `src/data/*`. Add a key here to translate
 * any interface text without touching components.
 */
export const dictionary = {
  // ---- Navigation ----
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "نبذة" },
  "nav.expertise": { en: "Expertise", ar: "مجالات الخبرة" },
  "nav.programs": { en: "Training Programs", ar: "البرامج التدريبية" },
  "nav.consulting": { en: "Consulting", ar: "الاستشارات" },
  "nav.experience": { en: "Experience", ar: "الخبرات" },
  "nav.clients": { en: "Clients", ar: "العملاء" },
  "nav.testimonials": { en: "Testimonials", ar: "آراء العملاء" },
  "nav.media": { en: "Media", ar: "المعرض" },
  "nav.caseStudies": { en: "Case Studies", ar: "دراسات الحالة" },
  "nav.blog": { en: "Insights", ar: "المقالات" },
  "nav.contact": { en: "Contact", ar: "تواصل" },

  // ---- Global CTAs ----
  "cta.book": { en: "Book a Consultation", ar: "احجز استشارة" },
  "cta.explorePrograms": {
    en: "Explore Training Programs",
    ar: "استكشف البرامج التدريبية",
  },
  "cta.requestTraining": {
    en: "Request Corporate Training",
    ar: "اطلب تدريبًا مؤسسيًا",
  },
  "cta.requestProposal": {
    en: "Request a Customized Training Proposal",
    ar: "اطلب عرض تدريب مخصص",
  },
  "cta.viewProgram": { en: "View Program", ar: "عرض البرنامج" },
  "cta.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
  "cta.readMore": { en: "Read More", ar: "اقرأ المزيد" },
  "cta.viewAll": { en: "View All", ar: "عرض الكل" },
  "cta.downloadProfile": { en: "Download Profile", ar: "تحميل الملف التعريفي" },
  "cta.viewExperience": { en: "View Experience", ar: "استعرض الخبرات" },
  "cta.contactShoura": { en: "Contact Mohamed", ar: "تواصل مع محمد" },
  "cta.viewCaseStudy": { en: "View Case Study", ar: "عرض دراسة الحالة" },
  "cta.getInTouch": { en: "Get in Touch", ar: "تواصل معنا" },
  "cta.backHome": { en: "Back to Home", ar: "العودة للرئيسية" },
  "cta.backToPrograms": { en: "All Programs", ar: "كل البرامج" },
  "cta.backToCaseStudies": { en: "All Case Studies", ar: "كل دراسات الحالة" },
  "cta.backToBlog": { en: "All Articles", ar: "كل المقالات" },

  // ---- Language ----
  "lang.switch": { en: "العربية", ar: "English" },
  "lang.label": { en: "Language", ar: "اللغة" },

  // ---- Section headings ----
  "section.about.eyebrow": { en: "About", ar: "نبذة" },
  "section.about.title": {
    en: "About Dr. Mohamed Shoura",
    ar: "عن د. محمد شورى",
  },
  "section.expertise.eyebrow": { en: "Expertise", ar: "الخبرات" },
  "section.expertise.title": { en: "Areas of Expertise", ar: "مجالات الخبرة" },
  "section.expertise.subtitle": {
    en: "Deep, practical specializations spanning artificial intelligence, marketing, sales and business transformation.",
    ar: "تخصصات عملية وعميقة تشمل الذكاء الاصطناعي والتسويق والمبيعات والتحول المؤسسي.",
  },
  "section.programs.eyebrow": { en: "Training", ar: "التدريب" },
  "section.programs.title": {
    en: "Featured Training Programs",
    ar: "أبرز البرامج التدريبية",
  },
  "section.programs.subtitle": {
    en: "Corporate-ready programs designed to deliver measurable business outcomes.",
    ar: "برامج جاهزة للمؤسسات مصممة لتحقيق نتائج أعمال قابلة للقياس.",
  },
  "section.training.eyebrow": { en: "Delivery", ar: "التنفيذ" },
  "section.training.title": {
    en: "Corporate Training Solutions",
    ar: "حلول التدريب المؤسسي",
  },
  "section.training.subtitle": {
    en: "Flexible formats, fully tailored to your team, industry and objectives.",
    ar: "صيغ مرنة، مصممة بالكامل حسب فريقك وقطاعك وأهدافك.",
  },
  "section.consulting.eyebrow": { en: "Consulting", ar: "الاستشارات" },
  "section.consulting.title": {
    en: "Consulting Services",
    ar: "الخدمات الاستشارية",
  },
  "section.consulting.subtitle": {
    en: "Strategic advisory that turns AI and marketing into real growth.",
    ar: "استشارات استراتيجية تحوّل الذكاء الاصطناعي والتسويق إلى نمو حقيقي.",
  },
  "section.experience.eyebrow": { en: "Global Reach", ar: "حضور عالمي" },
  "section.experience.title": {
    en: "International Experience",
    ar: "الخبرة الدولية",
  },
  "section.experience.subtitle": {
    en: "Delivering impact across the GCC, Africa and international markets.",
    ar: "أثر ملموس عبر الخليج وأفريقيا والأسواق الدولية.",
  },
  "section.companies.eyebrow": { en: "Ventures", ar: "المؤسسات" },
  "section.companies.title": {
    en: "Companies & Brands",
    ar: "الشركات والعلامات",
  },
  "section.clients.eyebrow": { en: "Trust", ar: "ثقة" },
  "section.clients.title": { en: "Clients & Partners", ar: "العملاء والشركاء" },
  "section.clients.statement": {
    en: "Trusted by organizations and professionals across the GCC, Africa and international markets.",
    ar: "موضع ثقة المؤسسات والمحترفين عبر الخليج وأفريقيا والأسواق الدولية.",
  },
  "section.caseStudies.eyebrow": { en: "Results", ar: "النتائج" },
  "section.caseStudies.title": { en: "Case Studies", ar: "دراسات الحالة" },
  "section.caseStudies.subtitle": {
    en: "Real transformation journeys and the outcomes they delivered.",
    ar: "رحلات تحول حقيقية والنتائج التي حققتها.",
  },
  "section.testimonials.eyebrow": { en: "Voices", ar: "شهادات" },
  "section.testimonials.title": {
    en: "What Participants Say",
    ar: "ماذا يقول المشاركون",
  },
  "section.media.eyebrow": { en: "Gallery", ar: "المعرض" },
  "section.media.title": { en: "Media & Gallery", ar: "الوسائط والمعرض" },
  "section.media.subtitle": {
    en: "Moments from training sessions, workshops and speaking engagements.",
    ar: "لحظات من الجلسات التدريبية وورش العمل والمحاضرات.",
  },
  "section.blog.eyebrow": { en: "Insights", ar: "رؤى" },
  "section.blog.title": { en: "Insights & Articles", ar: "رؤى ومقالات" },
  "section.blog.subtitle": {
    en: "Perspectives on AI, business growth, marketing and leadership.",
    ar: "رؤى حول الذكاء الاصطناعي ونمو الأعمال والتسويق والقيادة.",
  },
  "section.contact.eyebrow": { en: "Contact", ar: "تواصل" },
  "section.contact.title": { en: "Let's Work Together", ar: "لنعمل معًا" },
  "section.booking.eyebrow": { en: "Booking", ar: "الحجز" },
  "section.booking.title": {
    en: "Book a Consultation",
    ar: "احجز استشارة",
  },
  "section.booking.subtitle": {
    en: "Tell us about your goals and we'll craft a tailored proposal.",
    ar: "أخبرنا بأهدافك وسنعدّ لك عرضًا مخصصًا.",
  },

  // ---- Program details ----
  "program.category": { en: "Category", ar: "الفئة" },
  "program.audience": { en: "Target Audience", ar: "الجمهور المستهدف" },
  "program.formats": { en: "Delivery Formats", ar: "صيغ التنفيذ" },
  "program.duration": { en: "Duration", ar: "المدة" },
  "program.outcomes": { en: "Key Outcomes", ar: "المخرجات الرئيسية" },
  "program.modules": { en: "Program Modules", ar: "محاور البرنامج" },
  "program.overview": { en: "Overview", ar: "نظرة عامة" },
  "program.related": { en: "Related Programs", ar: "برامج ذات صلة" },
  "program.filter.all": { en: "All Programs", ar: "كل البرامج" },

  // ---- Case study details ----
  "case.client": { en: "Client / Industry", ar: "العميل / القطاع" },
  "case.challenge": { en: "The Challenge", ar: "التحدي" },
  "case.solution": { en: "The Solution", ar: "الحل" },
  "case.tools": { en: "Tools Used", ar: "الأدوات المستخدمة" },
  "case.approach": { en: "Implementation Approach", ar: "منهجية التنفيذ" },
  "case.result": { en: "Business Result", ar: "النتيجة" },
  "case.testimonial": { en: "Client Testimonial", ar: "شهادة العميل" },

  // ---- Consulting detail ----
  "consulting.challenge": { en: "Business Challenge", ar: "التحدي" },
  "consulting.solution": { en: "Proposed Solution", ar: "الحل المقترح" },
  "consulting.outcome": { en: "Expected Outcome", ar: "النتيجة المتوقعة" },

  // ---- Blog ----
  "blog.search": { en: "Search articles…", ar: "ابحث في المقالات…" },
  "blog.categories": { en: "Categories", ar: "التصنيفات" },
  "blog.all": { en: "All", ar: "الكل" },
  "blog.noResults": { en: "No articles found.", ar: "لا توجد مقالات." },
  "blog.readTime": { en: "min read", ar: "دقيقة قراءة" },
  "blog.share": { en: "Share", ar: "مشاركة" },
  "blog.related": { en: "Related Articles", ar: "مقالات ذات صلة" },
  "blog.published": { en: "Published", ar: "نُشر" },

  // ---- Forms ----
  "form.fullName": { en: "Full Name", ar: "الاسم الكامل" },
  "form.company": { en: "Company", ar: "الشركة" },
  "form.jobTitle": { en: "Job Title", ar: "المسمى الوظيفي" },
  "form.country": { en: "Country", ar: "الدولة" },
  "form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "form.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "form.service": { en: "Required Service", ar: "الخدمة المطلوبة" },
  "form.program": { en: "Preferred Training Program", ar: "البرنامج المفضل" },
  "form.participants": { en: "Number of Participants", ar: "عدد المشاركين" },
  "form.deliveryFormat": { en: "Delivery Format", ar: "صيغة التنفيذ" },
  "form.preferredDate": { en: "Preferred Date", ar: "التاريخ المفضل" },
  "form.message": { en: "Message", ar: "الرسالة" },
  "form.select": { en: "Please select…", ar: "اختر…" },
  "form.optional": { en: "optional", ar: "اختياري" },
  "form.submit": { en: "Send Request", ar: "إرسال الطلب" },
  "form.sending": { en: "Sending…", ar: "جارٍ الإرسال…" },
  "form.success": {
    en: "Thank you! Your request has been received. We'll be in touch shortly.",
    ar: "شكرًا لك! تم استلام طلبك وسنتواصل معك قريبًا.",
  },
  "form.error": {
    en: "Something went wrong. Please try again or contact us directly.",
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
  },
  "form.required": { en: "This field is required", ar: "هذا الحقل مطلوب" },
  "form.invalidEmail": {
    en: "Please enter a valid email",
    ar: "يرجى إدخال بريد إلكتروني صحيح",
  },

  // ---- Contact ----
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.phone": { en: "Phone", ar: "الهاتف" },
  "contact.offices": { en: "Office Locations", ar: "المكاتب" },
  "contact.hours": { en: "Working Hours", ar: "ساعات العمل" },
  "contact.whatsapp": { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" },
  "contact.follow": { en: "Follow", ar: "تابعنا" },

  // ---- Footer ----
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.programs": { en: "Training Programs", ar: "البرامج التدريبية" },
  "footer.consulting": { en: "Consulting", ar: "الاستشارات" },
  "footer.legal": { en: "Legal", ar: "قانوني" },
  "footer.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.tagline": {
    en: "Empowering businesses and professionals through AI, marketing and business innovation.",
    ar: "تمكين الشركات والمحترفين عبر الذكاء الاصطناعي والتسويق وابتكار الأعمال.",
  },

  // ---- Misc / states ----
  "common.placeholder": {
    en: "Placeholder content — to be replaced with verified material.",
    ar: "محتوى مؤقت — سيتم استبداله بمحتوى مُعتمد.",
  },
  "common.backToTop": { en: "Back to top", ar: "العودة للأعلى" },
  "common.menu": { en: "Menu", ar: "القائمة" },
  "common.close": { en: "Close", ar: "إغلاق" },
  "404.title": { en: "Page Not Found", ar: "الصفحة غير موجودة" },
  "404.subtitle": {
    en: "The page you're looking for doesn't exist or has been moved.",
    ar: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
  },
} as const;

export type DictionaryKey = keyof typeof dictionary;

export function translate(key: DictionaryKey, locale: Locale): string {
  const entry = dictionary[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en;
}
