'use client';

import type { ProductStoryblok } from '@/types/storyblok';
import type { ISbStoryData } from '@storyblok/react';
import ProductFilters from './ProductFilters';

type CountryType = "" | "IE" | "UK";

interface ProductsListProps {
  products: ISbStoryData<ProductStoryblok>[];
  initialCategory?: string;
  initialCountry?: string;
}

export default function ProductsList({ 
  products,
  initialCategory,
  initialCountry
}: ProductsListProps) {
  // Get unique crop groups and countries for filters
  const cropGroups = [...new Set(products.flatMap((product) => 
    product.content.variants?.map(variant => variant.crop_group).filter((group): group is string => 
      typeof group === 'string' && group !== ''
    ) || []
  ))] as string[];

  const countries = [...new Set(products.flatMap((product) => 
    product.content.variants?.map(variant => variant.country).filter((country): country is CountryType => 
      country === "IE" || country === "UK"
    ) || []
  ))] as CountryType[];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const variant = product.content.variants?.[0];
    if (!variant) return true;

    if (initialCategory && variant.crop_group !== initialCategory) {
      return false;
    }

    if (initialCountry && variant.country !== initialCountry) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <ProductFilters
        cropGroups={cropGroups}
        countries={countries}
        selectedCropGroup={initialCategory}
        selectedCountry={initialCountry}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <a
            key={product.uuid}
            href={`/products/${product.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              {product.content.product && (
                <img
                  src={product.content.product.filename || ''}
                  alt={product.content.product.alt || ''}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.content.name}</h2>
              {product.content.tagline && (
                <p className="text-gray-600 dark:text-gray-300">
                  {product.content.tagline}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 