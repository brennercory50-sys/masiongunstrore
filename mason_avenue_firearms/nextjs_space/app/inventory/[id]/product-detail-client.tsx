'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone, ArrowLeft, Eye, Clock, Shield, AlertTriangle,
  Flame, Sparkles, Star, Share2, CheckCircle, Truck, Search
} from 'lucide-react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ProductCard from '../../components/product-card';
import StatusBadge from '../../components/status-badge';

const tagConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  just_in: { label: 'Just In', color: 'bg-blue-500', icon: <Sparkles className="w-3.5 h-3.5" /> },
  hot: { label: 'Hot Item', color: 'bg-red-600', icon: <Flame className="w-3.5 h-3.5" /> },
  rare: { label: 'Rare Find', color: 'bg-amber-600', icon: <Star className="w-3.5 h-3.5" /> },
};

interface Props {
  item: any;
  relatedItems: any[];
}

export default function ProductDetailClient({ item, relatedItems }: Props) {
  const tagInfo = item?.tag ? tagConfig?.[item.tag] : null;
  const invStatus = item?.inventoryStatus || 'in_stock';
  const [viewCount, setViewCount] = useState(item?.views ?? 0);
  const [mounted, setMounted] = useState(false);
  const isFirearm = (item?.department || 'firearms') === 'firearms';

  useEffect(() => {
    setMounted(true);
    fetch(`/api/inventory/${item?.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ incrementViews: true }) }).catch(() => {});
  }, [item?.id]);

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator?.share) {
        await navigator.share({ title: item?.name ?? 'Item', url: typeof window !== 'undefined' ? window?.location?.href : '' });
      }
    } catch (e: any) { /* user cancelled */ }
  };

  const getCTAText = () => {
    if (isFirearm) {
      return invStatus === 'in_stock' ? 'Reserve This Firearm' : invStatus === 'available_to_order' ? 'Order This Firearm' : 'Request This Firearm';
    }
    return invStatus === 'in_stock' ? 'Reserve This Item' : invStatus === 'available_to_order' ? 'Order This Item' : 'Request This Item';
  };

  const statusMessages: Record<string, { headline: string; detail: string }> = {
    in_stock: { headline: 'In Stock \u2014 Ready for Pickup', detail: 'Available now at our Daytona Beach location.' },
    available_to_order: { headline: 'Available to Order', detail: 'Ships from our dealer network within days.' },
    sourced: { headline: 'Special Order', detail: 'We can source this for you \u2014 call for availability.' },
  };

  const statusMsg = statusMessages?.[invStatus] ?? statusMessages.in_stock;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link href={`/inventory${item?.department ? `?dept=${item.department}` : ''}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square bg-[#060606] rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image
                src={item?.imageUrl ?? '/inventory/placeholder.jpg'}
                alt={item?.name ?? 'Product image'}
                fill
                className="object-contain p-8 sm:p-12"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {tagInfo && (
                <div className={`absolute top-4 left-4 ${tagInfo.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5`}>
                  {tagInfo.icon}
                  {tagInfo.label}
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Details + CTA Stack */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="sticky top-28">
              {/* Status Badge */}
              <div className="mb-4">
                <StatusBadge status={invStatus} size="md" />
              </div>

              {/* Department badge for non-firearms */}
              {!isFirearm && (
                <span className="inline-block text-[10px] text-gray-400 uppercase tracking-[0.2em] bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-md mb-3 capitalize">{item?.department}</span>
              )}

              {/* Brand */}
              <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-2 font-medium">{item?.brand}</p>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4 tracking-tight">{item?.name}</h1>

              {/* Price */}
              <p className="text-4xl font-bold text-white mb-6">
                ${item?.price?.toLocaleString?.() ?? '0'}
              </p>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {item?.caliber && (
                  <span className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">{item.caliber}</span>
                )}
                <span className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">{item?.condition}</span>
                <span className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg capitalize">{item?.category}</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-8">{item?.description}</p>

              {/* Status message */}
              <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5 mb-6">
                <p className="text-white font-semibold text-sm mb-1">{statusMsg.headline}</p>
                <p className="text-gray-500 text-xs">{statusMsg.detail}</p>
              </div>

              {/* CTA STACK */}
              <div className="space-y-3 mb-8">
                <a
                  href="tel:3862264653"
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {getCTAText()}
                </a>
                <a
                  href="tel:3862264653"
                  className="w-full border border-white/10 hover:border-white/20 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.03] flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now \u2014 (386) 226-4653
                </a>
                <button
                  onClick={handleShare}
                  className="w-full border border-white/[0.06] text-gray-500 hover:text-white py-3 rounded-xl text-sm transition-all hover:bg-white/[0.03] flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Urgency line */}
              <p className="text-amber-500/80 text-xs flex items-center gap-1.5 mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                This item is available but moves fast \u2014 call to secure.
              </p>

              {/* Activity indicators */}
              <div className="flex items-center gap-4 text-gray-600 text-xs mb-6">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {mounted ? (viewCount + 1) : viewCount} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Recently added
                </span>
              </div>

              {/* Compliance - only for firearms */}
              {isFirearm && (
                <div className="bg-[#060606] border border-white/[0.04] rounded-lg p-4">
                  <p className="text-gray-600 text-[11px] flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    Available for in-store pickup or FFL transfer only. All transactions conducted in compliance with federal and state law.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {(relatedItems?.length ?? 0) > 0 && (
          <div className="mt-20 pt-16 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {relatedItems.map((ri: any, i: number) => (
                <ProductCard key={ri?.id ?? i} item={ri} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
