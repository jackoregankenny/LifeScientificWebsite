import { getProducts } from '@/lib/storyblok';
import ProductFilter from '@/components/Products/ProductFilter';
import ProductGrid from '@/components/Products/ProductGrid';
import type { ISbStoryData } from '@storyblok/react';
import type { ProductStoryblok } from '@/types/storyblok';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface StoryblokProduct extends ISbStoryData {
  content: ProductStoryblok;
}

type ProductCategory = NonNullable<ProductStoryblok['category']>;

export default async function ProductsPage({ searchParams }: Props) {
  let products: StoryblokProduct[] = [];
  let error: string | null = null;

  try {
    products = await getProducts() as StoryblokProduct[];
  } catch (e) {
    console.error('Error loading products:', e);
    error = 'Failed to load products. Please try again later.';
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h1 className="text-red-800 text-lg font-semibold">Error</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const params = await searchParams;
  const category = params.category as ProductCategory | undefined;

  // Get unique categories from products
  const categories = Array.from(
    new Set(
      products
        .map((product) => product.content.category)
        .filter((cat): cat is ProductCategory => cat !== undefined && cat !== '')
    )
  );

  // Filter products by category if one is selected
  const filteredProducts = category
    ? products.filter((product) => product.content.category === category)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64">
          <ProductFilter categories={categories} activeCategory={category} />
        </aside>
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <ProductGrid 
              products={filteredProducts.map(product => ({
                ...product.content,
                slug: product.slug,
                _uid: product.uuid
              }))} 
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {category 
                  ? `No products found in the ${category} category.`
                  : 'No products available at the moment.'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}