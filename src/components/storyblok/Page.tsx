// components/storyblok/Page.tsx
'use client';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { PageStoryblok } from "@/types/storyblok";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

interface PageProps {
  blok: PageStoryblok;
}

const Page = ({ blok }: PageProps) => {
  if (!blok?.body) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main {...storyblokEditable(blok)} className="flex-grow">
        {blok.body.map((nestedBlok: any) => (
          <StoryblokComponent 
            blok={nestedBlok} 
            key={nestedBlok._uid} 
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};



export default Page;