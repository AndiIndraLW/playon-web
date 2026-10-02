'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import styles from './NavMenu.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceSubItem {
  num: string;
  title: string;
  slug: string;
  image: string;
}

const fallbackServices: ServiceSubItem[] = [
  {
    num: '01',
    title: 'E-Sports & Arena Broadcast',
    slug: 'e-sports-arena-broadcast',
    image: '/assets/dummyimghl/dummyimghl1.jpeg',
  },
  {
    num: '02',
    title: 'Brand Experiences & Motion',
    slug: 'brand-experiences-motion',
    image: '/assets/dummyimghl/dummyimghl2.jpg',
  },
  {
    num: '03',
    title: '3D Stage & VFX Animation',
    slug: '3d-stage-vfx-animation',
    image: '/assets/dummyimghl/dummyimghl3.jpg',
  },
  {
    num: '04',
    title: 'Interactive Web & Audio',
    slug: 'interactive-web-audio',
    image: '/assets/dummyimghl/dummyimghl4.jpg',
  },
  {
    num: '05',
    title: 'Global Tournament Branding',
    slug: 'global-tournament-branding',
    image: '/assets/dummyimghl/dummyimghl5.jpg',
  },
];

const mainNavItems = [
  { href: '/', label: 'Home', num: '01', image: '/assets/dummyimghl/dummyimghl1.jpeg' },
  { label: 'Our Services', num: '02', isServices: true },
  { href: '/works', label: 'Works', num: '03', image: '/assets/dummyimghl/dummyimghl3.jpg' },
  { href: '/about', label: 'About Us', num: '04', image: '/assets/dummyimghl/dummyimghl4.jpg' },
  { href: '/blog', label: 'Blog', num: '05', image: '/assets/dummyimghl/dummyimghl5.jpg' },
];

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [entered, setEntered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesList, setServicesList] = useState<ServiceSubItem[]>(fallbackServices);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetchApi<{ data: any[] }>('/services');
        if (res?.data && res.data.length > 0) {
          const mapped: ServiceSubItem[] = res.data.map((item, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            const fallback = fallbackServices[idx % fallbackServices.length];
            return {
              num: numStr,
              title: item.title,
              slug: item.slug || fallback.slug,
              image: getMediaUrl(item.featured_image, fallback.image),
            };
          });
          setServicesList(mapped);
        }
      } catch (err) {
        console.warn('NavMenu failed fetching services API', err);
      }
    }

    if (isOpen) {
      loadServices();
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
      setServicesOpen(false);
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

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesOpen((prev) => !prev);
  };

  // Determine CSS state class:
  const stateClass = !isOpen
    ? styles.isClosing
    : entered
    ? styles.isOpen
    : '';

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
                {mainNavItems.map((item) => {
                  if (item.isServices) {
                    return (
                      <li key="services" className={styles.navItem}>
                        <div className={styles.navItemInner}>
                          <button
                            type="button"
                            className={`${styles.navLink} ${styles.dropdownTrigger} ${
                              servicesOpen ? styles.dropdownActive : ''
                            }`}
                            onClick={toggleServicesDropdown}
                            onMouseEnter={() =>
                              setHoveredImage(servicesList[0]?.image || null)
                            }
                            onMouseLeave={() => setHoveredImage(null)}
                            aria-expanded={servicesOpen}
                          >
                            <span className={styles.navLinkNum} aria-hidden="true">
                              {item.num}
                            </span>
                            {item.label}
                          </button>

                          {/* ── Sub-services dropdown accordion ── */}
                          <div
                            className={`${styles.servicesSubMenu} ${
                              servicesOpen ? styles.subMenuOpen : ''
                            }`}
                          >
                            <div className={styles.servicesSubList}>
                              {servicesList.map((svc) => (
                                <Link
                                  key={svc.slug}
                                  href={`/services/${svc.slug}`}
                                  className={styles.subServiceItem}
                                  onClick={handleLinkClick}
                                  onMouseEnter={() => setHoveredImage(svc.image)}
                                >
                                  <span className={styles.subServiceTitle}>
                                    {svc.title}
                                  </span>
                                  <svg
                                    className={styles.subServiceArrow}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                  </svg>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={item.href}
                      className={styles.navItem}
                      onMouseEnter={() => setHoveredImage(item.image || null)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <div className={styles.navItemInner}>
                        <Link
                          href={item.href!}
                          className={styles.navLink}
                          onClick={handleLinkClick}
                        >
                          <span className={styles.navLinkNum} aria-hidden="true">
                            {item.num}
                          </span>
                          {item.label}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Hover Image Preview Panel (Desktop only) */}
            <div
              className={`${styles.imagePreviewPanel} ${
                hoveredImage ? styles.visible : ''
              }`}
            >
              {hoveredImage && (
                <img
                  src={hoveredImage}
                  alt="Service preview"
                  className={`${styles.previewImg} ${styles.activeImg}`}
                />
              )}
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
