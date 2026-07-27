import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/contact";
import { programs } from "@/data/programs";
import { caseStudies } from "@/data/caseStudies";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/training-programs",
    "/consulting",
    "/case-studies",
    "/blog",
    "/media",
    "/contact",
    "/book",
    "/privacy-policy",
    "/terms",
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const programEntries: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${siteUrl}/training-programs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseEntries: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${siteUrl}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...programEntries,
    ...caseEntries,
    ...articleEntries,
  ];
}
