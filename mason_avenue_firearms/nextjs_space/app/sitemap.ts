import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const headersList = headers();
  const host = headersList?.get?.('x-forwarded-host') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  const siteUrl = host?.startsWith?.('http') ? host : `https://${host}`;

  const now = new Date();
  return [
    { url: siteUrl,                         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/inventory`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${siteUrl}/ffl-transfer`,       lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/sell`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/pawn`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ccw`,                lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${siteUrl}/about`,              lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`,            lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
