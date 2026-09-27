'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './ScrollRevealText.module.css';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when the element enters 85% of viewport
      // Finish revealing when element reaches 25% of viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;

      const totalDistance = start - end;
      const currentDistance = start - rect.top;

      const rawProgress = currentDistance / (totalDistance + rect.height * 0.4);
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress(clampedProgress);
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const words = text.split(' ');

  return (
    <h2 ref={containerRef} className={`${styles.textContainer} ${className}`}>
      {words.map((word, idx) => {
        // Calculate progress ratio per word across the scroll range
        const step = 0.8 / words.length;
        const wordStart = idx * step;
        const wordEnd = wordStart + step * 1.8;

        const wordProgress = Math.min(
          Math.max((scrollProgress - wordStart) / (wordEnd - wordStart), 0),
          1
        );

        const opacity = 0.15 + wordProgress * 0.85;
        const translateY = (1 - wordProgress) * 8;

        return (
          <span
            key={`${word}-${idx}`}
            className={styles.word}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              color: wordProgress > 0.3 ? '#F2F2F2' : 'rgba(242, 242, 242, 0.2)',
              textShadow: wordProgress > 0.6 ? '0 0 35px rgba(242, 242, 242, 0.25)' : 'none',
            }}
          >
            {word}
          </span>
        );
      })}
    </h2>
  );
}
