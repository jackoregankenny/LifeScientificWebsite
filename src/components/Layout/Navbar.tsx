import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            LS Website
          </Link>
          <div className="space-x-6">
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
            <Link href="/products" className="hover:text-gray-600">
              Products
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 