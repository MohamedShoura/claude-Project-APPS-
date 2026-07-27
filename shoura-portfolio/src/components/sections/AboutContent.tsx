"use client";

import Link from "next/link";
import { Download, Mail, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";
import { Counter } from "@/components/ui/Counter";

export function AboutContent() {
  const { t, tl, tlList } = useLanguage();
  const bio = tlList(profile.bio);
  const focus = tlList(profile.focusAreas);

  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Portrait + stats */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Figure
                src={profile.photo}
                alt={tl(profile.photoAlt)}
                ratio="portrait"
                icon="Briefcase"
                label={tl(profile.shortName)}
                className="shadow-soft"
              />
              <div className="mt-6 grid grid-cols-2 gap-3">
                {profile.stats.map((stat) => (
                  <div
                    key={stat.label.en}
                    className="rounded-2xl border border-charcoal-100 bg-neutralbg p-4 text-center"
                  >
                    <div className="font-display text-2xl font-bold text-burgundy-700">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-xs text-charcoal-500">
                      {tl(stat.label)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a href={profile.profilePdf} download className="btn-primary justify-center">
                  <Download className="h-4 w-4" aria-hidden />
                  {t("cta.downloadProfile")}
                </a>
                <Link href="/contact" className="btn-outline justify-center">
                  <Mail className="h-4 w-4" aria-hidden />
                  {t("cta.contactShoura")}
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Biography */}
          <Reveal delay={0.1}>
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold-400" aria-hidden />
              {t("section.about.eyebrow")}
            </span>
            <h2 className="heading-lg mt-4 text-charcoal-900">
              {tl(profile.name)}
            </h2>
            <p className="mt-2 text-lg font-medium text-burgundy-700">
              {tl(profile.role)}
            </p>
            <div className="mt-6 space-y-4 leading-relaxed text-charcoal-600">
              {bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-10 font-display text-xl font-semibold text-charcoal-900">
              {tl({ en: "Areas of Focus", ar: "مجالات التركيز" })}
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {focus.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 rounded-xl border border-charcoal-100 bg-neutralbg px-4 py-3 text-sm font-medium text-charcoal-700"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-500" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
