'use client';

import React, { useState, useEffect } from 'react';
import styles from './TestimonialsSection.module.css';
import { fetchApi } from '@/lib/api';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  testimony: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Vance',
    company: 'Global Head of Esports, Electronic Arts',
    testimony:
      '“Partnering with PlayOn transformed our global championship broadcast into an unforgettable cinematic experience. Their attention to detail, motion graphic mastery, and seamless execution under tight live broadcast pressure set a new benchmark for our brand.”',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    company: 'Creative Director, Sony Interactive Entertainment',
    testimony:
      '“PlayOn brought a level of visual sophistication and immersive storytelling that exceeded our wildest expectations. From concept to final delivery, their team demonstrated unrivaled creative direction and technical precision.”',
  },
  {
    id: 3,
    name: 'David K. Sterling',
    company: 'VP of Global Marketing, Red Bull Media House',
    testimony:
      '“Working with PlayOn is effortless yet extraordinary. They understand youth culture and high-octane gaming aesthetics better than anyone in the industry. The results spoke for themselves—our campaign engagement skyrocketed across all platforms.”',
  },
];

export default function TestimonialsSection() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      const res = await fetchApi<{ data: any[] }>('/testimonials');
      if (res?.data && res.data.length > 0) {
        const mapped: Testimonial[] = res.data.map((item, idx) => ({
          id: item.id || idx + 1,
          name: item.name,
          company: item.title || '',
          testimony: item.testimony,
        }));
        setTestimonialsList(mapped);
      }
    }
    loadTestimonials();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonialsList[currentIndex] || testimonialsList[0];

  if (!currentTestimonial) return null;

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        {/* Header row with title & navigation */}
        <div className={styles.headerRow}>
          <h2 className={styles.headerTitle}>Testimonials</h2>

          <div className={styles.navControls}>
            <button
              onClick={prevSlide}
              className={styles.navBtn}
              aria-label="Previous testimonial"
              title="Previous testimonial"
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
              onClick={nextSlide}
              className={styles.navBtn}
              aria-label="Next testimonial"
              title="Next testimonial"
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

        {/* 2-Column Grid Testimonial View */}
        <div className={styles.slideWrapper}>
          <article className={styles.testimonialCard} key={currentTestimonial.id}>
            {/* Left Grid: Name & Company */}
            <div className={styles.authorMeta}>
              <div className={styles.authorName}>{currentTestimonial.name}</div>
              <div className={styles.authorCompany}>{currentTestimonial.company}</div>
            </div>

            {/* Right Grid: Testimony Quote */}
            <div className={styles.quoteGrid}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <blockquote className={styles.quoteText}>
                {currentTestimonial.testimony}
              </blockquote>
            </div>
          </article>
        </div>

        {/* Pagination indicator dots */}
        <div className={styles.dotsWrapper}>
          {testimonialsList.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
