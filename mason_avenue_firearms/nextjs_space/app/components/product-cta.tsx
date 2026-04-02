'use client';

import React from 'react';
import { Phone, MessageCircle, ShoppingCart, Package, ArrowRight, DollarSign, Check } from 'lucide-react';

export type ProductSource = 'internal' | 'partner' | 'special_order';

export interface CTAMode {
  primary: {
    label: string;
    action: 'tel' | 'url' | 'form' | 'none';
    value?: string;
    variant: 'primary' | 'secondary' | 'outline';
  };
  secondary: {
    label: string;
    action: 'tel' | 'url' | 'form' | 'none';
    value?: string;
    variant: 'primary' | 'secondary' | 'outline';
  }[];
  urgency?: string;
}

const internalCTAs: CTAMode = {
  primary: {
    label: 'Reserve Now',
    action: 'tel',
    value: '3862264653',
    variant: 'primary',
  },
  secondary: [
    { label: 'Call Us', action: 'tel', value: '3862264653', variant: 'secondary' },
    { label: 'Local Pickup', action: 'none', value: '', variant: 'outline' },
  ],
  urgency: 'In stock and ready for same-day pickup',
};

const partnerCTAs: CTAMode = {
  primary: {
    label: 'Check Availability',
    action: 'tel',
    value: '3862264653',
    variant: 'primary',
  },
  secondary: [
    { label: 'Get Best Price', action: 'form', value: '', variant: 'secondary' },
    { label: 'Request It', action: 'form', value: '', variant: 'outline' },
  ],
  urgency: 'Available through our partner network',
};

const specialOrderCTAs: CTAMode = {
  primary: {
    label: 'Request Quote',
    action: 'form',
    value: '',
    variant: 'primary',
  },
  secondary: [
    { label: 'Tell Us What You Want', action: 'form', value: '', variant: 'secondary' },
    { label: 'Browse Similar', action: 'url', value: '/inventory', variant: 'outline' },
  ],
  urgency: 'We can source this item for you',
};

export function getProductSource(inventoryStatus?: string, isPartner?: boolean): ProductSource {
  if (inventoryStatus === 'sourced' || inventoryStatus === 'special_order') return 'special_order';
  if (isPartner) return 'partner';
  return 'internal';
}

export function getCTAMode(source: ProductSource, inStock?: boolean): CTAMode {
  if (source === 'partner') return partnerCTAs;
  if (source === 'special_order') return specialOrderCTAs;
  
  if (inStock) return internalCTAs;
  return {
    primary: {
      label: 'Check Availability',
      action: 'tel',
      value: '3862264653',
      variant: 'primary',
    },
    secondary: [
      { label: 'Call Us', action: 'tel', value: '3862264653', variant: 'secondary' },
    ],
    urgency: 'Call to check current availability',
  };
}

interface ProductCTAProps {
  source: ProductSource;
  inStock?: boolean;
  showForm?: () => void;
  className?: string;
}

export function ProductCTA({ source, inStock = true, showForm, className = '' }: ProductCTAProps) {
  const ctaMode = getCTAMode(source, inStock);
  
  const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline') => {
    const base = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all';
    switch (variant) {
      case 'primary':
        return `${base} bg-red-600 hover:bg-red-500 text-white hover:shadow-lg hover:shadow-red-600/20`;
      case 'secondary':
        return `${base} bg-[#0a0a0a] border border-white/[0.08] hover:border-white/15 text-white`;
      case 'outline':
        return `${base} border border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.03]`;
    }
  };

  const handleClick = (action: CTAMode['primary']['action'], value?: string) => {
    if (action === 'tel' && value) {
      window.location.href = `tel:${value}`;
    } else if (action === 'url' && value) {
      window.location.href = value;
    } else if (action === 'form') {
      showForm?.();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <button
        onClick={() => handleClick(ctaMode.primary.action, ctaMode.primary.value)}
        className={getButtonClasses(ctaMode.primary.variant)}
      >
        <Phone className="w-4 h-4" />
        {ctaMode.primary.label}
      </button>
      
      {ctaMode.secondary.map((btn, i) => (
        <button
          key={i}
          onClick={() => handleClick(btn.action, btn.value)}
          className={getButtonClasses(btn.variant)}
        >
          {btn.variant === 'secondary' ? <MessageCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          {btn.label}
        </button>
      ))}

      {ctaMode.urgency && (
        <p className="text-gray-500 text-xs flex items-center gap-1.5 pt-2">
          <Check className="w-3 h-3 text-emerald-500" />
          {ctaMode.urgency}
        </p>
      )}
    </div>
  );
}