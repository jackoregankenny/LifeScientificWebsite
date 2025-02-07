'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ProductStoryblok } from '@/types/storyblok';

interface ProductGridProps {
  products: ProductStoryblok[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product._uid}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
            {product.product?.filename ? (
              <div className="relative h-48">
                <Image
                  src={product.product.filename}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{product.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 capitalize">
                  {product.category}
                </span>
                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                  View Details
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 