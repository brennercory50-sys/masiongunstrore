import { prisma } from '@/lib/prisma';
import HomeClient from './home-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featuredItems: any[] = [];
  let recentItems: any[] = [];
  let soldItems: any[] = [];

  try {
    featuredItems = await prisma.inventoryItem.findMany({
      where: { status: 'available', featured: true },
      orderBy: { createdAt: 'desc' },
      take: 12,
    });
    const featuredIds = (featuredItems ?? []).map((i: any) => i?.id).filter(Boolean);
    recentItems = await prisma.inventoryItem.findMany({
      where: { status: 'available', id: { notIn: featuredIds } },
      orderBy: { createdAt: 'desc' },
      take: 12,
    });
    soldItems = await prisma.inventoryItem.findMany({
      where: { status: 'sold' },
      orderBy: { updatedAt: 'desc' },
      take: 6,
    });
  } catch (e: any) {
    console.error('Failed to fetch inventory:', e);
  }

  return (
    <HomeClient
      featuredItems={JSON.parse(JSON.stringify(featuredItems ?? []))}
      recentItems={JSON.parse(JSON.stringify(recentItems ?? []))}
      soldItems={JSON.parse(JSON.stringify(soldItems ?? []))}
    />
  );
}
