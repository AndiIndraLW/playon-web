import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';
import ShowcaseSlider from '@/components/ShowcaseSlider/ShowcaseSlider';

interface SubService {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  linkText?: string;
}

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
  overviewDescription: string;
  subServices: SubService[];
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
    overviewDescription:
      'Engineered for maximum crowd excitement. We design end-to-end stadium broadcast graphics, live stage telemetry, real-time HUD overlays, and instant replay systems tailored for high-stakes esports championships and live arena events.',
    subServices: [
      {
        id: 'sub-1',
        title: 'Broadcast Telemetry & Real-Time HUDs',
        description:
          'Our custom software integrations hook directly into match servers and observer APIs to render frame-accurate health bars, player stats, kill feeds, and mini-map overlays in real time.',
        image: '/assets/dummyimghl/dummyimghl1.jpeg',
        badge: 'Live Data Engine',
        linkText: 'Visit',
      },
      {
        id: 'sub-2',
        title: 'Stadium Screen Control & Multi-Display Sync',
        description:
          'Synchronize main arena LED walls, side banners, player podium lights, and broadcast feeds under unified master triggers for stadium-wide celebrations.',
        image: '/assets/dummyimghl/dummyimghl2.jpg',
        badge: 'Display Sync',
        linkText: 'Visit',
      },
      {
        id: 'sub-3',
        title: 'Instant Replay & High-Voltage Stingers',
        description:
          'Low-latency multi-angle replay triggers paired with custom branded graphics stingers engineered for clutch championship match moments.',
        image: '/assets/dummyimghl/dummyimghl3.jpg',
        badge: 'Replay Engine',
        linkText: 'Visit',
      },
      {
        id: 'sub-4',
        title: 'Match Server Data Socket Connectors',
        description:
          'Direct websocket data pipelines pulling live gold diffs, ultimate charge status, and player economy stats into dynamic automated graphics.',
        image: '/assets/dummyimghl/dummyimghl4.jpg',
        badge: 'Server API',
        linkText: 'Visit',
      },
      {
        id: 'sub-5',
        title: 'Arena Audio & Cue Signal Automation',
        description:
          'Spatial sound triggers, sub-bass risers, and lighting DMX commands executed automatically in sync with live match events.',
        image: '/assets/dummyimghl/dummyimghl5.jpg',
        badge: 'DMX & Audio Sync',
        linkText: 'Visit',
      },
      {
        id: 'sub-6',
        title: 'Observer Deck & Control Hardware Rigs',
        description:
          'Turnkey operator desks, custom keypads, and NDI/SDI signal matrices pre-configured for seamless broadcast truck deployment.',
        image: '/assets/dummyimghl/dummyimghl6.jpg',
        badge: 'Hardware Deck',
        linkText: 'Visit',
      },
    ],
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
    overviewDescription:
      'Crafting high-impact motion identities for global gaming brands and international tournaments. From kinetic logos to multi-screen arena rollouts, we elevate your event identity into an unforgettable icon.',
    subServices: [
      {
        id: 'sub-1',
        title: 'Kinetic Graphic Toolkits',
        description:
          'Modular 2D/3D visual assets, stingers, lower-thirds, lower-screen tickers, and commercial transitions designed for seamless multi-channel broadcast deployment.',
        image: '/assets/dummyimghl/dummyimghl2.jpg',
        badge: 'Modular Assets',
        linkText: 'Visit',
      },
      {
        id: 'sub-2',
        title: 'Opening Ceremony Visual Packages',
        description:
          'Full intro reveal sequences, player walkout animations, and sound-synced kinetic typography loops that set the tone before the first match kicks off.',
        image: '/assets/dummyimghl/dummyimghl4.jpg',
        badge: 'Ceremony Visuals',
        linkText: 'Visit',
      },
      {
        id: 'sub-3',
        title: '3D Logo & Trophy Reveal Animations',
        description:
          'Photorealistic 3D rendered logo reveals and dynamic digital trophy animations designed for high-resolution stadium LED screens.',
        image: '/assets/dummyimghl/dummyimghl5.jpg',
        badge: '3D Render',
        linkText: 'Visit',
      },
      {
        id: 'sub-4',
        title: 'Stream Overlays & Social Media Toolkits',
        description:
          'Twitch/YouTube stream graphics, animated starting-soon screens, commercial loopers, and social media clip templates.',
        image: '/assets/dummyimghl/dummyimghl1.jpeg',
        badge: 'Digital Streams',
        linkText: 'Visit',
      },
      {
        id: 'sub-5',
        title: 'Event Spatial Signage & Dynamic Banners',
        description:
          'High-res motion loops tailored for stadium ribbon boards, concourse video walls, and entrance LED archways.',
        image: '/assets/dummyimghl/dummyimghl3.jpg',
        badge: 'Spatial Banners',
        linkText: 'Visit',
      },
      {
        id: 'sub-6',
        title: 'Motion Brand Guidelines & Specs',
        description:
          'Comprehensive animation rules, color palettes, font behaviors, and file export presets for international commentary teams.',
        image: '/assets/dummyimghl/dummyimghl6.jpg',
        badge: 'Brand Specs',
        linkText: 'Visit',
      },
    ],
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
    overviewDescription:
      'Photorealistic 3D environments and stage projection mapping powered by real-time Unreal Engine rendering. We blend physical stage geometry with virtual extended reality (xR).',
    subServices: [
      {
        id: 'sub-1',
        title: 'Real-Time Virtual Environments (xR)',
        description:
          'Unreal Engine 5 virtual stages dynamically matching physical camera perspectives live on air, placing commentators inside futuristic battle arenas.',
        image: '/assets/dummyimghl/dummyimghl3.jpg',
        badge: 'Unreal Engine 5',
        linkText: 'Visit',
      },
      {
        id: 'sub-2',
        title: 'Stadium Floor Projection Mapping',
        description:
          'Transforming physical arena floors into animated battlegrounds with high-lumen projection mapping synchronized to player actions.',
        image: '/assets/dummyimghl/dummyimghl1.jpeg',
        badge: 'Floor Mapping',
        linkText: 'Visit',
      },
      {
        id: 'sub-3',
        title: 'Camera Tracking System Calibration',
        description:
          'Mo-Sys and Stype optical tracking integration locking virtual 3D camera angles to physical broadcast cranes with zero latency.',
        image: '/assets/dummyimghl/dummyimghl6.jpg',
        badge: 'Camera Tracking',
        linkText: 'Visit',
      },
      {
        id: 'sub-4',
        title: 'Interactive DMX Lighting Automation',
        description:
          'DMX and Art-Net lighting protocol integration syncing stage moving heads and LED strobes to real-time Unreal Engine VFX triggers.',
        image: '/assets/dummyimghl/dummyimghl2.jpg',
        badge: 'DMX Lighting',
        linkText: 'Visit',
      },
      {
        id: 'sub-5',
        title: 'AR Holographic Player Avatars',
        description:
          'Augmented reality player avatars projected onto live broadcast feeds for high-impact player introductions during finals.',
        image: '/assets/dummyimghl/dummyimghl4.jpg',
        badge: 'AR Avatars',
        linkText: 'Visit',
      },
      {
        id: 'sub-6',
        title: 'Photorealistic Environment Design',
        description:
          'Custom 3D shaders, dynamic weather effects, cinematic lighting, and custom mesh modeling built natively inside Unreal Engine.',
        image: '/assets/dummyimghl/dummyimghl5.jpg',
        badge: '3D Worldbuilding',
        linkText: 'Visit',
      },
    ],
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
    overviewDescription:
      'Immersive digital web experiences paired with custom sound design and spatial audio engineered for deep player and fan engagement across global campaigns.',
    subServices: [
      {
        id: 'sub-1',
        title: '3D WebGL Tournament Portals',
        description:
          'Custom web portals featuring real-time 3D product showcases, interactive tournament schedules, fan vote systems, and live leaderboards.',
        image: '/assets/dummyimghl/dummyimghl4.jpg',
        badge: 'Three.js / WebGL',
        linkText: 'Visit',
      },
      {
        id: 'sub-2',
        title: 'Spatial Audio & Sound Design',
        description:
          'Custom tournament sound effects, transition risers, anthem bass drops, and spatial soundscapes engineered for stadium speaker systems.',
        image: '/assets/dummyimghl/dummyimghl5.jpg',
        badge: 'Spatial Audio',
        linkText: 'Visit',
      },
      {
        id: 'sub-3',
        title: 'Real-Time Fan Voting & Predictors',
        description:
          'Live spectator polling widgets and interactive match prediction leaderboards displayed live on stream and arena screens.',
        image: '/assets/dummyimghl/dummyimghl2.jpg',
        badge: 'Live Polling',
        linkText: 'Visit',
      },
      {
        id: 'sub-4',
        title: 'Interactive Mobile Venue Companion',
        description:
          'Mobile web app allowing fans in attendance to sync their phone screens with stadium LED shows for crowd light shows.',
        image: '/assets/dummyimghl/dummyimghl3.jpg',
        badge: 'Venue App',
        linkText: 'Visit',
      },
      {
        id: 'sub-5',
        title: 'Custom Audio Anthem & Stems Package',
        description:
          'Bespoke broadcast soundtrack package containing intro anthems, victory stabs, countdown beats, and commercial audio stems.',
        image: '/assets/dummyimghl/dummyimghl1.jpeg',
        badge: 'Custom Music',
        linkText: 'Visit',
      },
      {
        id: 'sub-6',
        title: 'Interactive Bracket & Tournament Trees',
        description:
          'Dynamic web-based tournament brackets with live status updates, match stats tooltips, and player head-to-head comparisons.',
        image: '/assets/dummyimghl/dummyimghl6.jpg',
        badge: 'Bracket Engine',
        linkText: 'Visit',
      },
    ],
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
    overviewDescription:
      'Full-spectrum branding for major esports championships, including opening ceremony visual shows, venue signage, broadcast HUDs, and custom trophy reveals.',
    subServices: [
      {
        id: 'sub-1',
        title: 'Championship Identity & Design System',
        description:
          'End-to-end visual identity covering tournament logos, typography guidelines, stage geometry standards, and broadcast graphic systems.',
        image: '/assets/dummyimghl/dummyimghl5.jpg',
        badge: 'Brand System',
        linkText: 'Visit',
      },
      {
        id: 'sub-2',
        title: 'Arena Spatial & Wayfinding Design',
        description:
          'Stadium entrance wraps, player tunnel murals, VIP lounge aesthetics, ticket booth graphics, and fan zone spatial branding.',
        image: '/assets/dummyimghl/dummyimghl6.jpg',
        badge: 'Spatial Design',
        linkText: 'Visit',
      },
      {
        id: 'sub-3',
        title: 'Victory & Trophy Ceremony Production',
        description:
          'Pyro-synced screen graphics, confetti blast visuals, victory screen animations, and champion trophy reveal sequences.',
        image: '/assets/dummyimghl/dummyimghl1.jpeg',
        badge: 'Ceremony Production',
        linkText: 'Visit',
      },
      {
        id: 'sub-4',
        title: 'Broadcast Operations & Control Toolkit',
        description:
          'Pre-configured graphic packages and operator decks ready for global multi-language commentary teams and broadcast trucks.',
        image: '/assets/dummyimghl/dummyimghl3.jpg',
        badge: 'Broadcast Toolkit',
        linkText: 'Visit',
      },
      {
        id: 'sub-5',
        title: 'Player Apparel & Merch Graphic Assets',
        description:
          'Team jersey graphics, tournament staff apparel badges, and merchandise artwork engineered for physical printing and digital promotion.',
        image: '/assets/dummyimghl/dummyimghl2.jpg',
        badge: 'Apparel & Merch',
        linkText: 'Visit',
      },
      {
        id: 'sub-6',
        title: 'Sponsor Integration & LED Ribbon Guidelines',
        description:
          'Modular sponsor logo lockups, animated LED ribbon board templates, and commercial breakdown stingers optimized for high visibility.',
        image: '/assets/dummyimghl/dummyimghl4.jpg',
        badge: 'Sponsor Integration',
        linkText: 'Visit',
      },
    ],
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
        overviewDescription: item.description ? item.description.replace(/<[^>]*>/g, '') : fallback.overviewDescription,
        subServices: fallback.subServices,
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

  // Dynamic fallback for custom slugs
  return {
    id: 'custom',
    slug,
    num: '01',
    title: slug.replace(/-/g, ' ').toUpperCase(),
    subTitle: 'PlayOn Specialized Service',
    overviewDescription:
      'Engineered for high-impact stadium and digital deployment. We combine real-time graphic engines, dynamic broadcast telemetry, and kinetic visual systems.',
    subServices: [
      {
        id: 'sub-1',
        title: 'Real-Time Graphic Engine',
        description: 'Low-latency broadcast overlays and telemetry widgets tailored for live competition.',
        image: '/assets/dummyimghl/dummyimghl1.jpeg',
        badge: 'Core Engine',
        linkText: 'Visit',
      },
      {
        id: 'sub-2',
        title: 'Stage & LED Control Systems',
        description: 'Master trigger systems syncing arena screens, lighting rigs, and broadcast feeds.',
        image: '/assets/dummyimghl/dummyimghl2.jpg',
        badge: 'Display Sync',
        linkText: 'Visit',
      },
      {
        id: 'sub-3',
        title: 'Kinetic Motion Toolkits',
        description: 'Modular 2D and 3D visual packages including stingers, lower-thirds, and transitions.',
        image: '/assets/dummyimghl/dummyimghl3.jpg',
        badge: 'Motion Assets',
        linkText: 'Visit',
      },
      {
        id: 'sub-4',
        title: 'Interactive Fan Engagement Hub',
        description: 'Real-time voting portals and match prediction widgets displayed live on air.',
        image: '/assets/dummyimghl/dummyimghl4.jpg',
        badge: 'Interactive Hub',
        linkText: 'Visit',
      },
      {
        id: 'sub-5',
        title: 'On-Site Technical Execution Deck',
        description: 'Experienced operator teams and control hardware pre-calibrated for tournament day.',
        image: '/assets/dummyimghl/dummyimghl5.jpg',
        badge: 'On-Site Operations',
        linkText: 'Visit',
      },
      {
        id: 'sub-6',
        title: 'Spatial Audio & Sound Integration',
        description: 'Custom soundscapes, riser drops, and arena acoustic triggers.',
        image: '/assets/dummyimghl/dummyimghl6.jpg',
        badge: 'Spatial Audio',
        linkText: 'Visit',
      },
    ],
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

  // Maximum 6 sub-services
  const displaySubServices = (service.subServices || []).slice(0, 6);

  return (
    <main className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero} aria-label="Service Detail Header">
        <h1 className={styles.heroTitle}>{service.title}</h1>

        <div className={styles.heroActions}>
          <Link href={`/contact?service=${service.slug}`} className={styles.primaryBtn}>
            Book This Service
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 5" />
            </svg>
          </Link>
          <a href="#overview-section" className={styles.secondaryBtn}>
            Explore Capabilities
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

      {/* ── OVERVIEW & CAPABILITIES SECTION (STAGGERED REF DESIGN) ── */}
      <section id="overview-section" className={styles.contentSection}>
        <div className={styles.overviewWrapper}>
          {/* Top Title & Overall Description */}
          <div className={styles.overviewHeaderBlock}>
            <h2 className={styles.descriptionTitle}>Overview & Capabilities</h2>

            {/* Overall Description text */}
            <p className={styles.overallDescText}>
              {service.overviewDescription}
            </p>
          </div>

          {/* Staggered Sub Services Grid (Max 6 items, matching refsubservices.png) */}
          {displaySubServices.length > 0 && (
            <div className={styles.staggeredGridSection}>
              <div className={styles.staggeredGrid}>
                {displaySubServices.map((sub, idx) => (
                  <div key={sub.id || idx} className={styles.staggeredItem}>
                    {/* Image frame */}
                    <div className={styles.mediaFrame}>
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className={styles.mediaImage}
                      />
                    </div>

                    {/* Content below image: Title & Description */}
                    <div className={styles.itemBody}>
                      <h3 className={styles.itemTitle}>{sub.title}</h3>
                      <p className={styles.itemDesc}>{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY SHOWCASE SLIDER ── */}
      {service.gallery && service.gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <ShowcaseSlider gallery={service.gallery} title="Production Showcase" />
        </section>
      )}

      {/* ── CTA BOX ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
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
            <polyline points="12 5 19 12 12 5" />
          </svg>
        </Link>
        </div>
      </section>
    </main>
  );
}
