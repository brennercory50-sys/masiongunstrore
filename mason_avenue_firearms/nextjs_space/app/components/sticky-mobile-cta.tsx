'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, MessageSquare, DollarSign } from 'lucide-react';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
      <div className="flex items-center justify-around py-3 px-2 safe-area-bottom">
        <a
          href="tel:3862264653"
          className="flex flex-col items-center gap-1 px-3 py-1 text-red-400 hover:text-red-300 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a
          href="sms:3862264653"
          className="flex flex-col items-center gap-1 px-3 py-1 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium">Text</span>
        </a>
        <Link
          href="/inventory"
          className="flex flex-col items-center gap-1 px-3 py-1 text-gray-400 hover:text-white transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-medium">Browse</span>
        </Link>
        <Link
          href="/sell"
          className="flex flex-col items-center gap-1 px-3 py-1 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sell</span>
        </Link>
      </div>
    </div>
  );
}
