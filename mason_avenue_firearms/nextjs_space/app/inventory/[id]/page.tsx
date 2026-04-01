import { prisma } from '@/lib/prisma';
import ProductDetailClient from './product-detail-client';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  let item: any = null;
  let relatedItems: any[] = [];
  try {
    item = await prisma.inventoryItem.findUnique({ where: { id: params?.id } });
    if (item) {
      relatedItems = await prisma.inventoryItem.findMany({
        where: { category: item?.category, status: 'available', id: { not: item?.id } },
        take: 4,
      });
    }
  } catch (e: any) {
    console.error('Product fetch error:', e);
  }
  if (!item) return notFound();

  return (
    <ProductDetailClient
      item={JSON.parse(JSON.stringify(item))}
      relatedItems={JSON.parse(JSON.stringify(relatedItems ?? []))}
    />
  );
}
