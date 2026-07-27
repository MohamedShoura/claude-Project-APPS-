"use client";

import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import type { Article } from "@/data/articles";
import { articleCategories, getRelatedArticles } from "@/data/articles";
import { siteUrl } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";
import { ArticleCard } from "@/components/ui/cards";
import { ShareButtons } from "@/components/ui/ShareButtons";

export function ArticleDetail({ article }: { article: Article }) {
  const { t, tl, tlList, locale } = useLanguage();
  const body = tlList(article.body);
  const related = getRelatedArticles(article);
  const category = articleCategories.find((c) => c.key === article.category);
  const url = `${siteUrl}/blog/${article.slug}`;
  const date = new Date(article.date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <PageHero
        eyebrow={category ? tl(category.label) : undefined}
        title={tl(article.title)}
        crumbs={[
          { label: t("nav.blog"), href: "/blog" },
          { label: tl(article.title) },
        ]}
      />

      <article className="section bg-white">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-400">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {article.readingMinutes} {t("blog.readTime")}
              </span>
            </div>

            <Figure
              src={article.cover}
              alt={tl(article.title)}
              ratio="wide"
              icon="PenTool"
              label={tl(article.title)}
              className="mt-6 shadow-soft"
            />

            <div className="mt-4 rounded-lg bg-gold-50 px-4 py-2 text-xs text-gold-700">
              {t("common.placeholder")}
            </div>

            <div className="prose-shoura mt-8 space-y-5 text-lg leading-relaxed text-charcoal-600">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-charcoal-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <ShareButtons url={url} title={tl(article.title)} />
              <Link href="/blog" className="btn-outline">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                {t("cta.backToBlog")}
              </Link>
            </div>
          </Reveal>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-charcoal-900">
                {t("blog.related")}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
