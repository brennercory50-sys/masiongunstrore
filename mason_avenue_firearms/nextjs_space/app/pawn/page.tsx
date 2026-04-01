import PawnClient from './pawn-client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pawn Loans | Mason Avenue Firearms & Pawn',
  description: 'Get a quick pawn loan on your valuables. Fair rates, fast approval. Firearms, jewelry, electronics, tools and more.',
};

export default function PawnPage() {
  return <PawnClient />;
}
