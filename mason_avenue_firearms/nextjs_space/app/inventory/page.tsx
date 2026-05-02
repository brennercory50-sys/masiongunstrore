import type { Metadata } from 'next';
import { Suspense } from 'react';
import InventoryClient from './inventory-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Guns & Firearms For Sale in Daytona Beach, FL',
  description: 'Browse firearms, handguns, rifles, ammo, jewelry, and electronics at Mason Avenue Pawn – Daytona Beach\'s licensed FFL gun dealer. In-store pickup. Call (386) 226-4653.',
  alternates: { canonical: '/inventory' },
};

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen " />}>
      <InventoryClient />
    </Suspense>
  );
}
