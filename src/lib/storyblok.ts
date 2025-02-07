import { getStoryblokApi } from '@storyblok/react/rsc';

export async function getProducts() {
  const storyblokApi = getStoryblokApi();
  if (!storyblokApi) throw new Error('Storyblok API not initialized');
  
  try {
    const { data } = await storyblokApi.get('cdn/stories', {
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
  const storyblokApi = getStoryblokApi();
  if (!storyblokApi) throw new Error('Storyblok API not initialized');

  const { data } = await storyblokApi.get(`cdn/stories/products/${slug}`, {
    version: 'published',
  });

  return data.story;
}