import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className={styles.heading}>Life Scientific</h3>
            <p className={styles.text}>
              Innovative crop protection solutions for modern agriculture
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className={styles.link}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className={styles.heading}>Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=pesticide" className={styles.link}>
                  Pesticides
                </Link>
              </li>
              <li>
                <Link href="/products?category=herbicide" className={styles.link}>
                  Herbicides
                </Link>
              </li>
              <li>
                <Link href="/products?category=fungicide" className={styles.link}>
                  Fungicides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={styles.heading}>Contact Us</h3>
            <ul className="space-y-2">
              <li className={styles.text}>Email: info@lifescientific.com</li>
              <li className={styles.text}>Phone: +353 1 234 5678</li>
              <li className={styles.text}>Dublin, Ireland</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom_bar}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Life Scientific. All rights reserved.
            </p>
            <div className={styles.legal_links}>
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.link}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 