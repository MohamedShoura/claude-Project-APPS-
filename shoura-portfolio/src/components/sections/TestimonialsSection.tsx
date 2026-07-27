"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Figure } from "@/components/ui/Figure";

export function TestimonialsSection() {
  const { t, tl, isRTL } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="section relative overflow-hidden bg-gradient-burgundy text-white"
    >
      <div className="absolute inset-0 bg-hero-radial opacity-60" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={t("section.testimonials.eyebrow")}
          title={t("section.testimonials.title")}
          light
        />

        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur md:p-12">
            <Quote className="h-10 w-10 text-gold-300/70" aria-hidden />
            <div className="relative min-h-[9rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4"
                >
                  <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                    {tl(current.quote)}
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-gold-400/40">
                      <Figure
                        src={current.photo}
                        alt={tl(current.name)}
                        ratio="square"
                        icon="Users"
                        rounded={false}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {tl(current.name)}
                      </div>
                      <div className="text-sm text-white/60">
                        {tl(current.position)} · {tl(current.company)} ·{" "}
                        {tl(current.country)}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-gold-300">
                        {tl(current.program)}
                      </div>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(isRTL ? 1 : -1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5 rtl:-scale-x-100" aria-hidden />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((tItem, i) => (
                <button
                  key={tItem.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-400" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(isRTL ? -1 : 1)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden />
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-white/50">
            {t("common.placeholder")}
          </p>
        </div>
      </div>
    </section>
  );
}
