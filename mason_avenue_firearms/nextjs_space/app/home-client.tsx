'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Phone, MapPin, Shield, Clock, Award, BadgeCheck,
  Star, ArrowRight, DollarSign, ChevronLeft, ChevronRight, Crosshair,
  CheckCircle, Truck, Search, Gem, Smartphone, Wrench, 
  Banknote, MessageSquare, Zap
} from 'lucide-react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ProductCard from './components/product-card';
import StickyMobileCTA from './components/sticky-mobile-cta';

interface Props {
  featuredItems: any[];
  recentItems: any[];
  soldItems: any[];
}

const departmentCards = [
  { key: 'firearms', label: 'Firearms', desc: 'Handguns, rifles, shotguns & more', icon: <Crosshair className="w-6 h-6" />, color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20', href: '/inventory?dept=firearms' },
  { key: 'jewelry', label: 'Jewelry', desc: 'Watches, chains, rings & earrings', icon: <Gem className="w-6 h-6" />, color: 'text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/20', href: '/inventory?dept=jewelry' },
  { key: 'electronics', label: 'Electronics', desc: 'Laptops, phones, gaming & audio', icon: <Smartphone className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20', href: '/inventory?dept=electronics' },
  { key: 'tools', label: 'Tools', desc: 'Power tools, hand tools & equipment', icon: <Wrench className="w-6 h-6" />, color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', href: '/inventory?dept=tools' },
];

const reviews = [
  { name: 'Mike R.', rating: 5, text: 'Best firearms dealer in Daytona. Fair prices, great selection, and the staff knows their stuff. Bought 3 guns here already.', timeAgo: '2 weeks ago' },
  { name: 'Sarah T.', rating: 5, text: 'Sold my late father\'s collection here. They gave me a very fair offer and handled everything professionally. Highly recommend.', timeAgo: '1 month ago' },
  { name: 'James L.', rating: 5, text: 'They found me a specific Sig I was looking for in less than a week. Amazing service and competitive pricing.', timeAgo: '3 weeks ago' },
  { name: 'David K.', rating: 4, text: 'Great inventory and knowledgeable staff. Clean shop, well-organized. Will definitely be back for my next purchase.', timeAgo: '1 month ago' },
];

function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function HomeClient({ featuredItems, recentItems, soldItems }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (dir: 'left' | 'right') => {
    if (scrollRef?.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.abacus.ai/images/be53c44c-ec8b-4048-926a-b51650f01fb6.png"
            alt="Premium dark background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* FFL Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-[11px] font-bold px-5 py-2 rounded-full mb-6 tracking-[0.15em] uppercase">
              <BadgeCheck className="w-4 h-4" />
              Licensed FFL Dealer — Daytona Beach
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Built for Serious Buyers.
              <br />
              <span className="text-red-500">Trusted by Serious Sellers.</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto mb-3 leading-relaxed">
              Top Dollar Paid &bull; Best Deals in Daytona
            </p>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
              Firearms &bull; Jewelry &bull; Electronics &bull; Tools &bull; Pawn Loans
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href="tel:3862264653"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 226-4653
              </a>
              <Link
                href="/inventory"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                View Inventory
              </Link>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
              >
                <DollarSign className="w-4 h-4" />
                Sell / Trade
              </Link>
              <Link
                href="/pawn"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
              >
                <Banknote className="w-4 h-4" />
                Pawn Loans
              </Link>
              <a
                href="sms:3862264653"
                className="inline-flex items-center gap-2 border border-blue-500/30 text-blue-400 hover:text-blue-300 hover:border-blue-400/50 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Text Us
              </a>
            </div>

            {/* Location & Hours Quick */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-500 text-sm">
              <a href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-red-500" />
                347 Mason Ave, Daytona Beach, FL
              </a>
              <span className="hidden sm:block text-gray-700">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Open Daily 9 AM
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===================== DEPARTMENTS ===================== */}
      <Section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Shop by Department</h2>
            <p className="text-gray-600 text-sm mt-2">Everything under one roof — premium quality, unbeatable prices</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {departmentCards.map((dept, i) => (
              <motion.div
                key={dept.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={dept.href}
                  className={`block ${dept.bg} border ${dept.border} rounded-2xl p-6 sm:p-8 text-center hover:scale-[1.02] transition-transform`}
                >
                  <div className={`${dept.color} mb-4 flex justify-center`}>{dept.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{dept.label}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{dept.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================== JUST IN STRIP ===================== */}
      {(recentItems?.length ?? 0) > 0 && (
        <Section className="py-16 sm:py-24 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Just In</h2>
                <p className="text-gray-600 text-sm mt-1">Fresh inventory — moves fast</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollStrip('left')}
                  className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollStrip('right')}
                  className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4"
            >
              {recentItems.map((item: any, i: number) => (
                <div key={item?.id ?? i} className="min-w-[260px] sm:min-w-[280px] flex-shrink-0">
                  <ProductCard item={item} index={i} />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ===================== FEATURED INVENTORY ===================== */}
      {(featuredItems?.length ?? 0) > 0 && (
        <Section className="py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Inventory</h2>
                <p className="text-gray-600 text-sm mt-1">Hand-picked selections from our current stock</p>
              </div>
              <Link
                href="/inventory"
                className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {featuredItems.map((item: any, i: number) => (
                <ProductCard key={item?.id ?? i} item={item} index={i} />
              ))}
            </div>
            <div className="sm:hidden mt-8 text-center">
              <Link href="/inventory" className="text-sm text-gray-500 hover:text-white transition-colors">
                View All Inventory →
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* ===================== HOW IT WORKS ===================== */}
      <Section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">How It Works</h2>
            <p className="text-gray-600 text-sm mt-2 max-w-lg mx-auto">Three ways to get what you want</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <CheckCircle className="w-6 h-6" />,
                color: 'text-emerald-400',
                border: 'border-emerald-500/20',
                bg: 'bg-emerald-500/5',
                title: 'In Stock',
                desc: 'Browse our inventory and pick up in-store today.',
                label: 'Ready Now',
              },
              {
                icon: <Truck className="w-6 h-6" />,
                color: 'text-amber-400',
                border: 'border-amber-500/20',
                bg: 'bg-amber-500/5',
                title: 'Available to Order',
                desc: 'Access our dealer network. Delivered fast at competitive prices.',
                label: 'Ships Quick',
              },
              {
                icon: <Search className="w-6 h-6" />,
                color: 'text-red-400',
                border: 'border-red-500/20',
                bg: 'bg-red-500/5',
                title: 'Can\'t Find It?',
                desc: 'Tell us what you need. We\'ll source it from our nationwide network.',
                label: 'We\'ll Find It',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`${card.bg} border ${card.border} rounded-2xl p-8 text-center`}
              >
                <div className={`${card.color} mb-5 flex justify-center`}>{card.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className={`${card.color} text-xs font-semibold uppercase tracking-[0.15em]`}>{card.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================== SELL / PAWN CTA ===================== */}
      <Section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sell CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-red-950/30 via-[#0a0a0a] to-[#0a0a0a]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,38,0.08),transparent_60%)]" />
              <div className="relative p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                  Sell Your Items
                  <span className="text-red-500"> — Fast & Fair</span>
                </h2>
                <p className="text-gray-400 text-sm mb-2">Firearms, jewelry, electronics, tools — we buy it all.</p>
                <p className="text-gray-600 text-xs mb-6">Most offers within 24 hours. No pressure. No obligation.</p>
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20"
                >
                  Get Your Offer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Pawn CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-amber-950/20 via-[#0a0a0a] to-[#0a0a0a]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.06),transparent_60%)]" />
              <div className="relative p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                  Need Cash Now?
                  <span className="text-amber-400"> — Pawn Loans</span>
                </h2>
                <p className="text-gray-400 text-sm mb-2">Get a loan on your valuables and get them back when you&apos;re ready.</p>
                <p className="text-gray-600 text-xs mb-6">Quick approval. Fair rates. Keep your items safe with us.</p>
                <Link
                  href="/pawn"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-600/20"
                >
                  Apply for a Loan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== LOCAL TRUST ===================== */}
      <Section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-4 py-1.5 rounded-full mb-4 tracking-[0.15em] uppercase">
              <BadgeCheck className="w-4 h-4" />
              Licensed Federal Firearms Dealer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">Visit Our Daytona Beach Location</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Real shop. Real people. Real inventory. Not just another online listing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Location */}
            <a href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117" target="_blank" rel="noopener noreferrer" className="group bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 hover:border-white/15 transition-all text-center">
              <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors">
                <MapPin className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">347 Mason Ave</h3>
              <p className="text-gray-500 text-sm">Daytona Beach, FL 32117</p>
              <p className="text-red-400 text-xs mt-2 font-semibold">Get Directions →</p>
            </a>
            
            {/* Hours */}
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Store Hours</h3>
              <div className="text-gray-400 text-sm space-y-1">
                <p className="flex justify-between"><span>Mon - Fri</span><span className="text-white">9 AM - 7 PM</span></p>
                <p className="flex justify-between"><span>Saturday</span><span className="text-white">9 AM - 6 PM</span></p>
                <p className="flex justify-between"><span>Sunday</span><span className="text-white">10 AM - 5 PM</span></p>
              </div>
            </div>
            
            {/* Quick Contact */}
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">(386) 226-4653</h3>
              <p className="text-gray-500 text-sm mb-4">Call or text anytime</p>
              <div className="flex gap-3 justify-center">
                <a href="tel:3862264653" className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Call Now
                </a>
                <a href="sms:3862264653" className="bg-white/10 hover:bg-white/15 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Text
                </a>
              </div>
            </div>
          </div>

          {/* Trust badges row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-5 h-5" />, title: 'Licensed & Compliant', desc: 'FFL Dealer — All transfers done legally' },
              { icon: <Award className="w-5 h-5" />, title: 'Local Reviews', desc: 'Trusted by Daytona customers' },
              { icon: <DollarSign className="w-5 h-5" />, title: 'Fair Pricing', desc: 'Transparent — no hidden fees' },
              { icon: <CheckCircle className="w-5 h-5" />, title: 'Quick Process', desc: 'Fast buys, sells & transfers' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]"
              >
                <div className="text-red-500 flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">{item.title}</h3>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================== RECENTLY SOLD ===================== */}
      {(soldItems?.length ?? 0) > 0 && (
        <Section className="py-16 sm:py-24 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Recently Sold</h2>
              <p className="text-gray-600 text-sm mt-2">Inventory moves — don&apos;t wait too long</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {soldItems.slice(0, 4).map((item: any, i: number) => (
                <ProductCard key={item?.id ?? i} item={item} index={i} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ===================== REVIEWS ===================== */}
      <Section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">What Our Customers Say</h2>
            <p className="text-gray-600 text-sm mt-2">4.4 stars across 200+ reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-white/[0.06] rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{review.name}</span>
                  <span className="text-gray-700 text-xs">{review.timeAgo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================== FINAL CTA ===================== */}
      <Section className="py-20 sm:py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Visit Us or Start Online Today
          </h2>
          <p className="text-gray-500 text-lg mb-4">347 Mason Ave, Daytona Beach, FL 32117</p>
          <p className="text-gray-600 text-sm mb-10">Open Daily at 9 AM</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:3862264653"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now — (386) 226-4653
            </a>
            <a
              href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.03] flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>
      </Section>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
