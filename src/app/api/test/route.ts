// Add this temporary route for testing
// app/api/test/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/storyblok";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}