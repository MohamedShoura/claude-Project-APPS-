import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { products } from "@/data/products";

const BASE_URL = "https://neelstore.example";

const STATIC_PATHS = [
  "",
  "/shop",
  "/offers",
  "/new-arrivals",
  "/best-sellers",
  "/track-order",
  "/shipping-policy",
  "/return-policy",
  "/privacy-policy",
  "/terms",
  "/contact",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const product of products) {
      entries.push({
        url: `${BASE_URL}/${locale}/product/${product.slug}`,
        changeFrequency: "daily",
        priority: 0.9,
      });
    }
  }

  return entries;
}
