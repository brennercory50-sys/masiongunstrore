'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Flame, Sparkles, Star, Phone } from 'lucide-react';
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

const tagConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  just_in: { label: 'Just In', color: 'text-blue-400', bgColor: 'bg-blue-500/20 border-blue-500/40', icon: <Sparkles className="w-3 h-3" /> },
  hot: { label: 'Hot', color: 'text-red-400', bgColor: 'bg-red-500/20 border-red-500/40', icon: <Flame className="w-3 h-3" /> },
  rare: { label: 'Rare Find', color: 'text-amber-400', bgColor: 'bg-amber-500/20 border-amber-500/40', icon: <Star className="w-3 h-3" /> },
};

export default function ProductCard({ item, index = 0 }: ProductCardProps) {
  const tagInfo = item?.tag ? tagConfig?.[item.tag] : null;
  const isSold = item?.status === 'sold';
  const isReserved = item?.status === 'reserved';
  const invStatus = item?.inventoryStatus || 'in_stock';
  const isInStock = invStatus === 'in_stock' && !isSold;

  return (
    <Link href={`/inventory/${item?.id}`} className="block group">
      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/15 transition-all duration-300 card-hover">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#0d0d0d] overflow-hidden">
          <Image
            src={item?.imageUrl ?? '/inventory/placeholder.jpg'}
            alt={item?.name ?? 'Product'}
            fill
            className={`object-contain p-6 group-hover:scale-105 transition-transform duration-500 ${isSold ? 'opacity-30 grayscale' : ''}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Top badges row */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {/* Tag badge */}
            {tagInfo && !isSold && (
              <div className={`${tagInfo.bgColor} ${tagInfo.color} text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 uppercase tracking-wide border`}>
                {tagInfo.icon}
                {tagInfo.label}
              </div>
            )}
            {isSold && (
              <div className="bg-black/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-white/20">
                Sold
              </div>
            )}
            {isReserved && !isSold && (
              <div className="bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                Reserved
              </div>
            )}
            {/* Spacer */}
            <div className="flex-1" />
            {/* Status badge */}
            {!isSold && !isReserved && (
              <StatusBadge status={invStatus} />
            )}
          </div>

          {/* In Stock urgency */}
          {isInStock && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                In Stock
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-medium">{item?.brand}</p>
            {item?.caliber && (
              <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded uppercase">{item.caliber}</span>
            )}
          </div>
          <h3 className="text-white font-semibold text-sm leading-tight mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
            {item?.name}
          </h3>
          <div className="flex items-end justify-between">
            <div>
              <span className={`text-xl font-bold ${isSold ? 'text-gray-600 line-through' : 'text-white'}`}>
                ${item?.price?.toLocaleString?.() ?? '0'}
              </span>
              {!isSold && (
                <span className="text-[10px] text-gray-600 block mt-0.5">{item?.condition}</span>
              )}
            </div>
            {isInStock && (
              <a 
                href="tel:3862264653" 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 text-[10px] font-semibold transition-colors"
              >
                <Phone className="w-3 h-3" />
                Call
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
