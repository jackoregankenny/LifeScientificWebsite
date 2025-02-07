// src/hooks/use-storyblok.ts
'use client';

import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import type { ISbStoryData } from '@storyblok/react';

interface UseStoryblokOptions {
  version?: 'draft' | 'published';
  language?: string;
}

export function useStoryblok<T extends ISbStoryData>(
  slug: string,
  options: UseStoryblokOptions = {}
) {
  const [story, setStory] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        if (!storyblokApi) throw new Error('Storyblok API not initialized');

        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
          version: options.version || 'draft',
          language: options.language,
        });

        setStory(data.story as T);
        setError(null);
      } catch (e) {
        console.error('Error fetching Storyblok content:', e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, options.version, options.language]);

  return { story, loading, error };
}

// For fetching multiple stories
export function useStoryblokList<T extends ISbStoryData>(
  startsWith: string,
  options: UseStoryblokOptions & {
    sort_by?: string;
    per_page?: number;
    page?: number;
  } = {}
) {
  const [stories, setStories] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        if (!storyblokApi) throw new Error('Storyblok API not initialized');

        const { data } = await storyblokApi.get('cdn/stories', {
          version: options.version || 'draft',
          language: options.language,
          starts_with: startsWith,
          sort_by: options.sort_by,
          per_page: options.per_page,
          page: options.page,
        });

        setStories(data.stories as T[]);
        setTotal(data.total);
        setError(null);
      } catch (e) {
        console.error('Error fetching Storyblok stories:', e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startsWith, options.version, options.language, options.sort_by, options.per_page, options.page]);

  return { stories, total, loading, error };
}