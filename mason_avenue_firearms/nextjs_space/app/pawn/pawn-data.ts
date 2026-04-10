import { Banknote, CheckCircle, Clock, Shield, Store, Scale, Eye, FileText, Calendar } from 'lucide-react';

export const itemTypes = ['Firearm', 'Jewelry / Watch', 'Electronics', 'Tools / Equipment', 'Musical Instrument', 'Other'];

export const acceptedItems = [
  { icon: '🔫', title: 'Firearms', desc: 'Handguns, rifles, shotguns' },
  { icon: '💎', title: 'Jewelry & Watches', desc: 'Gold, silver, diamonds, luxury watches' },
  { icon: '📱', title: 'Electronics', desc: 'Phones, laptops, gaming consoles' },
  { icon: '🔧', title: 'Tools & Equipment', desc: 'Power tools, diagnostic equipment' },
  { icon: '🎸', title: 'Musical Instruments', desc: 'Guitars, amps, keyboards, drums' },
  { icon: '📦', title: 'Other Valuables', desc: 'Collectibles, sports equipment, more' },
];

export const processSteps = [
  { num: '1', title: 'Submit Your Item', desc: 'Fill out the form below with details and photos of your item.' },
  { num: '2', title: 'We Make an Offer', desc: 'We review your submission and make a competitive loan offer within 24 hours.' },
  { num: '3', title: 'Get Your Cash', desc: 'Bring your item in, accept the offer, and walk out with cash the same day.' },
];

export const whyItems = [
  { icon: <Shield className="w-5 h-5" />, title: 'Licensed & Compliant', desc: 'We follow all state and federal pawn regulations' },
  { icon: <Eye className="w-5 h-5" />, title: 'No Credit Check', desc: "Your credit score doesn't affect your loan" },
  { icon: <FileText className="w-5 h-5" />, title: 'Simple Terms', desc: 'Clear, upfront loan terms with no hidden fees' },
  { icon: <Calendar className="w-5 h-5" />, title: 'Flexible Extensions', desc: 'Need more time? We offer extensions options' },
];

export const nextSteps = [
  'We review your submission within 24 hours',
  'We call you with our loan offer',
  'You decide if you want to accept — no pressure',
  'If you accept, bring your item in for cash same-day',
];