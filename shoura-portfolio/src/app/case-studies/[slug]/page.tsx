import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { buildMetadata } from "@/lib/seo";
import { CaseStudyDetail } from "@/components/sections/CaseStudyDetail";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return buildMetadata({ title: "Case Study Not Found" });
  return buildMetadata({
    title: study.client.en,
    path: `/case-studies/${study.slug}`,
    description: study.challenge.en,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyDetail study={study} />;
}
