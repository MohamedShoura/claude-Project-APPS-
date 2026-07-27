import { siteUrl } from "@/data/contact";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { programs } from "@/data/programs";
import { companies } from "@/data/companies";
import type { Article } from "@/data/articles";

/**
 * JSON-LD schema.org builders. English content is used for structured
 * data (canonical machine-readable form).
 */

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name.en,
    jobTitle: profile.role.en,
    description: profile.heroSubtext.en,
    url: siteUrl,
    image: `${siteUrl}${profile.photo}`,
    email: `mailto:${contact.email}`,
    sameAs: [
      contact.social.linkedin,
      contact.social.instagram,
      contact.social.youtube,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Corporate Training",
      "Marketing Strategy",
      "Sales Development",
      "Business Consulting",
      "Digital Transformation",
    ],
    worksFor: companies.map((c) => ({
      "@type": "Organization",
      name: c.name.en,
    })),
  };
}

export function organizationSchema() {
  return companies.map((c) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: c.name.en,
    description: c.description.en,
    url: siteUrl,
    areaServed: ["GCC", "Middle East", "Africa"],
    founder: { "@type": "Person", name: profile.name.en },
  }));
}

export function coursesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: p.title.en,
        description: p.overview.en,
        url: `${siteUrl}/training-programs/${p.slug}`,
        provider: {
          "@type": "Organization",
          name: companies[0].name.en,
        },
      },
    })),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title.en,
    description: article.excerpt.en,
    image: `${siteUrl}${article.cover}`,
    datePublished: article.date,
    author: { "@type": "Person", name: profile.name.en },
    publisher: {
      "@type": "Organization",
      name: profile.name.en,
    },
  };
}

/** Render a JSON-LD script tag payload. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data);
}
