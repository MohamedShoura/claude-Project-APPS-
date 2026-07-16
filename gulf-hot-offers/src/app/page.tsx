import { getPrefs } from '@/i18n';
import { HomeView } from '@/components/home-view';

export default async function Page() {
  const { locale, country } = await getPrefs();
  return <HomeView country={country} locale={locale} />;
}
