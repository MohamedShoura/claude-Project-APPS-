import { buildMetadata } from "@/lib/seo";
import { ConsultingView } from "./ConsultingView";

export const metadata = buildMetadata({
  title: "Consulting Services",
  path: "/consulting",
  description:
    "AI transformation, marketing strategy, sales development and business growth consulting by Dr. Mohamed Shoura across the GCC and international markets.",
});

export default function ConsultingPage() {
  return <ConsultingView />;
}
