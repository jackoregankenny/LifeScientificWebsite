import { storyblokInit, apiPlugin } from '@storyblok/js';

const { storyblokApi } = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
});

export async function getProducts() {
  const { data } = await storyblokApi.get('cdn/stories', {
    starts_with: 'products/',
    content_type: 'product',
    version: 'published',
    cv: Date.now(),
  });

  return data.stories as ISbStoryData<ProductStoryblok>[];
}

export async function getProductBySlug(slug: string) {
  const { data } = await storyblokApi.get(`cdn/stories/products/${slug}`, {
    version: 'published',
    cv: Date.now(),
  });

  return data.story as ISbStoryData<ProductStoryblok>;
}