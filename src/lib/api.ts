export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';

export function getMediaUrl(path?: string | null, fallback: string = ''): string {
  if (!path) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/assets/')) return path;
  return `${STORAGE_BASE_URL}/${path.replace(/^\//, '')}`;
}

export async function fetchApi<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`API error on ${endpoint}:`, res.statusText);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.warn(`Failed to connect to API ${endpoint}:`, err);
    return null;
  }
}
