"use client";

import Link from "next/link";
import {
  AlertCircle,
  Lightbulb,
  Wrench,
  ListChecks,
  Trophy,
  Quote,
  ArrowLeft,
  CalendarCheck,
} from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const { t, tl, tlList } = useLanguage();
  const tools = tlList(study.tools);
  const approach = tlList(study.approach);

  return (
    <>
      <PageHero
        eyebrow={tl(study.category)}
        title={tl(study.client)}
        crumbs={[
          { label: t("nav.caseStudies"), href: "/case-studies" },
          { label: tl(study.client) },
        ]}
      />

      <section className="section bg-white">
        <div className="container-x max-w-4xl">
          <Reveal>
            <Figure
              src={`/images/cases/${study.slug}.jpg`}
              alt={tl(study.client)}
              ratio="wide"
              icon={study.icon}
              label={tl(study.category)}
              className="shadow-soft"
            />
          </Reveal>

          <div className="mt-12 space-y-10">
            <Block
              icon={<AlertCircle className="h-5 w-5" />}
              title={t("case.challenge")}
            >
              {tl(study.challenge)}
            </Block>

            <Block
              icon={<Lightbulb className="h-5 w-5" />}
              title={t("case.solution")}
            >
              {tl(study.solution)}
            </Block>

            <Reveal>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <SubTitle icon={<Wrench className="h-4 w-4" />}>
                    {t("case.tools")}
                  </SubTitle>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span key={tool} className="chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <SubTitle icon={<ListChecks className="h-4 w-4" />}>
                    {t("case.approach")}
                  </SubTitle>
                  <ol className="mt-3 space-y-2">
                    {approach.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-sm text-charcoal-600"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-xs font-bold text-burgundy-700">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>

            {/* Result */}
            <Reveal>
              <div className="rounded-2xl bg-gradient-burgundy p-8 text-white">
                <div className="flex items-center gap-2 text-gold-300">
                  <Trophy className="h-5 w-5" aria-hidden />
                  <h3 className="font-display text-lg font-semibold">
                    {t("case.result")}
                  </h3>
                </div>
                <p className="mt-3 text-white/90">{tl(study.result)}</p>
              </div>
            </Reveal>

            {/* Testimonial */}
            <Reveal>
              <figure className="rounded-2xl border border-charcoal-100 bg-neutralbg p-8">
                <Quote className="h-8 w-8 text-gold-400" aria-hidden />
                <blockquote className="mt-3 text-lg italic text-charcoal-700">
                  {tl(study.testimonial)}
                </blockquote>
                <figcaption className="mt-3 text-xs text-charcoal-400">
                  {t("common.placeholder")}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                {t("cta.book")}
              </Link>
              <Link href="/case-studies" className="btn-outline">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                {t("cta.backToCaseStudies")}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-2 text-burgundy-700">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-burgundy-50">
          {icon}
        </span>
        <h3 className="font-display text-xl font-semibold text-charcoal-900">
          {title}
        </h3>
      </div>
      <p className="mt-3 leading-relaxed text-charcoal-600">{children}</p>
    </Reveal>
  );
}

function SubTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-600">
      {icon}
      {children}
    </h4>
  );
}
