// components/StoryblokImage.tsx
import Image from "next/image";
import type { AssetStoryblok } from "@/types/storyblok";

export default function StoryblokImage({ asset }: { asset: AssetStoryblok }) {
  return (
    <Image
      src={asset.filename || ''}
      alt={asset.alt || ''}
      width={asset.width || 800}
      height={asset.height || 600}
      className="object-contain"
    />
  );
}