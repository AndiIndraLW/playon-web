'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './RecentProjectsSection.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface ProjectItem {
  id: string | number;
  title: string;
  category: string;
  year: string;
  image: string;
  link?: string;
}

const fallbackProjects: ProjectItem[] = [
  {
    id: '01',
    title: 'Valhalla World Series 2026',
    category: 'E-Sports & Live Event',
    year: '2026',
    image: '/assets/dummyimghl/dummyimghl1.jpeg',
  },
  {
    id: '02',
    title: 'Hyperion Genesis Campaign',
    category: 'Brand Experience & Motion',
    year: '2026',
    image: '/assets/dummyimghl/dummyimghl2.jpg',
  },
  {
    id: '03',
    title: 'Astral Rift Championship',
    category: '3D VFX & Stage Broadcast',
    year: '2025',
    image: '/assets/dummyimghl/dummyimghl3.jpg',
  },
  {
    id: '04',
    title: 'Spectra Engine Launch',
    category: 'Interactive Web & Sound',
    year: '2025',
    image: '/assets/dummyimghl/dummyimghl4.jpg',
  },
  {
    id: '05',
    title: 'Apex Dynasty Invitational',
    category: 'Global Gaming Broadcast',
    year: '2025',
    image: '/assets/dummyimghl/dummyimghl5.jpg',
  },
];

export default function RecentProjectsSection() {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [visibleCount, setVisibleCount] = useState(5);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadProjects() {
      const res = await fetchApi<{ data: any[] }>('/projects');
      if (res?.data && res.data.length > 0) {
        const mapped: ProjectItem[] = res.data.map((item, idx) => ({
          id: item.id || idx + 1,
          title: item.title,
          category: item.sub_title || (Array.isArray(item.tag) ? item.tag.join(' • ') : item.tag || 'Project'),
          year: String(item.year || ''),
          image: getMediaUrl(item.featured_image, '/assets/dummyimghl/dummyimghl1.jpeg'),
          link: item.slug ? `/projects/${item.slug}` : '#',
        }));
        setProjects(mapped);
      }
    }
    loadProjects();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, projects.length));
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section className={styles.section} id="recent-projects">
      <div className={styles.container}>
        <h2 className={styles.headerTitle}>Recent Project</h2>

        {/* Vertical list of projects */}
        <div
          className={styles.projectList}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredImage(null)}
        >
          {visibleProjects.map((project) => (
            <a
              key={project.id}
              href={project.link || '#'}
              className={styles.projectItem}
              onMouseEnter={() => setHoveredImage(project.image)}
            >
              <div className={styles.projectLeft}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>

              <div className={styles.projectRight}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <span className={styles.projectYear}>{project.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Floating mouse-following project image preview */}
        <div
          className={`${styles.imagePreviewFloating} ${hoveredImage ? styles.visible : ''}`}
          style={{
            transform: `translate3d(${mousePos.x + 25}px, ${mousePos.y - 170}px, 0px)`,
          }}
        >
          {hoveredImage && (
            <img
              src={hoveredImage}
              alt="Project preview"
              className={styles.previewImage}
            />
          )}
        </div>

        {/* Load More button below list */}
        {hasMore && (
          <div className={styles.loadMoreWrapper}>
            <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
