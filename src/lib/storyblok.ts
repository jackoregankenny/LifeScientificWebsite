import { getStoryblokApi } from '@storyblok/react/rsc';
import StoryblokClient from 'storyblok-js-client';

// Create a Storyblok client for server-side operations
const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
});

export async function getProducts() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'published',
      starts_with: 'products/',
      is_startpage: false
    });

    return data.stories;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/products/${slug}`, {
      version: 'published',
    });

    return data.story;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// For client components that need the Storyblok API
export function getStoryblokApiClient() {
  const storyblokApi = getStoryblokApi();
  if (!storyblokApi) throw new Error('Storyblok API not initialized');
  return storyblokApi;
}