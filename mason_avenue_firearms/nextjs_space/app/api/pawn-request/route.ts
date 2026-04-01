import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { pawnRequestSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = pawnRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }
    
    const { name, phone, email, itemType, description, photoUrls } = validation.data;

    const pawnRequest = await prisma.pawnLoanRequest.create({
      data: {
        name,
        phone,
        email,
        itemType,
        description,
        photoUrls: photoUrls ?? [],
      },
    });

    const recipientEmail = process.env.NOTIFICATION_RECIPIENT_EMAIL || 'nxtlevelscreening@gmail.com';

    try {
      const notifId = process.env.NOTIF_ID_PAWN_LOAN_REQUEST;
      if (notifId) {
        const notifApiKey = process.env.NOTIF_API_KEY;
        const notifBaseUrl = process.env.NOTIF_BASE_URL || 'https://apps.abacus.ai';
        if (notifApiKey) {
          await fetch(`${notifBaseUrl}/api/sendNotificationEmail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              notification_id: notifId,
              api_key: notifApiKey,
              email_subject: `New Pawn Loan Request from ${name}`,
              email_body: `<h2>New Pawn Loan Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Item Type:</strong> ${itemType}</p><p><strong>Description:</strong> ${description}</p><p><strong>Photos:</strong> ${(photoUrls ?? []).length} uploaded</p>`,
            }),
          }).catch((e: any) => console.error('Notification error:', e));
        }
      }
    } catch (notifErr: any) {
      console.error('Notification send error:', notifErr);
    }

    return NextResponse.json(pawnRequest);
  } catch (err: any) {
    console.error('Pawn request error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pawnRequests = await prisma.pawnLoanRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(pawnRequests);
  } catch (err: any) {
    console.error('Pawn request fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
