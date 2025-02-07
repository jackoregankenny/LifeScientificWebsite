// components/CategoryCard.tsx
import { storyblokEditable } from "@storyblok/react";
import Link from 'next/link';
import type { CategoryCardStoryblok, MultilinkStoryblok } from "@/types/storyblok";
import Image from 'next/image';

interface CategoryCardProps {
  blok: CategoryCardStoryblok;
}

const CategoryCard = ({ blok }: CategoryCardProps) => {
  if (!blok) {
    console.error('No blok prop provided to CategoryCard component');
    return null;
  }

  const linkUrl = typeof blok.link === 'string' 
    ? blok.link 
    : blok.link && typeof blok.link === 'object' && 'cached_url' in blok.link
      ? (blok.link as MultilinkStoryblok).cached_url 
      : '#';

  return (
    <Link
      href={linkUrl}
      {...storyblokEditable(blok)}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-video relative">
        {blok.image?.filename && (
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.name || ''}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {blok.name || 'Category'}
        </h3>
        {blok.description && (
          <p className="text-gray-600">
            {blok.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;