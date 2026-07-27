"use client";

import Link from "next/link";
import {
  Clock,
  Users,
  Layers,
  CheckCircle2,
  CalendarCheck,
  ArrowLeft,
  Tag,
} from "lucide-react";
import {
  type Program,
  programCategories,
  getRelatedPrograms,
} from "@/data/programs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";
import { Icon } from "@/components/ui/Icon";
import { ProgramCard } from "@/components/ui/cards";

export function ProgramDetail({ program }: { program: Program }) {
  const { t, tl, tlList } = useLanguage();
  const outcomes = tlList(program.outcomes);
  const modules = tlList(program.modules);
  const formats = tlList(program.formats);
  const related = getRelatedPrograms(program);
  const category = programCategories.find((c) => c.key === program.category);

  return (
    <>
      <PageHero
        eyebrow={category ? tl(category.label) : undefined}
        title={tl(program.title)}
        subtitle={tl(program.overview)}
        crumbs={[
          { label: t("nav.programs"), href: "/training-programs" },
          { label: tl(program.title) },
        ]}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            {/* Main */}
            <Reveal>
              <Figure
                src={`/images/programs/${program.slug}.jpg`}
                alt={tl(program.title)}
                ratio="wide"
                icon={program.icon}
                label={tl(program.title)}
                className="shadow-soft"
              />

              <h2 className="mt-10 font-display text-2xl font-semibold text-charcoal-900">
                {t("program.overview")}
              </h2>
              <p className="mt-3 leading-relaxed text-charcoal-600">
                {tl(program.overview)}
              </p>

              <h3 className="mt-8 font-display text-xl font-semibold text-charcoal-900">
                {t("program.outcomes")}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 rounded-xl border border-charcoal-100 bg-neutralbg px-4 py-3 text-sm text-charcoal-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 font-display text-xl font-semibold text-charcoal-900">
                {t("program.modules")}
              </h3>
              <ol className="mt-4 space-y-3">
                {modules.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-center gap-4 rounded-xl border border-charcoal-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-burgundy text-sm font-bold text-gold-200">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-charcoal-700">{m}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div className="card-base p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-burgundy text-gold-200">
                    <Icon name={program.icon} className="h-6 w-6" />
                  </div>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-600">
                        <Tag className="h-3.5 w-3.5" aria-hidden />
                        {t("program.category")}
                      </dt>
                      <dd className="mt-1 text-charcoal-700">
                        {category ? tl(category.label) : ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-600">
                        <Users className="h-3.5 w-3.5" aria-hidden />
                        {t("program.audience")}
                      </dt>
                      <dd className="mt-1 text-charcoal-700">
                        {tl(program.audience)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-600">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {t("program.duration")}
                      </dt>
                      <dd className="mt-1 text-charcoal-700">
                        {tl(program.duration)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-600">
                        <Layers className="h-3.5 w-3.5" aria-hidden />
                        {t("program.formats")}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {formats.map((f) => (
                          <span key={f} className="chip">
                            {f}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 space-y-3">
                    <Link
                      href={`/book?program=${program.slug}`}
                      className="btn-primary w-full justify-center"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden />
                      {t("cta.requestTraining")}
                    </Link>
                    <Link
                      href="/training-programs"
                      className="btn-outline w-full justify-center"
                    >
                      <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                      {t("cta.backToPrograms")}
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-semibold text-charcoal-900">
                {t("program.related")}
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProgramCard key={p.slug} program={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
