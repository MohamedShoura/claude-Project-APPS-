import { buildMetadata } from "@/lib/seo";
import { CaseStudiesView } from "./CaseStudiesView";

export const metadata = buildMetadata({
  title: "Case Studies",
  path: "/case-studies",
  description:
    "Case studies showing AI implementation, Claude workflows, marketing strategy and customer experience transformation led by Dr. Mohamed Shoura.",
});

export default function CaseStudiesPage() {
  return <CaseStudiesView />;
}
