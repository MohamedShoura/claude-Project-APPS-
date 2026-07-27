"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t, tl, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={tl(profile.name)}
        >
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-burgundy font-display text-lg font-bold text-gold-200 shadow-soft`}
          >
            MS
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span
              className={`font-display text-base font-bold ${
                solid ? "text-charcoal-900" : "text-white"
              }`}
            >
              {tl(profile.shortName)}
            </span>
            <span
              className={`text-[11px] font-medium tracking-wide ${
                solid ? "text-charcoal-400" : "text-white/70"
              }`}
            >
              {isRTL ? "مدرب واستشاري" : "Trainer & Consultant"}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                solid
                  ? "text-charcoal-600 hover:bg-burgundy-50 hover:text-burgundy-700"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher light={!solid} />
          </div>
          <Link
            href="/book"
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-soft transition lg:inline-flex ${
              solid
                ? "bg-gradient-burgundy text-white hover:shadow-gold hover:brightness-110"
                : "bg-gold-400 text-burgundy-800 hover:brightness-105"
            }`}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            {t("cta.book")}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("common.close") : t("common.menu")}
            aria-expanded={open}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition xl:hidden ${
              solid
                ? "text-charcoal-800 hover:bg-charcoal-50"
                : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal-100 bg-white xl:hidden"
          >
            <nav
              className="container-x flex flex-col gap-1 py-4"
              aria-label="Mobile"
            >
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-charcoal-700 transition hover:bg-burgundy-50 hover:text-burgundy-700"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-charcoal-100 pt-4">
                <LanguageSwitcher />
                <Link
                  href="/book"
                  className="btn-primary flex-1 justify-center"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  {t("cta.book")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
