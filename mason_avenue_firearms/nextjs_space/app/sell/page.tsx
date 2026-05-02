import type { Metadata } from 'next';
import SellClient from './sell-client';

export const metadata: Metadata = {
  title: 'Sell Firearms, Jewelry & Electronics in Daytona Beach',
  description: 'Get top dollar for your firearms, jewelry, electronics, and tools at Mason Avenue Pawn in Daytona Beach. Fast quotes, fair offers, same-day cash. Call (386) 226-4653.',
  alternates: { canonical: '/sell' },
};

export default function SellPage() {
  return <SellClient />;
}
