import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { getPrefs, dirFor } from '@/i18n';
import { AppProviders } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MobileNav } from '@/components/mobile-nav';
import { dict } from '@/i18n/dictionaries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gulfhotoffers.example';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gulf Hot Offers — The Best Gulf Deals in One Place',
    template: '%s · Gulf Hot Offers',
  },
  description:
    'Discover and compare the hottest online shopping deals across Qatar, Saudi Arabia and the UAE. Bilingual Arabic & English deal-discovery and price-comparison platform.',
  applicationName: 'Gulf Hot Offers',
  manifest: '/manifest.webmanifest',
  keywords: ['Gulf deals', 'Qatar offers', 'Saudi Arabia discounts', 'UAE deals', 'Noon', 'Amazon', 'Snoonu', 'price comparison', 'coupons'],
  openGraph: {
    title: 'Gulf Hot Offers — The Best Gulf Deals in One Place',
    description: 'Compare the hottest deals across Qatar, Saudi Arabia and the UAE.',
    type: 'website',
    siteName: 'Gulf Hot Offers',
  },
  alternates: {
    canonical: '/',
    languages: { en: '/?lang=en', ar: '/?lang=ar' },
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#e6392b',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, country } = await getPrefs();
  return (
    <html lang={locale} dir={dirFor(locale)}>
      <head>
        {/* Progressive font enhancement — falls back to system fonts if offline */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProviders initialLocale={locale} initialCountry={country}>
          <a href="#main" className="sr-only focus:not-sr-only">{dict.common.menu[locale]}</a>
          <Header />
          <main id="main" className="container-page min-h-[60vh] pb-8">{children}</main>
          <Footer />
          <MobileNav />
        </AppProviders>
      </body>
    </html>
  );
}
