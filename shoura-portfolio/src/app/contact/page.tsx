import { buildMetadata } from "@/lib/seo";
import { ContactView } from "./ContactView";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Contact Dr. Mohamed Shoura for corporate training, AI and marketing consulting, or speaking engagements across the UAE, Qatar, Egypt and beyond.",
});

export default function ContactPage() {
  return <ContactView />;
}
