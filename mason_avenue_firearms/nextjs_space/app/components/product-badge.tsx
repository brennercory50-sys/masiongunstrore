'use client';

import React from 'react';
import { Sparkles, Flame, Star, MapPin, Package, Store, Clock, Tag, CheckCircle } from 'lucide-react';

interface BadgeProps {
  variant: 
    | 'in_stock'
    | 'local_pickup'
    | 'just_arrived'
    | 'deal'
    | 'used'
    | 'new'
    | 'partner'
    | 'special_order'
    | 'available'
    | 'reserved'
    | 'sold';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const badgeConfig: Record<string, { label: string; color: string; bgColor: string; borderColor: string; icon: React.ReactNode }> = {
  in_stock: {
    label: 'In Stock',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  local_pickup: {
    label: 'Local Pickup',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    icon: <MapPin className="w-3 h-3" />,
  },
  just_arrived: {
    label: 'Just Arrived',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/40',
    icon: <Sparkles className="w-3 h-3" />,
  },
  deal: {
    label: 'Deal',
    color: 'text-red-400',
    bgColor: 'bg-red-500/15',
    borderColor: 'border-red-500/40',
    icon: <Tag className="w-3 h-3" />,
  },
  used: {
    label: 'Used',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/40',
    icon: <Clock className="w-3 h-3" />,
  },
  new: {
    label: 'New',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/40',
    icon: <Package className="w-3 h-3" />,
  },
  partner: {
    label: 'Partner',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/15',
    borderColor: 'border-purple-500/40',
    icon: <Store className="w-3 h-3" />,
  },
  special_order: {
    label: 'Special Order',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/40',
    icon: <Package className="w-3 h-3" />,
  },
  available: {
    label: 'Available',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  reserved: {
    label: 'Reserved',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/40',
    icon: <Clock className="w-3 h-3" />,
  },
  sold: {
    label: 'Sold',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    icon: <Tag className="w-3 h-3" />,
  },
};

export default function ProductBadge({ variant, size = 'sm', showIcon = true }: BadgeProps) {
  const config = badgeConfig[variant] ?? badgeConfig.available;
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : size === 'lg' ? 'text-sm px-4 py-1.5' : 'text-xs px-3 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-md border ${config.color} ${config.bgColor} ${config.borderColor} ${sizeClasses}`}>
      {showIcon && config.icon}
      {config.label}
    </span>
  );
}

export function mapStatusToBadge(status: string, inventoryStatus?: string): BadgeProps['variant'] {
  if (status === 'sold') return 'sold';
  if (status === 'reserved') return 'reserved';
  if (inventoryStatus === 'in_stock') return 'in_stock';
  if (inventoryStatus === 'available_to_order') return 'available';
  if (inventoryStatus === 'sourced' || inventoryStatus === 'special_order') return 'special_order';
  return 'available';
}

export function mapConditionToBadge(condition?: string | null): BadgeProps['variant'] | null {
  if (!condition) return null;
  const lower = condition.toLowerCase();
  if (lower === 'new') return 'new';
  if (lower === 'like new' || lower === 'excellent') return 'new';
  if (lower.includes('used') || lower === 'good' || lower === 'fair') return 'used';
  return null;
}

export function mapTagToBadge(tag?: string | null): BadgeProps['variant'] | null {
  if (!tag) return null;
  if (tag === 'just_in' || tag === 'just_arrived') return 'just_arrived';
  if (tag === 'hot' || tag === 'deal') return 'deal';
  if (tag === 'rare') return 'partner';
  return null;
}