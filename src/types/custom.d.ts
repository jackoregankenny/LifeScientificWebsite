// types/custom.d.ts
import type { ProductStoryblok } from "./storyblok";

declare module "@/types/storyblok" {
  interface ProductStoryblok {
    _uid: string;
    component: "product";
    name: string;
    tagline?: string;
    description?: {
      type: "doc";
      content: any[];
    };
    variants?: ProductVariantStoryblok[];
  }

  interface ProductVariantStoryblok {
    _uid: string;
    component: "product_variant";
    name: string;
    sku: string;
    details?: (ActiveIngredientsStoryblok | ProductDocumentsStoryblok)[];
    images?: {
      filename: string;
      alt?: string;
    }[];
    specifications?: {
      label: string;
      value: string;
    }[];
  }

  interface ActiveIngredientsStoryblok {
    _uid: string;
    component: "active_ingredients";
    ingredients: string[];
  }

  interface ProductDocumentsStoryblok {
    _uid: string;
    component: "product_documents";
    documents: {
      name: string;
      file: {
        filename: string;
      };
    }[];
  }

  // Add support for other Storyblok field types
  interface StoryblokAsset {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  }

  interface StoryblokLink {
    cached_url?: string;
    linktype?: string;
    story?: {
      name: string;
      created_at?: string;
      published_at?: string;
      id: number;
      uuid: string;
      slug: string;
      full_slug: string;
      url?: string;
    };
    email?: string;
    url?: string;
  }
}