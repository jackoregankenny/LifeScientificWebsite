import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/colors.css";
import Layout from "@/components/Layout";
import StoryblokProvider from "@/components/StoryblokProvider";
import { storyblokInit, apiPlugin } from "@storyblok/react";

const inter = Inter({ subsets: ["latin"] });

// Initialize Storyblok for server components
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
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
      <body className={`${inter.className} antialiased`}>
        <StoryblokProvider>
          <Layout>{children}</Layout>
        </StoryblokProvider>
      </body>
    </html>
  );
}