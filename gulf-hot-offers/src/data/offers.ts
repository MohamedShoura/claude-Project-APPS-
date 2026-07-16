import type { CountryCode, Currency, Offer, PricePoint } from '@/lib/types';
import { productImage } from '@/lib/placeholder';

// ---------------------------------------------------------------------------
// DEMO DATA LAYER
// ---------------------------------------------------------------------------
// These offers are clearly-labelled demonstration data (`demo: true`). They are
// NOT live prices. The production connector layer (src/connectors) is designed
// to replace this module with authorized retailer feeds/APIs — see README.
// ---------------------------------------------------------------------------

// Deterministic PRNG so demo content is stable across server restarts.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CURRENCY: Record<CountryCode, Currency> = { qa: 'QAR', sa: 'SAR', ae: 'AED' };
// Rough demo FX vs. a QAR baseline (illustrative only).
const FX: Record<CountryCode, number> = { qa: 1, sa: 1.03, ae: 1.0 };

const DAY = 86400000;
const NOW = Date.now();
const iso = (ms: number) => new Date(ms).toISOString();
const isoDate = (ms: number) => new Date(ms).toISOString().slice(0, 10);

interface Template {
  key: string;
  title: { en: string; ar: string };
  brand: string;
  category: string;
  icon: string;
  base: number; // baseline price in QAR
  model?: string;
  gtin?: string;
  storage?: string;
  color?: string;
  size?: string;
  desc: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  // which retailers (by slug) sell it, mapped to their serving country
  channels: { retailer: string; country: CountryCode }[];
}

const T = (t: Template) => t;

const templates: Template[] = [
  T({
    key: 'iphone-17-pro-256',
    title: { en: 'iPhone 17 Pro 256GB', ar: 'آيفون 17 برو 256 جيجابايت' },
    brand: 'apple', category: 'smartphones', icon: '📱', base: 4599,
    model: 'A3210', gtin: '0195949100017', storage: '256GB', color: 'Titanium Blue',
    desc: {
      en: 'The latest iPhone 17 Pro with the A19 Pro chip, a titanium frame and a pro camera system.',
      ar: 'أحدث آيفون 17 برو بمعالج A19 برو وإطار تيتانيوم ونظام كاميرا احترافي.',
    },
    features: {
      en: ['6.3" ProMotion OLED display', 'A19 Pro chip', 'Triple 48MP camera system', 'USB-C, up to 2× faster'],
      ar: ['شاشة OLED بروموشن 6.3 بوصة', 'معالج A19 برو', 'نظام كاميرا ثلاثي 48 ميجابكسل', 'USB-C أسرع حتى مرتين'],
    },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'galaxy-s25-ultra-512',
    title: { en: 'Samsung Galaxy S25 Ultra 512GB', ar: 'سامسونج جالاكسي S25 ألترا 512 جيجابايت' },
    brand: 'samsung', category: 'smartphones', icon: '📱', base: 4199,
    model: 'SM-S938', gtin: '8806095100025', storage: '512GB', color: 'Titanium Gray',
    desc: {
      en: 'Galaxy S25 Ultra with a 200MP camera, S Pen and a brilliant 6.9" Dynamic AMOLED display.',
      ar: 'جالاكسي S25 ألترا بكاميرا 200 ميجابكسل وقلم S وشاشة ديناميك أموليد 6.9 بوصة.',
    },
    features: {
      en: ['6.9" Dynamic AMOLED 2X', '200MP main camera', 'Built-in S Pen', '5000mAh battery'],
      ar: ['شاشة ديناميك أموليد 2X 6.9 بوصة', 'كاميرا رئيسية 200 ميجابكسل', 'قلم S مدمج', 'بطارية 5000 مللي أمبير'],
    },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'macbook-air-m4-13',
    title: { en: 'MacBook Air 13" M4 256GB', ar: 'ماك بوك اير 13 بوصة M4 256 جيجابايت' },
    brand: 'apple', category: 'laptops', icon: '💻', base: 3799,
    model: 'MC7X4', storage: '256GB', color: 'Midnight',
    desc: { en: 'Featherlight MacBook Air with the M4 chip and all-day battery life.', ar: 'ماك بوك اير خفيف بمعالج M4 وبطارية تدوم طوال اليوم.' },
    features: { en: ['Apple M4 chip', '13.6" Liquid Retina', 'Up to 18h battery', '1.24 kg'], ar: ['معالج آبل M4', 'شاشة ليكويد ريتينا 13.6 بوصة', 'بطارية حتى 18 ساعة', '1.24 كجم'] },
    channels: [
      { retailer: 'amazon-ae', country: 'qa' }, { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'dell-xps-13',
    title: { en: 'Dell XPS 13 Intel Core Ultra 7', ar: 'ديل XPS 13 إنتل كور ألترا 7' },
    brand: 'dell', category: 'laptops', icon: '💻', base: 4299,
    model: 'XPS9340', storage: '512GB', color: 'Platinum',
    desc: { en: 'Premium ultrabook with InfinityEdge display and Core Ultra performance.', ar: 'حاسوب فائق النحافة بشاشة إنفينيتي إيدج وأداء كور ألترا.' },
    features: { en: ['13.4" FHD+ display', 'Core Ultra 7', '16GB RAM', '512GB SSD'], ar: ['شاشة 13.4 بوصة FHD+', 'كور ألترا 7', 'رام 16 جيجابايت', 'SSD 512 جيجابايت'] },
    channels: [
      { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'lg-oled-c4-55',
    title: { en: 'LG OLED C4 55" 4K Smart TV', ar: 'إل جي أوليد C4 55 بوصة تلفزيون ذكي 4K' },
    brand: 'lg', category: 'tvs', icon: '📺', base: 3299,
    model: 'OLED55C4', size: '55"',
    desc: { en: 'Self-lit OLED 4K TV with the α9 AI processor and 144Hz gaming support.', ar: 'تلفزيون أوليد 4K بمعالج α9 الذكي ودعم ألعاب 144 هرتز.' },
    features: { en: ['55" 4K OLED', 'α9 AI Processor Gen7', '144Hz, HDMI 2.1', 'webOS'], ar: ['55 بوصة 4K أوليد', 'معالج α9 الذكي الجيل السابع', '144 هرتز، HDMI 2.1', 'ويب أو إس'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'samsung-qled-65',
    title: { en: 'Samsung 65" QLED 4K TV', ar: 'سامسونج 65 بوصة QLED 4K تلفزيون' },
    brand: 'samsung', category: 'tvs', icon: '📺', base: 3499,
    model: 'QA65Q70D', size: '65"',
    desc: { en: 'Quantum Dot 4K TV with Quantum Processor and slim design.', ar: 'تلفزيون كوانتم دوت 4K بمعالج كوانتم وتصميم نحيف.' },
    features: { en: ['65" QLED 4K', 'Quantum Processor 4K', 'Motion Xcelerator 120Hz', 'Tizen OS'], ar: ['65 بوصة QLED 4K', 'معالج كوانتم 4K', 'موشن إكسيليريتر 120 هرتز', 'نظام تايزن'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'ps5-slim',
    title: { en: 'PlayStation 5 Slim Console', ar: 'جهاز بلايستيشن 5 سليم' },
    brand: 'sony', category: 'gaming', icon: '🎮', base: 1999,
    model: 'CFI-2000', storage: '1TB', color: 'White',
    desc: { en: 'The slimmer PS5 with a 1TB SSD and lightning-fast load times.', ar: 'بلايستيشن 5 الأنحف بذاكرة SSD 1 تيرابايت وأوقات تحميل فائقة السرعة.' },
    features: { en: ['1TB SSD', '4K 120Hz output', 'DualSense controller', 'Ray tracing'], ar: ['SSD 1 تيرابايت', 'إخراج 4K 120 هرتز', 'وحدة تحكم DualSense', 'تتبع الأشعة'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'nintendo-switch-2',
    title: { en: 'Nintendo Switch 2', ar: 'نينتندو سويتش 2' },
    brand: 'nintendo', category: 'gaming', icon: '🎮', base: 1799,
    model: 'HEG-001', color: 'Black',
    desc: { en: 'Next-gen hybrid console with a larger display and improved performance.', ar: 'جهاز هجين من الجيل التالي بشاشة أكبر وأداء محسّن.' },
    features: { en: ['Larger HDR display', 'Backwards compatible', 'Detachable Joy-Con', 'Dock included'], ar: ['شاشة HDR أكبر', 'متوافق مع الأجيال السابقة', 'جوي-كون قابل للفصل', 'قاعدة مرفقة'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'sony-wh1000xm6',
    title: { en: 'Sony WH-1000XM6 Headphones', ar: 'سماعات سوني WH-1000XM6' },
    brand: 'sony', category: 'electronics', icon: '🎧', base: 1499,
    model: 'WH1000XM6', color: 'Black',
    desc: { en: 'Industry-leading noise cancelling over-ear headphones with 30h battery.', ar: 'سماعات رأس رائدة في عزل الضوضاء ببطارية 30 ساعة.' },
    features: { en: ['Best-in-class ANC', '30h battery', 'Multipoint Bluetooth', 'Adaptive sound'], ar: ['أفضل عزل ضوضاء', 'بطارية 30 ساعة', 'بلوتوث متعدد النقاط', 'صوت تكيّفي'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'airpods-pro-3',
    title: { en: 'Apple AirPods Pro 3', ar: 'آبل إيربودز برو 3' },
    brand: 'apple', category: 'electronics', icon: '🎧', base: 899,
    model: 'MTJV3', color: 'White',
    desc: { en: 'AirPods Pro with adaptive audio, USB-C and improved noise cancellation.', ar: 'إيربودز برو بصوت تكيّفي و USB-C وعزل ضوضاء محسّن.' },
    features: { en: ['Adaptive Audio', 'USB-C charging', 'Up to 6h listening', 'IP54'], ar: ['صوت تكيّفي', 'شحن USB-C', 'استماع حتى 6 ساعات', 'IP54'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'dyson-v15',
    title: { en: 'Dyson V15 Detect Vacuum', ar: 'مكنسة دايسون V15 ديتكت' },
    brand: 'dyson', category: 'home-appliances', icon: '🧹', base: 2499,
    model: 'V15', color: 'Nickel',
    desc: { en: 'Cordless vacuum with laser dust detection and powerful suction.', ar: 'مكنسة لاسلكية بكشف الغبار بالليزر وقوة شفط عالية.' },
    features: { en: ['Laser dust detection', 'Up to 60min runtime', 'HEPA filtration', 'LCD screen'], ar: ['كشف الغبار بالليزر', 'تشغيل حتى 60 دقيقة', 'فلتر HEPA', 'شاشة LCD'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'philips-airfryer',
    title: { en: 'Philips XXL Airfryer', ar: 'قلاية فيليبس الهوائية XXL' },
    brand: 'philips', category: 'home-kitchen', icon: '🍟', base: 799,
    model: 'HD9880', color: 'Black',
    desc: { en: 'Large-capacity airfryer with rapid air technology for healthier meals.', ar: 'قلاية هوائية كبيرة السعة بتقنية الهواء السريع لوجبات صحية.' },
    features: { en: ['7.2L capacity', 'Rapid Air', 'Smart presets', 'Dishwasher safe'], ar: ['سعة 7.2 لتر', 'تقنية الهواء السريع', 'إعدادات ذكية', 'آمنة في غسالة الصحون'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'snoonu-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'nespresso-vertuo',
    title: { en: 'Nespresso Vertuo Coffee Machine', ar: 'ماكينة قهوة نسبريسو فيرتو' },
    brand: 'nestle', category: 'home-kitchen', icon: '☕', base: 549,
    model: 'ENV120', color: 'Grey',
    desc: { en: 'Single-serve coffee machine with Centrifusion technology and 5 cup sizes.', ar: 'ماكينة قهوة بكوب واحد بتقنية سنترفيوجن و5 أحجام أكواب.' },
    features: { en: ['5 cup sizes', 'One-touch brewing', '30s heat-up', 'Auto capsule ejection'], ar: ['5 أحجام أكواب', 'تحضير بلمسة واحدة', 'تسخين 30 ثانية', 'إخراج تلقائي للكبسولة'] },
    channels: [
      { retailer: 'snoonu-qa', country: 'qa' }, { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'dior-sauvage-edp',
    title: { en: 'Dior Sauvage EDP 100ml', ar: 'ديور سوفاج ماء عطر 100 مل' },
    brand: 'dior', category: 'beauty', icon: '🧴', base: 549,
    gtin: '3348901486385', size: '100ml',
    desc: { en: 'Iconic fresh and woody fragrance for men, 100ml eau de parfum.', ar: 'عطر رجالي منعش وخشبي أيقوني، ماء عطر 100 مل.' },
    features: { en: ['Eau de Parfum', '100ml', 'Fresh & woody', 'Long lasting'], ar: ['ماء عطر', '100 مل', 'منعش وخشبي', 'يدوم طويلاً'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'chanel-coco-mademoiselle',
    title: { en: 'Chanel Coco Mademoiselle 100ml', ar: 'شانيل كوكو مدموزيل 100 مل' },
    brand: 'chanel', category: 'beauty', icon: '🌸', base: 749,
    gtin: '3145891165302', size: '100ml',
    desc: { en: 'A sparkling, fresh oriental fragrance for women, 100ml.', ar: 'عطر شرقي منعش ومتألق للنساء، 100 مل.' },
    features: { en: ['Eau de Parfum', '100ml', 'Oriental fresh', 'Signature scent'], ar: ['ماء عطر', '100 مل', 'شرقي منعش', 'عطر مميز'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'nike-air-max',
    title: { en: 'Nike Air Max Sneakers', ar: 'حذاء نايك اير ماكس' },
    brand: 'nike', category: 'shoes-accessories', icon: '👟', base: 449,
    color: 'Black/White', size: 'US 9-12',
    desc: { en: 'Iconic Nike Air Max sneakers with responsive cushioning.', ar: 'حذاء نايك اير ماكس الأيقوني بوسادة مرنة.' },
    features: { en: ['Air Max cushioning', 'Breathable mesh', 'Durable outsole', 'Everyday comfort'], ar: ['وسادة اير ماكس', 'شبكة قابلة للتنفس', 'نعل خارجي متين', 'راحة يومية'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'adidas-tracksuit',
    title: { en: 'Adidas Essentials Tracksuit', ar: 'بدلة رياضية أديداس إسنشيالز' },
    brand: 'adidas', category: 'fashion', icon: '🧥', base: 299,
    color: 'Navy', size: 'S-XXL',
    desc: { en: 'Comfortable everyday tracksuit with the classic 3-Stripes design.', ar: 'بدلة رياضية مريحة بتصميم الخطوط الثلاثة الكلاسيكي.' },
    features: { en: ['Soft French terry', '3-Stripes design', 'Ribbed cuffs', 'Regular fit'], ar: ['قماش تيري ناعم', 'تصميم 3 خطوط', 'أساور مضلعة', 'قصة عادية'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' }, { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' }, { retailer: 'amazon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'anker-powerbank',
    title: { en: 'Anker 20000mAh Power Bank', ar: 'باور بانك أنكر 20000 مللي أمبير' },
    brand: 'anker', category: 'electronics', icon: '🔋', base: 189,
    model: 'A1287', color: 'Black',
    desc: { en: 'High-capacity power bank with fast charging and USB-C PD.', ar: 'باور بانك عالي السعة بشحن سريع و USB-C PD.' },
    features: { en: ['20000mAh', '30W USB-C PD', 'Charges 3 devices', 'Trickle-charge mode'], ar: ['20000 مللي أمبير', '30 واط USB-C PD', 'يشحن 3 أجهزة', 'وضع الشحن البطيء'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' }, { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'pampers-box',
    title: { en: 'Pampers Premium Care Diapers (Box)', ar: 'حفاضات بامبرز بريميوم كير (صندوق)' },
    brand: 'pampers', category: 'baby-kids', icon: '🍼', base: 179,
    size: 'Size 4',
    desc: { en: 'Monthly box of Pampers Premium Care diapers with soft comfort.', ar: 'صندوق شهري من حفاضات بامبرز بريميوم كير بنعومة وراحة.' },
    features: { en: ['Up to 12h dryness', 'Soft cotton feel', 'Wetness indicator', 'Monthly box'], ar: ['جفاف حتى 12 ساعة', 'ملمس قطني ناعم', 'مؤشر البلل', 'صندوق شهري'] },
    channels: [
      { retailer: 'snoonu-qa', country: 'qa' }, { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'nestle-nido-grocery',
    title: { en: 'Nestlé Nido Milk Powder 2.5kg', ar: 'حليب نستله نيدو بودرة 2.5 كجم' },
    brand: 'nestle', category: 'grocery', icon: '🥛', base: 89,
    size: '2.5kg',
    desc: { en: 'Fortified full-cream milk powder for the whole family.', ar: 'حليب بودرة كامل الدسم مدعّم لكل أفراد العائلة.' },
    features: { en: ['Full cream', 'Vitamins A & D', '2.5kg tin', 'Family pack'], ar: ['كامل الدسم', 'فيتامينات A و D', 'علبة 2.5 كجم', 'عبوة عائلية'] },
    channels: [
      { retailer: 'snoonu-qa', country: 'qa' }, { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'microsoft-surface',
    title: { en: 'Microsoft Surface Laptop 7', ar: 'مايكروسوفت سيرفس لابتوب 7' },
    brand: 'microsoft', category: 'laptops', icon: '💻', base: 3999,
    model: 'Surface7', storage: '512GB', color: 'Platinum',
    desc: { en: 'Copilot+ PC with Snapdragon performance and all-day battery.', ar: 'حاسوب Copilot+ بأداء سناب دراجون وبطارية طوال اليوم.' },
    features: { en: ['13.8" touch display', 'Copilot+ NPU', '16GB RAM', 'Up to 20h battery'], ar: ['شاشة لمس 13.8 بوصة', 'وحدة Copilot+ NPU', 'رام 16 جيجابايت', 'بطارية حتى 20 ساعة'] },
    channels: [
      { retailer: 'amazon-ae', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'hp-victus-gaming',
    title: { en: 'HP Victus Gaming Laptop RTX 4060', ar: 'لابتوب HP فيكتوس للألعاب RTX 4060' },
    brand: 'hp', category: 'gaming', icon: '💻', base: 3299,
    model: 'Victus16', storage: '1TB', color: 'Black',
    desc: { en: 'Gaming laptop with RTX 4060 graphics and a 144Hz display.', ar: 'لابتوب ألعاب ببطاقة RTX 4060 وشاشة 144 هرتز.' },
    features: { en: ['RTX 4060 8GB', '16.1" 144Hz', 'Ryzen 7', '16GB RAM'], ar: ['RTX 4060 8 جيجابايت', '16.1 بوصة 144 هرتز', 'رايزن 7', 'رام 16 جيجابايت'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' }, { retailer: 'noon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
  T({
    key: 'lego-technic',
    title: { en: 'LEGO Technic Supercar Set', ar: 'مجموعة ليجو تكنيك سوبر كار' },
    brand: 'nestle', category: 'baby-kids', icon: '🧱', base: 649,
    size: '1400 pcs',
    desc: { en: 'Advanced building set with realistic functions and 1400+ pieces.', ar: 'مجموعة بناء متقدمة بوظائف واقعية وأكثر من 1400 قطعة.' },
    features: { en: ['1400+ pieces', 'Working steering', 'Detailed engine', 'Ages 10+'], ar: ['أكثر من 1400 قطعة', 'مقود يعمل', 'محرك مفصل', 'الأعمار 10+'] },
    channels: [
      { retailer: 'noon-qa', country: 'qa' },
      { retailer: 'amazon-sa', country: 'sa' },
      { retailer: 'amazon-ae', country: 'ae' }, { retailer: 'noon-ae', country: 'ae' },
    ],
  }),
];

function buildPriceHistory(rng: () => number, current: number, previous: number): PricePoint[] {
  const points: PricePoint[] = [];
  const highBase = previous * (1 + rng() * 0.08);
  for (let d = 90; d >= 0; d -= 5) {
    const t = (90 - d) / 90;
    // Gently trend from a higher historical price down toward the current price,
    // with small deterministic noise.
    const noise = (rng() - 0.5) * previous * 0.05;
    let p = highBase + (current - highBase) * t + noise;
    p = Math.max(current * 0.95, Math.round(p));
    points.push({ date: isoDate(NOW - d * DAY), price: p });
  }
  points[points.length - 1] = { date: isoDate(NOW), price: current };
  return points;
}

function buildOffers(): Offer[] {
  const offers: Offer[] = [];
  templates.forEach((tpl, ti) => {
    tpl.channels.forEach((ch, ci) => {
      const rng = mulberry32(1000 + ti * 37 + ci * 101);
      const fx = FX[ch.country];
      const discountPct = 8 + Math.floor(rng() * 47); // 8%..55%
      const previousPrice = Math.round(tpl.base * fx * (1 + rng() * 0.15));
      const price = Math.round(previousPrice * (1 - discountPct / 100));
      const rating = Math.round((3.6 + rng() * 1.4) * 10) / 10;
      const reviews = 12 + Math.floor(rng() * 4800);
      const inStock = rng() > 0.08;
      const freeShipping = rng() > 0.45;
      const shippingFee = freeShipping ? 0 : [15, 20, 25, 30][Math.floor(rng() * 4)];
      const deliveryDays = 1 + Math.floor(rng() * 5);
      const hasExpiry = rng() > 0.35;
      const expiresAt = hasExpiry ? iso(NOW + (2 + Math.floor(rng() * 120)) * 3600000) : undefined;
      const hasCoupon = rng() > 0.6;
      const couponCode = hasCoupon ? ['SAVE10', 'GULF15', 'HOT20', 'DEAL25'][Math.floor(rng() * 4)] : undefined;
      const addedAt = iso(NOW - Math.floor(rng() * 20) * DAY);
      const lastUpdated = iso(NOW - Math.floor(rng() * 6) * 3600000);
      const priceHistory = buildPriceHistory(rng, price, previousPrice);

      const id = `${tpl.key}--${ch.retailer}`;
      const slug = `${tpl.key}-${ch.retailer}`;
      const images = [
        productImage(id + 'a', tpl.title.en, tpl.icon),
        productImage(id + 'b', tpl.title.en, tpl.icon),
        productImage(id + 'c', tpl.title.en, tpl.icon),
      ];

      offers.push({
        id,
        slug,
        title: tpl.title,
        brand: tpl.brand,
        category: tpl.category,
        retailer: ch.retailer,
        country: ch.country,
        currency: CURRENCY[ch.country],
        price,
        previousPrice,
        model: tpl.model,
        sku: `${tpl.key.toUpperCase().replace(/-/g, '')}-${ch.country.toUpperCase()}`,
        gtin: tpl.gtin,
        storage: tpl.storage,
        color: tpl.color,
        size: tpl.size,
        rating,
        reviews,
        inStock,
        freeShipping,
        shippingFee,
        estimatedDeliveryDays: deliveryDays,
        expiresAt,
        couponCode,
        images,
        description: tpl.desc,
        features: tpl.features,
        priceHistory,
        lastUpdated,
        views: 40 + Math.floor(rng() * 9600),
        addedAt,
        verified: rng() > 0.2,
        featured: rng() > 0.75,
        demo: true,
        externalUrl: `https://example-affiliate.gulfhotoffers.test/go?r=${ch.retailer}&p=${tpl.key}&utm_source=gulfhotoffers&utm_medium=deal&utm_campaign=demo`,
      });
    });
  });
  return offers;
}

export const OFFERS: Offer[] = buildOffers();

// key groups every retailer offer of the same underlying product together —
// this is what powers the price-comparison page (matched by identity, not title).
export const productKey = (o: Offer) => o.slug.replace(new RegExp(`-${o.retailer}$`), '');
