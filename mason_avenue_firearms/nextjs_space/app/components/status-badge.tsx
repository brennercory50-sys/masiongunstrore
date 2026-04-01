'use client';

import React from 'react';
import { CheckCircle, Truck, Search } from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  in_stock: {
    label: 'In Stock',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  available_to_order: {
    label: 'Available to Order',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: <Truck className="w-3.5 h-3.5" />,
  },
  sourced: {
    label: 'Request / Source',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: <Search className="w-3.5 h-3.5" />,
  },
};

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig?.[status] ?? statusConfig.in_stock;
  const sizeClasses = size === 'md' ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${config.color} ${config.bg} ${config.border} ${sizeClasses}`}>
      {config.icon}
      {config.label}
    </span>
  );
}
