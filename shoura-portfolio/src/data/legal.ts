import type { Localized } from "@/i18n/types";

export interface LegalSection {
  heading: Localized;
  body: Localized;
}

export const privacyPolicy: LegalSection[] = [
  {
    heading: { en: "Introduction", ar: "مقدمة" },
    body: {
      en: "This Privacy Policy explains how information submitted through this website is collected and used. This is placeholder legal text and should be reviewed by a qualified professional before publication.",
      ar: "توضح سياسة الخصوصية هذه كيفية جمع واستخدام المعلومات المقدمة عبر هذا الموقع. هذا نص قانوني مؤقت ويجب مراجعته من قبل مختص قبل النشر.",
    },
  },
  {
    heading: { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
    body: {
      en: "When you submit the contact or booking form, we collect the details you provide (such as name, company, email and phone) solely to respond to your request.",
      ar: "عند إرسال نموذج التواصل أو الحجز، نجمع التفاصيل التي تقدمها (مثل الاسم والشركة والبريد والهاتف) فقط للرد على طلبك.",
    },
  },
  {
    heading: { en: "How We Use Information", ar: "كيف نستخدم المعلومات" },
    body: {
      en: "Information is used to respond to inquiries, prepare proposals and provide requested services. We do not sell your personal data.",
      ar: "تُستخدم المعلومات للرد على الاستفسارات وإعداد العروض وتقديم الخدمات المطلوبة. نحن لا نبيع بياناتك الشخصية.",
    },
  },
  {
    heading: { en: "Data Security", ar: "أمن البيانات" },
    body: {
      en: "We take reasonable measures to protect submitted information. However, no online transmission is completely secure.",
      ar: "نتخذ تدابير معقولة لحماية المعلومات المقدمة. ومع ذلك، لا يوجد نقل إلكتروني آمن تمامًا.",
    },
  },
  {
    heading: { en: "Contact", ar: "التواصل" },
    body: {
      en: "For any privacy-related questions, please contact us through the details provided on the Contact page.",
      ar: "لأي أسئلة تتعلق بالخصوصية، يرجى التواصل معنا عبر التفاصيل الموجودة في صفحة التواصل.",
    },
  },
];

export const termsAndConditions: LegalSection[] = [
  {
    heading: { en: "Acceptance of Terms", ar: "قبول الشروط" },
    body: {
      en: "By using this website you agree to these Terms & Conditions. This is placeholder legal text and should be reviewed by a qualified professional before publication.",
      ar: "باستخدامك لهذا الموقع فإنك توافق على هذه الشروط والأحكام. هذا نص قانوني مؤقت ويجب مراجعته من قبل مختص قبل النشر.",
    },
  },
  {
    heading: { en: "Use of Content", ar: "استخدام المحتوى" },
    body: {
      en: "All content on this website is provided for informational purposes. Training and program details may change and are confirmed at the time of engagement.",
      ar: "يُقدَّم كل المحتوى على هذا الموقع لأغراض إعلامية. قد تتغير تفاصيل التدريب والبرامج وتُؤكَّد عند التعاقد.",
    },
  },
  {
    heading: { en: "Intellectual Property", ar: "الملكية الفكرية" },
    body: {
      en: "Program materials, branding and content are the property of their respective owners and may not be reproduced without permission.",
      ar: "تُعدّ مواد البرامج والعلامات والمحتوى ملكًا لأصحابها ولا يجوز نسخها دون إذن.",
    },
  },
  {
    heading: { en: "Limitation of Liability", ar: "حدود المسؤولية" },
    body: {
      en: "The website is provided \"as is\" without warranties of any kind. We are not liable for any damages arising from use of the site.",
      ar: "يُقدَّم الموقع «كما هو» دون أي ضمانات. لسنا مسؤولين عن أي أضرار ناتجة عن استخدام الموقع.",
    },
  },
  {
    heading: { en: "Governing Law", ar: "القانون الحاكم" },
    body: {
      en: "These terms are governed by applicable local laws. Any disputes will be handled in accordance with those laws.",
      ar: "تخضع هذه الشروط للقوانين المحلية المعمول بها. وتُعالج أي نزاعات وفقًا لتلك القوانين.",
    },
  },
];
