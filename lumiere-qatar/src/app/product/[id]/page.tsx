import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductActions from "@/components/ProductActions";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-blush/40 rounded-2xl flex items-center justify-center text-[10rem]">
          {product.emoji}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-espresso/50">{product.brand}</p>
          <h1 className="font-serif text-3xl sm:text-4xl mt-1">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span>⭐ {product.rating}</span>
            <span className="text-espresso/40">({product.reviews} reviews)</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">QAR {product.price}</span>
            {product.oldPrice && (
              <span className="text-espresso/40 line-through">QAR {product.oldPrice}</span>
            )}
          </div>

          <p className="mt-6 text-espresso/80 leading-relaxed">{product.description}</p>

          <ProductActions productName={product.name} />

          <div className="mt-8 p-4 bg-beige/40 rounded-xl text-sm">
            🚚 Order before 4 PM for next-day delivery in Doha. Delivery across Qatar in 1–3 business days.
            Cash on Delivery available.
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-serif text-lg mb-2">Benefits</h3>
              <ul className="list-disc list-inside text-sm text-espresso/80 space-y-1">
                {product.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">How to Use</h3>
              <p className="text-sm text-espresso/80">{product.howToUse}</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Ingredients</h3>
              <p className="text-sm text-espresso/80">{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl mb-6">You May Also Love</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
