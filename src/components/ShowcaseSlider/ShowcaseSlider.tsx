'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './ShowcaseSlider.module.css';

interface ShowcaseSliderProps {
  gallery: string[];
  title?: string;
}

export default function ShowcaseSlider({ gallery, title = 'Production Showcase' }: ShowcaseSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    // Calculate index based on scroll position
    const itemWidth = clientWidth * 0.6; // approx item width ratio
    const newIndex = Math.min(
      gallery.length - 1,
      Math.max(0, Math.round(scrollLeft / itemWidth))
    );
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => track.removeEventListener('scroll', updateActiveIndex);
  }, [gallery.length]);

  const scrollPrev = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!trackRef.current) return;
    const items = trackRef.current.children;
    if (items[index]) {
      (items[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className={styles.container} id="gallery-showcase">
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.arrowBtn}
            onClick={scrollNext}
            disabled={activeIndex === gallery.length - 1}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.trackWrapper}>
        <div ref={trackRef} className={styles.track}>
          {gallery.map((imgUrl, i) => (
            <div key={i} className={styles.slideItem}>
              <img
                src={imgUrl}
                alt={`${title} image ${i + 1}`}
                className={styles.slideImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
