// app/page.tsx
'use client';

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [story, setStory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStory = async () => {
      try {
        const sbApi = getStoryblokApi();
        if (!sbApi) throw new Error('Storyblok API not initialized');

        const { data } = await sbApi.get('cdn/stories/landing', {
          version: 'draft'
        });

        if (!data?.story) {
          throw new Error('Home page content not found');
        }

        setStory(data.story);
      } catch (error: any) {
        console.error('Storyblok Error:', error);
        setError(error.message || 'An error occurred while loading the page');
      } finally {
        setIsLoading(false);
      }
    };

    getStory();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h1 className="text-red-800 text-lg font-semibold">Error</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <StoryblokComponent blok={story.content} />;
}

export const dynamic = 'force-dynamic';