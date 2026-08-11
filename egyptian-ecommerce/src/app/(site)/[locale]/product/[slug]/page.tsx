import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getFrequentlyBoughtWith, products } from "@/data/products";
import { isLocale, defaultLocale } from "@/i18n/config";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductTabs } from "@/components/product/ProductTabs";
import { FrequentlyBoughtTogether } from "@/components/product/FrequentlyBoughtTogether";
import { RecentlyViewedRow } from "@/components/product/RecentlyViewedRow";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const desc = locale === "ar" ? product.shortDescAr : product.shortDescEn;
  return {
    title: name,
    description: desc,
    alternates: { canonical: `/${locale}/product/${slug}` },
    openGraph: { title: name, description: desc, images: product.images[0] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const bundle = getFrequentlyBoughtWith(product, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: locale === "ar" ? product.nameAr : product.nameEn,
    description: locale === "ar" ? product.descriptionAr : product.descriptionEn,
    image: product.images,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} />
      <div className="mx-auto max-w-7xl px-4">
        <ProductTabs product={product} />
      </div>
      <FrequentlyBoughtTogether main={product} extras={bundle} />
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <SectionHeading
            title={dict.product.alsoLike}
            locale={locale}
            viewAllHref={localePath(locale, `/shop?category=${product.category}`)}
            viewAllLabel={dict.common.viewAll}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
      <RecentlyViewedRow excludeId={product.id} />
    </>
  );
}
