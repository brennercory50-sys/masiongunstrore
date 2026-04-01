export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { inventoryItemSchema } from '@/lib/validation';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.inventoryItem.findUnique({ where: { id: params?.id } });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // increment views
    await prisma.inventoryItem.update({ where: { id: params?.id }, data: { views: { increment: 1 } } });
    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Item fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    if (data?.incrementViews) {
      await prisma.inventoryItem.update({ where: { id: params?.id }, data: { views: { increment: 1 } } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    const validation = inventoryItemSchema.partial().safeParse(data);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }
    
    const item = await prisma.inventoryItem.update({ where: { id: params?.id }, data: validation.data });
    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Item update error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await prisma.inventoryItem.delete({ where: { id: params?.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Item delete error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
