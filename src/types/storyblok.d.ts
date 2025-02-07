// This file was generated by the storyblok CLI.
// DO NOT MODIFY THIS FILE BY HAND.
import type { ISbStoryData } from "storyblok";
export interface ActiveIngredientsStoryblok {
  name?: string;
  amount?: string;
  units?: string;
  component: "active_ingredients";
  _uid: string;
  [k: string]: any;
}

export interface AssetStoryblok {
  alt: string | null;
  copyright?: string | null;
  fieldtype: "asset";
  id: number;
  filename: string | null;
  name: string;
  title: string | null;
  focus: string | null;
  meta_data?: {
    [k: string]: any;
  };
  source?: string | null;
  is_external_url?: boolean;
  is_private?: boolean;
  src?: string;
  updated_at?: string;
  width?: number | null;
  height?: number | null;
  aspect_ratio?: number | null;
  public_id?: string | null;
  content_type?: string;
  [k: string]: any;
}

export interface CategoryCardStoryblok {
  name?: string;
  description?: string;
  image?: AssetStoryblok;
  link?: string;
  component: "category card";
  _uid: string;
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: "" | "2" | "3" | "4";
  items?: (
    | ActiveIngredientsStoryblok
    | CategoryCardStoryblok
    | GridStoryblok
    | HeroSectionStoryblok
    | NavbarStoryblok
    | NavigationItemStoryblok
    | PageStoryblok
    | ProductStoryblok
    | ProductCategoriesStoryblok
    | ProductDocumentsStoryblok
    | ProductVariantStoryblok
    | SectionStoryblok
  )[];
  component: "grid";
  _uid: string;
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      anchor?: string;
      rel?: string;
      title?: string;
      prep?: string;
      linktype: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      linktype: "url";
      rel?: string;
      title?: string;
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      email?: string;
      linktype: "email";
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      linktype: "asset";
      [k: string]: any;
    };

export interface HeroSectionStoryblok {
  headline?: string;
  subheadline?: string;
  cta_text?: string;
  cta_link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  background_image?: AssetStoryblok;
  component: "hero_section";
  _uid: string;
  [k: string]: any;
}

export interface NavbarStoryblok {
  logo_text?: string;
  nav_items?: NavigationItemStoryblok[];
  component: "navbar";
  _uid: string;
  [k: string]: any;
}

export interface NavigationItemStoryblok {
  label?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  component: "navigation_item";
  _uid: string;
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | ActiveIngredientsStoryblok
    | CategoryCardStoryblok
    | GridStoryblok
    | HeroSectionStoryblok
    | NavbarStoryblok
    | NavigationItemStoryblok
    | PageStoryblok
    | ProductStoryblok
    | ProductCategoriesStoryblok
    | ProductDocumentsStoryblok
    | ProductVariantStoryblok
    | SectionStoryblok
  )[];
  component: "page";
  _uid: string;
  [k: string]: any;
}

export interface ProductStoryblok {
  name: string;
  tagline: string;
  description: string;
  product?: AssetStoryblok;
  variants?: ProductVariantStoryblok[];
  category?: "" | "persticide";
  component: "product";
  _uid: string;
  [k: string]: any;
}

export interface ProductCategoriesStoryblok {
  title?: string;
  subtitle?: string;
  categories?: string;
  component: "product_categories";
  _uid: string;
  [k: string]: any;
}

export interface ProductDocumentsStoryblok {
  document_name?: "" | "sds" | "label" | "product";
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  component: "product_documents";
  _uid: string;
  [k: string]: any;
}

export interface ProductVariantStoryblok {
  country?: "" | "IE" | "UK";
  crop: string;
  crop_group?: string;
  approval_number?: string;
  formulation_type?: string;
  mechanism_of_action?: string;
  container_size?: string;
  size_unit?: string;
  units_per_package?: string;
  weight?: string;
  weight_units?: string;
  details?: (ProductDocumentsStoryblok | ActiveIngredientsStoryblok)[];
  component: "product_variant";
  _uid: string;
  [k: string]: any;
}

export interface SectionStoryblok {
  title?: string;
  subtitle?: string;
  style?: "" | "default" | "highlight" | "dark";
  content?: (
    | ActiveIngredientsStoryblok
    | CategoryCardStoryblok
    | GridStoryblok
    | HeroSectionStoryblok
    | NavbarStoryblok
    | NavigationItemStoryblok
    | PageStoryblok
    | ProductStoryblok
    | ProductCategoriesStoryblok
    | ProductDocumentsStoryblok
    | ProductVariantStoryblok
    | SectionStoryblok
  )[];
  component: "section";
  _uid: string;
  [k: string]: any;
}
