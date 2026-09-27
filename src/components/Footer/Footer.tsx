import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="global-footer">
      <div className={styles.container}>
        {/* Main 3-Column Grid */}
        <div className={styles.mainGrid}>
          {/* Column 1: Brand & Contacts List */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoMark} aria-label="PlayOn — Home">
              <span className={styles.logoWordmark}>
                <span className={styles.logoAccent}>Play</span>On
              </span>
              <span className={styles.logoDot} aria-hidden="true" />
            </Link>

            <p className={styles.brandTagline}>
              Crafting iconic broadcast spectacles, brand experiences, and next-gen gaming motion worldwide.
            </p>

            {/* Contacts list */}
            <div className={styles.contactList}>
              <a href="mailto:hello@playon.agency" className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>hello@playon.agency</span>
              </a>

              <a href="tel:+15552345678" className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+1 (555) 234-5678</span>
              </a>

              <div className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Los Angeles • Tokyo • London</span>
              </div>
            </div>
          </div>

          {/* Column 2: Menus */}
          <div>
            <h3 className={styles.colHeading}>Navigation</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.footerLink}>
                  Home
                </Link>
              </li>
              <li>
                <a href="#highlights" className={styles.footerLink}>
                  Highlights
                </a>
              </li>
              <li>
                <a href="#recent-projects" className={styles.footerLink}>
                  Recent Project
                </a>
              </li>
              <li>
                <a href="#testimonials" className={styles.footerLink}>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#articles" className={styles.footerLink}>
                  Articles
                </a>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media List */}
          <div>
            <h3 className={styles.colHeading}>Socials</h3>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://twitch.tv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  Twitch
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright Claim & Policy Links */}
        <div className={styles.bottomRow}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} PlayOn Agency. All rights reserved.
          </p>

          <div className={styles.policyLinks}>
            <Link href="/privacy" className={styles.policyLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.policyLink}>
              Terms of Service
            </Link>
            <Link href="/cookies" className={styles.policyLink}>
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
