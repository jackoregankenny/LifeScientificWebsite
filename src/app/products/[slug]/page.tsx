// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react/rsc";
import Product from "@/components/storyblok/Product";
import Layout from "@/components/Layout";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getProductBySlug(params.slug);
  
  return (
    <Layout>
      <div {...storyblokEditable(story.content)}>
        <Product blok={story.content} />
      </div>
    </Layout>
  );
}