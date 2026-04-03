'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Mason Avenue Firearms & Pawn logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="text-white font-bold text-sm tracking-wide">MASON AVENUE</span>
                <span className="block text-[9px] text-gray-600 tracking-[0.25em]">FIREARMS & PAWN</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Licensed FFL dealer in Daytona Beach — real store, real inventory, real service. When it&apos;s in stock, get it same-day. When it&apos;s not, we&apos;ll source it through our dealer network so you can pick it up locally. Serving customers across Florida and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-xs mb-5 uppercase tracking-[0.2em]">Navigate</h3>
            <div className="flex flex-col gap-3">
              <Link href="/inventory" className="text-gray-500 hover:text-white text-sm transition-colors">Inventory</Link>
              <Link href="/ffl-transfer" className="text-gray-500 hover:text-white text-sm transition-colors">FFL Transfers</Link>
              <Link href="/pawn" className="text-gray-500 hover:text-white text-sm transition-colors">Pawn Loans</Link>
              <Link href="/sell" className="text-gray-500 hover:text-white text-sm transition-colors">Sell to Us</Link>
              <Link href="/order" className="text-gray-500 hover:text-white text-sm transition-colors">Special Orders</Link>
              <Link href="/about" className="text-gray-500 hover:text-white text-sm transition-colors">About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-xs mb-5 uppercase tracking-[0.2em]">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:3862264653" className="flex items-center gap-2.5 text-gray-500 hover:text-red-400 text-sm transition-colors">
                <Phone className="w-4 h-4" /> (386) 226-4653
              </a>
              <a
                href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-500 hover:text-red-400 text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 flex-shrink-0" /> 347 Mason Ave, Daytona Beach, FL 32117
              </a>
              <div className="flex flex-col gap-1.5 text-gray-500 text-sm">
                <div className="flex items-center gap-2.5">Monday - Friday: 9 AM - 5 PM</div>
                <div className="flex items-center gap-2.5 pl-6">Saturday: 10 AM - 4 PM</div>
                <div className="flex items-center gap-2.5 pl-6">Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-gray-700 text-xs text-center">
            All firearm transactions are conducted in compliance with federal and state law. Available for in-store pickup or FFL transfer only.
          </p>
        </div>
      </div>
    </footer>
  );
}
