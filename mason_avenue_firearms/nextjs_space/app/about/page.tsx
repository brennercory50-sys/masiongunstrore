import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About Us – Licensed FFL Dealer & Pawn Shop in Daytona Beach',
  description: 'Mason Avenue Firearms & Pawn is Daytona Beach\'s trusted licensed FFL dealer and pawn shop. Serving Volusia County since 1995. Fair prices, honest service. Visit us at 347 Mason Ave.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
