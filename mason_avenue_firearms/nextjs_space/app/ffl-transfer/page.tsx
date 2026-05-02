import type { Metadata } from 'next';
import FFLTransferPage from './ffl-client';
import { faqs } from './ffl-data';

export const metadata: Metadata = {
  title: 'FFL Transfer Daytona Beach – $25 Handgun / $35 Long Gun',
  description: 'FFL transfers in Daytona Beach, FL starting at $25. Ship to us from any online retailer. Same-day pickup. Licensed FFL dealer. Call (386) 226-4653.',
  alternates: { canonical: '/ffl-transfer' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function FFLPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FFLTransferPage />
    </>
  );
}
