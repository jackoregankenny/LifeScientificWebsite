// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/lib/storyblok";
import type { ProductStoryblok, ProductVariantStoryblok } from "@/types/storyblok";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{product.content.name}</h1>
        
        {product.content.product?.filename && (
          <img
            src={product.content.product.filename}
            alt={product.content.name}
            className="w-full h-64 object-contain mb-8"
          />
        )}

        <div className="prose dark:prose-invert mb-8">
          {product.content.description}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Variants</h2>
          {product.content.variants?.map((variant) => (
            <ProductVariant
              key={variant._uid}
              blok={variant.content as ProductVariantStoryblok}
            />
          ))}
        </div>
      </div>
    </div>
  );
}