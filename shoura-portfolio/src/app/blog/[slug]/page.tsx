import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, articleSchema } from "@/lib/schema";
import { ArticleDetail } from "@/components/sections/ArticleDetail";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return buildMetadata({ title: "Article Not Found" });
  return buildMetadata({
    title: article.title.en,
    path: `/blog/${article.slug}`,
    description: article.excerpt.en,
    image: article.cover,
    type: "article",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(article)) }}
      />
      <ArticleDetail article={article} />
    </>
  );
}
