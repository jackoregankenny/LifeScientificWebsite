'use client';

import { storyblokInit, apiPlugin } from "@storyblok/react";
import { type PropsWithChildren } from "react";
import { Grid, Section, Hero, CategoryCard, ProductCategories } from "./storyblok";
import Page from "./storyblok/Page";
import Product from "./storyblok/Product";

const components = {
  page: Page,
  grid: Grid,
  section: Section,
  hero_section: Hero,
  category_card: CategoryCard,
  product_categories: ProductCategories,
  product: Product,
};

// Initialize Storyblok outside of component
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

function StoryblokProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default StoryblokProvider; 