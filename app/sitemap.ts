import type { MetadataRoute } from 'next';
import { getAllSeoMetadata } from '@/lib/seo-service';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://moodlift.hexpertify.com';

function getSiteOrigin() {
  return SITE_URL.replace(/\/$/, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();

  // Core static routes that are always part of the product
  const staticPaths: string[] = [
    '/',
    '/about',
    '/blog',
    '/books',
    '/contact',
    '/discover',
    '/games',
    '/games&activities',
    '/mood-assessment',
    '/all-activities',
    '/dashboard',
    '/progress',
    '/rewards',
    '/privacy-policy',
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${origin}${path === '/' ? '/' : path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
  }));

  // Dynamically include any pages that have SEO metadata
  // This makes the sitemap auto-update as you add new SEO records.
  let seoEntries: MetadataRoute.Sitemap = [];
  try {
    const allSeo = await getAllSeoMetadata();

    const seen = new Set<string>();

    const mappedSeo = allSeo
      .map((seo) => {
        const rawPath = (seo.page_url || '').trim();
        if (!rawPath) return null;

        // Ensure path starts with a leading slash
        const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
        const fullUrl = `${origin}${path}`;

        if (seen.has(fullUrl)) return null;
        seen.add(fullUrl);

        return {
          url: fullUrl,
          // We don't currently track per-page lastModified; use now as a sane default
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: path === '/' ? 1.0 : 0.7,
        } as MetadataRoute.Sitemap[number];
      })
      .filter((entry): entry is MetadataRoute.Sitemap[number] => entry !== null);

    seoEntries = mappedSeo;
  } catch (error) {
    console.error('Error building SEO-based sitemap entries:', error);
  }

  // Merge static + SEO-based entries, preferring SEO list for duplicates
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const entry of staticEntries) {
    byUrl.set(entry.url, entry);
  }

  for (const entry of seoEntries) {
    byUrl.set(entry.url, entry);
  }

  return Array.from(byUrl.values());
}
