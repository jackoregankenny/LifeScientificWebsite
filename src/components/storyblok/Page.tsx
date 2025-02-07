// src/components/storyblok/Page.tsx
'use client';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useStoryblok } from "@/hooks/use-storyblok";

interface PageData {
  _uid: string;
  body?: any[];
  component: 'page';
}

interface PageProps {
  blok?: PageData;
  slug?: string;
}

export default function Page({ blok, slug }: PageProps) {
  const { story, loading, error } = slug 
    ? useStoryblok<{ content: PageData }>(slug)
    : { story: blok ? { content: blok } : null, loading: false, error: null };

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (error || !story?.content) {
    return <div className="text-red-500">Failed to load page content</div>;
  }

  const content = story.content;

  if (!content.body) {
    return <div>No content found</div>;
  }

  return (
    <div {...storyblokEditable(content)}>
      {content.body.map((nestedBlok) => (
        <StoryblokComponent 
          blok={nestedBlok} 
          key={nestedBlok._uid} 
        />
      ))}
    </div>
  );
}