import { LegalPage } from "@/components/shared/LegalPage";

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      titleAr="سياسة الاسترجاع والاستبدال"
      titleEn="Return Policy"
      sections={[
        {
          headingAr: "مدة الاسترجاع",
          headingEn: "Return Window",
          bodyAr: "يمكنك استرجاع أو استبدال أي منتج خلال 14 يوماً من تاريخ الاستلام، بشرط أن يكون في حالته الأصلية وبعبوته الأصلية.",
          bodyEn: "You may return or exchange any product within 14 days of delivery, provided it is in its original condition and packaging.",
        },
        {
          headingAr: "كيفية الاسترجاع",
          headingEn: "How to Return",
          bodyAr: "تواصل معنا عبر خدمة العملاء أو واتساب لبدء طلب الاسترجاع، وسنقوم بترتيب استلام المنتج من عنوانك مجاناً.",
          bodyEn: "Contact our customer support or WhatsApp to start a return request, and we'll arrange free pickup from your address.",
        },
        {
          headingAr: "استرداد المبلغ",
          headingEn: "Refunds",
          bodyAr: "بعد فحص المنتج المرتجع، يتم استرداد المبلغ خلال 5-7 أيام عمل بنفس طريقة الدفع الأصلية أو كرصيد للاستخدام لاحقاً.",
          bodyEn: "After inspecting the returned product, refunds are processed within 5-7 business days to the original payment method or as store credit.",
        },
      ]}
    />
  );
}
