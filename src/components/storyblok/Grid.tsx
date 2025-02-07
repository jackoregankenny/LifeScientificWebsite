// components/Grid.tsx
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { GridStoryblok } from "@/types/storyblok";

interface GridProps {
  blok: GridStoryblok;
}

const Grid = ({ blok }: GridProps) => {
  const columns = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-4"
  };

  return (
    <div 
      {...storyblokEditable(blok)}
      className={`grid grid-cols-1 ${columns[blok.columns || "2"]} gap-8`}
    >
      {blok.items?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;