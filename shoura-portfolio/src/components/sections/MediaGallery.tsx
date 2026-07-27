"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  mediaItems,
  mediaCategories,
  videos,
  type MediaCategory,
} from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Figure } from "@/components/ui/Figure";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Filter = MediaCategory | "all";

export function MediaGallery() {
  const { t, tl } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? mediaItems
        : mediaItems.filter((m) => m.category === filter),
    [filter],
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("blog.all") },
    ...mediaCategories.map((c) => ({ key: c.key, label: tl(c.label) })),
  ];

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length,
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, filtered.length]);

  const active = lightbox !== null ? filtered[lightbox] : null;

  return (
    <>
      <section className="section bg-neutralbg">
        <div className="container-x">
          {/* Filters */}
          <div className="no-scrollbar flex justify-start gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
            {filters.map((f) => {
              const activeFilter = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={activeFilter}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeFilter
                      ? "bg-gradient-burgundy text-white shadow-soft"
                      : "border border-charcoal-200 bg-white text-charcoal-600 hover:border-gold-300 hover:text-burgundy-700"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Masonry-style grid */}
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightbox(i)}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <Figure
                  src={item.image}
                  alt={tl(item.title)}
                  ratio={item.ratio === "square" ? "square" : item.ratio}
                  icon="Video"
                  label={tl(item.title)}
                  className="transition duration-300 group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("section.media.eyebrow")}
            title={tl({ en: "Videos", ar: "الفيديوهات" })}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-2xl border border-charcoal-100 shadow-card"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={tl(video.title)}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="flex items-center gap-2 p-4">
                  <Play className="h-4 w-4 text-burgundy-600" aria-hidden />
                  <span className="text-sm font-medium text-charcoal-700">
                    {tl(video.title)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal-900/90 p-4 backdrop-blur"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={tl(active.title)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label={t("common.close")}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) =>
                  i === null ? null : (i - 1 + filtered.length) % filtered.length,
                );
              }}
              aria-label="Previous"
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <motion.div
              key={active.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Figure
                src={active.image}
                alt={tl(active.title)}
                ratio="wide"
                icon="Video"
                label={tl(active.title)}
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {tl(active.title)}
              </p>
            </motion.div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) =>
                  i === null ? null : (i + 1) % filtered.length,
                );
              }}
              aria-label="Next"
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
