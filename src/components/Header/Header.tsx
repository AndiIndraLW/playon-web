'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import NavMenu from './NavMenu';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // ------------------------------------------------------------------
  // Scroll detection → glass header
  // ------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ------------------------------------------------------------------
  // Open / Close helpers
  // The closing sequence must wait for the CSS exit animation to finish
  // before fully unmounting the overlay state.
  // ------------------------------------------------------------------
  const openMenu = useCallback(() => {
    // If a close animation is in flight, cancel it
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsClosing(true);

    // 0.55s panel exit + 0.21s stagger offset ≈ 760ms total; give 850ms buffer
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
      closeTimerRef.current = null;
      // Return focus to the menu button after close
      menuBtnRef.current?.focus();
    }, 850);
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpen && !isClosing) {
      closeMenu();
    } else if (!menuOpen) {
      openMenu();
    }
  }, [menuOpen, isClosing, openMenu, closeMenu]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // ------------------------------------------------------------------
  // Build header class
  // ------------------------------------------------------------------
  const headerClasses = [
    styles.header,
    scrolled && !menuOpen ? styles.scrolled : '',
    menuOpen ? styles.menuOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClasses} id="global-header">
        {/* ─── Logo ─── */}
        <Link href="/" className={styles.logo} aria-label="Play On — home">
          <div className={styles.logoMark}>
            <span className={styles.logoWordmark}>
              <span className={styles.logoAccent}>Play</span>On
            </span>
            <span className={styles.logoDot} aria-hidden="true" />
          </div>
        </Link>

        {/* ─── Right controls ─── */}
        <div className={styles.controls}>
          {/* Menu toggle */}
          <button
            ref={menuBtnRef}
            id="menu-toggle-btn"
            className={styles.menuBtn}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="global-nav-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {/* Animated hamburger / X icon */}
            <span className={styles.menuIcon} aria-hidden="true">
              <span className={styles.menuIconBar} />
              <span className={styles.menuIconBar} />
              <span className={styles.menuIconBar} />
            </span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className={styles.ctaBtn}
            id="header-contact-cta"
          >
            <span className={styles.ctaBtnText}>Contact Us</span>
          </Link>
        </div>
      </header>

      {/* ─── Full-screen nav menu overlay ─── */}
      {(menuOpen || isClosing) && (
        <NavMenu
          isOpen={menuOpen && !isClosing}
          onClose={closeMenu}
        />
      )}
    </>
  );
}
