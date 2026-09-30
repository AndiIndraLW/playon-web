import Link from 'next/link';
import styles from './page.module.css';
import CompanyLogos from '@/components/CompanyLogos';
import ScrollRevealText from '@/components/ScrollRevealText';
import HighlightsSection from '@/components/HighlightsSection';
import RecentProjectsSection from '@/components/RecentProjectsSection';
import BrandGifSection from '@/components/BrandGifSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ArticlesSection from '@/components/ArticlesSection';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface HomepageSettingsData {
  hero_bg_video?: string | null;
  hero_title?: string | null;
  section_1_text?: string | null;
  section_1_button_text?: string | null;
  section_1_button_link?: string | null;
}

export default async function Home() {
  const settingsRes = await fetchApi<{ data: HomepageSettingsData | null }>('/homepage-settings');
  const settings = settingsRes?.data;

  const heroVideo = getMediaUrl(settings?.hero_bg_video, '/assets/dummyvideo2.mp4');
  const heroTitle = settings?.hero_title || 'Play On, Lorem ipsum dolor sit amet lorem ipsum dolor sit amet';
  const section1Text = settings?.section_1_text || 'PLAYON ADALAH LOREM IPSUM DOLOR SIT AMET LOREM IPSUM DOLOR SIT AMET PLAYON ADALAH LOREM IPSUM DOLOR SIT AMET LOREM IPSUM DOLOR SIT AMET';
  const section1BtnText = settings?.section_1_button_text || 'contact us';
  const section1BtnLink = settings?.section_1_button_link || '/contact';

  return (
    <>
      {/* ─── Hero Section ─── */}
      <main className={styles.heroSection}>
        <video
          className={styles.heroBg}
          src={heroVideo}
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
              {heroTitle}
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
            text={section1Text}
            className={styles.sectionOneTitle}
          />
          <Link href={section1BtnLink} className={styles.sectionOneCta}>
            <span>{section1BtnText}</span>
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

      {/* ─── Our Services Section (Creative non-card layout) ─── */}
      <ServicesSection />

      {/* ─── Section 4 (Testimonials) ─── */}
      <TestimonialsSection />

      {/* ─── Section 5 (Articles) ─── */}
      <ArticlesSection />
    </>
  );
}
