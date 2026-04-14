'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, Menu, X, ChevronRight,
  Watch, Laptop, Wrench, Crosshair,
  Star, Shield, Clock, Mail, Package, ArrowRight
} from 'lucide-react';

const categories = [
  { icon: <Watch className="w-7 h-7" />, label: 'Jewelry', href: '/inventory?dept=jewelry', color: 'from-amber-500/20 to-amber-600/10', borderColor: 'border-amber-500/30', iconColor: 'text-amber-400' },
  { icon: <Laptop className="w-7 h-7" />, label: 'Electronics', href: '/inventory?dept=electronics', color: 'from-blue-500/20 to-blue-600/10', borderColor: 'border-blue-500/30', iconColor: 'text-blue-400' },
  { icon: <Wrench className="w-7 h-7" />, label: 'Tools', href: '/inventory?dept=tools', color: 'from-emerald-500/20 to-emerald-600/10', borderColor: 'border-emerald-500/30', iconColor: 'text-emerald-400' },
  { icon: <Crosshair className="w-7 h-7" />, label: 'Firearms', href: '/inventory?dept=firearms', note: 'In-Store Only', color: 'from-red-500/20 to-red-600/10', borderColor: 'border-red-500/30', iconColor: 'text-red-400' },
];

const trustItems = [
  { icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" />, text: '4.8 Rating' },
  { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: 'Licensed FFL' },
  { icon: <Clock className="w-4 h-4 text-blue-400" />, text: 'Since 1995' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Sell', href: '/sell' },
  { label: 'Pawn', href: '/pawn' },
  { label: 'FFL Transfer', href: '/ffl-transfer' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function HomeClient() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 relative rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Mason Avenue Firearms & Pawn"
                fill
                className="object-cover"
                sizes="36px"
                priority
              />
            </div>
            <div>
              <span className="text-white font-bold text-sm block leading-none tracking-tight">MASON</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Pawn Shop</span>
            </div>
          </Link>
          <button onClick={() => setMenuOpen(true)} className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-[#0d0d0d] border-l border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="text-white font-semibold text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0d0d0d]">
                <a href="tel:3862264653" className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-red-500/20 active:scale-[0.98] transition-transform">
                  <Phone className="w-4 h-4" /> Call (386) 226-4653
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.12),transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          {/* Decorative orbs */}
          <div className="absolute top-32 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-32 -right-32 w-80 h-80 bg-blue-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
                <Image
                  src="/logo.png"
                  alt="Mason Avenue Firearms & Pawn"
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              </div>
            </motion.div>

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-300 text-xs font-medium">Licensed FFL Dealer</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-4 tracking-tight">
              Daytona&apos;s #1<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-400">Pawn Shop</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-400 text-base font-medium mb-10 tracking-wide">Buy • Sell • Trade • Get Cash Today</p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <motion.a
                href="tel:3862264653"
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-base shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-shadow"
              >
                <Phone className="w-5 h-5" /> Call Now
              </motion.a>
              <motion.a
                href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
              >
                <MapPin className="w-5 h-5" /> Get Directions
              </motion.a>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-center gap-5 mt-10"
            >
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-gray-500 text-xs">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Category Cards - 2x2 Grid */}
      <section className="px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl font-bold text-white mb-5"
        >
          Browse Categories
        </motion.h2>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={cat.href}
                className={`block relative overflow-hidden rounded-2xl border ${cat.borderColor} bg-gradient-to-br ${cat.color} p-5 active:scale-[0.98] transition-all`}
              >
                <div className={`${cat.iconColor} mb-3`}>{cat.icon}</div>
                <h3 className="text-white font-semibold text-base">{cat.label}</h3>
                {cat.note && (
                  <p className="text-gray-500 text-xs mt-1">{cat.note}</p>
                )}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <ArrowRight className="w-4 h-4 text-white/60" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section - Premium Card */}
      <section className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl"
        >
          <div className="text-center mb-4">
            <h3 className="text-white font-bold text-lg">Trusted Since 1995</h3>
          </div>
          <div className="flex items-center justify-center gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span className="text-gray-400 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/sell" className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-2xl group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-red-400 text-xl">$</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Sell Your Items</h4>
                  <p className="text-gray-500 text-xs">Get a fair offer fast</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/pawn" className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-amber-400 text-xl">💰</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Get a Loan</h4>
                  <p className="text-gray-500 text-xs">Cash today on your items</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/ffl-transfer" className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">FFL Transfers</h4>
                  <p className="text-gray-500 text-xs">Ship to us, pickup locally</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Location Section - Premium Card */}
      <section className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Map Placeholder */}
          <div className="h-36 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
                <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-pulse" />
              </div>
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
            <motion.a
              href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-white text-sm font-medium border border-white/20 transition-colors"
            >
              <MapPin className="w-4 h-4 text-red-400" /> Open Map
            </motion.a>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Visit Us</h3>
              <p className="text-gray-400 text-sm">347 Mason Ave, Daytona Beach, FL 32117</p>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Open Today: 9 AM - 5 PM</span>
            </div>

            <div className="flex gap-2 pt-1">
              <motion.a
                href="tel:3862264653"
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-red-500/20"
              >
                <Phone className="w-4 h-4" /> Call
              </motion.a>
              <motion.a
                href="sms:3862264653"
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold text-sm border border-white/10"
              >
                <Mail className="w-4 h-4" /> Text
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-8" />

      {/* Sticky Bottom Navigation Bar - Always Visible */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/98 backdrop-blur-2xl border-t border-white/10 z-50 safe-area-pb">
        <div className="flex items-center justify-around px-1 py-1.5">
          <motion.a
            href="tel:3862264653"
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1.5 flex-1 py-2.5 active:scale-90 transition-transform"
          >
            <div className="w-11 h-11 bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Call</span>
          </motion.a>

          <motion.a
            href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1.5 flex-1 py-2.5 active:scale-90 transition-transform"
          >
            <div className="w-11 h-11 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[11px] text-blue-400 font-semibold">Directions</span>
          </motion.a>

          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              href="/inventory"
              className="flex flex-col items-center gap-1.5 flex-1 py-2.5 active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] text-white font-semibold">Inventory</span>
            </Link>
          </motion.div>
        </div>
      </nav>
    </div>
  );
}