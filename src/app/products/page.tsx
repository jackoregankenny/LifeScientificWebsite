import { getProducts } from '@/lib/storyblok';
import ProductFilter from '@/components/Products/ProductFilter';
import ProductGrid from '@/components/Products/ProductGrid';
import type { ISbStoryData } from '@storyblok/react';
import type { ProductStoryblok } from '@/types/storyblok';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface StoryblokProduct extends ISbStoryData {
  content: ProductStoryblok;
}

type ProductCategory = NonNullable<ProductStoryblok['category']>;

export default async function ProductsPage({ searchParams }: Props) {
  const products = await getProducts() as StoryblokProduct[];
  const category = searchParams.category as ProductCategory | undefined;

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
          <ProductGrid 
            products={filteredProducts.map(product => ({
              ...product.content,
              slug: product.slug,
              _uid: product.uuid
            }))} 
          />
        </main>
      </div>
    </div>
  );
}