import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.heroSection}>
      <video
        className={styles.heroBg}
        src="/assets/dummyvideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* subtle dark vignette so headline text stays readable */}
      <div className={styles.heroOverlay} aria-hidden="true" />

      {/* Hero headline */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeadline}>
          Play On, Lorem ipsum dolor sit amet lorem ipsum dolor sit amet
        </h1>
      </div>
    </main>
  );
}
