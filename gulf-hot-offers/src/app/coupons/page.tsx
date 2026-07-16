import type { Metadata } from 'next';
import { getPrefs } from '@/i18n';
import { dict, t } from '@/i18n/dictionaries';
import { CouponsList } from './coupons-list';

export const metadata: Metadata = {
  title: 'Coupon Codes',
  description: 'Verified coupon codes for Noon, Amazon and Snoonu across Qatar, Saudi Arabia and the UAE.',
};

export default async function CouponsPage() {
  const { locale } = await getPrefs();
  return (
    <div className="py-4">
      <h1 className="text-2xl font-black text-ink">🏷️ {t(dict.coupons.title, locale)}</h1>
      <p className="mb-4 mt-1 text-sm text-ink-muted">{t(dict.footer.affiliateDisclosure, locale)}</p>
      <CouponsList />
    </div>
  );
}
