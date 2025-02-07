// src/components/storyblok/index.ts
import { storyblokEditable, type SbBlokData } from '@storyblok/react';

// Import all components explicitly
import Page from './Page';
import HeroSection from './HeroSection';
import Grid from './Grid';
import CategoryCard from './CategoryCard';
import ProductCategories from './ProductCategories';
import Product from './Product';
import Section from './Section';

// Add immediate debug logging
console.log('Loading Storyblok components:', {
  HeroSection: !!HeroSection,
  Page: !!Page,
});

// Component registration map
export const components = {
  page: Page,
  hero_section: HeroSection,  // This must match exactly what Storyblok sends
  grid: Grid,
  category_card: CategoryCard,
  product_categories: ProductCategories,
  product: Product,
  section: Section,
} as const;

// Add debug logging for the entire components object
console.log('Storyblok components registration:', {
  componentKeys: Object.keys(components),
  heroSection: !!components.hero_section,
});

// Export components for direct use
export {
  Page,
  HeroSection,
  Grid,
  CategoryCard,
  ProductCategories,
  Product,
  Section,
};