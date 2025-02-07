// components/ProductFilters.tsx
"use client";

import { useRouter, useSearchParams } from 'next/navigation';

interface ProductFiltersProps {
  cropGroups: string[];
  countries: string[];
  selectedCropGroup?: string;
  selectedCountry?: string;
}

export default function ProductFilters({
  cropGroups,
  countries,
  selectedCropGroup,
  selectedCountry,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex gap-4">
      <select
        className="border rounded-md px-3 py-2"
        value={selectedCropGroup || ''}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">All Crop Groups</option>
        {cropGroups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>

      <select
        className="border rounded-md px-3 py-2"
        value={selectedCountry || ''}
        onChange={(e) => handleFilterChange('country', e.target.value)}
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}