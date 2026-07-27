"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/ui/cards";

export function BlogPreview() {
  const { t } = useLanguage();
  const latest = articles.slice(0, 3);

  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.blog.eyebrow")}
          title={t("section.blog.title")}
          subtitle={t("section.blog.subtitle")}
        />
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <StaggerItem key={article.slug} className="h-full">
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <Link href="/blog" className="btn-outline">
            {t("cta.viewAll")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
