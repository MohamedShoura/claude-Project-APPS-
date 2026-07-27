"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  programs,
  programCategories,
  type ProgramCategory,
} from "@/data/programs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ProgramCard } from "@/components/ui/cards";

type Filter = ProgramCategory | "all";

export function ProgramsExplorer() {
  const { t, tl } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? programs
        : programs.filter((p) => p.category === filter),
    [filter],
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("program.filter.all") },
    ...programCategories.map((c) => ({ key: c.key, label: tl(c.label) })),
  ];

  return (
    <section className="section bg-neutralbg">
      <div className="container-x">
        {/* Filters */}
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:flex-wrap sm:justify-center">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-gradient-burgundy text-white shadow-soft"
                    : "border border-charcoal-200 bg-white text-charcoal-600 hover:border-gold-300 hover:text-burgundy-700"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((program) => (
              <motion.div
                key={program.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
