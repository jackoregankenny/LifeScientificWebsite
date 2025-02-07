// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react/rsc";
import Product from "@/components/storyblok/Product";
import Layout from "@/components/Layout";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  try {
    const { slug } = await params;
    const story = await getProductBySlug(slug);
    
    return (
      <Layout>
        <div {...storyblokEditable(story.content)}>
          <Product blok={story.content} />
        </div>
      </Layout>
    );
  } catch (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h1 className="text-red-800 text-lg font-semibold">Error</h1>
            <p className="text-red-600">
              Failed to load product. Please try again later.
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}