'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Phone, MapPin, Clock, CheckCircle, Package,
  ArrowRight, Loader2, AlertCircle, FileText, User, Mail,
  MessageSquare, Truck, BadgeCheck, Globe
} from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';

const processSteps = [
  { num: '1', title: 'Buy Online', desc: 'Purchase from any online retailer like Brownells, Primary Arms, or GunBroker.' },
  { num: '2', title: 'Ship to Us', desc: 'At checkout, enter our FFL info: Mason Avenue Firearms, 347 Mason Ave, Daytona Beach, FL.' },
  { num: '3', title: 'We Receive It', desc: 'We\'ll notify you when your firearm arrives. We inspect and verify everything.' },
  { num: '4', title: 'Complete Transfer', desc: 'Come in with valid ID, complete the background check, and take your firearm home.' },
];

const whyItems = [
  { icon: <Shield className="w-5 h-5" />, title: 'Licensed FFL Dealer', desc: 'All transfers done properly — fully compliant with federal and state law.' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Smooth Process', desc: 'We handle the paperwork so you don\'t have to worry.' },
  { icon: <User className="w-5 h-5" />, title: 'Local Support', desc: 'Real people, real help. Call or visit us with questions.' },
  { icon: <Clock className="w-5 h-5" />, title: 'Fast Updates', desc: 'We\'ll call or text as soon as your firearm arrives.' },
];

const requirements = [
  { icon: <User className="w-4 h-4" />, text: 'Valid government-issued photo ID' },
  { icon: <FileText className="w-4 h-4" />, text: 'Pass background check (NICS)' },
  { icon: <Shield className="w-4 h-4" />, text: 'Be 21+ for handguns, 18+ for long guns' },
  { icon: <MapPin className="w-4 h-4" />, text: 'Florida residency or valid FL concealed carry' },
];

export default function FFLTransferPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', firearm: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {};
    setForm((prev: any) => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setError('');
    if (!form?.name || !form?.phone) {
      setError('Please fill in your name and phone number');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/item-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          itemType: 'FFL Transfer Notification',
          description: `Incoming transfer. Firearm: ${form.firearm || 'Not specified'}. Notes: ${form.notes || 'None'}`,
        }),
      });
      if (res?.ok) {
        setSuccess(true);
      } else {
        setError('Something went wrong. Please try again or call us.');
      }
    } catch (err: any) {
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
            <h2 className="text-2xl font-bold text-white mb-3">We&apos;ll Watch for It</h2>
            <p className="text-gray-400 text-sm mb-2">We&apos;ll keep an eye out for your shipment. We&apos;ll call you when it arrives.</p>
            <p className="text-gray-600 text-xs mb-8">In the meantime, feel free to call us with any questions.</p>
            <a href="tel:3862264653" className="inline-flex items-center gap-2 text-red-400 text-sm hover:text-red-300 transition-colors">
              <Phone className="w-4 h-4" /> Questions? Call (386) 226-4653
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
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-[11px] font-bold px-5 py-2 rounded-full mb-6 tracking-[0.15em] uppercase">
              <BadgeCheck className="w-4 h-4" />
              FFL Transfer Services
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Buy Online.
              <br />
              <span className="text-red-500">Ship to Us. Pick Up Locally.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Bought a firearm online? Ship it to our licensed FFL dealer. We&apos;ll handle the transfer and you&apos;ll pick it up in person — simple, legal, local.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { icon: <Shield className="w-4 h-4" />, label: 'Licensed FFL Dealer' },
                { icon: <CheckCircle className="w-4 h-4" />, label: 'Legal & Compliant' },
                { icon: <MapPin className="w-4 h-4" />, label: 'Local Pickup' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-red-500">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Our FFL Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Our FFL Information</h2>
            <p className="text-gray-400 text-sm mb-4">Use this at checkout when ordering from online retailers:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-black border border-white/[0.08] rounded-lg p-4">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-1">Business Name</p>
                <p className="text-white font-medium">Mason Avenue Firearms</p>
              </div>
              <div className="bg-black border border-white/[0.08] rounded-lg p-4">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-1">Address</p>
                <p className="text-white font-medium">347 Mason Ave, Daytona Beach, FL 32117</p>
              </div>
              <div className="bg-black border border-white/[0.08] rounded-lg p-4">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-1">Phone</p>
                <p className="text-white font-medium">(386) 226-4653</p>
              </div>
              <div className="bg-black border border-white/[0.08] rounded-lg p-4">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-1">Email</p>
                <p className="text-white font-medium">ffl@masonavenue.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6">
                <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm mb-4">
                  {step.num}
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transfer Fees */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2">Transfer Fees</h2>
            <p className="text-gray-500 text-sm mb-6">Competitive rates for FFL transfers. Call us for current pricing.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="bg-black border border-white/[0.08] rounded-lg px-5 py-3">
                <p className="text-gray-400 text-xs uppercase tracking-[0.15em] mb-1">Phone</p>
                <p className="text-white font-medium">(386) 226-4653</p>
              </div>
              <a href="tel:3862264653" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                Call for current rates →
              </a>
            </div>
          </div>
        </motion.div>

        {/* What You Need */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">What You&apos;ll Need</h2>
              <div className="space-y-4">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="text-emerald-500 mt-0.5">{req.icon}</div>
                    <p className="text-gray-400 text-sm">{req.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Let Us Know Something is Coming</h2>
              <p className="text-gray-500 text-sm mb-6">Already ordered? Tell us so we can watch for your shipment.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Phone *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="(386) 555-0123" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Email (optional)</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="you@example.com" />
                </div>

                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">What did you order? (optional)</label>
                  <input name="firearm" value={form.firearm} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="Brand, model, caliber..." />
                </div>

                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Notes (optional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700 resize-none" placeholder="Retailer, expected delivery, any questions..." />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Package className="w-4 h-4" /> Notify Us of Incoming Transfer</>}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-3">Have Questions?</h2>
            <p className="text-gray-500 text-sm mb-6">Call us before you order. We can help make sure the process goes smoothly.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:3862264653" className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call (386) 226-4653
              </a>
              <a href="sms:3862264653" className="w-full sm:w-auto border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.03] flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Text Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}