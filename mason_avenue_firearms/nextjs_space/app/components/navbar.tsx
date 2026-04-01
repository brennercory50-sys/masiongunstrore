'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Phone, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession() || {};
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = (session?.user as any)?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/inventory', label: 'Inventory' },
    { href: '/inventory?dept=firearms', label: 'Firearms' },
    { href: '/inventory?dept=jewelry', label: 'Jewelry' },
    { href: '/inventory?dept=electronics', label: 'Electronics' },
    { href: '/inventory?dept=tools', label: 'Tools' },
    { href: '/pawn', label: 'Pawn Loans' },
    { href: '/sell', label: 'Sell' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mason Avenue Firearms & Pawn"
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">MASON AVENUE</span>
            <span className="block text-[9px] sm:text-[10px] text-gray-500 tracking-[0.25em] uppercase">Firearms & Pawn</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks?.map((link: any) => (
            <Link
              key={link?.href}
              href={link?.href}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link?.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:3862264653"
            className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20"
          >
            <Phone className="w-4 h-4" />
            (386) 226-4653
          </a>
          <a
            href="tel:3862264653"
            className="sm:hidden flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-black/98 border-b border-white/5 overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks?.map((link: any) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-base"
                >
                  {link?.label}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  Admin Panel
                </Link>
              )}
              {session ? (
                <button onClick={() => signOut?.({ callbackUrl: '/' })} className="px-4 py-3 text-left text-gray-400 hover:text-white">
                  Logout
                </button>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-500 hover:text-white">
                  Admin Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
