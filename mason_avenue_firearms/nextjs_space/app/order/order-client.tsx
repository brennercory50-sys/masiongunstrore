'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Phone, Loader2, AlertCircle, FileCheck, MapPin, Shield, Store } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';
import { itemTypes, popularBrands, requestCategories, processSteps, localAdvantages, nextSteps } from './order-data';

export default function OrderClient() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', itemType: '', brand: '', model: '', budget: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {};
    setForm((prev: any) => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setError('');
    if (!form?.name || !form?.phone || !form?.email || !form?.description) { setError('Please fill in all required fields'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/item-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res?.ok) setSuccess(true); else setError('Something went wrong. Please try again or call us.');
    } catch { setError('Something went wrong. Please call us directly.'); }
    setSubmitting(false);
  };

  if (success) return <SuccessView />;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <HeroSection />
        <HowItWorksSection />
        <RequestCategoriesSection />
        <LocalAdvantageSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <OrderForm form={form} error={error} submitting={submitting} onChange={handleChange} onSubmit={handleSubmit} />
          <SidebarSection />
        </div>
      </div>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

function SuccessView() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 pb-16 max-w-lg mx-auto px-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Request Received</h2>
          <p className="text-gray-400 text-sm mb-2">We&apos;ll search our dealer network and contact you with availability and pricing.</p>
          <p className="text-gray-600 text-xs mb-8">We respond to every request.</p>
          <a href="tel:3862264653" className="inline-flex items-center gap-2 text-red-400 text-sm hover:text-red-300"><Phone className="w-4 h-4" /> Need faster help? Call (386) 226-4653</a>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="text-center mb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">Can&apos;t Find It?<span className="text-red-500"> We&apos;ll Source It</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">We have access to distributor networks most shooters can&apos;t touch. Tell us what you want — we&apos;ll find it.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {[{ icon: <Search className="w-4 h-4" />, label: 'Dealer network access' }, { icon: <MapPin className="w-4 h-4" />, label: 'Local pickup' }, { icon: <Shield className="w-4 h-4" />, label: 'FFL compliant' }, { icon: <Store className="w-4 h-4" />, label: 'Local shop' }].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-red-500">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
      <h2 className="text-2xl font-bold text-white text-center mb-10">How Special Orders Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {processSteps.map((step, i) => (
          <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm mx-auto mb-4">{step.num}</div>
            <h3 className="text-white font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-500 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RequestCategoriesSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8">What Can You Request?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {requestCategories.map((cat, i) => (
          <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl p-4 text-center hover:border-red-500/20 transition-colors">
            <div className="text-2xl mb-2">{cat.icon}</div>
            <h3 className="text-white font-medium text-sm mb-1">{cat.title}</h3>
            <p className="text-gray-600 text-[10px]">{cat.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
        <p className="text-white font-medium text-sm mb-3">Popular brands we frequently source:</p>
        <div className="flex flex-wrap gap-2">
          {popularBrands.map((brand, i) => <span key={i} className="text-gray-400 text-xs bg-black border border-white/[0.06] px-3 py-1.5 rounded-lg">{brand}</span>)}
        </div>
        <p className="text-gray-500 text-xs mt-3">Don&apos;t see your brand? Just describe what you want in the form below.</p>
      </div>
    </motion.div>
  );
}

function LocalAdvantageSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-16">
      <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Why Use a Local FFL Dealer?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localAdvantages.map((item, i) => (
            <div key={i}>
              <div className="text-red-500 mb-2">{item.icon}</div>
              <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function OrderForm({ form, error, submitting, onChange, onSubmit }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
      <form onSubmit={onSubmit} className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="mb-4">
          <h2 className="text-white font-bold text-xl mb-2">Request a Firearm</h2>
          <p className="text-gray-500 text-sm">Tell us what you&apos;re looking for and we&apos;ll search our network.</p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Your Name *</label><input name="name" value={form.name} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white" placeholder="Full name" /></div>
          <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Phone Number *</label><input name="phone" type="tel" value={form.phone} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white" placeholder="(386) 555-0123" /></div>
        </div>
        <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Email Address *</label><input name="email" type="email" value={form.email} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white" placeholder="you@example.com" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Firearm Type</label><select name="itemType" value={form.itemType} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white appearance-none"><option value="">What type?</option>{itemTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Budget Range</label><input name="budget" value={form.budget} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white" placeholder="$500 - $1,500" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Brand (if known)</label><input name="brand" value={form.brand} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white" placeholder="e.g., Glock, SIG" /></div>
          <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Model (if known)</label><input name="model" value={form.model} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white" placeholder="e.g., G19 Gen 5" /></div>
        </div>
        <div><label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">What are you looking for? *</label><textarea name="description" value={form.description} onChange={onChange} rows={3} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white resize-none" placeholder="Brand, model, caliber, finish, features..." /></div>
        <button type="submit" disabled={submitting} className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2">
          {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Searching...</> : <><Search className="w-4 h-4" /> Find My Firearm</>}
        </button>
        <div className="flex items-center justify-center gap-2 text-gray-600 text-xs"><CheckCircle className="w-3 h-3" />We respond to every request. Local pickup only.</div>
      </form>
    </motion.div>
  );
}

function SidebarSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lg:sticky lg:top-28 lg:self-start space-y-6">
      <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-3">What happens after I submit?</h3>
        <ul className="space-y-3">
          {nextSteps.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-3">Need help finding something?</h3>
        <p className="text-gray-500 text-sm mb-4">We&apos;re experts at tracking down hard-to-find firearms.</p>
        <a href="tel:3862264653" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-medium"><Phone className="w-4 h-4" />(386) 226-4653</a>
      </div>
      <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-white text-sm font-medium">FFL Transfer Info</p>
            <p className="text-gray-500 text-xs mt-1">All firearms transferred through our licensed FFL. Valid ID required.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}