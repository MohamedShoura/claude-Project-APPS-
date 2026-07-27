import { buildMetadata } from "@/lib/seo";
import { PrivacyView } from "./PrivacyView";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  path: "/privacy-policy",
  description: "Privacy Policy for the Dr. Mohamed Shoura website.",
});

export default function PrivacyPolicyPage() {
  return <PrivacyView />;
}
