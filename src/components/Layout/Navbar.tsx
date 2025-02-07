'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const defaultNavItems = [
  { _uid: '1', link: { cached_url: '/' }, label: 'Home' },
  { _uid: '2', link: { cached_url: '/products' }, label: 'Products' },
  { _uid: '3', link: { cached_url: '/about' }, label: 'About' },
  { _uid: '4', link: { cached_url: '/contact' }, label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 mx-auto w-[90%] mt-6 rounded-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : 'bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-xl font-bold">
              Life Scientific
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {defaultNavItems.map((item) => (
              <motion.span
                key={item._uid}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.link.cached_url}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              </motion.span>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {defaultNavItems.map((item) => (
                  <motion.div
                    key={item._uid}
                    whileHover={{ x: 4 }}
                    whileTap={{ x: 0 }}
                  >
                    <Link
                      href={item.link.cached_url}
                      className="hover:text-blue-600 transition-colors block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 