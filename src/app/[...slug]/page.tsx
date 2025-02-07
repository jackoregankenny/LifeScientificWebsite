'use client';

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default function Page({ params }: Props) {
  const [story, setStory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStory = async () => {
      try {
        const { slug = [] } = await params;
        const sbApi = getStoryblokApi();
        if (!sbApi) throw new Error('Storyblok API not initialized');

        const { data } = await sbApi.get(`cdn/stories/${slug.join('/') || 'home'}`, {
          version: "draft",
        });
        
        if (!data?.story) {
          throw new Error('Page not found');
        }
        
        setStory(data.story);
      } catch (error: any) {
        console.error('Error fetching story:', error);
        setError(error.message || 'Failed to load page');
      }
    };

    getStory();
  }, [params]);

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

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <StoryblokComponent blok={story.content} />;
}

// Opt out of static generation for this page
export const dynamic = 'force-dynamic';