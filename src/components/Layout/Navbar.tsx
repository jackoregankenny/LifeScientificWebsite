import Link from 'next/link';
import { getNavigation } from "@/lib/storyblok";

// Default navigation items if Storyblok fetch fails
const defaultNavItems = [
  { _uid: '1', link: { cached_url: '/' }, label: 'Home' },
  { _uid: '2', link: { cached_url: '/products' }, label: 'Products' },
  { _uid: '3', link: { cached_url: '/about' }, label: 'About' },
  { _uid: '4', link: { cached_url: '/contact' }, label: 'Contact' },
] as const;

interface NavItem {
  _uid: string;
  link: {
    cached_url: string;
  };
  label: string;
}

export default async function Navbar() {
  const navData = await getNavigation();
  const navItems = (navData?.nav_items || defaultNavItems) as NavItem[];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-auto w-[90%] mt-6 bg-white/80 backdrop-blur-md shadow-lg rounded-xl">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-blue-600 transition-colors">
            {navData?.logo_text || 'Life Scientific'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item._uid}
                href={item.link.cached_url}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation - Using native details/summary for simplicity */}
          <details className="md:hidden relative group">
            <summary className="list-none cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              {navItems.map((item) => (
                <Link
                  key={item._uid}
                  href={item.link.cached_url}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
} 