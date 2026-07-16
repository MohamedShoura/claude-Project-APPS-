import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrefs, isCountry } from '@/i18n';
import { HomeView } from '@/components/home-view';
import { CountrySync } from '@/components/providers';
import { countryByCode } from '@/data/reference';

export function generateStaticParams() {
  return [{ country: 'qa' }, { country: 'sa' }, { country: 'ae' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const c = countryByCode(country);
  if (!c) return {};
  return {
    title: `${c.name.en} Deals — Gulf Hot Offers`,
    description: `The hottest online shopping deals and coupons in ${c.name.en}. Compare prices from Noon, Amazon and more.`,
    alternates: { canonical: `/${country}` },
  };
}

export default async function CountryHome({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  const { locale } = await getPrefs();
  return (
    <>
      <CountrySync country={country} />
      <HomeView country={country} locale={locale} />
    </>
  );
}
