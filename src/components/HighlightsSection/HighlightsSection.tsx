'use client';

import React, { useRef } from 'react';
import styles from './HighlightsSection.module.css';

interface CardItem {
  id: number;
  title: string;
  image: string;
  tags: string[];
}

const highlightCards: CardItem[] = [
  {
    id: 1,
    title: 'Cyberpunk Velocity',
    image: '/assets/dummyimghl/dummyimghl1.jpeg',
    tags: ['E-Sports', '3D Motion', '2026'],
  },
  {
    id: 2,
    title: 'Apex Championship',
    image: '/assets/dummyimghl/dummyimghl2.jpg',
    tags: ['Tournament', 'Live Broadcast'],
  },
  {
    id: 3,
    title: 'Neon Rivals Arena',
    image: '/assets/dummyimghl/dummyimghl3.jpg',
    tags: ['VFX', 'Brand Identity'],
  },
  {
    id: 4,
    title: 'Overdrive League',
    image: '/assets/dummyimghl/dummyimghl4.jpg',
    tags: ['Gaming', 'Interactive'],
  },
  {
    id: 5,
    title: 'Phantom Global Series',
    image: '/assets/dummyimghl/dummyimghl5.jpg',
    tags: ['Stage Design', 'Motion'],
  },
  {
    id: 6,
    title: 'Vanguard World Finals',
    image: '/assets/dummyimghl/dummyimghl6.jpg',
    tags: ['Cinematic', 'Production'],
  },
];

export default function HighlightsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -520, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 520, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} id="highlights">
      <div className={styles.container}>
        <h2 className={styles.headerTitle}>Highlights</h2>

        <div className={styles.headerControls}>
          <button
            onClick={scrollLeft}
            className={styles.navBtn}
            aria-label="Scroll left"
            title="Previous highlights"
          >
            <svg
              className={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className={styles.navBtn}
            aria-label="Scroll right"
            title="Next highlights"
          >
            <svg
              className={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slideable cards carousel track */}
      <div className={styles.sliderTrack} ref={trackRef}>
        {highlightCards.map((card) => (
          <article key={card.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={card.image}
                alt={card.title}
                className={styles.cardImage}
                loading="lazy"
              />
              <div className={styles.imageOverlay} aria-hidden="true" />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.tagList}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
