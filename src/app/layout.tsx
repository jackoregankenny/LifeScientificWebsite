import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/colors.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { components } from "@/components/storyblok";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

// Initialize Storyblok components
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

export const metadata: Metadata = {
  title: "Life Scientific",
  description: "Life Scientific - Innovative Crop Protection Solutions",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Life Scientific",
    description: "Life Scientific - Innovative Crop Protection Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
        <Navbar />
        <main className="flex-grow pt-24 px-4 md:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}