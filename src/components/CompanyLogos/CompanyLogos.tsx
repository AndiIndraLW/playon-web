'use client';

import React, { useEffect, useState } from 'react';
import styles from './CompanyLogos.module.css';
import { fetchApi, getMediaUrl } from '@/lib/api';

interface HomepageSettingsData {
  company_logos?: string[] | null;
}

interface Company {
  name: string;
  logoUrl?: string;
  svg?: React.ReactNode;
}

const defaultCompanies: Company[] = [
  {
    name: 'Nike',
    svg: (
      <svg viewBox="0 0 100 36" aria-hidden="true" className={styles.logoSvg}>
        <path d="M98.6 3.1C83.2 12.8 62.4 22.9 44.8 28.5C31.5 32.7 18.2 33.6 8.5 29.8C1.8 27.2 -1.4 22.1 0.5 16.3C2.1 11.4 6.8 6.9 13.9 3.5C21.2 0 30.5 -1.2 39.5 0.5C31.2 3.8 24.3 8.3 19.8 13.1C16.1 17 14.7 20.7 16.3 22.8C18.1 25.1 23.4 25.5 31.8 23.8C45.2 21.1 66.8 12.4 98.6 3.1Z" />
      </svg>
    ),
  },
  {
    name: 'PlayStation',
    svg: (
      <svg viewBox="0 0 100 78" aria-hidden="true" className={styles.logoSvg}>
        <path d="M50 0C37.5 0 27.4 3.7 27.4 8.3V60.7L46.6 54.1V18.1C46.6 15.6 48.1 14.5 50 14.5C51.9 14.5 53.4 15.6 53.4 18.1V39.4L72.6 32.8V8.3C72.6 3.7 62.5 0 50 0ZM0 63.8C0 67.9 6.8 71.2 17.6 72.8L44.8 63.3V50.6L17.6 60.1C10.6 62.6 0 62.8 0 63.8ZM50 78C62.5 78 72.6 74.3 72.6 69.7V62.2L50 70.1V78ZM100 63.8C100 62.8 89.4 62.6 82.4 60.1L55.2 50.6V63.3L82.4 72.8C93.2 71.2 100 67.9 100 63.8Z" />
      </svg>
    ),
  },
  {
    name: 'Sony',
    svg: (
      <svg viewBox="0 0 300 60" aria-hidden="true" className={styles.logoSvg}>
        <path d="M42.2 46.5C35.2 46.5 25.6 43.9 17.9 41.5L20.8 30.6C27.5 33.1 34.6 35.5 40.7 35.5C45.1 35.5 47.1 34.1 47.1 32C47.1 24.3 15.8 28.5 15.8 14C15.8 5.6 24 0 38.6 0C46.3 0 54.1 2.1 60.1 4.5L57.1 15.2C50.9 12.8 44.5 11 39.4 11C35.2 11 32.5 12.4 32.5 14.6C32.5 22.3 64 17.7 64 32.2C64 41.2 55.4 46.5 42.2 46.5ZM116 46H74.3V0.8H116V11.5H89.8V17.8H112.5V28.2H89.8V35.3H116V46ZM169.2 46.5C148.1 46.5 133.5 32.5 133.5 16.5C133.5 1.5 148.6 0 169.2 0C189.7 0 204.8 1.5 204.8 16.5C204.8 32.5 190.3 46.5 169.2 46.5ZM169.2 10.9C155.6 10.9 149.6 17.2 149.6 23.3C149.6 29.4 155.6 35.6 169.2 35.6C182.7 35.6 188.7 29.4 188.7 23.3C188.7 17.2 182.7 10.9 169.2 10.9ZM267 46H250.3L234.1 21.6H233.7V46H218V0.8H234.7L250.9 25.2H251.3V0.8H267V46Z" />
      </svg>
    ),
  },
  {
    name: 'Red Bull',
    svg: (
      <svg viewBox="0 0 202 50" aria-hidden="true" className={styles.logoSvg}>
        <path d="M12 45V15H26C31 15 35 17 35 21C35 24 33 26 29 27L36 45H29L23 28H19V45H12ZM19 22H25C27 22 28 21 28 20C28 19 27 18 25 18H19V22ZM39 45V15H60V20H46V27H58V32H46V40H60V45H39ZM63 45V15H77C86 15 92 21 92 30C92 39 86 45 77 45H63ZM70 39H76C82 39 85 36 85 30C85 24 82 21 76 21H70V39ZM103 45V15H117C122 15 125 17 125 21C125 24 123 26 119 27C124 28 126 31 126 35C126 41 121 45 115 45H103ZM110 26H116C118 26 119 25 119 23C119 21 118 20 116 20H110V26ZM110 39H117C119 39 120 38 120 36C120 34 119 33 117 33H110V39ZM129 33V15H136V33C136 37 138 39 142 39C146 39 148 37 148 33V15H155V33C155 41 149 45 142 45C134 45 129 41 129 33ZM159 45V15H166V40H179V45H159ZM182 45V15H189V40H202V45H182Z" />
      </svg>
    ),
  },
  {
    name: 'EA Sports',
    svg: (
      <svg viewBox="0 0 120 60" aria-hidden="true" className={styles.logoSvg}>
        <path d="M40 10H10V50H40V42H20V32H36V24H20V18H40V10ZM45 50L60 10H72L87 50H75L71 38H61L57 50H45ZM63 30H69L66 18L63 30ZM90 10H115V18H99V26H112V34H99V50H90V10Z" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    svg: (
      <svg viewBox="0 0 140 36" aria-hidden="true" className={styles.logoSvg}>
        <path d="M18 0C8.06 0 0 8.06 0 18C0 27.94 8.06 36 18 36C27.94 36 36 27.94 36 18C36 8.06 27.94 0 18 0ZM26.26 26C25.93 26.54 25.24 26.71 24.7 26.38C20.5 23.82 15.18 23.23 8.91 24.67C8.29 24.81 7.68 24.41 7.54 23.79C7.4 23.17 7.8 22.56 8.42 22.42C15.28 20.85 21.17 21.51 25.86 24.37C26.4 24.71 26.57 25.4 26.26 26ZM28.48 21.09C28.05 21.79 27.13 22.01 26.43 21.58C21.63 18.63 14.28 17.77 8.56 19.51C7.76 19.75 6.92 19.3 6.68 18.5C6.44 17.7 6.89 16.86 7.69 16.62C14.22 14.64 22.33 15.59 27.84 18.98C28.54 19.41 28.76 20.33 28.48 21.09ZM28.66 16.03C22.86 12.59 13.29 12.27 7.73 13.96C6.84 14.23 5.9 13.72 5.63 12.83C5.36 11.94 5.87 11 6.76 10.73C13.15 8.79 23.73 9.17 30.41 13.14C31.21 13.62 31.47 14.65 30.99 15.45C30.51 16.24 29.47 16.5 28.66 16.03Z" />
        <text x="44" y="25" fill="currentColor" fontFamily="var(--font-montreal), sans-serif" fontSize="20" fontWeight="700" letterSpacing="-0.5">Spotify</text>
      </svg>
    ),
  },
];

interface CompanyLogosProps {
  label?: string;
  companyLogos?: string[] | null;
}

export default function CompanyLogos({ label = "Trusted by industry leaders", companyLogos }: CompanyLogosProps) {
  const [companies, setCompanies] = useState<Company[]>(defaultCompanies);

  useEffect(() => {
    function processLogos(logos?: string[] | null) {
      if (logos && Array.isArray(logos) && logos.length > 0) {
        const dynamicCompanies: Company[] = logos.map((logoPath, idx) => ({
          name: `Client ${idx + 1}`,
          logoUrl: getMediaUrl(logoPath),
        }));
        setCompanies(dynamicCompanies);
      }
    }

    if (companyLogos !== undefined) {
      processLogos(companyLogos);
    } else {
      async function loadHomepageLogos() {
        const res = await fetchApi<{ data: HomepageSettingsData | null }>('/homepage-settings');
        if (res?.data?.company_logos) {
          processLogos(res.data.company_logos);
        }
      }
      loadHomepageLogos();
    }
  }, [companyLogos]);

  return (
    <div className={styles.container}>
      <h2 className={styles.label}>{label}</h2>

      {/* Desktop static layout */}
      <div className={`${styles.logoList} ${styles.desktopOnly}`}>
        {companies.map((company, index) => (
          <div key={`${company.name}-${index}`} className={styles.logoItem} title={company.name} aria-label={company.name}>
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className={styles.logoImg} />
            ) : (
              company.svg
            )}
          </div>
        ))}
      </div>

      {/* Mobile continuous 1-line auto-sliding marquee track */}
      <div className={`${styles.mobileOnly} ${styles.marqueeWrapper}`}>
        <div className={styles.marqueeTrack}>
          {companies.concat(companies).map((company, index) => (
            <div key={`${company.name}-${index}`} className={styles.logoItem} title={company.name} aria-label={company.name}>
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className={styles.logoImg} />
              ) : (
                company.svg
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
