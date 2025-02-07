// components/Hero.tsx
'use client';

import { storyblokEditable } from "@storyblok/react";
import type { HeroSectionStoryblok } from "@/types/storyblok";

interface HeroProps {
  blok: HeroSectionStoryblok;
}

function Hero({ blok }: HeroProps) {
  if (!blok) {
    console.error('No blok prop provided to Hero component');
    return null;
  }

  // Debug logging
  console.log('Hero Component Data:', {
    headline: blok.headline,
    subheadline: blok.subheadline,
    cta_text: blok.cta_text,
    cta_link: blok.cta_link,
    background_image: blok.background_image
  });

  return (
    <div {...storyblokEditable(blok)} className="relative min-h-[600px] flex items-center">
      {/* Background with default dark color */}
      <div className="absolute inset-0 z-0 bg-gray-900">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {blok.headline || 'Welcome to Life Scientific'}
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            {blok.subheadline || 'Innovative Crop Protection Solutions'}
          </p>

          {blok.cta_text && (
            <a
              href={blok.cta_link?.cached_url || '#'}
              target={blok.cta_link?.target || '_self'}
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {blok.cta_text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;