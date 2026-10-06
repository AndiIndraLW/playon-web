'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

export interface ProjectItem {
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

const fallbackProjects: ProjectItem[] = [
  {
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
    ],
    description:
      'Engineered an immersive real-time AR broadcast package and live telemetry system for over 25,000 arena attendees and 4.2M peak concurrent viewers across Twitch and YouTube.',
  },
  {
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
    ],
    description:
      'Created a comprehensive kinetic visual identity, custom dynamic typography, and opening ceremony stage motion graphics for Hyperion’s next-generation product reveal.',
  },
  {
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
  {
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
  {
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
  {
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
];

const CATEGORIES = [
  'All',
  'E-Sports & Arena Broadcast',
  'Brand Experience & Motion',
  '3D Stage & VFX',
  'Interactive Web & Audio',
  'Global Gaming Broadcast',
];

export default function WorksPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  // Floating mouse preview state for list view
  const [hoveredListImg, setHoveredListImg] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Load project list from API
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetchApi<{ data: any[] }>('/projects');
        if (res?.data && res.data.length > 0) {
          const mapped: ProjectItem[] = res.data.map((item, idx) => {
            const fallback = fallbackProjects[idx % fallbackProjects.length];
            const tags = Array.isArray(item.tag)
              ? item.tag
              : typeof item.tag === 'string'
              ? [item.tag]
              : fallback.tag;

            const gallery = Array.isArray(item.gallery)
              ? item.gallery.map((g: string) => getMediaUrl(g, fallback.featured_image))
              : fallback.gallery;

            return {
              id: item.id || idx + 1,
              slug: item.slug || fallback.slug,
              title: item.title || fallback.title,
              sub_title: item.sub_title || fallback.sub_title,
              featured_image: getMediaUrl(item.featured_image, fallback.featured_image),
              tag: tags,
              year: item.year || fallback.year,
              gallery: gallery,
              description: item.description || fallback.description,
            };
          });
          setProjects(mapped);
        }
      } catch (err) {
        console.warn('Failed to load projects from API, using fallback data:', err);
      }
    }
    loadProjects();
  }, []);

  // Track mouse position for list view floating image
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      return (
        activeCategory === 'All' ||
        item.tag.some((t) => t.toLowerCase() === activeCategory.toLowerCase()) ||
        item.sub_title.toLowerCase().includes(activeCategory.toLowerCase())
      );
    });
  }, [projects, activeCategory]);

  // Flagship project spotlight (first project in array)
  const spotlightProject = projects[0] || fallbackProjects[0];

  return (
    <main className={styles.page}>
      {/* ═══════════════════════════════════════════════
          HERO HEADER SECTION
      ═══════════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="Works Archive Hero">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            OUR <span className={styles.titleAccent}>WORKS</span>
          </h1>
          <p className={styles.heroDescription}>
            Arena broadcasts, kinetic stage telemetry, photorealistic 3D virtual sets, and stadium-scale digital experiences engineered to hold millions spellbound.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FLAGSHIP SPOTLIGHT CASE STUDY
      ═══════════════════════════════════════════════ */}
      {spotlightProject && (
        <section className={styles.spotlightSection} aria-label="Flagship Showcase">
          <div className={styles.spotlightCard}>
            <div className={styles.spotlightMedia}>
              <span className={styles.spotlightBadge}>Flagship Showcase</span>
              <img
                src={spotlightProject.featured_image}
                alt={spotlightProject.title}
                className={styles.spotlightImage}
              />
            </div>
            <div className={styles.spotlightContent}>
              <div className={styles.spotlightMeta}>
                <span className={styles.spotlightTag}>
                  {spotlightProject.tag[0] || 'Featured Showcase'}
                </span>
                <span className={styles.spotlightYear}>{spotlightProject.year}</span>
              </div>
              <h2 className={styles.spotlightTitle}>{spotlightProject.title}</h2>
              <p className={styles.spotlightSub}>{spotlightProject.sub_title}</p>
              <div className={styles.spotlightActions}>
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(spotlightProject)}
                  className={styles.btnPrimary}
                >
                  <span>Explore Showcase</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(spotlightProject)}
                  className={styles.btnSecondary}
                >
                  <span>Quick View</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          CONTROLS TOOLBAR (Category Filters)
      ═══════════════════════════════════════════════ */}
      <section className={styles.controlsBar} aria-label="Filter works">
        {/* Category Pills */}
        <div className={styles.categoryPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.pillBtn} ${
                activeCategory === cat ? styles.pillActive : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>


      </section>

      {/* ═══════════════════════════════════════════════
          PROJECTS SHOWCASE (GRID or LIST)
      ═══════════════════════════════════════════════ */}
      <section className={styles.worksSection} aria-label="Works Collection">
        {filteredProjects.length === 0 ? (
          <div className={styles.noResults}>
            <h3 className={styles.noResultsTitle}>No projects found</h3>
            <p className={styles.noResultsText}>
              We couldn&apos;t find any project matching your criteria. Try adjusting your search query or filters.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className={styles.resetBtn}
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ── GRID VIEW ── */
          <div className={styles.gridContainer}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={styles.workCard}
                onClick={() => setSelectedProjectModal(project)}
              >
                <div className={styles.cardImageWrap}>
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardBadgeGroup}>
                    <span className={styles.cardTag}>
                      {project.tag[0] || 'Project'}
                    </span>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardCategory}>{project.sub_title}</p>

                  <div className={styles.cardFooter}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProjectModal(project);
                      }}
                      className={styles.quickViewBtn}
                    >
                      Quick Preview
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProjectModal(project);
                      }}
                      className={styles.cardArrow}
                      aria-label={`View ${project.title}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── LIST VIEW ── */
          <div
            className={styles.listContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredListImg(null)}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={styles.listItem}
                onClick={() => setSelectedProjectModal(project)}
                onMouseEnter={() => setHoveredListImg(project.featured_image)}
              >
                <span className={styles.listNum}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={styles.listTitle}>{project.title}</span>
                <span className={styles.listCategoryCol}>
                  {project.sub_title || project.tag.join(' • ')}
                </span>
                <span className={styles.listYear}>{project.year}</span>
                <span className={styles.listArrow}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            ))}

            {/* Floating Image Preview on Hover (List View) */}
            <div
              className={`${styles.floatingPreview} ${
                hoveredListImg ? styles.floatingPreviewVisible : ''
              }`}
              style={{
                transform: `translate3d(${mousePos.x + 25}px, ${mousePos.y - 100}px, 0px)`,
              }}
            >
              {hoveredListImg && (
                <img
                  src={hoveredListImg}
                  alt="Work Preview"
                  className={styles.floatingImg}
                />
              )}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          LIGHTBOX QUICK VIEW MODAL (Full Details)
      ═══════════════════════════════════════════════ */}
      {selectedProjectModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedProjectModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalCloseBtn}
              onClick={() => setSelectedProjectModal(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <img
              src={selectedProjectModal.featured_image}
              alt={selectedProjectModal.title}
              className={styles.modalHeroImg}
            />

            <div className={styles.modalBody}>
              <div className={styles.modalTagsRow}>
                {selectedProjectModal.tag.map((t, i) => (
                  <span key={i} className={styles.modalTagPill}>
                    {t}
                  </span>
                ))}
                <span className={styles.modalYearPill}>
                  {selectedProjectModal.year}
                </span>
              </div>

              <h2 className={styles.modalTitle}>{selectedProjectModal.title}</h2>
              <p className={styles.modalSubTitle}>{selectedProjectModal.sub_title}</p>

              {/* Main Content Grid: Overview & Specs */}
              <div className={styles.modalContentGrid}>
                <div className={styles.modalMainCol}>
                  <div className={styles.modalSection}>
                    <h3 className={styles.modalSectionHeading}>Project Overview</h3>
                    <p className={styles.modalDesc}>{selectedProjectModal.description}</p>
                  </div>

                  <div className={styles.modalSection}>
                    <h3 className={styles.modalSectionHeading}>Technical Execution</h3>
                    <p className={styles.modalDesc}>
                      PlayOn provided end-to-end creative direction, zero-latency graphic telemetry pipelines, and customized broadcast packages. Every visual asset was optimized to perform flawlessly under high-stress live arena conditions.
                    </p>
                  </div>
                </div>

                <div className={styles.modalSidebar}>
                  <div className={styles.modalSpecItem}>
                    <span className={styles.modalSpecLabel}>Category</span>
                    <span className={styles.modalSpecValue}>{selectedProjectModal.tag.join(', ')}</span>
                  </div>

                  <div className={styles.modalSpecItem}>
                    <span className={styles.modalSpecLabel}>Release Year</span>
                    <span className={styles.modalSpecValue}>{selectedProjectModal.year}</span>
                  </div>

                  <div className={styles.modalSpecItem}>
                    <span className={styles.modalSpecLabel}>Services Provided</span>
                    <span className={styles.modalSpecValue}>
                      Arena Broadcast, Real-Time Graphics, Kinetic Motion, 3D VFX
                    </span>
                  </div>

                  <div className={styles.modalSpecItem}>
                    <span className={styles.modalSpecLabel}>Agency</span>
                    <span className={styles.modalSpecValue}>PlayOn Agency</span>
                  </div>
                </div>
              </div>

              {/* Gallery Preview */}
              {selectedProjectModal.gallery && selectedProjectModal.gallery.length > 0 && (
                <div className={styles.modalGallerySection}>
                  <h3 className={styles.modalSectionHeading}>Visual Showcase Gallery</h3>
                  <div className={styles.modalGalleryGrid}>
                    {selectedProjectModal.gallery.map((img, i) => (
                      <div key={i} className={styles.galleryThumb}>
                        <img src={img} alt={`Gallery asset ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.modalFooter}>
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className={styles.modalCloseLink}
                >
                  Close Preview
                </button>

                <Link
                  href="/contact"
                  className={styles.btnPrimary}
                  onClick={() => setSelectedProjectModal(null)}
                >
                  <span>Discuss Your Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          IMPACT STATS BAND
      ═══════════════════════════════════════════════ */}
      <section className={styles.statsBand} aria-label="Metrics of impact">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50M+</span>
            <span className={styles.statLabel}>Global Viewers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>120+</span>
            <span className={styles.statLabel}>Stadium & Broadcast Events</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15</span>
            <span className={styles.statLabel}>International Awards</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>60FPS</span>
            <span className={styles.statLabel}>Real-Time Graphics Telemetry</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM CALL TO ACTION
      ═══════════════════════════════════════════════ */}
      <section className={styles.ctaSection} aria-label="Contact call to action">
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            HAVE AN EVENT OR BRAND<br />THAT NEEDS TO PLAY ON?
          </h2>
          <p className={styles.ctaDesc}>
            Let&apos;s engineer your next stadium broadcast, kinetic graphics package, or 3D Unreal Engine stage environment.
          </p>
          <Link href="/contact" className={styles.btnPrimary}>
            <span>Start A Conversation</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
