import {
  Crosshair, Gem, Smartphone, Wrench, Package, Target
} from 'lucide-react';

export const departmentCards = [
  { key: 'firearms', label: 'Firearms', desc: 'Handguns, rifles, shotguns & more', icon: <Crosshair className="w-6 h-6" />, color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20', href: '/inventory?dept=firearms' },
  { key: 'ammo', label: 'Ammo', desc: 'Handgun, rifle, rimfire & bulk', icon: <Target className="w-6 h-6" />, color: 'text-orange-400', bg: 'bg-orange-500/5', border: 'border-orange-500/20', href: '/inventory?dept=ammo' },
  { key: 'accessories', label: 'Accessories', desc: 'Optics, mags, holsters & more', icon: <Package className="w-6 h-6" />, color: 'text-cyan-400', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', href: '/inventory?dept=accessories' },
  { key: 'jewelry', label: 'Jewelry', desc: 'Watches, chains, rings & earrings', icon: <Gem className="w-6 h-6" />, color: 'text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/20', href: '/inventory?dept=jewelry' },
  { key: 'electronics', label: 'Electronics', desc: 'Laptops, phones, gaming & audio', icon: <Smartphone className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20', href: '/inventory?dept=electronics' },
  { key: 'tools', label: 'Tools', desc: 'Power tools, hand tools & equipment', icon: <Wrench className="w-6 h-6" />, color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', href: '/inventory?dept=tools' },
];

export interface Review {
  name: string;
  rating: number;
  text: string;
  timeAgo: string;
}

export const reviews: Review[] = [
  { name: 'Mike R.', rating: 5, text: 'Best firearms dealer in Daytona. Fair prices, great selection, and the staff knows their stuff. Bought 3 guns here already.', timeAgo: '2 weeks ago' },
  { name: 'Sarah T.', rating: 5, text: 'Sold my late father\'s collection here. They gave me a very fair offer and handled everything professionally. Highly recommend.', timeAgo: '1 month ago' },
  { name: 'James L.', rating: 5, text: 'They found me a specific Sig I was looking for in less than a week. Amazing service and competitive pricing.', timeAgo: '3 weeks ago' },
  { name: 'David K.', rating: 4, text: 'Great inventory and knowledgeable staff. Clean shop, well-organized. Will definitely be back for my next purchase.', timeAgo: '1 month ago' },
];