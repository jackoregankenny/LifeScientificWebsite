// src/lib/storyblok/config.ts
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { components } from "@/components/storyblok";

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    components,
    enableFetchToken: true
  });
}

// src/lib/storyblok/client.ts
import StoryblokClient from 'storyblok-js-client';

export const storyblokClient = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

// src/lib/storyblok/hooks.ts
import { useEffect, useState } from 'react';
import { storyblokClient } from './client';

export function useStoryblokData<T>(slug: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: response } = await storyblokClient.get(`cdn/stories/${slug}`, {
          version: process.env.NODE_ENV === 'development' ? 'draft' : 'published'
        });
        setData(response.story.content as T);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  return { data, error, loading };
}