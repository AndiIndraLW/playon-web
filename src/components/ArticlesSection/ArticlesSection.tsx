'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from './ArticlesSection.module.css';

interface ArticleItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const articlesData: ArticleItem[] = [
  {
    id: 1,
    title: 'The Future of Competitive Gaming Broadcasts',
    description:
      'Explore how 3D motion environments, real-time spatial analytics, and immersive AR stage visuals are redefining live esports entertainment for millions worldwide.',
    image: '/assets/dummyimghl/dummyimghl1.jpeg',
    link: '/articles/future-of-esports-broadcasts',
  },
  {
    id: 2,
    title: 'Building Iconic Brand Experiences in 2026',
    description:
      'Discover our strategic design blueprint for building digital-first brand identities that resonate with next-generation global gaming audiences.',
    image: '/assets/dummyimghl/dummyimghl2.jpg',
    link: '/articles/building-iconic-brand-experiences',
  },
  {
    id: 3,
    title: 'Next-Gen Motion Graphics for Arena Shows',
    description:
      'A deep dive into high-framerate visual synthesis, projection mapping, and dynamic LED stage choreography designed for massive stadium events.',
    image: '/assets/dummyimghl/dummyimghl3.jpg',
    link: '/articles/next-gen-motion-graphics',
  },
  {
    id: 4,
    title: 'Interactive Sound & Visual Production Techniques',
    description:
      'How spatial audio algorithms and reactive visual shaders create visceral, heart-pounding moments during live gaming broadcasts.',
    image: '/assets/dummyimghl/dummyimghl4.jpg',
    link: '/articles/interactive-sound-and-visuals',
  },
  {
    id: 5,
    title: 'Mastering Virtual Production for Live Events',
    description:
      'Unlocking the potential of virtual sets and realtime rendering to deliver cinematic quality without the overhead of physical staging.',
    image: '/assets/dummyimghl/dummyimghl5.jpg',
    link: '/articles/mastering-virtual-production',
  },
  {
    id: 6,
    title: 'Designing for the Next Billion Esports Fans',
    description:
      'An exploration of cross-platform storytelling, mobile-first live streams, and interactive community engagement strategies.',
    image: '/assets/dummyimghl/dummyimghl6.jpg',
    link: '/articles/designing-for-esports-fans',
  },
];

export default function ArticlesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.clientWidth;
      trackRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.clientWidth;
      trackRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} id="articles">
      <div className={styles.container}>
        {/* Header row with title & navigation */}
        <div className={styles.headerRow}>
          <h2 className={styles.headerTitle}>Articles</h2>

          <div className={styles.navControls}>
            <button
              onClick={scrollLeft}
              className={styles.navBtn}
              aria-label="Scroll left articles"
              title="Previous articles"
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
              aria-label="Scroll right articles"
              title="Next articles"
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

        {/* Slidable carousel container — strictly 3 articles visible */}
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack} ref={trackRef}>
            {articlesData.map((article) => (
              <article key={article.id} className={styles.articleCard}>
                {/* Image at the top — enlarged aspect ratio */}
                <div className={styles.imageWrapper}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.articleImage}
                    loading="lazy"
                  />
                </div>

                {/* Content below image: unboxed title, description, and Learn More button */}
                <div className={styles.articleBody}>
                  <div className={styles.contentGroup}>
                    <h3 className={styles.articleTitle} title={article.title}>
                      {article.title}
                    </h3>
                    <p className={styles.articleDescription}>
                      {article.description}
                    </p>
                  </div>

                  <Link href={article.link} className={styles.learnMoreBtn}>
                    <span>Learn More</span>
                    <svg
                      className={styles.learnMoreBtnIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
