import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us – Daytona Beach Gun Shop & Pawn Shop',
  description: 'Contact Mason Avenue Firearms & Pawn in Daytona Beach, FL. Call (386) 226-4653, text, or stop by at 347 Mason Ave. Open Mon–Fri 9AM–5PM, Sat 10AM–4PM.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}
