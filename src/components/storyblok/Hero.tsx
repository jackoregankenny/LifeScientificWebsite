// components/Hero.tsx
'use client';

import { storyblokEditable } from "@storyblok/react";
import type { HeroSectionStoryblok } from "@/types/storyblok";

interface HeroProps {
  blok: HeroSectionStoryblok;
}

export default function Hero({ blok }: HeroProps) {
  return (
    <section 
      {...storyblokEditable(blok)}
      className="relative min-h-[600px] flex items-center bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {blok.background_image?.filename && (
          <img
            src={blok.background_image.filename}
            alt={blok.background_image.alt || ''}
            className="w-full h-full object-cover opacity-60"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {blok.headline || 'Welcome to Life Scientific'}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {blok.subheadline || 'Innovative Crop Protection Solutions'}
          </p>

          {blok.cta_text && (
            <a
              href={blok.cta_link?.cached_url || '#'}
              target={blok.cta_link?.target || '_self'}
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {blok.cta_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}