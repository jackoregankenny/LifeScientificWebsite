'use client';

import { storyblokInit, apiPlugin } from "@storyblok/react";
import type { PropsWithChildren } from 'react';
import Grid from './storyblok/Grid';
import Section from './storyblok/Section';
import Hero from './storyblok/Hero';
import CategoryCard from './storyblok/CategoryCard';
import ProductCategories from './storyblok/ProductCategories';
import Page from './storyblok/Page';
import Product from './storyblok/Product';

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    grid: Grid,
    section: Section,
    hero_section: Hero,
    category_card: CategoryCard,
    product_categories: ProductCategories,
    product: Product,
  }
});

export default function ClientLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
} 