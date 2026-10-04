import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Blog | PlayOn — Insights, Stories & Ideas',
  description:
    'Explore the latest articles, behind-the-scenes stories, and industry insights from the PlayOn team — esports broadcasts, brand experiences, and next-gen visual production.',
  openGraph: {
    title: 'Blog | PlayOn — Insights, Stories & Ideas',
    description:
      'PlayOn articles on esports, arena events, 3D VFX, and kinetic brand experiences.',
    type: 'website',
  },
};

interface ArticleData {
  id: number | string;
  title: string;
  slug: string;
  sub_title?: string | null;
  description?: string | null;
  featured_image?: string | null;
  published_at?: string | null;
}

const fallbackArticles: ArticleData[] = [
  {
    id: 1,
    title: 'The Future of Competitive Gaming Broadcasts',
    slug: 'future-of-esports-broadcasts',
    sub_title:
      'Explore how 3D motion environments, real-time spatial analytics, and immersive AR stage visuals are redefining live esports entertainment for millions worldwide.',
    featured_image: '/assets/dummyimghl/dummyimghl1.jpeg',
    published_at: '2026-09-15T00:00:00Z',
  },
  {
    id: 2,
    title: 'Building Iconic Brand Experiences in 2026',
    slug: 'building-iconic-brand-experiences',
    sub_title:
      'Discover our strategic design blueprint for building digital-first brand identities that resonate with next-generation global gaming audiences.',
    featured_image: '/assets/dummyimghl/dummyimghl2.jpg',
    published_at: '2026-09-10T00:00:00Z',
  },
  {
    id: 3,
    title: 'Next-Gen Motion Graphics for Arena Shows',
    slug: 'next-gen-motion-graphics',
    sub_title:
      'A deep dive into high-framerate visual synthesis, projection mapping, and dynamic LED stage choreography designed for massive stadium events.',
    featured_image: '/assets/dummyimghl/dummyimghl3.jpg',
    published_at: '2026-09-05T00:00:00Z',
  },
  {
    id: 4,
    title: 'Unreal Engine in Live Production: Our Workflow',
    slug: 'unreal-engine-live-production',
    sub_title:
      'How we use Unreal Engine as a real-time rendering backbone for simultaneous multi-venue live broadcasts at scale.',
    featured_image: '/assets/dummyimghl/dummyimghl4.jpg',
    published_at: '2026-08-28T00:00:00Z',
  },
  {
    id: 5,
    title: 'Sound Design Meets Visual Identity',
    slug: 'sound-design-visual-identity',
    sub_title:
      'Why synchronized audio-visual branding is the missing layer most agencies overlook when producing memorable championship moments.',
    featured_image: '/assets/dummyimghl/dummyimghl5.jpg',
    published_at: '2026-08-20T00:00:00Z',
  },
  {
    id: 6,
    title: 'Projection Mapping at Scale: Lessons Learned',
    slug: 'projection-mapping-at-scale',
    sub_title:
      'Real-world takeaways from our largest ever projection mapping installation at the PlayOn World Championship 2025.',
    featured_image: '/assets/dummyimghl/dummyimghl1.jpeg',
    published_at: '2026-08-10T00:00:00Z',
  },
];

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return '';
  }
}

function stripHtml(html?: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

export default async function BlogPage() {
  const res = await fetchApi<{ data: ArticleData[] }>('/articles');
  const articles =
    res?.data && res.data.length > 0 ? res.data : fallbackArticles;

  const [featured, ...rest] = articles;

  return (
    <div className={styles.page}>
      {/* ── Hero Banner ── */}
      <section className={styles.hero} aria-labelledby="blog-hero-heading">
        <div className={styles.heroInner}>
          <h1 id="blog-hero-heading" className={styles.heroTitle}>
            Blog
          </h1>
          <p className={styles.heroSubtitle}>
            Stories, strategies, and behind-the-scenes from the team building
            the world&apos;s most memorable event experiences.
          </p>
        </div>
        <div className={styles.heroStripes} aria-hidden="true">
          <span className={styles.stripe} />
          <span className={styles.stripe} />
          <span className={styles.stripe} />
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && (
        <section className={styles.featuredSection} aria-label="Featured article">
          <div className={styles.container}>
            <Link
              href={`/blog/${featured.slug}`}
              className={styles.featuredCard}
              id="blog-featured-article"
            >
              <div className={styles.featuredImageWrapper}>
                <img
                  src={getMediaUrl(
                    featured.featured_image,
                    '/assets/dummyimghl/dummyimghl1.jpeg'
                  )}
                  alt={featured.title}
                  className={styles.featuredImage}
                />
                <div className={styles.featuredImageOverlay} aria-hidden="true" />
                <span className={styles.featuredBadge}>Latest Article</span>
              </div>
              <div className={styles.featuredContent}>
                {featured.published_at && (
                  <time
                    dateTime={featured.published_at}
                    className={styles.articleDate}
                  >
                    {formatDate(featured.published_at)}
                  </time>
                )}
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredDescription}>
                  {featured.sub_title ||
                    stripHtml(featured.description).slice(0, 200)}
                </p>
                <span className={styles.readMoreLink} aria-hidden="true">
                  Read Article
                  <svg
                    className={styles.readMoreIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Articles Grid ── */}
      {rest.length > 0 && (
        <section className={styles.gridSection} aria-label="All articles">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>All Articles</h2>
              <span className={styles.articleCount}>{articles.length} articles</span>
            </div>

            <div className={styles.grid}>
              {rest.map((article, idx) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className={styles.articleCard}
                  id={`blog-article-${article.id}`}
                  style={{ '--card-index': idx } as React.CSSProperties}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={getMediaUrl(
                        article.featured_image,
                        `/assets/dummyimghl/dummyimghl${(idx % 5) + 1}.jpeg`
                      )}
                      alt={article.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.cardImageOverlay} aria-hidden="true" />
                  </div>
                  <div className={styles.cardContent}>
                    {article.published_at && (
                      <time
                        dateTime={article.published_at}
                        className={styles.articleDate}
                      >
                        {formatDate(article.published_at)}
                      </time>
                    )}
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardDescription}>
                      {article.sub_title ||
                        stripHtml(article.description).slice(0, 120)}
                    </p>
                    <span className={styles.cardReadMore} aria-hidden="true">
                      Read More
                      <svg
                        className={styles.cardArrow}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className={styles.ctaSection} aria-label="Contact call to action">
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>Ready to Play On?</p>
            <h2 className={styles.ctaTitle}>
              Let&apos;s build something unforgettable together.
            </h2>
            <Link href="/contact" className={styles.ctaBtn} id="blog-cta-contact">
              <span>Get in Touch</span>
              <svg
                className={styles.ctaBtnIcon}
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
        </div>
      </section>
    </div>
  );
}
