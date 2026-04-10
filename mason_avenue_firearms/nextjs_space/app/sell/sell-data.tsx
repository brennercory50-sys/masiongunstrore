import { DollarSign, Clock, Shield } from 'lucide-react';

export const itemTypes = ['Firearm', 'Jewelry / Watch', 'Electronics', 'Tools / Equipment', 'Musical Instrument', 'Other'];
export const conditionOptions = ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'Poor'];

export const benefits = [
  { icon: <Clock className="w-5 h-5" />, title: 'Most offers within 24 hours', desc: 'Fast turnaround on every submission' },
  { icon: <DollarSign className="w-5 h-5" />, title: 'Fair market pricing', desc: 'Competitive, transparent offers' },
  { icon: <Shield className="w-5 h-5" />, title: 'No pressure. No obligation.', desc: 'Decline anytime — zero commitment' },
];