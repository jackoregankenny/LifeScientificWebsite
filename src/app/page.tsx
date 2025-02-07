// app/page.tsx
'use client';

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [story, setStory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStory = async () => {
      try {
        const sbApi = getStoryblokApi();
        if (!sbApi) throw new Error('Storyblok API not initialized');

        const { data } = await sbApi.get('cdn/stories/landing', {
          version: 'draft'
        });

        if (!data?.story) {
          throw new Error('No story found');
        }

        setStory(data.story);
      } catch (error: any) {
        console.error('Storyblok Error:', error);
        setError(error.message || 'An error occurred while loading the page');
      }
    };

    getStory();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!story) return <div>Loading...</div>;

  return <StoryblokComponent blok={story.content} />;
}

export const dynamic = 'force-dynamic';