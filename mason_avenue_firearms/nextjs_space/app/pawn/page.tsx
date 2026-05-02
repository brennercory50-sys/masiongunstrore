import PawnClient from './pawn-client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pawn Loans Daytona Beach – Fast Cash on Firearms, Jewelry & More',
  description: 'Need cash fast? Get a pawn loan at Mason Avenue Pawn in Daytona Beach. Fair rates, no credit check, quick approval on firearms, jewelry, electronics & tools. Call (386) 226-4653.',
  alternates: { canonical: '/pawn' },
};

export default function PawnPage() {
  return <PawnClient />;
}
