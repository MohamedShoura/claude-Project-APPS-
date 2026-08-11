import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/*/cart", "/*/checkout", "/*/account", "/*/search"],
      },
    ],
    sitemap: "https://neelstore.example/sitemap.xml",
  };
}
