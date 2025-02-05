import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header can be added here */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      {/* Footer can be added here */}
    </div>
  );
} 