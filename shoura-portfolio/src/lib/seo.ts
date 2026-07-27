import type { Metadata } from "next";
import { siteUrl } from "@/data/contact";

const siteName = "Dr. Mohamed Shoura";
const defaultDescription =
  "Dr. Mohamed Shoura — International Corporate Trainer, AI Consultant and Business Growth Expert. AI, marketing, sales and digital transformation training and consulting across the GCC and international markets.";

const keywords = [
  "Mohamed Shoura",
  "AI corporate trainer",
  "AI consultant UAE",
  "AI consultant Qatar",
  "Corporate trainer Dubai",
  "Corporate training Qatar",
  "AI for business training",
  "Claude for Business training",
  "AI for Sales training",
  "AI for HR training",
  "AI for Marketing training",
  "Marketing consultant UAE",
  "Business consultant Qatar",
  "Corporate training GCC",
];

interface PageMetaOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

/** Build consistent, SEO-friendly metadata for any page. */
export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = "/images/og-image.jpg",
  type = "website",
}: PageMetaOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle =
    path === "/" ? `${siteName} — International Corporate Trainer & AI Consultant` : `${title} | ${siteName}`;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName,
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
      locale: "en_US",
      alternateLocale: "ar_AE",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export { siteName, defaultDescription, keywords };
