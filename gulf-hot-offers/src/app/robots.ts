import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gulfhotoffers.example';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/account'] }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
