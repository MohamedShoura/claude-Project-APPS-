import type { Country, Retailer, Category, Brand } from '@/lib/types';

export const COUNTRIES: Country[] = [
  { code: 'qa', name: { en: 'Qatar', ar: 'قطر' }, currency: 'QAR', flag: '🇶🇦' },
  { code: 'sa', name: { en: 'Saudi Arabia', ar: 'السعودية' }, currency: 'SAR', flag: '🇸🇦' },
  { code: 'ae', name: { en: 'United Arab Emirates', ar: 'الإمارات' }, currency: 'AED', flag: '🇦🇪' },
];

export const RETAILERS: Retailer[] = [
  {
    slug: 'noon-qa',
    name: { en: 'Noon Qatar', ar: 'نون قطر' },
    countries: ['qa'],
    integration: 'affiliate-feed',
    connectorStatus: 'demo',
    logoColor: '#feee00',
    reliability: 88,
    externalBaseUrl: 'https://www.noon.com/qatar-en/',
    overview: {
      en: 'A leading regional marketplace serving Qatar with electronics, fashion, beauty and daily essentials.',
      ar: 'سوق إقليمي رائد يخدم قطر بالإلكترونيات والأزياء والجمال والاحتياجات اليومية.',
    },
  },
  {
    slug: 'snoonu-qa',
    name: { en: 'Snoonu Qatar', ar: 'سنونو قطر' },
    countries: ['qa'],
    integration: 'affiliate-feed',
    connectorStatus: 'demo',
    logoColor: '#7b2ff7',
    reliability: 82,
    externalBaseUrl: 'https://snoonu.com/',
    overview: {
      en: 'Qatar-based quick-commerce and grocery marketplace with fast local delivery.',
      ar: 'منصة تجارة سريعة وبقالة مقرها قطر مع توصيل محلي سريع.',
    },
  },
  {
    slug: 'noon-sa',
    name: { en: 'Noon Saudi Arabia', ar: 'نون السعودية' },
    countries: ['sa'],
    integration: 'affiliate-feed',
    connectorStatus: 'demo',
    logoColor: '#feee00',
    reliability: 89,
    externalBaseUrl: 'https://www.noon.com/saudi-en/',
    overview: {
      en: 'One of the largest online marketplaces in Saudi Arabia across all major categories.',
      ar: 'أحد أكبر الأسواق الإلكترونية في السعودية عبر جميع الفئات الرئيسية.',
    },
  },
  {
    slug: 'amazon-sa',
    name: { en: 'Amazon Saudi Arabia', ar: 'أمازون السعودية' },
    countries: ['sa'],
    integration: 'official-api',
    connectorStatus: 'demo',
    logoColor: '#ff9900',
    reliability: 92,
    externalBaseUrl: 'https://www.amazon.sa/',
    overview: {
      en: 'Amazon.sa offers a vast selection with fast Prime delivery across Saudi Arabia.',
      ar: 'يوفر أمازون السعودية تشكيلة واسعة مع توصيل برايم سريع في جميع أنحاء المملكة.',
    },
  },
  {
    slug: 'noon-ae',
    name: { en: 'Noon UAE', ar: 'نون الإمارات' },
    countries: ['ae'],
    integration: 'affiliate-feed',
    connectorStatus: 'demo',
    logoColor: '#feee00',
    reliability: 90,
    externalBaseUrl: 'https://www.noon.com/uae-en/',
    overview: {
      en: 'Noon UAE is a homegrown marketplace with wide category coverage and same-day options.',
      ar: 'نون الإمارات سوق محلي بتغطية واسعة للفئات وخيارات توصيل في نفس اليوم.',
    },
  },
  {
    slug: 'amazon-ae',
    name: { en: 'Amazon UAE', ar: 'أمازون الإمارات' },
    countries: ['ae', 'qa'], // Amazon.ae products eligible for delivery to Qatar
    integration: 'official-api',
    connectorStatus: 'demo',
    logoColor: '#ff9900',
    reliability: 93,
    externalBaseUrl: 'https://www.amazon.ae/',
    overview: {
      en: 'Amazon.ae serves the UAE and ships eligible products to Qatar with reliable delivery.',
      ar: 'يخدم أمازون الإمارات دولة الإمارات ويشحن المنتجات المؤهلة إلى قطر بتوصيل موثوق.',
    },
  },
];

export const CATEGORIES: Category[] = [
  { slug: 'electronics', name: { en: 'Electronics', ar: 'الإلكترونيات' }, icon: '💻' },
  { slug: 'smartphones', name: { en: 'Smartphones', ar: 'الهواتف الذكية' }, icon: '📱', parent: 'electronics' },
  { slug: 'laptops', name: { en: 'Laptops & Computers', ar: 'اللابتوب والكمبيوتر' }, icon: '🖥️', parent: 'electronics' },
  { slug: 'tvs', name: { en: 'TVs', ar: 'التلفزيونات' }, icon: '📺', parent: 'electronics' },
  { slug: 'gaming', name: { en: 'Gaming', ar: 'الألعاب' }, icon: '🎮', parent: 'electronics' },
  { slug: 'home-appliances', name: { en: 'Home Appliances', ar: 'الأجهزة المنزلية' }, icon: '🧺' },
  { slug: 'home-kitchen', name: { en: 'Home & Kitchen', ar: 'المنزل والمطبخ' }, icon: '🍳' },
  { slug: 'fashion', name: { en: 'Fashion', ar: 'الأزياء' }, icon: '👗' },
  { slug: 'shoes-accessories', name: { en: 'Shoes & Accessories', ar: 'الأحذية والإكسسوارات' }, icon: '👟', parent: 'fashion' },
  { slug: 'beauty', name: { en: 'Beauty & Perfumes', ar: 'الجمال والعطور' }, icon: '💄' },
  { slug: 'grocery', name: { en: 'Grocery', ar: 'البقالة' }, icon: '🛒' },
  { slug: 'baby-kids', name: { en: 'Baby & Kids', ar: 'الأطفال والرضع' }, icon: '🧸' },
  { slug: 'sports', name: { en: 'Sports & Fitness', ar: 'الرياضة واللياقة' }, icon: '🏋️' },
  { slug: 'automotive', name: { en: 'Automotive Accessories', ar: 'إكسسوارات السيارات' }, icon: '🚗' },
  { slug: 'office', name: { en: 'Office Supplies', ar: 'المستلزمات المكتبية' }, icon: '🖊️' },
  { slug: 'books', name: { en: 'Books', ar: 'الكتب' }, icon: '📚' },
  { slug: 'pets', name: { en: 'Pet Supplies', ar: 'مستلزمات الحيوانات' }, icon: '🐾' },
];

export const BRANDS: Brand[] = [
  { slug: 'apple', name: 'Apple' },
  { slug: 'samsung', name: 'Samsung' },
  { slug: 'sony', name: 'Sony' },
  { slug: 'lg', name: 'LG' },
  { slug: 'dell', name: 'Dell' },
  { slug: 'hp', name: 'HP' },
  { slug: 'lenovo', name: 'Lenovo' },
  { slug: 'dyson', name: 'Dyson' },
  { slug: 'nike', name: 'Nike' },
  { slug: 'adidas', name: 'Adidas' },
  { slug: 'chanel', name: 'Chanel' },
  { slug: 'dior', name: 'Dior' },
  { slug: 'nestle', name: 'Nestlé' },
  { slug: 'philips', name: 'Philips' },
  { slug: 'microsoft', name: 'Microsoft' },
  { slug: 'nintendo', name: 'Nintendo' },
  { slug: 'anker', name: 'Anker' },
  { slug: 'pampers', name: 'Pampers' },
];

// ---- lookup helpers ----
export const countryByCode = (code: string) => COUNTRIES.find((c) => c.code === code);
export const retailerBySlug = (slug: string) => RETAILERS.find((r) => r.slug === slug);
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const brandBySlug = (slug: string) => BRANDS.find((b) => b.slug === slug);
