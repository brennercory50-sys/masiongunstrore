'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, MessageSquare } from 'lucide-react';
import StatusBadge from './status-badge';
import ProductBadge, { mapStatusToBadge, mapConditionToBadge, mapTagToBadge } from './product-badge';

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
    department?: string;
    source?: 'internal' | 'partner' | 'special_order';
  };
  index?: number;
}

export default function ProductCard({ item, index = 0 }: ProductCardProps) {
  const isSold = item?.status === 'sold';
  const isReserved = item?.status === 'reserved';
  const invStatus = item?.inventoryStatus || 'in_stock';
  const isInStock = invStatus === 'in_stock' && !isSold;
  const isPartner = item?.tag === 'rare' || item?.source === 'partner';
  const isSpecialOrder = invStatus === 'sourced' || invStatus === 'special_order' || item?.source === 'special_order';
  
  const statusBadge = mapStatusToBadge(item?.status, invStatus);
  const conditionBadge = mapConditionToBadge(item?.condition);
  const tagBadge = mapTagToBadge(item?.tag);

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
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5">
            {tagBadge && !isSold && <ProductBadge variant={tagBadge} size="sm" />}
            {conditionBadge && !isSold && <ProductBadge variant={conditionBadge} size="sm" />}
            {isPartner && !isSold && <ProductBadge variant="partner" size="sm" />}
            {isSpecialOrder && !isSold && <ProductBadge variant="special_order" size="sm" />}
          </div>

          {/* Right side badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {isSold && <ProductBadge variant="sold" size="sm" />}
            {isReserved && !isSold && <ProductBadge variant="reserved" size="sm" />}
            {!isSold && !isReserved && <StatusBadge status={invStatus} />}
          </div>

          {/* In Stock / Pickup indicator */}
          {isInStock && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <ProductBadge variant="in_stock" size="sm" showIcon />
              {isPartner ? (
                <ProductBadge variant="partner" size="sm" showIcon />
              ) : (
                <ProductBadge variant="local_pickup" size="sm" showIcon />
              )}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-5">
          {item?.department && item.department !== 'firearms' && (
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-2 capitalize">{item.department}</p>
          )}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium">{item?.brand}</p>
            {item?.caliber && (
              <span className="text-[9px] text-gray-500 bg-white/5 px-2 py-0.5 rounded uppercase">{item.caliber}</span>
            )}
          </div>
          <h3 className="text-white font-semibold text-sm leading-tight mb-4 group-hover:text-red-400 transition-colors line-clamp-2">
            {item?.name}
          </h3>
          <div className="flex items-end justify-between">
            <div>
              <span className={`text-2xl font-bold ${isSold ? 'text-gray-600 line-through' : 'text-white'}`}>
                ${item?.price?.toLocaleString?.() ?? '0'}
              </span>
              {!isSold && (
                <span className="text-[10px] text-gray-500 block mt-1">{item?.condition}</span>
              )}
            </div>
            {isInStock && (
              <div className="flex items-center gap-3">
                <a 
                  href="tel:3862264653" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 text-[10px] font-semibold transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
                <a 
                  href="sms:3862264653" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-[10px] font-semibold transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  Text
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
