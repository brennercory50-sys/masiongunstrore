import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Truck, DollarSign, Banknote, ArrowRight, CheckCircle, MapPin, Clock, Shield, ChevronLeft, ChevronRight, Target, Package, Gem } from 'lucide-react';
import { departmentCards } from './home-data';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function HomeSection({ children, className = '', delay = 0 }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function DepartmentSection() {
  return (
    <HomeSection className="py-16 sm:py-24 bg-[#080808]" delay={0.1}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Shop by Department</h2>
          <p className="text-gray-500 text-sm mt-2">Everything under one roof — premium quality, unbeatable prices</p>
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
    </HomeSection>
  );
}

export function HowItWorksSection() {
  const cards = [
    { icon: <CheckCircle className="w-6 h-6" />, color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', title: 'In Stock Now', desc: 'Browse our local inventory and pick up the same day. No waiting, no shipping.', label: 'Ready Now' },
    { icon: <Zap className="w-6 h-6" />, color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', title: 'Available to Source', desc: 'We tap our dealer network for items not on our shelf. Competitive pricing, local pickup.', label: "We'll Find It" },
    { icon: <Truck className="w-6 h-6" />, color: 'text-red-400', border: 'border-red-500/20', bg: 'bg-red-500/5', title: "Can't Find It?", desc: "Tell us exactly what you need. We source hard-to-find items from across the country.", label: 'Special Order' },
  ];
  return (
    <HomeSection className="py-16 sm:py-24 border-t border-white/5" delay={0.2}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Three Ways to Get What You Want</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">From our shelf to our dealer network — we cover all the bases</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
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
    </HomeSection>
  );
}

interface AmmoAccessory {
  key: string; label: string; desc: string; icon: React.ReactNode; color: string; bg: string; border: string; href: string;
}

export function AmmoAccessoriesSection() {
  const categories: AmmoAccessory[] = [
    { key: 'ammo', label: 'Shop Ammo', desc: 'Handgun, rifle, rimfire & bulk', icon: <Target className="w-8 h-8" />, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', href: '/inventory?dept=ammo' },
    { key: 'accessories', label: 'Shop Accessories', desc: 'Optics, mags, holsters & more', icon: <Package className="w-8 h-8" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', href: '/inventory?dept=accessories' },
    { key: 'optics', label: 'Optics', desc: 'Scopes, red dots & sights', icon: <Zap className="w-8 h-8" />, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', href: '/inventory?dept=accessories&category=optics' },
    { key: 'magazines', label: 'Magazines', desc: 'Extended & standard capacity', icon: <Package className="w-8 h-8" />, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', href: '/inventory?dept=accessories&category=magazines' },
  ];
  return (
    <HomeSection className="py-16 sm:py-24" delay={0.3}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ammo & Accessories</h2>
          <p className="text-gray-400 text-sm mt-2">Everything you need after the purchase — ammo, mags, optics, cases, and more.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={cat.href}
                className={`block ${cat.bg} border ${cat.border} rounded-2xl p-6 sm:p-8 text-center hover:scale-[1.02] transition-transform h-full`}
              >
                <div className={`${cat.color} mb-4 flex justify-center`}>{cat.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{cat.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">Available for pickup in-store • Ask us to set items aside</p>
        </div>
      </div>
    </HomeSection>
  );
}

export function SellPawnCTASection() {
  return (
    <HomeSection className="py-16 sm:py-24" delay={0.4}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-red-950/30 via-[#0a0a0a] to-[#0a0a0a]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,38,0.08),transparent_60%)]" />
            <div className="relative p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">Sell Your Items<span className="text-red-500"> — Fast & Fair</span></h2>
              <p className="text-gray-400 text-sm mb-2">Firearms, jewelry, electronics, tools — we buy it all.</p>
              <p className="text-gray-400 text-xs mb-6">Most offers within 24 hours. No pressure. No obligation.</p>
              <Link href="/sell" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20">
                Get Your Offer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-amber-950/20 via-[#0a0a0a] to-[#0a0a0a]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.06),transparent_60%)]" />
            <div className="relative p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">Need Cash Now?<span className="text-amber-400"> — Pawn Loans</span></h2>
              <p className="text-gray-400 text-sm mb-2">Get a loan on your valuables and get them back when you&apos;re ready.</p>
              <p className="text-gray-400 text-xs mb-6">Quick approval. Fair rates. Keep your items safe with us.</p>
              <Link href="/pawn" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-600/20">
                Apply for a Loan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

export function LocalTrustSection() {
  return (
    <HomeSection className="py-16 sm:py-24 border-t border-white/5" delay={0.5}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-4 py-1.5 rounded-full mb-4 tracking-[0.15em] uppercase">
            <Shield className="w-4 h-4" />Licensed Federal Firearms Dealer
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">Visit Our Daytona Beach Location</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Real shop. Real people. Real inventory. Not just another online listing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a href="https://maps.google.com/?q=347+Mason+Ave+Daytona+Beach+FL+32117" target="_blank" rel="noopener noreferrer" className="group bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 hover:border-white/15 transition-all text-center">
            <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors">
              <MapPin className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">347 Mason Ave</h3>
            <p className="text-gray-500 text-sm">Daytona Beach, FL 32117</p>
            <p className="text-red-400 text-xs mt-2 font-semibold">Get Directions →</p>
          </a>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 bg-emerald-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-emerald-500" />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">Store Hours</h3>
            <div className="text-gray-400 text-sm space-y-1">
              <p className="flex justify-between"><span>Monday - Friday</span><span className="text-white">9 AM - 5 PM</span></p>
              <p className="flex justify-between"><span>Saturday</span><span className="text-white">10 AM - 4 PM</span></p>
              <p className="flex justify-between"><span>Sunday</span><span className="text-white">Closed</span></p>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">(386) 226-4653</h3>
            <p className="text-gray-500 text-sm mb-4">Call or text anytime</p>
            <div className="flex gap-3 justify-center">
              <a href="tel:3862264653" className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">Call Now</a>
              <a href="sms:3862264653" className="bg-white/10 hover:bg-white/15 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">Text</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Shield className="w-5 h-5" />, title: 'Licensed FFL Dealer', desc: 'All transfers done legally' },
            { icon: <Zap className="w-5 h-5" />, title: 'Local Reviews', desc: 'Trusted by Daytona customers' },
            { icon: <Truck className="w-5 h-5" />, title: 'Dealer Network', desc: 'Access beyond our shelf' },
            { icon: <CheckCircle className="w-5 h-5" />, title: 'Local Pickup', desc: 'All orders picked up in-store' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
              <div className="text-red-500 flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-0.5">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}

export { ChevronLeft, ChevronRight, ArrowRight };