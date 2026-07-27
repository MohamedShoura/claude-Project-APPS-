import { buildMetadata } from "@/lib/seo";
import { ProgramsView } from "./ProgramsView";

export const metadata = buildMetadata({
  title: "Training Programs",
  path: "/training-programs",
  description:
    "Corporate training programs by Dr. Mohamed Shoura — Claude for Business, AI for Sales, AI for Marketing, AI for HR, AI for Finance and more, delivered across the GCC and internationally.",
});

export default function TrainingProgramsPage() {
  return <ProgramsView />;
}
