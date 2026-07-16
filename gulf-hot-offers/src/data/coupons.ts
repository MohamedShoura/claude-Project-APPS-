import type { Coupon } from '@/lib/types';

const DAY = 86400000;
const iso = (days: number) => new Date(Date.now() + days * DAY).toISOString();

// DEMO coupon data. Verification/success-rate are illustrative and would be
// maintained by the coupon-verification background job in production.
export const COUPONS: Coupon[] = [
  {
    id: 'c1', retailer: 'noon-qa', code: 'GULF15',
    description: { en: '15% off electronics over 500 QAR', ar: 'خصم 15% على الإلكترونيات فوق 500 ريال قطري' },
    minOrder: 500, countries: ['qa'], category: 'electronics', expiresAt: iso(9),
    verified: true, successRate: 92, worked: 214, didntWork: 18,
  },
  {
    id: 'c2', retailer: 'amazon-sa', code: 'SAVE10',
    description: { en: '10% off your first order', ar: 'خصم 10% على أول طلب' },
    minOrder: 200, countries: ['sa'], category: 'new-customer', expiresAt: iso(21),
    verified: true, successRate: 88, worked: 540, didntWork: 74,
  },
  {
    id: 'c3', retailer: 'noon-sa', code: 'HOT20',
    description: { en: '20% off fashion & beauty', ar: 'خصم 20% على الأزياء والجمال' },
    minOrder: 300, countries: ['sa'], category: 'fashion', expiresAt: iso(4),
    verified: true, successRate: 79, worked: 132, didntWork: 35,
  },
  {
    id: 'c4', retailer: 'amazon-ae', code: 'FREESHIP',
    description: { en: 'Free shipping on all orders', ar: 'شحن مجاني على جميع الطلبات' },
    countries: ['ae', 'qa'], category: 'free-shipping', expiresAt: iso(30),
    verified: true, successRate: 96, worked: 890, didntWork: 33,
  },
  {
    id: 'c5', retailer: 'snoonu-qa', code: 'GROCERY25',
    description: { en: '25 QAR off grocery orders over 150', ar: 'خصم 25 ريال على طلبات البقالة فوق 150' },
    minOrder: 150, countries: ['qa'], category: 'grocery', expiresAt: iso(6),
    verified: true, successRate: 84, worked: 301, didntWork: 52,
  },
  {
    id: 'c6', retailer: 'noon-ae', code: 'DEAL25',
    description: { en: '25% off home & kitchen', ar: 'خصم 25% على المنزل والمطبخ' },
    minOrder: 250, countries: ['ae'], category: 'home', expiresAt: iso(12),
    verified: false, successRate: 61, worked: 44, didntWork: 29,
  },
  {
    id: 'c7', retailer: 'amazon-ae', code: 'QNBCARD',
    description: { en: 'Extra 12% off with QNB cards', ar: 'خصم إضافي 12% ببطاقات QNB' },
    minOrder: 400, countries: ['ae', 'qa'], category: 'bank-card', expiresAt: iso(45),
    verified: true, successRate: 90, worked: 176, didntWork: 20,
  },
  {
    id: 'c8', retailer: 'noon-qa', code: 'BEAUTY30',
    description: { en: '30% off selected perfumes', ar: 'خصم 30% على عطور مختارة' },
    minOrder: 350, countries: ['qa'], category: 'beauty', expiresAt: iso(3),
    verified: true, successRate: 73, worked: 88, didntWork: 31,
  },
  {
    id: 'c9', retailer: 'amazon-sa', code: 'GAMER15',
    description: { en: '15% off gaming accessories', ar: 'خصم 15% على إكسسوارات الألعاب' },
    minOrder: 200, countries: ['sa'], category: 'electronics', expiresAt: iso(15),
    verified: true, successRate: 81, worked: 122, didntWork: 27,
  },
  {
    id: 'c10', retailer: 'noon-sa', code: 'NEW50',
    description: { en: '50 SAR off for new customers', ar: 'خصم 50 ريال للعملاء الجدد' },
    minOrder: 250, countries: ['sa'], category: 'new-customer', expiresAt: iso(60),
    verified: true, successRate: 94, worked: 611, didntWork: 39,
  },
];
