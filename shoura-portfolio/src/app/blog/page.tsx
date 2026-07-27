import { buildMetadata } from "@/lib/seo";
import { BlogView } from "./BlogView";

export const metadata = buildMetadata({
  title: "Insights & Articles",
  path: "/blog",
  description:
    "Articles and insights on AI, business growth, marketing, sales, leadership and Claude for Business by Dr. Mohamed Shoura.",
});

export default function BlogPage() {
  return <BlogView />;
}
