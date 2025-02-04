import { getProducts } from '@/lib/storyblok';
import Link from 'next/link';

export const revalidate = 3600; // ISR every hour

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.uuid}
            href={`/products/${product.slug}`}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square mb-4">
              {product.content.product?.filename && (
                <img
                  src={product.content.product.filename}
                  alt={product.content.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold">{product.content.name}</h2>
            <p className="text-muted-foreground mt-2">
              {product.content.tagline}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}