// components/ProductVariant.tsx
import type { ProductVariantStoryblok } from "@/types/storyblok";

export default function ProductVariant({ blok }: { blok: ProductVariantStoryblok }) {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-medium">{blok.crop}</h3>
      <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
        <div>
          <p>Country: {blok.country}</p>
          <p>Container: {blok.container_size} {blok.size_unit}</p>
        </div>
        <div>
          <p>Weight: {blok.weight}{blok.weight_units}</p>
          <p>Units/Package: {blok.units_per_package}</p>
        </div>
      </div>
      
      {blok.details?.map((detail) => (
        detail.component === 'active_ingredients' ? (
          <div key={detail._uid} className="mt-4 pt-4 border-t">
            <p>{detail.name}: {detail.amount}{detail.units}</p>
          </div>
        ) : null
      ))}
    </div>
  );
}