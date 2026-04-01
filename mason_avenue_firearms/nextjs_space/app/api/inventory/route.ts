export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { inventoryItemSchema } from '@/lib/validation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const condition = searchParams.get('condition');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status') ?? 'available';
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') ?? '50');

    const inventoryStatus = searchParams.get('inventoryStatus');
    const department = searchParams.get('department');

    const where: any = {};
    if (status !== 'all') where.status = status;
    if (inventoryStatus) where.inventoryStatus = inventoryStatus;
    if (department) where.department = department;
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (condition) where.condition = condition;
    if (tag) where.tag = tag;
    if (featured === 'true') where.featured = true;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const items = await prisma.inventoryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Inventory fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    const validation = inventoryItemSchema.safeParse(data);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }
    
    const item = await prisma.inventoryItem.create({ data: validation.data });
    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Inventory create error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
