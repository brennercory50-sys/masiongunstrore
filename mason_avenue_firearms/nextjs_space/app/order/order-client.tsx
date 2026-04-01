'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, CheckCircle, Phone, Loader2, AlertCircle,
  ArrowRight, Truck, Clock, Shield, Package
} from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const itemTypes = ['Handgun', 'Rifle', 'Shotgun', 'Revolver', 'Ammunition', 'Accessories', 'Other'];

export default function OrderClient() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', itemType: '', brand: '', model: '', budget: '', description: '',
  });
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
    if (!form?.name || !form?.phone || !form?.email || !form?.description) {
      setError('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/item-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res?.ok) {
        setSuccess(true);
      } else {
        setError('Something went wrong. Please try again or call us.');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      setError('Something went wrong. Please call us directly.');
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 pb-16 max-w-lg mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Request Submitted</h2>
            <p className="text-gray-400 text-sm mb-2">We&apos;ll start sourcing your firearm and contact you with availability and pricing.</p>
            <p className="text-gray-600 text-xs mb-8">Most requests are fulfilled within days.</p>
            <a href="tel:3862264653" className="inline-flex items-center gap-2 text-red-400 text-sm hover:text-red-300 transition-colors">
              <Phone className="w-4 h-4" /> Need it faster? Call (386) 226-4653
            </a>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: Info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                Order Any Firearm
                <span className="text-red-500"> — We&apos;ll Find It Fast</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">Can&apos;t find what you&apos;re looking for? We have access to thousands of firearms through our dealer network.</p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: <Search className="w-5 h-5" />, title: 'Nationwide dealer network', desc: 'Access to thousands of firearms you won\'t find in-store' },
                  { icon: <Truck className="w-5 h-5" />, title: 'Fast delivery', desc: 'Most orders fulfilled within days, not weeks' },
                  { icon: <Package className="w-5 h-5" />, title: 'Competitive pricing', desc: 'Fair dealer-direct pricing — no markup games' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="text-red-500 mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-white font-medium text-sm">{item.title}</p>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
                <p className="text-gray-500 text-sm">Tell us exactly what you want. We&apos;ll get you a price and timeline — fast.</p>
                <a href="tel:3862264653" className="text-red-400 text-sm mt-3 inline-flex items-center gap-1.5 hover:text-red-300 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Want to talk first? (386) 226-4653
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="(xxx) xxx-xxxx" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="your@email.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Firearm Type</label>
                  <select name="itemType" value={form.itemType} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white appearance-none">
                    <option value="">Select type</option>
                    {itemTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Budget</label>
                  <input name="budget" value={form.budget} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="$500 - $1,000" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Brand</label>
                  <input name="brand" value={form.brand} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="e.g., Glock, SIG" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Model</label>
                  <input name="model" value={form.model} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="e.g., G19 Gen 5" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">What are you looking for? *</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700 resize-none" placeholder="Describe exactly what you want — model, caliber, features, accessories..." />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><ArrowRight className="w-4 h-4" /> Submit Request</>}
              </button>

              <p className="text-gray-700 text-[10px] text-center">We respond to every request. Available for in-store pickup or FFL transfer only.</p>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
