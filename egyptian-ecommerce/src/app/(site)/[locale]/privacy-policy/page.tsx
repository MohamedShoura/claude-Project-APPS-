import { LegalPage } from "@/components/shared/LegalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      titleAr="سياسة الخصوصية"
      titleEn="Privacy Policy"
      sections={[
        {
          headingAr: "جمع البيانات",
          headingEn: "Data Collection",
          bodyAr: "نجمع فقط البيانات الضرورية لإتمام طلبك مثل الاسم، رقم الموبايل، والعنوان، ولا نشارك بياناتك مع أي طرف ثالث دون موافقتك.",
          bodyEn: "We only collect the data necessary to fulfill your order, such as name, mobile number, and address, and never share it with third parties without your consent.",
        },
        {
          headingAr: "أمان البيانات",
          headingEn: "Data Security",
          bodyAr: "نستخدم بروتوكولات تشفير حديثة لحماية معلوماتك الشخصية وبيانات الدفع أثناء عملية الشراء.",
          bodyEn: "We use modern encryption protocols to protect your personal information and payment data during checkout.",
        },
        {
          headingAr: "ملفات تعريف الارتباط",
          headingEn: "Cookies",
          bodyAr: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع وتذكر تفضيلاتك مثل اللغة والسلة.",
          bodyEn: "We use cookies to improve your browsing experience and remember preferences like language and cart contents.",
        },
      ]}
    />
  );
}
