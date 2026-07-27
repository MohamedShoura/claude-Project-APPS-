import type { Localized } from "@/i18n/types";

/**
 * Testimonials — ALL PLACEHOLDER content, clearly labelled. Replace with
 * verified quotes and real participant details before publishing.
 */
export interface Testimonial {
  id: string;
  name: Localized;
  position: Localized;
  company: Localized;
  country: Localized;
  photo: string;
  program: Localized;
  quote: Localized;
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: { en: "Participant Placeholder", ar: "مشارك مؤقت" },
    position: { en: "Sales Director", ar: "مدير مبيعات" },
    company: { en: "Company Placeholder", ar: "شركة مؤقتة" },
    country: { en: "UAE", ar: "الإمارات" },
    photo: "/images/testimonials/avatar-1.svg",
    program: { en: "AI for Sales", ar: "الذكاء الاصطناعي للمبيعات" },
    quote: {
      en: "[Placeholder testimonial — a clear, practical program that our team could apply immediately. To be replaced with a verified quote.]",
      ar: "[شهادة مؤقتة — برنامج واضح وعملي استطاع فريقنا تطبيقه فورًا. سيتم استبدالها بشهادة مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    id: "t2",
    name: { en: "Participant Placeholder", ar: "مشارك مؤقت" },
    position: { en: "HR Manager", ar: "مدير موارد بشرية" },
    company: { en: "Company Placeholder", ar: "شركة مؤقتة" },
    country: { en: "Qatar", ar: "قطر" },
    photo: "/images/testimonials/avatar-2.svg",
    program: { en: "AI for HR", ar: "الذكاء الاصطناعي للموارد البشرية" },
    quote: {
      en: "[Placeholder testimonial — genuinely changed how our department works with AI. To be replaced with a verified quote.]",
      ar: "[شهادة مؤقتة — غيّرت فعليًا طريقة عمل إدارتنا مع الذكاء الاصطناعي. سيتم استبدالها بشهادة مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    id: "t3",
    name: { en: "Participant Placeholder", ar: "مشارك مؤقت" },
    position: { en: "Marketing Lead", ar: "قائد تسويق" },
    company: { en: "Company Placeholder", ar: "شركة مؤقتة" },
    country: { en: "Saudi Arabia", ar: "السعودية" },
    photo: "/images/testimonials/avatar-3.svg",
    program: { en: "AI for Marketing", ar: "الذكاء الاصطناعي للتسويق" },
    quote: {
      en: "[Placeholder testimonial — practical, engaging and full of real-world examples. To be replaced with a verified quote.]",
      ar: "[شهادة مؤقتة — عملي وممتع ومليء بأمثلة واقعية. سيتم استبدالها بشهادة مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    id: "t4",
    name: { en: "Participant Placeholder", ar: "مشارك مؤقت" },
    position: { en: "General Manager", ar: "مدير عام" },
    company: { en: "Company Placeholder", ar: "شركة مؤقتة" },
    country: { en: "Egypt", ar: "مصر" },
    photo: "/images/testimonials/avatar-4.svg",
    program: { en: "AI for Managers", ar: "الذكاء الاصطناعي للمديرين" },
    quote: {
      en: "[Placeholder testimonial — gave our leadership a clear roadmap for AI. To be replaced with a verified quote.]",
      ar: "[شهادة مؤقتة — منح قيادتنا خارطة طريق واضحة للذكاء الاصطناعي. سيتم استبدالها بشهادة مُعتمدة.]",
    },
    placeholder: true,
  },
  {
    id: "t5",
    name: { en: "Participant Placeholder", ar: "مشارك مؤقت" },
    position: { en: "Operations Head", ar: "رئيس عمليات" },
    company: { en: "Company Placeholder", ar: "شركة مؤقتة" },
    country: { en: "Kuwait", ar: "الكويت" },
    photo: "/images/testimonials/avatar-5.svg",
    program: { en: "Claude for Business", ar: "Claude للأعمال" },
    quote: {
      en: "[Placeholder testimonial — one of the most useful trainings we've attended. To be replaced with a verified quote.]",
      ar: "[شهادة مؤقتة — من أكثر التدريبات فائدة التي حضرناها. سيتم استبدالها بشهادة مُعتمدة.]",
    },
    placeholder: true,
  },
];
