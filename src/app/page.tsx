import Link from 'next/link';
import styles from './page.module.css';
import CompanyLogos from '@/components/CompanyLogos';
import ScrollRevealText from '@/components/ScrollRevealText';
import HighlightsSection from '@/components/HighlightsSection';
import RecentProjectsSection from '@/components/RecentProjectsSection';
import BrandGifSection from '@/components/BrandGifSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ArticlesSection from '@/components/ArticlesSection';

export default function Home() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <main className={styles.heroSection}>
        <video
          className={styles.heroBg}
          src="/assets/dummyvideo2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* subtle dark vignette so headline text stays readable */}
        <div className={styles.heroOverlay} aria-hidden="true" />

        {/* Hero content */}
        <div className={styles.heroContent}>
          {/* Hero headline + CTA button */}
          <div className={styles.heroMain}>
            <h1 className={styles.heroHeadline}>
              Play On, Lorem ipsum dolor sit amet lorem ipsum dolor sit amet
            </h1>
            <a href="#section-1" className={styles.heroCtaBtn}>
              Im Interested!
            </a>
          </div>

          {/* Company showcase at bottom of hero */}
          <CompanyLogos label="Trusted by industry leaders worldwide" />
        </div>
      </main>

      {/* ─── Section 1 (Full 1-screen height) ─── */}
      <section id="section-1" className={styles.sectionOne}>
        <div className={styles.sectionOneGlow} aria-hidden="true" />
        <div className={styles.sectionOneContainer}>
          <ScrollRevealText
            text="PLAYON ADALAH LOREM IPSUM DOLOR SIT AMET LOREM IPSUM DOLOR SIT AMET PLAYON ADALAH LOREM IPSUM DOLOR SIT AMET LOREM IPSUM DOLOR SIT AMET"
            className={styles.sectionOneTitle}
          />
          <Link href="/contact" className={styles.sectionOneCta}>
            <span>contact us</span>
            <svg
              className={styles.sectionOneCtaIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Section 2 (Highlights) ─── */}
      <HighlightsSection />

      {/* ─── Section 3 (Recent Project) ─── */}
      <RecentProjectsSection />

      {/* ─── Brand GIF Showcase Section ─── */}
      <BrandGifSection />

      {/* ─── Section 4 (Testimonials) ─── */}
      <TestimonialsSection />

      {/* ─── Section 5 (Articles) ─── */}
      <ArticlesSection />
    </>
  );
}
