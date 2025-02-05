// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/lib/storyblok";
import type { ProductStoryblok, ProductVariantStoryblok } from "@/types/storyblok";
import ProductGallery from "@/components/Products/ProductGallery";
import ProductTabs from "@/components/Products/ProductTabs";
import Layout from "@/components/Layout";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  
  // Extract active ingredients and documents from variants
  const activeIngredients = product.content.variants?.flatMap(
    (variant: ProductVariantStoryblok) => 
      variant.details?.filter((detail: any) => 
        detail.component === "active_ingredients"
      ) || []
  );

  const documents = product.content.variants?.flatMap(
    (variant: ProductVariantStoryblok) => 
      variant.details?.filter((detail: any) => 
        detail.component === "product_documents"
      ) || []
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400">
            <a href="/products" className="hover:text-blue-500 transition-colors">Products</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-200">{product.content.name}</span>
          </nav>

          {/* Product Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.content.name}</h1>
                {product.content.tagline && (
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {product.content.tagline}
                  </p>
                )}
              </div>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-3">
                {product.content.variants?.[0]?.crop_group && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                    {product.content.variants[0].crop_group}
                  </span>
                )}
                {product.content.variants?.[0]?.formulation_type && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                    {product.content.variants[0].formulation_type}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Gallery */}
            <div>
              {product.content.product && (
                <ProductGallery
                  mainImage={product.content.product}
                  additionalImages={[]} // Add additional images if available in your schema
                />
              )}
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-8">
              {/* Key Features */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <div className="grid gap-4">
                  {product.content.variants?.[0]?.mechanism_of_action && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mode of Action</h3>
                      <p className="mt-1 text-lg">{product.content.variants[0].mechanism_of_action}</p>
                    </div>
                  )}
                  {product.content.variants?.[0]?.crop && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Crop</h3>
                      <p className="mt-1 text-lg">{product.content.variants[0].crop}</p>
                    </div>
                  )}
                  {product.content.variants?.[0]?.approval_number && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Approval Number</h3>
                      <p className="mt-1 text-lg">{product.content.variants[0].approval_number}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              {documents && documents.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {documents.slice(0, 2).map((doc: any) => (
                    <a
                      key={doc._uid}
                      href={doc.link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      View {doc.document_name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <ProductTabs
            description={product.content.description}
            variants={product.content.variants || []}
            activeIngredients={activeIngredients}
            documents={documents}
          />

          {/* Related Products */}
          {/* Add related products section here if available in your schema */}
        </div>
      </div>
    </Layout>
  );
}