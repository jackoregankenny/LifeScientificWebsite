// components/ProductCategories.tsx
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { ProductCategoriesStoryblok, CategoryCardStoryblok } from "@/types/storyblok";

interface ProductCategoriesProps {
  blok: ProductCategoriesStoryblok;
}

const ProductCategories = ({ blok }: ProductCategoriesProps) => {
  if (!blok) {
    console.error('No blok prop provided to ProductCategories component');
    return null;
  }

  // Parse categories string into array if needed
  const categoryBlocks = typeof blok.categories === 'string' 
    ? JSON.parse(blok.categories) as CategoryCardStoryblok[]
    : blok.categories || [];

  return (
    <div {...storyblokEditable(blok)} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {blok.title && (
            <h2 className="text-4xl font-bold mb-4">{blok.title}</h2>
          )}
          {blok.subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{blok.subtitle}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryBlocks.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;