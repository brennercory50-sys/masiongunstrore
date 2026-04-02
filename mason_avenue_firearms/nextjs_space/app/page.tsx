import { prisma } from '@/lib/prisma';
import HomeClient from './home-client';
import { placeholderInventory, USE_PLACEHOLDER_INVENTORY } from '@/lib/placeholderInventory';

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

  // Use placeholder if no real data
  const hasRealData = (featuredItems?.length ?? 0) > 0 || (recentItems?.length ?? 0) > 0;
  const displayFeatured = hasRealData ? featuredItems : placeholderInventory.slice(0, 12).map(item => ({ ...item, createdAt: item.createdAt.toString() }));
  const displayRecent = hasRealData ? recentItems : placeholderInventory.slice(12, 24).map(item => ({ ...item, createdAt: item.createdAt.toString() }));

  return (
    <HomeClient
      featuredItems={JSON.parse(JSON.stringify(displayFeatured ?? []))}
      recentItems={JSON.parse(JSON.stringify(displayRecent ?? []))}
      soldItems={JSON.parse(JSON.stringify(soldItems ?? []))}
    />
  );
}
