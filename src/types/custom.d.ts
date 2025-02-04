// types/custom.d.ts
import type { ProductStoryblok } from "./storyblok";

declare module "@/types/storyblok" {
  interface ProductStoryblok {
    customField?: string; // Add custom fields here
  }
}