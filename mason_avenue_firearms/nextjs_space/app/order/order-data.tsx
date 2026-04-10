import { Shield, MapPin, CreditCard, Store } from 'lucide-react';

export const itemTypes = ['Handgun', 'Rifle', 'Shotgun', 'Revolver', 'Ammunition', 'Accessories', 'Other'];

export const popularBrands = ['Glock', 'SIG Sauer', 'Smith & Wesson', 'Colt', 'Springfield', 'Beretta', 'Ruger', 'Henry', 'Kimber', 'FN', 'CZ', 'Walther'];

export const requestCategories = [
  { icon: '🔫', title: 'Handguns', desc: 'Compact, full-size, subcompact' },
  { icon: ' rifle', title: 'Rifles', desc: 'AR-15, hunting, precision' },
  { icon: ' shotgun', title: 'Shotguns', desc: 'Pump, semi-auto, over/under' },
  { icon: '📦', title: 'Accessories', desc: 'Sights, holsters, mags' },
];

export const processSteps = [
  { num: '1', title: 'Tell Us What You Want', desc: 'Submit the form with brand, model, caliber, and your budget.' },
  { num: '2', title: 'We Source It', desc: 'We search our dealer network and find the best price and availability.' },
  { num: '3', title: 'You Pick Up Local', desc: 'We call you with options. Pick up at our Daytona Beach store with FFL transfer.' },
];

export const localAdvantages = [
  { icon: <Shield className="w-5 h-5" />, title: 'Licensed & Compliant', desc: 'FFL dealer — all transfers done legally' },
  { icon: <MapPin className="w-5 h-5" />, title: 'Local Pickup', desc: 'No shipping to your door — pick up in person' },
  { icon: <CreditCard className="w-5 h-5" />, title: 'No Online Risk', desc: 'Inspect before you pay — no sketchy online sellers' },
  { icon: <Store className="w-5 h-5" />, title: 'Local Support', desc: 'Deal with a real local shop, not a faceless website' },
];

export const nextSteps = [
  'We search our distributor network for availability',
  'We call you with pricing and estimated timeline',
  'You decide if you want to proceed — no pressure',
  'If you proceed, we transfer to our store for pickup',
];