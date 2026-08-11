import { LegalPage } from "@/components/shared/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      titleAr="الشروط والأحكام"
      titleEn="Terms & Conditions"
      sections={[
        {
          headingAr: "استخدام الموقع",
          headingEn: "Use of the Website",
          bodyAr: "باستخدامك لموقعنا فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين المعمول بها في جمهورية مصر العربية.",
          bodyEn: "By using our website, you agree to comply with these Terms & Conditions and all applicable laws in the Arab Republic of Egypt.",
        },
        {
          headingAr: "الأسعار والدفع",
          headingEn: "Pricing & Payment",
          bodyAr: "جميع الأسعار المعروضة بالجنيه المصري وشاملة الضريبة حيث ينطبق ذلك، ونحتفظ بحق تعديل الأسعار في أي وقت.",
          bodyEn: "All prices are listed in Egyptian Pounds (EGP) and are inclusive of tax where applicable. We reserve the right to modify prices at any time.",
        },
        {
          headingAr: "الملكية الفكرية",
          headingEn: "Intellectual Property",
          bodyAr: "جميع المحتويات والشعارات والصور الموجودة على الموقع هي ملك حصري لنا ولا يجوز استخدامها دون إذن كتابي مسبق.",
          bodyEn: "All content, logos, and images on this website are our exclusive property and may not be used without prior written permission.",
        },
      ]}
    />
  );
}
