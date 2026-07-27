"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  articles,
  articleCategories,
  type ArticleCategory,
} from "@/data/articles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArticleCard } from "@/components/ui/cards";

type Filter = ArticleCategory | "all";

export function BlogExplorer() {
  const { t, tl, locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory = filter === "all" || a.category === filter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = `${a.title[locale]} ${a.excerpt[locale]}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query, locale]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("blog.all") },
    ...articleCategories.map((c) => ({ key: c.key, label: tl(c.label) })),
  ];

  return (
    <section className="section bg-neutralbg">
      <div className="container-x">
        {/* Search */}
        <div className="mx-auto max-w-md">
          <div className="relative">
            <Search
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-300 ltr:left-4 rtl:right-4"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("blog.search")}
              aria-label={t("blog.search")}
              className="input-base ltr:pl-12 rtl:pr-12"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="no-scrollbar mt-6 flex justify-start gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
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

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-charcoal-400">
            {t("blog.noResults")}
          </p>
        ) : (
          <motion.div
            layout
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((article) => (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
