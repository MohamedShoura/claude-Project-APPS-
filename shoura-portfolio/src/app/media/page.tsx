import { buildMetadata } from "@/lib/seo";
import { MediaView } from "./MediaView";

export const metadata = buildMetadata({
  title: "Media & Gallery",
  path: "/media",
  description:
    "Photos and videos from Dr. Mohamed Shoura's corporate training sessions, international workshops, events and speaking engagements.",
});

export default function MediaPage() {
  return <MediaView />;
}
