'use client'
import { useState } from 'react';
import { AssetStoryblok } from '@/types/storyblok';

interface ProductGalleryProps {
  mainImage: AssetStoryblok;
  additionalImages?: AssetStoryblok[];
}

export default function ProductGallery({ mainImage, additionalImages = [] }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const allImages = [mainImage, ...additionalImages];

  return (
    <div className="grid gap-4">
      <div className="aspect-square w-full relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={selectedImage.filename || ''}
          alt={selectedImage.alt || ''}
          className="w-full h-full object-contain"
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`aspect-square relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden
                ${selectedImage === image ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}
              `}
            >
              <img
                src={image.filename || ''}
                alt={image.alt || ''}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 