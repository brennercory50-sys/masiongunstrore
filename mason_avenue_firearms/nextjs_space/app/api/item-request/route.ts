export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { itemRequestSchema } from '@/lib/validation';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const requests = await prisma.itemRequest.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(requests);
  } catch (error: any) {
    console.error('Item request fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = itemRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }
    
    const data = validation.data;
    const itemRequest = await prisma.itemRequest.create({ data });

    const recipientEmail = process.env.NOTIFICATION_RECIPIENT_EMAIL || 'nxtlevelscreening@gmail.com';

    try {
      const appName = 'Mason Avenue Firearms';
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC2626; border-bottom: 2px solid #DC2626; padding-bottom: 10px;">New Item Request</h2>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0; color: #fff;">
            <p><strong>Name:</strong> ${data?.name ?? 'N/A'}</p>
            <p><strong>Phone:</strong> ${data?.phone ?? 'N/A'}</p>
            <p><strong>Email:</strong> ${data?.email ?? 'N/A'}</p>
            <p><strong>Item Type:</strong> ${data?.itemType ?? 'N/A'}</p>
            <p><strong>Brand:</strong> ${data?.brand ?? 'N/A'}</p>
            <p><strong>Model:</strong> ${data?.model ?? 'N/A'}</p>
            <p><strong>Budget:</strong> ${data?.budget ?? 'N/A'}</p>
            <p><strong>Description:</strong> ${data?.description ?? 'N/A'}</p>
          </div>
        </div>
      `;
      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_ITEM_REQUEST_SUBMISSION,
          subject: `New Item Request from ${data?.name ?? 'Customer'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: recipientEmail,
          sender_alias: appName,
        }),
      });
    } catch (emailErr: any) {
      console.error('Email notification failed:', emailErr);
    }

    return NextResponse.json(itemRequest);
  } catch (error: any) {
    console.error('Item request create error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
