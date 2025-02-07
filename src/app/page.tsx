// app/page.tsx
import { getLandingPage } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";

export default async function HomePage() {
  const story = await getLandingPage();

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h1 className="text-red-800 text-lg font-semibold">Error</h1>
          <p className="text-red-600">Failed to load page content. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StoryblokComponent blok={story.content} />
    </div>
  );
}

// Force dynamic rendering for preview mode
export const dynamic = 'force-dynamic';