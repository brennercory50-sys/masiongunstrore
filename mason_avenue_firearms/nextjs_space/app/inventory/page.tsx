import { Suspense } from 'react';
import InventoryClient from './inventory-client';

export const dynamic = 'force-dynamic';

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <InventoryClient />
    </Suspense>
  );
}
