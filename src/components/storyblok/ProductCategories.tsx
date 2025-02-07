// components/ProductCategories.tsx
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

interface ProductCategoriesProps {
  blok: {
    _uid: string;
    title: string;
    subtitle: string;
    categories: any[];
  }
}

const ProductCategories = ({ blok }: ProductCategoriesProps) => {
  return (
    <div {...storyblokEditable(blok)} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{blok.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{blok.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.categories?.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;