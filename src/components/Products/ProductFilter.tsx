'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface ProductFilterProps {
  categories: string[];
  activeCategory?: string;
}

export default function ProductFilter({ categories, activeCategory }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>
      <div className="space-y-2">
        <button
          onClick={() => router.push('/products')}
          className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
            !activeCategory
              ? 'bg-gray-900 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => router.push('/products?' + createQueryString('category', category))}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              activeCategory === category
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
} 