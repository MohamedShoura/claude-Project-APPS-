"use client";

import Link from "next/link";
import { Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import { footerNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { getFeaturedPrograms } from "@/data/programs";
import { services } from "@/data/services";
import { companies } from "@/data/companies";
import { contact } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t, tl } = useLanguage();
  const year = new Date().getFullYear();
  const programs = getFeaturedPrograms().slice(0, 5);

  return (
    <footer className="bg-charcoal-900 text-white/80">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + bio */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-burgundy font-display text-lg font-bold text-gold-200">
                MS
              </span>
              <span className="font-display text-lg font-bold text-white">
                {tl(profile.name)}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={contact.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <FooterColumn title={t("footer.quickLinks")}>
            {footerNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {t(item.labelKey)}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Programs */}
          <FooterColumn title={t("footer.programs")}>
            {programs.map((p) => (
              <FooterLink
                key={p.slug}
                href={`/training-programs/${p.slug}`}
              >
                {tl(p.title)}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Consulting */}
          <FooterColumn title={t("footer.consulting")}>
            {services.slice(0, 5).map((s) => (
              <FooterLink key={s.slug} href="/consulting">
                {tl(s.title)}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Companies */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {companies.map((c) => (
            <span
              key={c.slug}
              className="text-sm font-semibold text-white/50"
            >
              {tl(c.name)}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {tl(profile.name)}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gold-300">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-gold-300">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-300">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/60 transition hover:text-gold-300"
      >
        {children}
      </Link>
    </li>
  );
}
