"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}

export function PageHero({ eyebrow, title, subtitle, crumbs }: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-charcoal-900 pt-32 pb-16 text-white md:pt-40 md:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-700 via-charcoal-900 to-charcoal-900" />
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A25D 1px, transparent 1px), linear-gradient(90deg, #C9A25D 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="container-x relative">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-white/50"
        >
          <Link href="/" className="inline-flex items-center gap-1 hover:text-gold-300">
            <Home className="h-3.5 w-3.5" aria-hidden />
            {t("nav.home")}
          </Link>
          {crumbs?.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {c.href ? (
                <Link href={c.href} className="hover:text-gold-300">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 max-w-3xl"
        >
          {eyebrow && (
            <span className="eyebrow text-gold-300">
              <span className="h-px w-6 bg-gold-400" aria-hidden />
              {eyebrow}
            </span>
          )}
          <h1 className="heading-xl mt-4 text-white">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
