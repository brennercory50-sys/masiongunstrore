import type { Metadata } from 'next';
import HomeClient from './home/home-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Mason Avenue Firearms & Pawn | Daytona Beach Gun Shop & Pawn Shop',
  description: "Daytona Beach's #1 pawn shop and licensed FFL gun dealer. Buy, sell & trade firearms, jewelry, electronics & tools. Fast pawn loans. No pressure. Call (386) 226-4653.",
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeClient />;
}