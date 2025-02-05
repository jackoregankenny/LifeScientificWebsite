import { getProducts } from '@/lib/storyblok';
import Link from 'next/link';
import type { ProductVariantStoryblok } from '@/types/storyblok';
import ProductFilters from '@/components/Products/ProductFilters';

export const revalidate = 3600; // ISR every hour

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getProducts();
  
  // Extract unique categories and countries from products
  const cropGroups = new Set<string>();
  const countries = new Set<string>();
  
  products.forEach((product) => {
    product.content.variants?.forEach((variant: ProductVariantStoryblok) => {
      if (variant.crop_group) cropGroups.add(variant.crop_group);
      if (variant.country) countries.add(variant.country);
    });
  });

  const selectedCropGroup = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const selectedCountry = typeof searchParams.country === 'string' ? searchParams.country : undefined;

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (!selectedCropGroup && !selectedCountry) return true;
    
    return product.content.variants?.some(
      (variant: ProductVariantStoryblok) =>
        (!selectedCropGroup || variant.crop_group === selectedCropGroup) &&
        (!selectedCountry || variant.country === selectedCountry)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>
      
      {/* Filters */}
      <ProductFilters
        cropGroups={Array.from(cropGroups)}
        countries={Array.from(countries)}
        selectedCropGroup={selectedCropGroup}
        selectedCountry={selectedCountry}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No products found matching the selected filters.
          </div>
        ) : (
          filteredProducts.map((product) => (
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
              {product.content.variants && product.content.variants.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.content.variants.map((variant: ProductVariantStoryblok) => (
                    <span
                      key={variant._uid}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
                    >
                      {variant.crop_group}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}