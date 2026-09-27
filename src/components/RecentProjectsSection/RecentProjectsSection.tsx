'use client';

import React, { useState, useCallback } from 'react';
import styles from './RecentProjectsSection.module.css';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link?: string;
}

const allProjects: ProjectItem[] = [
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
  // Extra projects revealed on "Load More"
  {
    id: '06',
    title: 'Cyber Circuit Masters',
    category: 'Tournament & Branding',
    year: '2025',
    image: '/assets/dummyimghl/dummyimghl6.jpg',
  },
  {
    id: '07',
    title: 'Nebula Protocol Reveal',
    category: 'CGI & Cinematic Trailer',
    year: '2025',
    image: '/assets/dummyimghl/dummyimghl1.jpeg',
  },
  {
    id: '08',
    title: 'Titan League Grand Finals',
    category: 'Arena Production & Broadcast',
    year: '2024',
    image: '/assets/dummyimghl/dummyimghl2.jpg',
  },
];

export default function RecentProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allProjects.length));
  };

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

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
