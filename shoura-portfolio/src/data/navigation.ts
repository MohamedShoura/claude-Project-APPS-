import type { DictionaryKey } from "@/i18n/dictionary";

export interface NavItem {
  labelKey: DictionaryKey;
  href: string;
}

/** Primary navigation (also drives the mobile menu). */
export const mainNav: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.expertise", href: "/#expertise" },
  { labelKey: "nav.programs", href: "/training-programs" },
  { labelKey: "nav.consulting", href: "/consulting" },
  { labelKey: "nav.experience", href: "/#experience" },
  { labelKey: "nav.clients", href: "/#clients" },
  { labelKey: "nav.testimonials", href: "/#testimonials" },
  { labelKey: "nav.media", href: "/media" },
  { labelKey: "nav.contact", href: "/contact" },
];

/** Condensed footer navigation. */
export const footerNav: NavItem[] = [
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.programs", href: "/training-programs" },
  { labelKey: "nav.consulting", href: "/consulting" },
  { labelKey: "nav.caseStudies", href: "/case-studies" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.contact", href: "/contact" },
];
