'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Flame, Sparkles, Star } from 'lucide-react';
import StatusBadge from './status-badge';

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    condition: string;
    imageUrl: string;
    tag: string | null;
    status: string;
    inventoryStatus?: string;
    views: number;
    caliber: string | null;
  };
  index?: number;
}

const tagConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  just_in: { label: 'Just In', color: 'bg-blue-500', icon: <Sparkles className="w-3 h-3" /> },
  hot: { label: 'Hot', color: 'bg-red-600', icon: <Flame className="w-3 h-3" /> },
  rare: { label: 'Rare', color: 'bg-amber-600', icon: <Star className="w-3 h-3" /> },
};

export default function ProductCard({ item, index = 0 }: ProductCardProps) {
  const tagInfo = item?.tag ? tagConfig?.[item.tag] : null;
  const isSold = item?.status === 'sold';
  const invStatus = item?.inventoryStatus || 'in_stock';

  return (
    <Link href={`/inventory/${item?.id}`} className="block group">
      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/[0.06] card-hover">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#0d0d0d] overflow-hidden">
          <Image
            src={item?.imageUrl ?? '/inventory/placeholder.jpg'}
            alt={item?.name ?? 'Firearm'}
            fill
            className={`object-contain p-6 group-hover:scale-105 transition-transform duration-500 ${isSold ? 'opacity-30 grayscale' : ''}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Tag badge */}
          {tagInfo && !isSold && (
            <div className={`absolute top-3 left-3 ${tagInfo.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 uppercase tracking-wide`}>
              {tagInfo.icon}
              {tagInfo.label}
            </div>
          )}
          {/* Status badge */}
          {!isSold && (
            <div className="absolute top-3 right-3">
              <StatusBadge status={invStatus} />
            </div>
          )}
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/80 text-white text-sm font-bold px-6 py-2 rounded-lg border border-white/20 uppercase tracking-widest">
                Sold
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1 font-medium">{item?.brand}</p>
          <h3 className="text-white font-semibold text-sm leading-tight mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
            {item?.name}
          </h3>
          <div className="flex items-end justify-between">
            <span className={`text-xl font-bold ${isSold ? 'text-gray-600 line-through' : 'text-white'}`}>
              ${item?.price?.toLocaleString?.() ?? '0'}
            </span>
            <div className="flex items-center gap-3 text-gray-600">
              {item?.caliber && <span className="text-[10px] uppercase">{item.caliber}</span>}
              <span className="text-[10px] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {item?.views ?? 0}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-wide">{item?.condition}</p>
        </div>
      </div>
    </Link>
  );
}
