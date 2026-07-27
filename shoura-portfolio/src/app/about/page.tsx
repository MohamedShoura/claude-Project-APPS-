import { buildMetadata } from "@/lib/seo";
import { AboutView } from "./AboutView";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
  description:
    "About Dr. Mohamed Shoura — international corporate trainer, AI consultant and business growth expert with 16+ years of experience across the GCC, Africa and international markets.",
});

export default function AboutPage() {
  return <AboutView />;
}
