import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface ProjectDetail {
  id: string | number;
  slug: string;
  title: string;
  sub_title: string;
  featured_image: string;
  tag: string[];
  year: number | string;
  gallery: string[];
  description: string;
}

const fallbackProjects: Record<string, ProjectDetail> = {
  'valhalla-world-series-2026': {
    id: '01',
    slug: 'valhalla-world-series-2026',
    title: 'Valhalla World Series 2026',
    sub_title: 'Global Arena Telemetry & Real-Time Broadcast HUD',
    featured_image: '/assets/dummyimghl/dummyimghl1.jpeg',
    tag: ['E-Sports & Arena Broadcast', 'Real-Time HUD'],
    year: 2026,
    gallery: [
      '/assets/dummyimghl/dummyimghl1.jpeg',
      '/assets/dummyimghl/dummyimghl2.jpg',
      '/assets/dummyimghl/dummyimghl3.jpg',
      '/assets/dummyimghl/dummyimghl4.jpg',
    ],
    description:
      'Engineered an immersive real-time AR broadcast package and live telemetry system for over 25,000 arena attendees and 4.2M peak concurrent viewers across Twitch and YouTube. Features zero-latency match telemetry overlays, photorealistic arena screen graphics, and dynamic player state notifications.',
  },
  'hyperion-genesis-campaign': {
    id: '02',
    slug: 'hyperion-genesis-campaign',
    title: 'Hyperion Genesis Campaign',
    sub_title: 'Kinetic Motion Identity & Launch Ceremony',
    featured_image: '/assets/dummyimghl/dummyimghl2.jpg',
    tag: ['Brand Experience & Motion', 'Kinetic Design'],
    year: 2026,
    gallery: [
      '/assets/dummyimghl/dummyimghl2.jpg',
      '/assets/dummyimghl/dummyimghl4.jpg',
      '/assets/dummyimghl/dummyimghl5.jpg',
      '/assets/dummyimghl/dummyimghl6.jpg',
    ],
    description:
      'Created a comprehensive kinetic visual identity, custom dynamic typography, and opening ceremony stage motion graphics for Hyperion’s next-generation product reveal.',
  },
  'astral-rift-championship': {
    id: '03',
    slug: 'astral-rift-championship',
    title: 'Astral Rift Championship',
    sub_title: 'Photorealistic 3D Unreal Engine Stage VFX',
    featured_image: '/assets/dummyimghl/dummyimghl3.jpg',
    tag: ['3D Stage & VFX', 'Unreal Engine'],
    year: 2025,
    gallery: [
      '/assets/dummyimghl/dummyimghl3.jpg',
      '/assets/dummyimghl/dummyimghl1.jpeg',
      '/assets/dummyimghl/dummyimghl6.jpg',
    ],
    description:
      'Designed and executed live camera-tracked virtual stage environments in Unreal Engine 5, seamless projection mapping, and dynamic holographic trophy reveals.',
  },
  'spectra-engine-launch': {
    id: '04',
    slug: 'spectra-engine-launch',
    title: 'Spectra Engine Launch',
    sub_title: 'Interactive WebGL Portal & Spatial Audio',
    featured_image: '/assets/dummyimghl/dummyimghl4.jpg',
    tag: ['Interactive Web & Audio', 'WebGL'],
    year: 2025,
    gallery: [
      '/assets/dummyimghl/dummyimghl4.jpg',
      '/assets/dummyimghl/dummyimghl5.jpg',
      '/assets/dummyimghl/dummyimghl2.jpg',
    ],
    description:
      'Architected a 60fps WebGL interactive web showcase featuring real-time 3D model interaction, spatial audio reactivity, and global fanbase participation tools.',
  },
  'apex-dynasty-invitational': {
    id: '05',
    slug: 'apex-dynasty-invitational',
    title: 'Apex Dynasty Invitational',
    sub_title: 'Global Gaming Broadcast & Spectator HUD',
    featured_image: '/assets/dummyimghl/dummyimghl5.jpg',
    tag: ['Global Gaming Broadcast', 'Spectator UI'],
    year: 2025,
    gallery: [
      '/assets/dummyimghl/dummyimghl5.jpg',
      '/assets/dummyimghl/dummyimghl3.jpg',
      '/assets/dummyimghl/dummyimghl1.jpeg',
    ],
    description:
      'Delivered end-to-end tournament branding, observer overlays, animated stream transitions, and multilingual live graphic toolkits across 12 simultaneous streams.',
  },
  'cyber-pulse-arena': {
    id: '06',
    slug: 'cyber-pulse-arena',
    title: 'Cyber Pulse Arena 2024',
    sub_title: 'LED Matrix Synchronized Stage Show',
    featured_image: '/assets/dummyimghl/dummyimghl6.jpg',
    tag: ['3D Stage & VFX', 'E-Sports & Arena Broadcast'],
    year: 2024,
    gallery: [
      '/assets/dummyimghl/dummyimghl6.jpg',
      '/assets/dummyimghl/dummyimghl2.jpg',
      '/assets/dummyimghl/dummyimghl4.jpg',
    ],
    description:
      'Synchronized 360-degree LED screen visuals with live DJ audio cues and real-time player biometric telemetry during the grand finals stage entrance.',
  },
};

async function getProjectData(slug: string): Promise<ProjectDetail | null> {
  // Try API first
  const res = await fetchApi<{ data: any }>(`/projects/${slug}`);
  if (res?.data) {
    const item = res.data;
    const fallback = fallbackProjects[slug] || fallbackProjects['valhalla-world-series-2026'];
    const tags = Array.isArray(item.tag)
      ? item.tag
      : typeof item.tag === 'string'
      ? [item.tag]
      : fallback.tag;

    const gallery = Array.isArray(item.gallery)
      ? item.gallery.map((g: string) => getMediaUrl(g, fallback.featured_image))
      : fallback.gallery;

    return {
      id: item.id || fallback.id,
      slug: item.slug || slug,
      title: item.title || fallback.title,
      sub_title: item.sub_title || fallback.sub_title,
      featured_image: getMediaUrl(item.featured_image, fallback.featured_image),
      tag: tags,
      year: item.year || fallback.year,
      gallery: gallery,
      description: item.description || fallback.description,
    };
  }

  // Fallback map check
  return fallbackProjects[slug] || fallbackProjects['valhalla-world-series-2026'] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectData(slug);
  if (!project) return { title: 'Project Not Found | PlayOn' };

  return {
    title: `${project.title} — Case Study | PlayOn`,
    description: project.sub_title || project.description,
    openGraph: {
      title: `${project.title} | PlayOn Event Agency`,
      description: project.sub_title,
      images: [project.featured_image],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <Link href="/works" className={styles.backLink}>
          ← Back To All Works
        </Link>
        <div className={styles.heroMeta}>
          {project.tag.map((t, i) => (
            <span key={i} className={styles.tagPill}>
              {t}
            </span>
          ))}
          <span className={styles.yearPill}>{project.year}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.subtitle}>{project.sub_title}</p>
      </section>

      {/* ─── BANNER IMAGE ─── */}
      <div className={styles.bannerWrap}>
        <img
          src={project.featured_image}
          alt={project.title}
          className={styles.bannerImg}
        />
      </div>

      {/* ─── CONTENT GRID ─── */}
      <div className={styles.contentGrid}>
        <div className={styles.mainCol}>
          <div>
            <h2 className={styles.sectionHeading}>Project Overview</h2>
            <p className={styles.descriptionText}>{project.description}</p>
          </div>

          <div>
            <h2 className={styles.sectionHeading}>Technical Execution</h2>
            <p className={styles.descriptionText}>
              PlayOn provided end-to-end creative direction, zero-latency graphic telemetry pipelines, and customized broadcast packages. Every visual asset was optimized to perform flawlessly under high-stress live arena conditions.
            </p>
          </div>
        </div>

        {/* ─── SIDEBAR METADATA ─── */}
        <aside className={styles.sidebar}>
          <div className={specItemStyle()}>
            <span className={styles.specLabel}>Category</span>
            <span className={styles.specValue}>{project.tag.join(', ')}</span>
          </div>

          <div className={specItemStyle()}>
            <span className={styles.specLabel}>Release Year</span>
            <span className={styles.specValue}>{project.year}</span>
          </div>

          <div className={specItemStyle()}>
            <span className={styles.specLabel}>Services Provided</span>
            <span className={styles.specValue}>
              Arena Broadcast, Real-Time Graphics, Kinetic Motion, 3D VFX
            </span>
          </div>

          <div className={specItemStyle()}>
            <span className={styles.specLabel}>Agency</span>
            <span className={styles.specValue}>PlayOn Agency</span>
          </div>
        </aside>
      </div>

      {/* ─── GALLERY ─── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <h2 className={styles.sectionHeading}>Visual Showcase Gallery</h2>
          <div className={styles.galleryGrid}>
            {project.gallery.map((img, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <img
                  src={img}
                  alt={`${project.title} gallery asset ${idx + 1}`}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── NAVIGATION FOOTER ─── */}
      <nav className={styles.navFooter} aria-label="Work navigation">
        <Link href="/works" className={styles.navFooterBtn}>
          ← All Works
        </Link>
        <Link href="/contact" className={styles.navFooterBtn}>
          Discuss Your Project →
        </Link>
      </nav>
    </main>
  );
}

function specItemStyle() {
  return styles.specItem;
}
