"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Counter } from "@/components/ui/Counter";
import { Figure } from "@/components/ui/Figure";

export function Hero() {
  const { t, tl, tlList, isRTL } = useLanguage();
  const titles = tlList(profile.titles);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % titles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [titles.length]);

  const Arrow = isRTL ? ArrowRight : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-charcoal-900 pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-700 via-charcoal-900 to-charcoal-900" />
      <div className="absolute inset-0 bg-hero-radial" />
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
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Copy */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {tl(profile.role)}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="heading-xl mt-6 text-white"
            >
              {tl(profile.heroHeadline)}
            </motion.h1>

            {/* Rotating titles */}
            <div className="mt-6 flex h-8 items-center gap-2 text-lg font-semibold sm:text-xl">
              <span className="text-white/50">
                {isRTL ? "" : "I am"}
              </span>
              <span className="relative inline-flex h-8 min-w-[14rem] items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-gradient-gold whitespace-nowrap"
                  >
                    {titles[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/70"
            >
              {tl(profile.heroSubtext)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/book" className="btn-gold">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                {t("cta.book")}
              </Link>
              <Link href="/training-programs" className="btn-ghost-light">
                {t("cta.explorePrograms")}
                <Arrow className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-gold opacity-20 blur-2xl" aria-hidden />
            <div className="relative rounded-[2rem] border border-gold-400/20 bg-white/5 p-2 backdrop-blur">
              <Figure
                src={profile.photo}
                alt={tl(profile.photoAlt)}
                ratio="portrait"
                icon="Users"
                label={isRTL ? "الصورة الشخصية" : "Professional Portrait"}
                priority
                className="rounded-[1.6rem]"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:grid-cols-4 md:mt-20"
        >
          {profile.stats.map((stat) => (
            <div key={stat.label.en} className="text-center">
              <div className="font-display text-3xl font-bold text-gold-300 sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 text-xs font-medium leading-tight text-white/60 sm:text-sm">
                {tl(stat.label)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
