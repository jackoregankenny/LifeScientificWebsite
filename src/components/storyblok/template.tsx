'use client';

import { storyblokEditable, type SbBlokData } from "@storyblok/react";

interface ComponentBlok extends SbBlokData {
  // Add your component-specific fields here
  title?: string;
  subtitle?: string;
  [key: string]: any; // For Storyblok's index signature requirement
}

interface ComponentProps {
  blok: ComponentBlok;
  className?: string;
}

/**
 * Component Description
 * 
 * @component
 * @example
 * ```tsx
 * <Component blok={blok} />
 * ```
 */
export default function Component({ blok, className }: ComponentProps) {
  if (!blok) {
    console.error('No blok prop provided to Component');
    return null;
  }

  return (
    <section 
      {...storyblokEditable(blok)}
      className={className}
    >
      {/* Component content */}
      {blok.title && <h2>{blok.title}</h2>}
      {blok.subtitle && <p>{blok.subtitle}</p>}
    </section>
  );
} 