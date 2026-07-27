import { buildMetadata } from "@/lib/seo";
import { BookView } from "./BookView";

export const metadata = buildMetadata({
  title: "Book a Consultation",
  path: "/book",
  description:
    "Book a consultation or request a customized corporate training proposal from Dr. Mohamed Shoura — AI, marketing, sales and business consulting.",
});

export default function BookPage() {
  return <BookView />;
}
