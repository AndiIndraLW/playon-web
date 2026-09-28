'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import styles from './NavMenu.module.css';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/',             label: 'Home',         num: '01', image: '/assets/dummyimghl/dummyimghl1.jpeg' },
  { href: '/services',     label: 'Our Services',  num: '02', image: '/assets/dummyimghl/dummyimghl2.jpg' },
  { href: '/works',        label: 'Works',         num: '03', image: '/assets/dummyimghl/dummyimghl3.jpg' },
  { href: '/about',        label: 'About Us',      num: '04', image: '/assets/dummyimghl/dummyimghl4.jpg' },
  { href: '/blog',         label: 'Blog',          num: '05', image: '/assets/dummyimghl/dummyimghl5.jpg' },
];

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [entered, setEntered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Double rAF: 1st tick = browser paints initial state, 2nd = apply class
      let raf1: number;
      let raf2: number;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setEntered(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    } else {
      // Reset for next open cycle
      setEntered(false);
      setHoveredImage(null);
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Cleanup any lingering timer on unmount
  useEffect(() => {
    return () => {
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    };
  }, []);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Determine CSS state class:
  const stateClass = !isOpen
    ? styles.isClosing          // genuine close → trigger exit animation
    : entered
    ? styles.isOpen             // frame-delayed open → trigger enter animation
    : '';                       // first render — no class yet, panels stay off-screen

  const overlayClasses = [styles.overlay, stateClass].filter(Boolean).join(' ');

  return (
    <div
      ref={overlayRef}
      className={overlayClasses}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* ─── The four stagger panels ─── */}
      <div className={`${styles.panel} ${styles.panel1}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.panel2}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.panel3}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.panel4}`} aria-hidden="true">

        {/* Close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close navigation menu"
          id="nav-close-btn"
        >
          <span className={styles.closeIcon} aria-hidden="true" />
        </button>

        {/* Menu content */}
        <div className={styles.menuContent}>
          <div className={styles.menuMainBody}>
            <nav aria-label="Main navigation" className={styles.navContainer}>
              <ul className={styles.navList}>
                {navLinks.map(({ href, label, num, image }) => (
                  <li
                    key={href}
                    className={styles.navItem}
                    onMouseEnter={() => setHoveredImage(image)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <div className={styles.navItemInner}>
                      <Link
                        href={href}
                        className={styles.navLink}
                        onClick={handleLinkClick}
                      >
                        <span className={styles.navLinkNum} aria-hidden="true">
                          {num}
                        </span>
                        {label}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Hover Image Preview Panel (Desktop only) */}
            <div className={`${styles.imagePreviewPanel} ${hoveredImage ? styles.visible : ''}`}>
              {navLinks.map(({ href, image, label }) => (
                <img
                  key={href}
                  src={image}
                  alt={label}
                  className={`${styles.previewImg} ${hoveredImage === image ? styles.activeImg : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Footer row */}
          <footer className={styles.menuFooter}>
            <div>
              <p className={styles.menuFooterContact}>Get in touch</p>
              <a
                href="mailto:hello@playon.agency"
                className={styles.menuFooterEmail}
              >
                hello@playon.agency
              </a>
            </div>

            <nav className={styles.menuFooterSocials} aria-label="Social links">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.socialLink}
                aria-label="Dribbble"
              >
                Dribbble
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
