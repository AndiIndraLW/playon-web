'use client';

import styles from './BrandGifSection.module.css';

export default function BrandGifSection() {
  return (
    <section className={styles.section} id="brand-gif-section">
      <div className={styles.gifWrapper}>
        <img
          src="/assets/brandgif.gif"
          alt="Brand Showcase"
          className={styles.gifImage}
          loading="lazy"
        />
      </div>
    </section>
  );
}
