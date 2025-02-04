// components/ProductFilters.tsx
"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ProductFilters() {
  const router = useRouter();

  return (
    <div className="mb-8">
      <Input
        placeholder="Search products..."
        onChange={(e) => router.replace(`?search=${e.target.value}`)}
      />
    </div>
  );
}