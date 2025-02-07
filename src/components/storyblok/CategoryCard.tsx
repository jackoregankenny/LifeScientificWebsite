// components/CategoryCard.tsx
import { storyblokEditable } from "@storyblok/react";
import Link from 'next/link';

interface CategoryCardProps {
  blok: {
    _uid: string;
    name: string;
    description: string;
    image: {
      filename: string;
      alt?: string;
    };
    link: {
      cached_url: string;
    };
  }
}

const CategoryCard = ({ blok }: CategoryCardProps) => {
  return (
    <Link
      href={blok.link.cached_url}
      {...storyblokEditable(blok)}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={blok.image.filename}
          alt={blok.image.alt || blok.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {blok.name}
        </h3>
        <p className="text-gray-600">
          {blok.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;