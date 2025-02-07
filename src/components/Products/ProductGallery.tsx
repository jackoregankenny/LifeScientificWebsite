'use client'
import { useState } from 'react';

interface StoryblokImage {
  filename: string;
  alt?: string;
}

interface ProductGalleryProps {
  mainImage: StoryblokImage;
  additionalImages?: StoryblokImage[];
}

export default function ProductGallery({ mainImage, additionalImages = [] }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const allImages = [mainImage, ...additionalImages];

  return (
    <div className="grid gap-4">
      <div className="aspect-square w-full relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={selectedImage.filename}
          alt={selectedImage.alt || ''}
          className="w-full h-full object-contain"
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`aspect-square relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 ${
                selectedImage === image ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={image.filename}
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