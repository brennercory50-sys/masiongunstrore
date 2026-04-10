'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, Menu, X, ChevronRight,
  Watch, Laptop, Wrench, Crosshair,
  Star, Shield, Clock, ArrowRight, Mail
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

export default function MobileHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <span className="text-white font-semibold text-sm block leading-none">MASON</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Pawn Shop</span>
            </div>
          </Link>
          <button onClick={() => setMenuOpen(true)} className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white">
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
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0a0a0a] border-l border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-white font-semibold">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <a href="tel:3862264653" className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-sm">
                  <Phone className="w-4 h-4" /> Call (386) 226-4653
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_50%)]" />
          {/* Decorative orbs */}
          <div className="absolute top-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-300 text-xs font-medium">Licensed FFL Dealer</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Daytona&apos;s #1<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">Pawn Shop</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-400 text-base mb-8 font-medium">Buy • Sell • Trade • Get Cash Today</p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:3862264653"
                className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a
                href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform"
              >
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-gray-500 text-xs">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Category Cards */}
      <section className="px-4 py-10">
        <div className="max-w-md mx-auto">
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
                  className={`block relative overflow-hidden rounded-2xl border ${cat.borderColor} bg-gradient-to-br ${cat.color} p-5 active:scale-[0.98] transition-transform`}
                >
                  <div className={`${cat.iconColor} mb-3`}>{cat.icon}</div>
                  <h3 className="text-white font-semibold text-base">{cat.label}</h3>
                  {cat.note && (
                    <p className="text-gray-500 text-xs mt-1">{cat.note}</p>
                  )}
                  <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white/60" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/sell" className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl group active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-red-400 text-lg">$</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/pawn" className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl group active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-amber-400 text-lg">💰</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/ffl-transfer" className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl group active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-blue-400 text-lg">📦</span>
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

      {/* Location Section */}
      <section className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Mini Map Placeholder */}
          <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            </div>
            <a
              href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-red-400" /> Open Map
            </a>
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

            <div className="flex gap-2">
              <a href="tel:3862264653" className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-sm">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a href="sms:3862264653" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold text-sm">
                <Mail className="w-4 h-4" /> Text
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-10" />

      {/* Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 z-50 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          <a
            href="tel:3862264653"
            className="flex flex-col items-center gap-1 flex-1 py-2 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Call</span>
          </a>

          <a
            href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 flex-1 py-2 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[10px] text-blue-400 font-medium">Directions</span>
          </a>

          <Link
            href="/inventory"
            className="flex flex-col items-center gap-1 flex-1 py-2 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📦</span>
            </div>
            <span className="text-[10px] text-white font-medium">Inventory</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}