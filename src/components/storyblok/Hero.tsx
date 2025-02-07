// components/Hero.tsx
'use client';

import { storyblokEditable } from "@storyblok/react";
import type { HeroSectionStoryblok } from "@/types/storyblok";
import styles from './Hero.module.css';

interface HeroProps {
  blok: HeroSectionStoryblok;
}

function Hero({ blok }: HeroProps) {
  if (!blok) {
    console.error('No blok prop provided to Hero component');
    return null;
  }

  return (
    <div {...storyblokEditable(blok)} className={styles.hero}>
      {/* Background with default dark color */}
      <div className={styles.background}>
        {blok.background_image?.filename && (
          <img
            src={blok.background_image.filename}
            alt={blok.background_image.alt || ''}
            className={styles.background_image}
          />
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.content_inner}>
          <h1 className={styles.heading}>
            {blok.headline || 'Welcome to Life Scientific'}
          </h1>
          
          <p className={styles.subheading}>
            {blok.subheadline || 'Innovative Crop Protection Solutions'}
          </p>

          {blok.cta_text && (
            <a
              href={blok.cta_link?.cached_url || '#'}
              target={blok.cta_link?.target || '_self'}
              className={styles.cta_button}
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