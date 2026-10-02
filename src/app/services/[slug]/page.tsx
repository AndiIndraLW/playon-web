import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';
import ShowcaseSlider from '@/components/ShowcaseSlider/ShowcaseSlider';

interface ServiceApiItem {
  id: number | string;
  slug: string;
  title: string;
  sub_title?: string;
  featured_image?: string;
  gallery?: string[];
  description?: string;
}

interface ServiceDetail {
  id: string;
  slug: string;
  num: string;
  title: string;
  subTitle: string;
  descriptionHtml: string;
  featuredImage: string;
  gallery: string[];
  deliverables: string[];
  techStack: string[];
  turnaround: string;
}

const fallbackDetailMap: Record<string, ServiceDetail> = {
  'e-sports-arena-broadcast': {
    id: '1',
    slug: 'e-sports-arena-broadcast',
    num: '01',
    title: 'E-Sports & Arena Broadcast',
    subTitle: 'Live Production • Arena Visuals • Real-Time Telemetry',
    descriptionHtml: `
      <p>Engineered for maximum crowd excitement. We design end-to-end stadium broadcast graphics, live stage telemetry, real-time HUD overlays, and instant replay systems tailored for high-stakes esports championships and live arena events.</p>
      <h2>Broadcast Telemetry & Real-Time HUDs</h2>
      <p>Our custom software integrations hook directly into match servers and observer APIs to render frame-accurate health bars, player stats, kill feeds, and mini-map overlays in real time. We ensure spectator clarity without sacrificing visual flair.</p>
      <h2>Stadium Screen Control & Multi-Display Sync</h2>
      <p>Synchronize main arena LED walls, side banners, player podium lights, and broadcast feeds under unified master triggers. When a game-winning play happens, every screen in the stadium explodes with synchronized dynamic animations.</p>
    `,
    featuredImage: '/assets/dummyimghl/dummyimghl1.jpeg',
    gallery: [
      '/assets/dummyimghl/dummyimghl1.jpeg',
      '/assets/dummyimghl/dummyimghl2.jpg',
      '/assets/dummyimghl/dummyimghl3.jpg',
    ],
    deliverables: [
      'Real-Time Broadcast Overlay Package',
      'Stadium LED Screen Video Mapping',
      'Match Data Observer API Integration',
      'On-Site Replay & Operator Control Deck',
    ],
    techStack: ['Unreal Engine', 'CasparCG', 'vMix', 'WebSockets', 'NDI Signal Matrix'],
    turnaround: '2 - 4 Weeks Setup',
  },
  'brand-experiences-motion': {
    id: '2',
    slug: 'brand-experiences-motion',
    num: '02',
    title: 'Brand Experiences & Motion',
    subTitle: 'Visual Identity • Kinetic Typography • 3D Motion Systems',
    descriptionHtml: `
      <p>Crafting high-impact motion identities for global gaming brands and international tournaments. From kinetic logos to multi-screen arena rollouts, we elevate your event identity into an unforgettable icon.</p>
      <h2>Kinetic Graphic Toolkits</h2>
      <p>We craft modular 2D/3D visual assets, stingers, lower-thirds, lower-screen tickers, and commercial transitions designed for seamless deployment across twitch feeds, broadcast trucks, and social media clips.</p>
      <h2>Opening Ceremony Visual Packages</h2>
      <p>Designing full intro reveal sequences, player walkout animations, and sound-synced kinetic typography loops that set the tone before the first match kicks off.</p>
    `,
    featuredImage: '/assets/dummyimghl/dummyimghl2.jpg',
    gallery: [
      '/assets/dummyimghl/dummyimghl2.jpg',
      '/assets/dummyimghl/dummyimghl4.jpg',
      '/assets/dummyimghl/dummyimghl5.jpg',
    ],
    deliverables: [
      'Complete Tournament Brand Guidelines',
      'Kinetic Broadcast Motion Package',
      'Player Walkout & Trophy Reveal Visuals',
      'Social & Stream Media Toolkits',
    ],
    techStack: ['After Effects', 'Cinema 4D', 'Octane Render', 'Lottie', 'Figma'],
    turnaround: '3 - 6 Weeks Design',
  },
  '3d-stage-vfx-animation': {
    id: '3',
    slug: '3d-stage-vfx-animation',
    num: '03',
    title: '3D Stage & VFX Animation',
    subTitle: 'Unreal Engine • Projection Mapping • Virtual Sets',
    descriptionHtml: `
      <p>Photorealistic 3D environments and stage projection mapping powered by real-time Unreal Engine rendering. We blend physical stage geometry with virtual extended reality (xR).</p>
      <h2>Real-Time Virtual Environments</h2>
      <p>Using camera tracking systems (stype / Mo-Sys), our virtual 3D stages dynamically match physical camera perspectives live on air, placing commentators inside futuristic battle arenas or fantasy landscapes.</p>
      <h2>Projection Mapping Spectacles</h2>
      <p>Transforming physical arena floors into animated battlegrounds. High-lumen projection mapping turns the stadium floor into dynamic liquid, lava, or digital gridscapes synchronized to player actions.</p>
    `,
    featuredImage: '/assets/dummyimghl/dummyimghl3.jpg',
    gallery: [
      '/assets/dummyimghl/dummyimghl3.jpg',
      '/assets/dummyimghl/dummyimghl1.jpeg',
      '/assets/dummyimghl/dummyimghl6.jpg',
    ],
    deliverables: [
      'Unreal Engine 5 Real-Time Virtual Set',
      'Stadium Floor Projection Mapping Files',
      'Camera Tracking Signal Calibration',
      'Interactive DMX Lighting Triggers',
    ],
    techStack: ['Unreal Engine 5', 'Disguise d2', 'Notch VFX', 'Mo-Sys Camera Tracking'],
    turnaround: '4 - 8 Weeks Production',
  },
  'interactive-web-audio': {
    id: '4',
    slug: 'interactive-web-audio',
    num: '04',
    title: 'Interactive Web & Audio',
    subTitle: 'WebGL Experiences • Spatial Sound • Digital Products',
    descriptionHtml: `
      <p>Immersive digital web experiences paired with custom sound design and spatial audio engineered for deep player and fan engagement across global campaigns.</p>
      <h2>3D Interactive WebGL Hubs</h2>
      <p>Custom web portals with real-time 3D product showcases, interactive tournament schedules, fan vote systems, and live match predictor leaderboards.</p>
      <h2>Spatial Sound Design</h2>
      <p>Crafting custom tournament sound effects, transition risers, anthem bass drops, and spatial audio soundscapes engineered to reverberate through stadium speaker systems.</p>
    `,
    featuredImage: '/assets/dummyimghl/dummyimghl4.jpg',
    gallery: [
      '/assets/dummyimghl/dummyimghl4.jpg',
      '/assets/dummyimghl/dummyimghl5.jpg',
      '/assets/dummyimghl/dummyimghl2.jpg',
    ],
    deliverables: [
      'WebGL Tournament Experience Portal',
      'Custom Audio Stems & Anthem Package',
      'Real-Time Fan Polling & Leaderboards',
      'Mobile-Optimized Web App',
    ],
    techStack: ['Three.js / WebGL', 'Next.js', 'Web Audio API', 'Spatial Audio DAW'],
    turnaround: '2 - 5 Weeks Build',
  },
  'global-tournament-branding': {
    id: '5',
    slug: 'global-tournament-branding',
    num: '05',
    title: 'Global Tournament Branding',
    subTitle: 'Broadcast Package • Trophy Ceremonies • Event Architecture',
    descriptionHtml: `
      <p>Full-spectrum branding for major esports championships, including opening ceremony visual shows, venue signage, broadcast HUDs, and custom trophy reveals.</p>
      <h2>End-to-End Visual Ecosystem</h2>
      <p>We define every visual touchpoint of a championship event—from tournament logos, stage banners, player jerseys, and press conference backdrops to live broadcast lower-thirds and victory screen pyro animations.</p>
    `,
    featuredImage: '/assets/dummyimghl/dummyimghl5.jpg',
    gallery: [
      '/assets/dummyimghl/dummyimghl5.jpg',
      '/assets/dummyimghl/dummyimghl6.jpg',
      '/assets/dummyimghl/dummyimghl1.jpeg',
    ],
    deliverables: [
      'Championship Brand Identity System',
      'Arena Spatial & Wayfinding Design',
      'Trophy Ceremony Visual Production',
      'Broadcast Operations Toolkit',
    ],
    techStack: ['Adobe CC', 'Cinema 4D', 'Unreal Engine', 'Vectorworks Stage Design'],
    turnaround: '4 - 10 Weeks Full Package',
  },
};

async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  try {
    const res = await fetchApi<{ data: ServiceApiItem }>(`/services/${slug}`);
    if (res?.data) {
      const item = res.data;
      const fallback = fallbackDetailMap[slug] || fallbackDetailMap['e-sports-arena-broadcast'];
      
      const gallery = Array.isArray(item.gallery) && item.gallery.length > 0
        ? item.gallery.map(g => getMediaUrl(g, fallback.featuredImage))
        : fallback.gallery;

      return {
        id: String(item.id),
        slug: item.slug || slug,
        num: fallback.num || '01',
        title: item.title,
        subTitle: item.sub_title || fallback.subTitle,
        descriptionHtml: item.description || fallback.descriptionHtml,
        featuredImage: getMediaUrl(item.featured_image, fallback.featuredImage),
        gallery,
        deliverables: fallback.deliverables,
        techStack: fallback.techStack,
        turnaround: fallback.turnaround,
      };
    }
  } catch (err) {
    console.error(`Error fetching service slug ${slug}:`, err);
  }

  // Return fallback if available
  if (fallbackDetailMap[slug]) {
    return fallbackDetailMap[slug];
  }

  // Generate dynamic fallback so any new slug works gracefully
  return {
    id: 'custom',
    slug,
    num: '01',
    title: slug.replace(/-/g, ' ').toUpperCase(),
    subTitle: 'PlayOn Specialized Service',
    descriptionHtml: `<p>Custom engineered service solution by PlayOn. We provide real-time stadium broadcast graphics, live stage telemetry, and motion identities tailored for global tournaments.</p>`,
    featuredImage: '/assets/dummyimghl/dummyimghl1.jpeg',
    gallery: [
      '/assets/dummyimghl/dummyimghl1.jpeg',
      '/assets/dummyimghl/dummyimghl2.jpg',
      '/assets/dummyimghl/dummyimghl3.jpg',
    ],
    deliverables: [
      'Custom Telemetry & Broadcast Assets',
      'Real-Time Graphic Package',
      'On-Site Technical Execution',
    ],
    techStack: ['Unreal Engine', 'After Effects', 'WebSockets', 'NDI Signal Matrix'],
    turnaround: '2 - 4 Weeks',
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | PlayOn',
    };
  }

  return {
    title: `${service.title} | PlayOn Services`,
    description: service.subTitle,
    openGraph: {
      title: `${service.title} — PlayOn Agency`,
      description: service.subTitle,
      images: [{ url: service.featuredImage }],
    },
  };
}

export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero} aria-label="Service Detail Header">
        <Link href="/#our-services" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Services
        </Link>

        <h1 className={styles.heroTitle}>{service.title}</h1>
        <p className={styles.heroSubtitle}>{service.subTitle}</p>

        <div className={styles.heroActions}>
          <Link href={`/contact?service=${service.slug}`} className={styles.primaryBtn}>
            Book This Service
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <a href="#gallery-showcase" className={styles.secondaryBtn}>
            View Showcase
          </a>
        </div>
      </section>

      {/* ── MEDIA BANNER ── */}
      <section className={styles.mediaBannerSection}>
        <div className={styles.mediaWrapper}>
          <img
            src={service.featuredImage}
            alt={service.title}
            className={styles.bannerImg}
          />
          <div className={styles.bannerOverlay} />
        </div>
      </section>

      {/* ── MAIN CONTENT GRID ── */}
      <section className={styles.contentSection}>
        {/* Left: Description */}
        <div className={styles.mainBody}>
          <h2 className={styles.descriptionTitle}>Overview & Capabilities</h2>
          <div
            className={styles.descriptionText}
            dangerouslySetInnerHTML={{ __html: service.descriptionHtml }}
          />
        </div>
      </section>

      {/* ── GALLERY SHOWCASE SLIDER ── */}
      {service.gallery && service.gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <ShowcaseSlider gallery={service.gallery} title="Production Showcase" />
        </section>
      )}

      {/* ── CTA BOX ── */}
      <section className={styles.ctaBox}>
        <h2 className={styles.ctaTitle}>
          Bring {service.title} <br />
          To Your Event
        </h2>
        <p className={styles.ctaDesc}>
          Get in touch with our live broadcast production team to scope your venue, telemetry needs, and timeline.
        </p>
        <Link href={`/contact?service=${service.slug}`} className={styles.primaryBtn}>
          Request Proposal
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
