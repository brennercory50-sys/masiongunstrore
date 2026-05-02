import type { Metadata } from 'next';
import CCWClient from './ccw-client';

export const metadata: Metadata = {
  title: 'CCW Class Daytona Beach – Florida Concealed Carry Permit Course',
  description: 'Get your Florida concealed carry permit at Mason Avenue Firearms in Daytona Beach. State-certified instructors, classroom & live fire, certificate included. Call (386) 226-4653.',
  alternates: { canonical: '/ccw' },
};

export default function CCWPage() {
  return <CCWClient />;
}
