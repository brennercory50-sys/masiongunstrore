'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
      <div className="flex items-center justify-around py-3.5 px-2 safe-area-bottom">
        <a
          href="tel:3862264653"
          className="flex flex-col items-center gap-1.5 px-4 py-2 text-red-400 hover:text-red-300 active:scale-95 transition-all rounded-lg active:bg-red-500/10"
        >
          <Phone className="w-6 h-6" />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href="sms:3862264653"
          className="flex flex-col items-center gap-1.5 px-4 py-2 text-blue-400 hover:text-blue-300 active:scale-95 transition-all rounded-lg active:bg-blue-500/10"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[11px] font-medium">Text</span>
        </a>
        <Link
          href="/inventory"
          className="flex flex-col items-center gap-1.5 px-4 py-2 text-gray-400 hover:text-white active:scale-95 transition-all rounded-lg active:bg-white/5"
        >
          <MapPin className="w-6 h-6" />
          <span className="text-[11px] font-medium">Browse</span>
        </Link>
        <Link
          href="/ffl-transfer"
          className="flex flex-col items-center gap-1.5 px-4 py-2 text-emerald-400 hover:text-emerald-300 active:scale-95 transition-all rounded-lg active:bg-emerald-500/10"
        >
          <ArrowRight className="w-6 h-6" />
          <span className="text-[11px] font-medium">Transfer</span>
        </Link>
      </div>
    </div>
  );
}
