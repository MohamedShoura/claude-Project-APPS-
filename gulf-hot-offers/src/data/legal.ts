import type { Locale } from '@/lib/types';

export interface LegalDoc {
  slug: string;
  title: Record<Locale, string>;
  updated: string;
  body: Record<Locale, { heading?: string; text: string }[]>;
}

const p = (en: string, ar: string, heading?: { en: string; ar: string }) => ({ en, ar, heading });

export const LEGAL: Record<string, LegalDoc> = {
  about: {
    slug: 'about',
    title: { en: 'About Us', ar: 'من نحن' },
    updated: '2025-01-01',
    body: {
      en: [
        { text: 'Gulf Hot Offers is an independent deal-discovery and price-comparison platform for shoppers in Qatar, Saudi Arabia and the United Arab Emirates.' },
        { heading: 'What we do', text: 'We collect and organise publicly available offers so you can compare prices, discounts and coupons across multiple retailers in one place, then continue to the original retailer to complete your purchase.' },
        { heading: 'Independence', text: 'We are not the official website of Noon, Amazon or Snoonu, and we are not affiliated with them unless explicitly stated. Retailer names and logos are used only for identification.' },
      ],
      ar: [
        { text: 'عروض الخليج الساخنة منصة مستقلة لاكتشاف العروض ومقارنة الأسعار للمتسوقين في قطر والسعودية والإمارات.' },
        { heading: 'ماذا نقدم', text: 'نجمع العروض المتاحة علناً وننظّمها لتتمكن من مقارنة الأسعار والخصومات والكوبونات عبر عدة متاجر في مكان واحد، ثم تنتقل إلى المتجر الأصلي لإتمام الشراء.' },
        { heading: 'الاستقلالية', text: 'لسنا الموقع الرسمي لنون أو أمازون أو سنونو ولسنا تابعين لهم ما لم يُذكر خلاف ذلك. تُستخدم أسماء وشعارات المتاجر للتعريف فقط.' },
      ],
    },
  },
  contact: {
    slug: 'contact',
    title: { en: 'Contact Us', ar: 'اتصل بنا' },
    updated: '2025-01-01',
    body: {
      en: [
        { text: 'Have a question, a correction, or a partnership enquiry? We would love to hear from you.' },
        { heading: 'Email', text: 'support@gulfhotoffers.example' },
        { heading: 'Response time', text: 'We typically respond within 1–2 business days.' },
      ],
      ar: [
        { text: 'لديك سؤال أو تصحيح أو استفسار عن شراكة؟ يسعدنا تواصلك معنا.' },
        { heading: 'البريد الإلكتروني', text: 'support@gulfhotoffers.example' },
        { heading: 'وقت الرد', text: 'نرد عادةً خلال 1–2 يوم عمل.' },
      ],
    },
  },
  privacy: {
    slug: 'privacy',
    title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    updated: '2025-01-01',
    body: {
      en: [
        { text: 'This demo stores your favourites, alerts and preferences locally in your browser. No personal data is sent to a server in the demonstration build.' },
        { heading: 'Cookies', text: 'We use cookies only to remember your selected country and language.' },
        { heading: 'Third parties', text: 'When you click through to a retailer, that retailer’s own privacy policy applies.' },
      ],
      ar: [
        { text: 'يخزّن هذا العرض التجريبي مفضلاتك وتنبيهاتك وتفضيلاتك محلياً في متصفحك. لا تُرسل أي بيانات شخصية إلى خادم في النسخة التجريبية.' },
        { heading: 'ملفات الارتباط', text: 'نستخدم ملفات الارتباط فقط لتذكّر الدولة واللغة المختارة.' },
        { heading: 'أطراف ثالثة', text: 'عند الانتقال إلى متجر، تُطبّق سياسة خصوصية ذلك المتجر.' },
      ],
    },
  },
  terms: {
    slug: 'terms',
    title: { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
    updated: '2025-01-01',
    body: {
      en: [
        { text: 'By using Gulf Hot Offers you agree to these terms.' },
        { heading: 'Accuracy', text: 'Prices and availability may change on the retailer’s website. Always verify the final price before completing your purchase.' },
        { heading: 'Affiliate links', text: 'Some links are affiliate links; we may earn a commission at no extra cost to you.' },
      ],
      ar: [
        { text: 'باستخدامك عروض الخليج الساخنة فإنك توافق على هذه الشروط.' },
        { heading: 'الدقة', text: 'قد تتغير الأسعار والتوفر على موقع المتجر. تحقق دائماً من السعر النهائي قبل إتمام الشراء.' },
        { heading: 'روابط العمولة', text: 'بعض الروابط روابط عمولة، وقد نحصل على عمولة دون أي تكلفة إضافية عليك.' },
      ],
    },
  },
  cookies: {
    slug: 'cookies',
    title: { en: 'Cookie Policy', ar: 'سياسة ملفات الارتباط' },
    updated: '2025-01-01',
    body: {
      en: [{ text: 'We use minimal cookies to remember your country and language preferences. You can clear them any time in your browser settings.' }],
      ar: [{ text: 'نستخدم أقل قدر من ملفات الارتباط لتذكّر تفضيلات الدولة واللغة. يمكنك مسحها في أي وقت من إعدادات المتصفح.' }],
    },
  },
  'affiliate-disclosure': {
    slug: 'affiliate-disclosure',
    title: { en: 'Affiliate Disclosure', ar: 'الإفصاح عن العمولات' },
    updated: '2025-01-01',
    body: {
      en: [{ text: 'Gulf Hot Offers may earn a commission when you buy through links on this site. This never affects the price you pay and does not influence how we rank deals.' }],
      ar: [{ text: 'قد تحصل عروض الخليج الساخنة على عمولة عند الشراء عبر الروابط في هذا الموقع. هذا لا يؤثر على السعر الذي تدفعه ولا على طريقة ترتيبنا للعروض.' }],
    },
  },
  'how-we-rank': {
    slug: 'how-we-rank',
    title: { en: 'How We Rank Deals', ar: 'كيف نُرتّب العروض' },
    updated: '2025-01-01',
    body: {
      en: [
        { text: 'Every offer receives a Deal Score from 0 to 100.' },
        { heading: 'What the score measures', text: 'Discount versus real market average (not just the struck-through price), price history and lowest-ever price, retailer reliability, product rating and review depth, stock and shipping, coupon availability and offer urgency.' },
        { heading: 'Anti-manipulation', text: 'A large discount off an artificially inflated “previous price” is penalised and can be labelled “Possible Inflated Discount”. We never mark an offer as exceptional based on the displayed discount alone.' },
      ],
      ar: [
        { text: 'يحصل كل عرض على مؤشر صفقة من 0 إلى 100.' },
        { heading: 'ماذا يقيس المؤشر', text: 'الخصم مقارنةً بمتوسط السوق الحقيقي (وليس فقط السعر المشطوب)، وسجل الأسعار وأدنى سعر مسجّل، وموثوقية المتجر، وتقييم المنتج وعدد المراجعات، والتوفر والشحن، وتوفر الكوبون وإلحاح العرض.' },
        { heading: 'مكافحة التلاعب', text: 'يُعاقَب الخصم الكبير المبني على «سعر سابق» مبالغ فيه وقد يوسم بـ«خصم قد يكون مبالغاً فيه». لا نصف أي عرض بالاستثنائي بناءً على الخصم المعروض وحده.' },
      ],
    },
  },
  report: {
    slug: 'report',
    title: { en: 'Report a Problem', ar: 'الإبلاغ عن مشكلة' },
    updated: '2025-01-01',
    body: {
      en: [{ text: 'Found an incorrect price, a broken link or a suspicious discount? Use the “Report incorrect price” button on any deal page, or email support@gulfhotoffers.example. In the demo, reports are acknowledged locally.' }],
      ar: [{ text: 'وجدت سعراً خاطئاً أو رابطاً معطّلاً أو خصماً مريباً؟ استخدم زر «الإبلاغ عن سعر خاطئ» في أي صفحة عرض، أو راسلنا على support@gulfhotoffers.example. في العرض التجريبي، تُسجَّل البلاغات محلياً.' }],
    },
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL);
