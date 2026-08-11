import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../../globals.css";
import { locales, isLocale, defaultLocale, dirFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatButton } from "@/components/shared/WhatsAppFloatButton";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { AnalyticsScripts } from "@/components/shared/AnalyticsScripts";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const title =
    locale === "ar"
      ? `${dict.brand} | تسوق أونلاين في مصر`
      : `${dict.brand} | Shop Online in Egypt`;
  const description =
    locale === "ar"
      ? "تسوق أحدث المنتجات والعروض الحصرية أونلاين مع توصيل سريع لكل محافظات مصر. دفع عند الاستلام، بطاقات، ومحافظ إلكترونية."
      : "Shop the latest products and exclusive online offers with fast delivery across Egypt. COD, card, and e-wallet payments available.";
  return {
    title: { default: title, template: `%s | ${dict.brand}` },
    description,
    alternates: {
      languages: { ar: "/ar", en: "/en" },
    },
    openGraph: { title, description, locale, type: "website" },
    metadataBase: new URL("https://neelstore.example"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dir = dirFor(locale);

  return (
    <html lang={locale} dir={dir} className={cairo.variable}>
      <body className="font-sans antialiased flex min-h-screen flex-col bg-white text-neutral-900">
        <LocaleProvider locale={locale}>
          <AnalyticsScripts />
          <AnnouncementBar />
          <Header />
          <main className="flex-1 pb-14 md:pb-0">{children}</main>
          <Footer />
          <WhatsAppFloatButton />
          <MobileTabBar />
        </LocaleProvider>
      </body>
    </html>
  );
}
