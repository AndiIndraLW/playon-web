import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollRevealText from '@/components/ScrollRevealText';

export const metadata: Metadata = {
  title: 'About Us | PlayOn — Event-Focused Brand Agency',
  description:
    'PlayOn is an event-focused brand agency. We create arena broadcasts, 3D stage VFX, motion identities, and interactive digital experiences. Events End. We Play On.',
  openGraph: {
    title: 'About PlayOn | Event-Focused Brand Agency',
    description: 'Events End. We Play On. — Arena broadcast, kinetic branding, Unreal Engine VFX.',
    type: 'website',
  },
};

const stats = [
  { num: '50M+',  label: 'Global viewers reached' },
  { num: '120+',  label: 'Projects delivered' },
  { num: '15',    label: 'International awards' },
  { num: '100%',  label: 'Real-time precision' },
];

const teamMembers = [
  {
    name: 'Alex Vane',
    role: 'Executive Visual Director',
    img: '/assets/dummyimghl/dummyimghl3.jpg',
    bio: 'Pioneering live broadcast visual telemetry for international esports and arena shows.',
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Unreal Engine VFX',
    img: '/assets/dummyimghl/dummyimghl2.jpg',
    bio: '3D technical director specializing in real-time camera tracking and photorealistic live sets.',
  },
  {
    name: 'Marcus Chen',
    role: 'Lead Motion Designer',
    img: '/assets/dummyimghl/dummyimghl5.jpg',
    bio: 'Crafting high-adrenaline opening ceremony motion packages and live tournament branding.',
  },
];

const pillars = [
  {
    num: '01',
    heading: 'Live Stage Telemetry',
    body: 'Real-time data feeds transformed into broadcast-ready HUDs and dynamic spectator visuals.',
  },
  {
    num: '02',
    heading: 'Virtual Stage Environments',
    body: 'Photorealistic 3D sets rendered live via Unreal Engine with precision camera tracking.',
  },
  {
    num: '03',
    heading: 'Kinetic Motion Toolkits',
    body: 'Full graphic packages for broadcasts, opening ceremonies, and custom trophy reveals.',
  },
];

const mediaStrip = [
  { img: '/assets/dummyimghl/dummyimghl1.jpeg', label: 'Arena Broadcast Control' },
  { img: '/assets/dummyimghl/dummyimghl2.jpg',  label: 'Kinetic Stage Telemetry' },
  { img: '/assets/dummyimghl/dummyimghl3.jpg',  label: '3D Unreal Engine Renders' },
  { img: '/assets/dummyimghl/dummyimghl4.jpg',  label: 'Projection Mapping Stage' },
  { img: '/assets/dummyimghl/dummyimghl5.jpg',  label: 'Tournament Championship' },
  { img: '/assets/dummyimghl/dummyimghl6.jpg',  label: 'WebGL Interactive Portal' },
];


const MARQUEE_ITEMS = [
  'Event-Focused Brand Agency',
  'Arena Broadcast & VFX',
  'Kinetic Motion Design',
  'Unreal Engine 3D Stage',
  'Tournament Branding',
  'Events End. We Play On.',
];

function SunburstOverlay({ color, style }: { color: string; style?: React.CSSProperties }) {
  const count = 52;
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      style={{
        position: 'absolute',
        width: '72%',
        height: '72%',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count;
        const rad = (angle * Math.PI) / 180;
        const r1 = 55;
        const r2 = 135;
        const x1 = 150 + r1 * Math.cos(rad);
        const y1 = 150 + r1 * Math.sin(rad);
        const x2 = 150 + r2 * Math.cos(rad);
        const y2 = 150 + r2 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="5"
            strokeLinecap="square"
          />
        );
      })}
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* ═══════════════════════════════════════════════
          HERO SECTION
          Left: Headline + Tagline + Mascot + Radial fan
          Right: Phone mockup + floating card
      ═══════════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="About Hero">
        {/* Decorative green accent stripes (right edge only) */}
        <div className={styles.heroAccentStripes} aria-hidden="true">
          <div className={styles.heroStripe} />
          <div className={styles.heroStripe} />
          <div className={styles.heroStripe} />
        </div>

        {/* ── Left Column */}
        <div className={styles.heroLeft}>
          {/* Image above the headline */}
          <img
            src="/assets/dummyimghl/dummyimghl3.jpg"
            alt="PlayOn creative production"
            className={styles.heroLeftImage}
          />

          <h1 className={styles.heroHeadline}>
            Event-Focused<br />Brand Agency
          </h1>
          <p className={styles.heroTagline}>Events End. We Play On.</p>
        </div>

        {/* ── Right Column: Floating mockups */}
        <div className={styles.heroRight}>
          <div className={styles.mockupStack}>
            {/* iPhone mockup image showing Instagram */}
            <img
              src="/assets/iphone-mockup.png"
              alt="PlayOn Instagram profile on iPhone"
              className={styles.iphoneMockupImg}
            />

            {/* Floating card overlay */}
            <div className={styles.floatingCard}>
              <img
                src="/assets/dummyimghl/dummyimghl5.jpg"
                alt="PlayOn — We Work Like We Play"
                className={styles.floatingCardImg}
              />
              <div className={styles.floatingCardLabel}>
                <span className={styles.floatingCardTag}>PlayOn 2026</span>
                <div className={styles.floatingCardTitle}>We Work<br />Like We Play</div>
                <div className={styles.playonBrand}>
                  <span>Play</span>
                  <span style={{ color: '#F72C25' }}>On</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE TICKER
      ═══════════════════════════════════════════════ */}
      <div className={styles.marqueeBar} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((t) => (
            <span key={t} className={styles.marqueePart}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MANIFESTO + PLAYON DNA SECTION (Ref f24402254931175)
      ═══════════════════════════════════════════════ */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoReveal}>
          <ScrollRevealText
            text="WE DO NOT BUILD GENERIC CORPORATE WEBSITES. WE CRAFT LIVE BROADCAST SPECTACLES AND DIGITAL PRODUCTS THAT MAKE MILLIONS HOLD THEIR BREATH."
          />
        </div>

        {/* Full-width image banner after manifesto text */}
        <div className={styles.fullWidthBanner}>
          <img
            src="/assets/dummyimghl/dummyimghl4.jpg"
            alt="PlayOn Arena Stage Broadcast Production"
            className={styles.fullWidthBannerImg}
          />
          <div className={styles.fullWidthBannerOverlay} aria-hidden="true" />
        </div>

        <div className={styles.dnaSection}>
          <div className={styles.dnaHeader}>
            <h2 className={styles.dnaTitle}>
              We Work<br />Like We Play
            </h2>
            <div className={styles.dnaRightText}>
              <p className={styles.dnaParagraph}>
                Where strategy feels like play.<br />
                Where execution hits as hard as matchday.<br />
                Where every brief is a new round played to the max.
              </p>
              <p className={styles.dnaSubtitle}>
                We don&apos;t just create events. We ensure your brand remains talked about long after the stage is packed away.
              </p>
            </div>
          </div>

          <div className={styles.dnaCardsGrid}>
            <div className={styles.dnaCard}>
              <img
                src="/assets/dummyimghl/dummyimghl1.jpeg"
                alt="Production Control Deck"
                className={styles.dnaCardImg}
              />
              <SunburstOverlay color="#F2F2F2" style={{ top: '54%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>

            <div className={styles.dnaCard}>
              <img
                src="/assets/dummyimghl/dummyimghl2.jpg"
                alt="Arena Crowd & Spectacle"
                className={styles.dnaCardImg}
              />
              <SunburstOverlay color="#F72C25" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>

            <div className={styles.dnaCard}>
              <img
                src="/assets/dummyimghl/dummyimghl6.jpg"
                alt="3D Broadcast Portal"
                className={styles.dnaCardImg}
              />
              <SunburstOverlay color="#22D760" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS BAND — Sunflower Gold background
      ═══════════════════════════════════════════════ */}
      <div className={styles.statsBand}>
        <div className={styles.statsInner}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          OUR TEAM SECTION
      ═══════════════════════════════════════════════ */}
      <section className={styles.teamSection} aria-label="Our Leadership Team">
        <div className={styles.teamHeader}>
          <div className={styles.teamTitleGroup}>
            <span className={styles.eyebrow}>The Minds Behind PlayOn</span>
            <h2 className={styles.teamTitle}>Our Leadership & Team</h2>
          </div>
          <p className={styles.teamDesc}>
            Broadcast visual directors, Unreal Engine technical architects, kinetic motion designers, and full-stack engineers driving stadium-scale experiences.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map((member, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.teamImgWrapper}>
                <img src={member.img} alt={member.name} className={styles.teamImg} />
              </div>
              <div className={styles.teamCardInfo}>
                <h3 className={styles.teamMemberName}>{member.name}</h3>
                <span className={styles.teamMemberRole}>{member.role}</span>
                <p className={styles.teamMemberBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MEDIA STRIP
      ═══════════════════════════════════════════════ */}
      <section className={styles.mediaStrip} aria-label="Production showcase">
        <div className={styles.stripRow}>
          {[...mediaStrip, ...mediaStrip].map((item, i) => (
            <div key={i} className={styles.stripCard}>
              <img src={item.img} alt={item.label} className={styles.stripCardImg} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Got an event,<br />broadcast,<br />or campaign?
          </h2>
          <p className={styles.ctaSubtext}>
            Let&apos;s build something unforgettable together. Reach out to our leadership team.
          </p>
          <Link href="/contact" className={styles.ctaBtn} id="about-cta-btn">
            <span>Start A Conversation</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
