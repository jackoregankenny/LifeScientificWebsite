// components/ProductCard.tsx
import type { ProductStoryblok } from "@/types/storyblok";
import Link from "next/link";

export default function ProductCard({ blok }: { blok: ProductStoryblok }) {
  return (
    <Link
      href={`/products/${blok.slug}`}
      className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square mb-4">
        {blok.product?.filename && (
          <img
            src={blok.product.filename}
            alt={blok.product.alt || blok.name}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <h2 className="text-xl font-semibold">{blok.name}</h2>
      <p className="text-muted-foreground mt-2">{blok.tagline}</p>
    </Link>
  );
}