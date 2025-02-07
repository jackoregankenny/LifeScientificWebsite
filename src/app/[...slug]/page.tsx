'use client';

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string[] } }) {
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    const getStory = async () => {
      const { slug = [] } = params;
      const sbApi = getStoryblokApi();
      if (!sbApi) throw new Error('Storyblok API not initialized');

      try {
        const { data } = await sbApi.get(`cdn/stories/${slug.join('/') || 'home'}`, {
          version: "draft",
        });
        setStory(data.story);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    getStory();
  }, [params]);

  if (!story) return <div>Loading...</div>;

  return <StoryblokComponent blok={story.content} />;
}

// Opt out of static generation for this page
export const dynamic = 'force-dynamic';