import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import AgeGate from './components/age-gate';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXTAUTH_URL || 'https://masonavenuefirearms.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mason Avenue Firearms & Pawn | Daytona Beach Gun Shop & Pawn Shop',
    template: '%s | Mason Avenue Firearms & Pawn – Daytona Beach',
  },
  description: 'Daytona Beach\'s #1 pawn shop and FFL gun dealer. Buy, sell & trade firearms, jewelry, electronics & tools. Fast pawn loans. Licensed FFL transfers. Call (386) 226-4653.',
  keywords: [
    'pawn shop daytona beach',
    'gun shop daytona beach',
    'firearms dealer daytona beach',
    'FFL transfer daytona beach',
    'sell guns daytona beach',
    'pawn loans daytona beach florida',
    'buy sell trade firearms daytona beach',
    'CCW class daytona beach',
    'concealed carry class volusia county',
    'jewelry pawn shop daytona beach',
    'electronics pawn shop',
    'gun store near me daytona beach',
  ],
  authors: [{ name: 'Mason Avenue Firearms & Pawn' }],
  creator: 'Mason Avenue Firearms & Pawn',
  publisher: 'Mason Avenue Firearms & Pawn',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Mason Avenue Firearms & Pawn',
    title: 'Mason Avenue Firearms & Pawn | Daytona Beach Gun Shop & Pawn Shop',
    description: 'Daytona Beach\'s #1 pawn shop and licensed FFL gun dealer. Buy, sell & trade firearms, jewelry, electronics. Fast pawn loans. (386) 226-4653.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mason Avenue Firearms & Pawn – Daytona Beach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mason Avenue Firearms & Pawn | Daytona Beach',
    description: 'Daytona\'s #1 pawn shop & FFL gun dealer. Buy, sell, trade. Call (386) 226-4653.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: SITE_URL },
  icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
  verification: { google: '' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store'],
  name: 'Mason Avenue Firearms & Pawn',
  alternateName: 'Mason Avenue Pawn Shop',
  url: SITE_URL,
  telephone: '+13862264653',
  email: 'info@masonavenue.com',
  description: 'Licensed FFL firearms dealer and pawn shop in Daytona Beach, FL. Buy, sell, trade firearms, jewelry, electronics, and tools. Fast pawn loans and FFL transfers.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '347 Mason Ave',
    addressLocality: 'Daytona Beach',
    addressRegion: 'FL',
    postalCode: '32117',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 29.2108, longitude: -81.0228 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '16:00' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card',
  areaServed: [
    { '@type': 'City', name: 'Daytona Beach' },
    { '@type': 'City', name: 'Ormond Beach' },
    { '@type': 'City', name: 'Port Orange' },
    { '@type': 'City', name: 'Holly Hill' },
    { '@type': 'City', name: 'South Daytona' },
    { '@type': 'AdministrativeArea', name: 'Volusia County' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Firearm Sales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FFL Transfers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pawn Loans' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CCW Classes' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jewelry Buying & Selling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electronics Buying & Selling' } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script src="https://apps.abacus.ai/chatllm/appllm-lib.js" strategy="lazyOnload" />
      </head>
      <body className="min-h-screen text-white antialiased">
        <AgeGate />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
