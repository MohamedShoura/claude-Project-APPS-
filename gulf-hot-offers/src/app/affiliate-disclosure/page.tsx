import { LegalPage, legalMetadata } from '@/components/legal-page';
export const metadata = legalMetadata('affiliate-disclosure');
export default function Page() {
  return <LegalPage slug="affiliate-disclosure" />;
}
