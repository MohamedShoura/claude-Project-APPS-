"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Users, CalendarDays } from "lucide-react";
import { Icon } from "./Icon";
import { Figure } from "./Figure";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Expertise } from "@/data/expertise";
import type { Program } from "@/data/programs";
import type { Service } from "@/data/services";
import type { CaseStudy } from "@/data/caseStudies";
import type { Article } from "@/data/articles";

/* ----------------------------- Expertise ----------------------------- */
export function ExpertiseCard({ item }: { item: Expertise }) {
  const { t, tl } = useLanguage();
  return (
    <div className="card-base card-hover group flex h-full flex-col p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-burgundy-50 text-burgundy-600 transition group-hover:bg-gradient-burgundy group-hover:text-gold-200">
        <Icon name={item.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-charcoal-900">
        {tl(item.title)}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
        {tl(item.description)}
      </p>
      <div className="mt-4 rounded-lg bg-gold-50 px-3 py-2 text-xs font-medium text-gold-700">
        {tl(item.outcome)}
      </div>
      <Link
        href="/training-programs"
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burgundy-700 transition hover:gap-2"
      >
        {t("cta.learnMore")}
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
      </Link>
    </div>
  );
}

/* ------------------------------ Program ------------------------------ */
export function ProgramCard({ program }: { program: Program }) {
  const { t, tl, tlList } = useLanguage();
  const formats = tlList(program.formats);
  return (
    <article className="card-base card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative">
        <Figure
          src={`/images/programs/${program.slug}.jpg`}
          alt={tl(program.title)}
          ratio="wide"
          icon={program.icon}
          rounded={false}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-burgundy-700 shadow-sm rtl:left-auto rtl:right-4">
          {tl(program.title)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-charcoal-900">
          {tl(program.title)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
          {tl(program.overview)}
        </p>

        <dl className="mt-4 space-y-2 text-xs text-charcoal-500">
          <div className="flex items-start gap-2">
            <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" aria-hidden />
            <dd>{tl(program.audience)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 shrink-0 text-gold-500" aria-hidden />
            <dd>{tl(program.duration)}</dd>
          </div>
        </dl>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {formats.slice(0, 3).map((f) => (
            <span key={f} className="chip">
              {f}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/training-programs/${program.slug}`}
            className="btn-outline flex-1 justify-center px-4 py-2 text-xs"
          >
            {t("cta.viewProgram")}
          </Link>
          <Link
            href={`/book?program=${program.slug}`}
            className="btn-primary flex-1 justify-center px-4 py-2 text-xs"
          >
            {t("cta.requestTraining")}
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Service ------------------------------ */
export function ServiceCard({ service }: { service: Service }) {
  const { t, tl } = useLanguage();
  return (
    <div className="card-base card-hover flex h-full flex-col p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold text-burgundy-800">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-charcoal-900">
        {tl(service.title)}
      </h3>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-burgundy-600">
            {t("consulting.challenge")}
          </p>
          <p className="mt-0.5 text-charcoal-500">{tl(service.challenge)}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-burgundy-600">
            {t("consulting.solution")}
          </p>
          <p className="mt-0.5 text-charcoal-500">{tl(service.solution)}</p>
        </div>
        <div className="rounded-lg bg-burgundy-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-burgundy-600">
            {t("consulting.outcome")}
          </p>
          <p className="mt-0.5 font-medium text-burgundy-800">
            {tl(service.outcome)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Case Study ---------------------------- */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { t, tl } = useLanguage();
  return (
    <article className="card-base card-hover group flex h-full flex-col overflow-hidden">
      <Figure
        src={`/images/cases/${study.slug}.jpg`}
        alt={tl(study.client)}
        ratio="wide"
        icon={study.icon}
        rounded={false}
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{tl(study.category)}</span>
        <h3 className="mt-3 font-display text-lg font-semibold text-charcoal-900">
          {tl(study.client)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
          {tl(study.challenge)}
        </p>
        <Link
          href={`/case-studies/${study.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burgundy-700 transition hover:gap-2"
        >
          {t("cta.viewCaseStudy")}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------ Article ------------------------------ */
export function ArticleCard({ article }: { article: Article }) {
  const { t, tl, locale } = useLanguage();
  const date = new Date(article.date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );
  return (
    <article className="card-base card-hover group flex h-full flex-col overflow-hidden">
      <Figure
        src={article.cover}
        alt={tl(article.title)}
        ratio="wide"
        icon="PenTool"
        rounded={false}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-charcoal-400">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            {date}
          </span>
          <span>·</span>
          <span>
            {article.readingMinutes} {t("blog.readTime")}
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-charcoal-900 transition group-hover:text-burgundy-700">
          {tl(article.title)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
          {tl(article.excerpt)}
        </p>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burgundy-700 transition hover:gap-2"
        >
          {t("cta.readMore")}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
