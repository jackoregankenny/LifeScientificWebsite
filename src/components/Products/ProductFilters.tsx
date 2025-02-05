// components/ProductFilters.tsx
"use client";

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
  const handleFilterChange = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.location.href = url.toString();
  };

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-2">Crop Group</label>
        <select
          className="w-full border rounded-md p-2"
          onChange={(e) => handleFilterChange('category', e.target.value)}
          value={selectedCropGroup || ''}
        >
          <option value="">All Crop Groups</option>
          {cropGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-2">Country</label>
        <select
          className="w-full border rounded-md p-2"
          onChange={(e) => handleFilterChange('country', e.target.value)}
          value={selectedCountry || ''}
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}