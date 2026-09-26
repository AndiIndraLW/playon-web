'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import styles from './NavMenu.module.css';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/',             label: 'Home',         num: '01' },
  { href: '/services',     label: 'Our Services',  num: '02' },
  { href: '/works',        label: 'Works',         num: '03' },
  { href: '/about',        label: 'About Us',      num: '04' },
  { href: '/blog',         label: 'Blog',          num: '05' },
];

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * `entered` tracks whether the open-entry animation has been triggered.
   *
   * Problem: when the component mounts with isOpen=true the browser assigns
   * the final `.isOpen` styles in the same paint frame, so it never sees a
   * "before" state and skips the transition entirely.
   *
   * Fix: render without any animation class first (panels stay at
   * translateX(100%)), then apply `.isOpen` one double-rAF later so the
   * browser sees a genuine style change and runs the transition.
   */
  const [entered, setEntered] = useState(false);

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
  //  - isOpen=true  + entered=false → no extra class (panels sit off-screen at translateX(100%))
  //  - isOpen=true  + entered=true  → .isOpen   → panels animate IN
  //  - isOpen=false (component still mounted for exit) → .isClosing → panels animate OUT
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
      {/* ─── The three stagger panels ─── */}
      <div className={`${styles.panel} ${styles.panel1}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.panel2}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.panel3}`} aria-hidden="true">

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
          <nav aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map(({ href, label, num }) => (
                <li key={href} className={styles.navItem}>
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
