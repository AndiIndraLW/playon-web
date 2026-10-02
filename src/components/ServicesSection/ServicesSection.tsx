'use client';

import React, { useState, useEffect } from 'react';
import styles from './ServicesSection.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface Service {
  id: string;
  num: string;
  slug: string;
  title: string;
  tags: string;
  description: string;
  image: string;
}

const fallbackServices: Service[] = [
  {
    id: '01',
    num: '01',
    slug: 'e-sports-arena-broadcast',
    title: 'E-Sports & Arena Broadcast',
    tags: 'Live Production • Arena Visuals • Real-time Graphics',
    description:
      'Engineered for maximum crowd excitement. We design end-to-end stadium broadcast graphics, live stage telemetry, and instant replay systems.',
    image: '/assets/dummyimghl/dummyimghl1.jpeg',
  },
  {
    id: '02',
    num: '02',
    slug: 'brand-experiences-motion',
    title: 'Brand Experiences & Motion',
    tags: 'Visual Identity • Kinetic Typography • 3D Motion',
    description:
      'Crafting high-impact motion identities for global gaming brands. From kinetic logos to multi-screen campaign rollouts.',
    image: '/assets/dummyimghl/dummyimghl2.jpg',
  },
  {
    id: '03',
    num: '03',
    slug: '3d-stage-vfx-animation',
    title: '3D Stage & VFX Animation',
    tags: 'Unreal Engine • Projection Mapping • Virtual Sets',
    description:
      'Photorealistic 3D environments and stage projection mapping powered by real-time Unreal Engine rendering.',
    image: '/assets/dummyimghl/dummyimghl3.jpg',
  },
  {
    id: '04',
    num: '04',
    slug: 'interactive-web-audio',
    title: 'Interactive Web & Audio',
    tags: 'WebGL Experiences • Spatial Sound • Digital Products',
    description:
      'Immersive digital web experiences paired with custom sound design and spatial audio engineered for deep player engagement.',
    image: '/assets/dummyimghl/dummyimghl4.jpg',
  },
  {
    id: '05',
    num: '05',
    slug: 'global-tournament-branding',
    title: 'Global Tournament Branding',
    tags: 'Broadcast Package • Trophy Ceremonies • Event Design',
    description:
      'Full-spectrum branding for major esports championships, including opening ceremony visual shows and custom trophy reveals.',
    image: '/assets/dummyimghl/dummyimghl5.jpg',
  },
];

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [activeId, setActiveId] = useState<string>('01');

  useEffect(() => {
    async function loadServices() {
      const res = await fetchApi<{ data: any[] }>('/services');
      if (res?.data && res.data.length > 0) {
        const mapped: Service[] = res.data.map((item, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const fallback = fallbackServices[idx % fallbackServices.length];
          return {
            id: numStr,
            num: numStr,
            slug: item.slug || fallback.slug,
            title: item.title,
            tags: item.sub_title || 'Service',
            description: item.description?.replace(/<[^>]*>?/gm, '') || '',
            image: getMediaUrl(item.featured_image, fallback.image),
          };
        });
        setServices(mapped);
        if (mapped.length > 0) {
          setActiveId(mapped[0].id);
        }
      }
    }
    loadServices();
  }, []);

  const toggleService = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className={styles.section} id="our-services">
      <div className={styles.container}>
        {/* Header row */}
        <div className={styles.headerRow}>
          <h2 className={styles.headerTitle}>Our Services</h2>
        </div>

        {/* Services List */}
        <div className={styles.servicesList}>
          {services.map((service) => {
            const isActive = activeId === service.id;
            return (
              <div
                key={service.id}
                className={`${styles.serviceItem} ${isActive ? styles.active : ''}`}
                onClick={() => toggleService(service.id)}
                onMouseEnter={() => setActiveId(service.id)}
              >
                {/* Header line */}
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceMainInfo}>
                    <span className={styles.serviceNum}>{service.num}</span>
                    <h3 className={styles.serviceTitle}>
                      <a href={`/services/${service.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {service.title}
                      </a>
                    </h3>
                  </div>

                  <div className={styles.serviceRight}>
                    <span className={styles.serviceTags}>{service.tags}</span>
                    <a href={`/services/${service.slug}`} aria-label={`View details for ${service.title}`}>
                      <svg
                        className={styles.arrowIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Expandable Image & Description Ribbon */}
                <div className={styles.imageRibbonWrapper}>
                  <div className={styles.imageRibbonInner}>
                    <div className={styles.imageRibbonContent}>
                      <div className={styles.serviceImageContainer}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className={styles.serviceImage}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p className={styles.serviceDescription}>
                          {service.description}
                        </p>
                        <a
                          href={`/services/${service.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--color-malachite)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            width: 'fit-content'
                          }}
                        >
                          Explore Service Details →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
