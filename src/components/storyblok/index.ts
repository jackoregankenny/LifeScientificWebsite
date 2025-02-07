// components/storyblok/index.ts
// Import types
import type { SbBlokData, StoryblokComponent as SbComponent } from '@storyblok/react';

// Import components
import Grid from './Grid';
import CategoryCard from './CategoryCard';
import ProductCategories from './ProductCategories';
import Page from './Page';
import Product from './Product';
import RichText from './RichText';
import Hero from './Hero';

// Define component map type
type ComponentMap = {
  [key: string]: typeof SbComponent<SbBlokData>;
};

// Export components for direct use
export {
  Grid,
  CategoryCard,
  ProductCategories,
  Page,
  Product,
  RichText,
  Hero,
};

// Component registration map for Storyblok initialization
export const components = {
  'page': Page,
  'grid': Grid,
  'category_card': CategoryCard,
  'product_categories': ProductCategories,
  'product': Product,
  'hero_section': Hero,
} as const;