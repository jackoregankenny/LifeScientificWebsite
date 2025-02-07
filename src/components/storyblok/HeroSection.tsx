// src/components/storyblok/HeroSection.tsx
'use client';

import { storyblokEditable } from "@storyblok/react";

interface HeroSectionBlok {
  _uid: string;
  component: 'hero_section';
  headline?: string;
  subheadline?: string;
  cta_text?: string;
  cta_link?: string;
  background_image?: string;
}

interface HeroSectionProps {
  blok: HeroSectionBlok;
}

function HeroSection({ blok }: HeroSectionProps) {  // Changed to function declaration
  console.log('HeroSection render attempt:', { blok });  // Debug log

  if (!blok) {
    console.error('HeroSection: No blok prop provided');
    return null;
  }

  return (
    <section 
      {...storyblokEditable(blok)}
      className="relative min-h-[600px] flex items-center bg-gray-900"
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {blok.headline || 'Welcome'}
          </h1>
          
          {blok.subheadline && (
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {blok.subheadline}
            </p>
          )}

          {blok.cta_text && (
            <a
              href={blok.cta_link || '#'}
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {blok.cta_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// Add this console log to verify the component is being exported
console.log('HeroSection component loaded');

export default HeroSection;