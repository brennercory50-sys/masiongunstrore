import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return {
    title: 'Mason Avenue Firearms & Pawn | Daytona Beach',
    description: "Daytona's Premier Firearms & Tactical Inventory. Buy, Sell, Trade — Premium firearms, fair offers, trusted local dealer.",
    metadataBase: new URL(url),
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
    },
    openGraph: {
      title: 'Mason Avenue Firearms & Pawn',
      description: "Premium firearms. Fair deals. No games.",
      images: ['/og-image.png'],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
