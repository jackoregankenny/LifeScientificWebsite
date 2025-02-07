'use client';

import { storyblokInit, apiPlugin } from "@storyblok/react";
import { PropsWithChildren, useEffect, useState } from "react";

// Import all your Storyblok components here
import Grid from './storyblok/Grid';
import Section from './storyblok/Section';
import Hero from './storyblok/Hero';
import CategoryCard from './storyblok/CategoryCard';
import ProductCategories from './storyblok/ProductCategories';
import Page from './storyblok/Page';
import Product from './storyblok/Product';

const components = {
  page: Page,
  grid: Grid,
  section: Section,
  hero_section: Hero,
  category_card: CategoryCard,
  product_categories: ProductCategories,
  product: Product,
};

export default function StoryblokProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize Storyblok on the client side
    storyblokInit({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
      use: [apiPlugin],
      components,
    });
    setInitialized(true);
  }, []);

  if (!initialized) {
    return null; // or a loading state
  }

  return <>{children}</>;
} 