import { LegalPage } from "@/components/shared/LegalPage";

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      titleAr="سياسة الشحن والتوصيل"
      titleEn="Shipping Policy"
      sections={[
        {
          headingAr: "مناطق التوصيل",
          headingEn: "Delivery Areas",
          bodyAr: "نوفر خدمة التوصيل لجميع محافظات جمهورية مصر العربية، من القاهرة الكبرى إلى الصعيد وسيناء والمحافظات الحدودية.",
          bodyEn: "We deliver to all governorates across Egypt, from Greater Cairo to Upper Egypt, Sinai, and border governorates.",
        },
        {
          headingAr: "مدة التوصيل",
          headingEn: "Delivery Time",
          bodyAr: "تتراوح مدة التوصيل من 1-2 يوم عمل داخل القاهرة والجيزة، و2-5 أيام عمل لباقي المحافظات، حسب المنطقة.",
          bodyEn: "Delivery typically takes 1-2 business days within Cairo and Giza, and 2-5 business days for other governorates, depending on location.",
        },
        {
          headingAr: "رسوم الشحن",
          headingEn: "Shipping Fees",
          bodyAr: "تختلف رسوم الشحن حسب المحافظة، وتظهر بوضوح عند إتمام الطلب. التوصيل مجاني للطلبات التي تزيد قيمتها عن 2,000 جنيه.",
          bodyEn: "Shipping fees vary by governorate and are clearly shown at checkout. Free delivery applies to orders over 2,000 EGP.",
        },
        {
          headingAr: "تتبع الطلب",
          headingEn: "Order Tracking",
          bodyAr: "بمجرد شحن طلبك، يمكنك متابعة حالته في أي وقت من خلال صفحة تتبع الطلب باستخدام رقم الطلب ورقم الموبايل.",
          bodyEn: "Once your order ships, you can track its status anytime via the order tracking page using your order number and mobile number.",
        },
      ]}
    />
  );
}
