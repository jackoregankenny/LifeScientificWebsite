// components/storyblok/Page.tsx
'use client';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { PageStoryblok } from "@/types/storyblok";

interface PageProps {
  blok: PageStoryblok;
}

export default function Page({ blok }: PageProps) {
  if (!blok?.body) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-8">
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent 
          blok={nestedBlok} 
          key={nestedBlok._uid} 
        />
      ))}
    </div>
  );
}