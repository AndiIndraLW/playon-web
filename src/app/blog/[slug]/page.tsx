import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface ArticleData {
  id: number | string;
  title: string;
  slug: string;
  sub_title?: string | null;
  description?: string | null;
  featured_image?: string | null;
  gallery?: string[] | null;
  published_at?: string | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetchApi<{ data: ArticleData }>(`/articles/${slug}`);
  const article = res?.data;

  if (!article) {
    return {
      title: 'Article Not Found | PlayOn Blog',
    };
  }

  return {
    title: `${article.title} | PlayOn Blog`,
    description:
      article.sub_title ||
      article.description?.replace(/<[^>]*>?/gm, '').slice(0, 160) ||
      'Read the latest from the PlayOn team.',
    openGraph: {
      title: `${article.title} | PlayOn Blog`,
      description:
        article.sub_title ||
        article.description?.replace(/<[^>]*>?/gm, '').slice(0, 160) ||
        '',
      type: 'article',
      images: article.featured_image
        ? [getMediaUrl(article.featured_image)]
        : [],
    },
  };
}

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

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const res = await fetchApi<{ data: ArticleData }>(`/articles/${slug}`);
  const article = res?.data;

  if (!article) {
    notFound();
  }

  const featuredImage = getMediaUrl(
    article.featured_image,
    '/assets/dummyimghl/dummyimghl1.jpeg'
  );

  const galleryImages: string[] = Array.isArray(article.gallery)
    ? article.gallery.map((img) =>
        getMediaUrl(img, '/assets/dummyimghl/dummyimghl2.jpg')
      )
    : [];

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <header className={styles.hero} aria-label="Article header">
        <div className={styles.heroImageWrapper}>
          <img
            src={featuredImage}
            alt={article.title}
            className={styles.heroImage}
            priority-fetch="high"
          />
          <div className={styles.heroImageOverlay} aria-hidden="true" />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>{article.title}</h1>
            {article.sub_title && (
              <p className={styles.heroSubtitle}>{article.sub_title}</p>
            )}
          </div>
        </div>
      </header>

      {/* ── Article Body ── */}
      <main className={styles.articleMain}>
        <div className={styles.container}>
          <div className={styles.articleLayout}>
            {/* Main content column */}
            <article className={styles.articleBody}>
              {article.description ? (
                <div
                  className={styles.richContent}
                  dangerouslySetInnerHTML={{ __html: article.description }}
                />
              ) : (
                <p className={styles.noContent}>
                  No content available for this article.
                </p>
              )}

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <section className={styles.gallery} aria-label="Article gallery">
                  <h2 className={styles.galleryTitle}>Gallery</h2>
                  <div className={styles.galleryGrid}>
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className={styles.galleryItem}>
                        <img
                          src={img}
                          alt={`${article.title} — gallery image ${idx + 1}`}
                          className={styles.galleryImage}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar} aria-label="Article sidebar">
              <div className={styles.sidebarCard}>
                <p className={styles.sidebarLabel}>Published</p>
                <p className={styles.sidebarValue}>
                  {article.published_at
                    ? formatDate(article.published_at)
                    : 'N/A'}
                </p>
              </div>

              <div className={styles.sidebarDivider} aria-hidden="true" />

              <Link href="/blog" className={styles.sidebarBackBtn}>
                ← All Articles
              </Link>
            </aside>
          </div>
        </div>
      </main>

      {/* ── CTA ── */}
      <section className={styles.ctaSection} aria-label="Contact CTA">
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>Ready to Play On?</p>
            <h2 className={styles.ctaTitle}>
              Let&apos;s build something unforgettable together.
            </h2>
            <Link href="/contact" className={styles.ctaBtn} id="article-cta-contact">
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
