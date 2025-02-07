import { storyblokEditable } from "@storyblok/react";
import type { ProductStoryblok, AssetStoryblok } from "@/types/storyblok";
import ProductGallery from "@/components/Products/ProductGallery";
import ProductTabs from "@/components/Products/ProductTabs";

interface ProductProps {
  blok: ProductStoryblok;
}

// Helper function to convert AssetStoryblok to the simpler image type
const convertAssetToImage = (asset: AssetStoryblok) => ({
  filename: asset.filename || '',
  alt: asset.alt || '',
});

const Product = ({ blok }: ProductProps) => {
  // Extract active ingredients and documents from variants
  const activeIngredients = blok.variants?.flatMap(
    (variant) => 
      variant.details?.filter((detail) => 
        detail.component === "active_ingredients"
      ) || []
  );

  const documents = blok.variants?.flatMap(
    (variant) => 
      variant.details?.filter((detail) => 
        detail.component === "product_documents"
      ) || []
  );

  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Product Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{blok.name}</h1>
              {blok.tagline && (
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {blok.tagline}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            {blok.product && (
              <ProductGallery
                mainImage={convertAssetToImage(blok.product)}
                additionalImages={[]}
              />
            )}
          </div>

          {/* Product Info */}
          <div>
            <ProductTabs
              description={typeof blok.description === 'string' ? { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: blok.description }] }] } : blok.description}
              variants={blok.variants || []}
              activeIngredients={activeIngredients}
              documents={documents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product; 