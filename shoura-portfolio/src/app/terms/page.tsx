import { buildMetadata } from "@/lib/seo";
import { TermsView } from "./TermsView";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  path: "/terms",
  description: "Terms & Conditions for the Dr. Mohamed Shoura website.",
});

export default function TermsPage() {
  return <TermsView />;
}
