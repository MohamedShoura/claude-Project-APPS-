"use client";

import Link from "next/link";
import { Download, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { countries } from "@/data/experience";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";

export function AboutPreview() {
  const { t, tl, tlList } = useLanguage();
  const bio = tlList(profile.bio);
  const focus = tlList(profile.focusAreas);

  return (
    <section id="about" className="section bg-white">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold-400" aria-hidden />
              {t("section.about.eyebrow")}
            </span>
            <h2 className="heading-lg mt-4 text-charcoal-900">
              {t("section.about.title")}
            </h2>
            <div className="mt-6 space-y-4 text-charcoal-500">
              <p className="leading-relaxed">{bio[0]}</p>
              <p className="leading-relaxed">{bio[1]}</p>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {focus.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-charcoal-600"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-gold-500"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.profilePdf}
                download
                className="btn-primary"
              >
                <Download className="h-4 w-4" aria-hidden />
                {t("cta.downloadProfile")}
              </a>
              <Link href="/about" className="btn-outline">
                {t("cta.viewExperience")}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
              <Link href="/contact" className="btn-outline">
                {t("cta.contactShoura")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-burgundy opacity-10 blur-2xl"
                aria-hidden
              />
              <Figure
                src="/images/shoura-about.jpg"
                alt={tl(profile.photoAlt)}
                ratio="portrait"
                icon="Briefcase"
                label={tl(profile.shortName)}
                className="relative shadow-soft"
              />
              {/* Floating countries card */}
              <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-charcoal-100 bg-white/95 p-4 shadow-soft backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold text-burgundy-700">
                  <MapPin className="h-4 w-4 text-gold-500" aria-hidden />
                  {countries.length}+ {t("nav.experience")}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {countries.slice(0, 6).map((c) => (
                    <span key={c.code} className="chip">
                      {tl(c.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
