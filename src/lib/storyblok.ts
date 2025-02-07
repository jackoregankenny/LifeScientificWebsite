import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

// Fetch navigation data
export async function getNavigation() {
  try {
    const { data } = await Storyblok.get('cdn/stories/navbar', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      resolve_links: 'url',
    });
    return data?.story?.content;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
}

// Fetch landing page data
export async function getLandingPage() {
  try {
    const { data } = await Storyblok.get('cdn/stories/landing', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      resolve_links: 'url',
    });
    return data?.story;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

// Fetch products
export async function getProducts() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'products/',
      is_startpage: false,
    });
    return data.stories;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch a single product
export async function getProduct(slug: string) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/products/${slug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      resolve_links: 'url',
    });
    return data.story;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch any page by slug
export async function getPage(slug: string) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/${slug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      resolve_links: 'url',
    });
    return data.story;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}