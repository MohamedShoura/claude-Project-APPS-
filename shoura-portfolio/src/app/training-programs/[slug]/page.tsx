import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { programs, getProgram } from "@/data/programs";
import { buildMetadata } from "@/lib/seo";
import { ProgramDetail } from "@/components/sections/ProgramDetail";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return buildMetadata({ title: "Program Not Found" });
  return buildMetadata({
    title: program.title.en,
    path: `/training-programs/${program.slug}`,
    description: program.overview.en,
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  return <ProgramDetail program={program} />;
}
