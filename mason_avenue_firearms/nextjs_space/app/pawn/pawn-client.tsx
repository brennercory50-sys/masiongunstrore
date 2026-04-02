'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Banknote, CheckCircle, Clock, Shield, Phone,
  Camera, X, Loader2, AlertCircle, ArrowRight, Lock,
  Store, Scale, Eye, FileText, Calendar, Check
} from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';

const itemTypes = ['Firearm', 'Jewelry / Watch', 'Electronics', 'Tools / Equipment', 'Musical Instrument', 'Other'];

const acceptedItems = [
  { icon: '🔫', title: 'Firearms', desc: 'Handguns, rifles, shotguns' },
  { icon: '💎', title: 'Jewelry & Watches', desc: 'Gold, silver, diamonds, luxury watches' },
  { icon: '📱', title: 'Electronics', desc: 'Phones, laptops, gaming consoles' },
  { icon: '🔧', title: 'Tools & Equipment', desc: 'Power tools, diagnostic equipment' },
  { icon: '🎸', title: 'Musical Instruments', desc: 'Guitars, amps, keyboards, drums' },
  { icon: '📦', title: 'Other Valuables', desc: 'Collectibles, sports equipment, more' },
];

const processSteps = [
  { num: '1', title: 'Submit Your Item', desc: 'Fill out the form below with details and photos of your item.' },
  { num: '2', title: 'We Make an Offer', desc: 'We review your submission and make a competitive loan offer within 24 hours.' },
  { num: '3', title: 'Get Your Cash', desc: 'Bring your item in, accept the offer, and walk out with cash the same day.' },
];

export default function PawnClient() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', itemType: '', description: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {};
    setForm((prev: any) => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }));
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target?.files ?? []);
    if ((photos?.length ?? 0) + files.length > 5) {
      setError('Maximum 5 photos allowed');
      return;
    }
    setPhotos((prev: any) => [...(prev ?? []), ...files]);
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev: any) => [...(prev ?? []), reader?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev: any) => (prev ?? []).filter((_: any, i: number) => i !== index));
    setPhotoPreviews((prev: any) => (prev ?? []).filter((_: any, i: number) => i !== index));
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    const res = await fetch('/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, contentType: file.type, isPublic: false }),
    });
    const { uploadUrl, cloud_storage_path } = await res.json();
    const signedHeaders = new URL(uploadUrl).searchParams.get('X-Amz-SignedHeaders') ?? '';
    const headers: Record<string, string> = { 'Content-Type': file.type };
    if (signedHeaders.includes('content-disposition')) headers['Content-Disposition'] = 'attachment';
    await fetch(uploadUrl, { method: 'PUT', headers, body: file });
    return cloud_storage_path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setError('');
    if (!form?.name || !form?.phone || !form?.email || !form?.itemType || !form?.description) {
      setError('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const photoUrls: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        try {
          const url = await uploadPhoto(photos[i]);
          photoUrls.push(url);
        } catch (uploadErr: any) {
          console.error('Photo upload failed:', uploadErr);
          setError(`Failed to upload photo ${i + 1}. Please try again.`);
          setSubmitting(false);
          return;
        }
      }
      const res = await fetch('/api/pawn-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photoUrls }),
      });
      if (res?.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data?.error || 'Something went wrong. Please try again or call us.');
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
            <h2 className="text-2xl font-bold text-white mb-3">Pawn Request Received</h2>
            <p className="text-gray-400 text-sm mb-2">We&apos;ll review your item and get back to you within 24 hours with a loan offer.</p>
            <p className="text-gray-600 text-xs mb-8">No pressure. No obligation.</p>
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
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-medium px-4 py-1.5 rounded-full mb-6 tracking-[0.15em] uppercase">
              <Banknote className="w-3.5 h-3.5" />
              Pawn Loans
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Fast Cash for Your Valuables
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Turn your items into cash today. Private, fair, and local. No credit check, no hassle — just straightforward pawn loans you can trust.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { icon: <Clock className="w-4 h-4" />, label: 'Same-day cash' },
                { icon: <Lock className="w-4 h-4" />, label: '100% private' },
                { icon: <Scale className="w-4 h-4" />, label: 'Fair pricing' },
                { icon: <Store className="w-4 h-4" />, label: 'Local shop' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-amber-400">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-sm mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">What We Accept</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {acceptedItems.map((item, i) => (
              <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl p-4 text-center hover:border-amber-500/20 transition-colors">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                <p className="text-gray-600 text-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-center mt-4">
            Not sure if your item qualifies?{' '}
            <a href="tel:3862264653" className="text-amber-400 hover:text-amber-300">Call us</a> to ask before you submit.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Why Pawn With Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Shield className="w-5 h-5" />, title: 'Licensed & Compliant', desc: 'We follow all state and federal pawn regulations' },
                { icon: <Eye className="w-5 h-5" />, title: 'No Credit Check', desc: 'Your credit score doesn\'t affect your loan' },
                { icon: <FileText className="w-5 h-5" />, title: 'Simple Terms', desc: 'Clear, upfront loan terms with no hidden fees' },
                { icon: <Calendar className="w-5 h-5" />, title: 'Flexible Extensions', desc: 'Need more time? We offer extensions options' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-amber-400 mb-2">{item.icon}</div>
                  <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <form onSubmit={handleSubmit} className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="mb-4">
                <h2 className="text-white font-bold text-xl mb-2">Request a Loan Quote</h2>
                <p className="text-gray-500 text-sm">Tell us about your item and we&apos;ll get back to you with an offer.</p>
              </div>

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
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Phone Number *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="(386) 555-0123" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="you@example.com" />
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Item Type *</label>
                <select name="itemType" value={form.itemType} onChange={handleChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white appearance-none">
                  <option value="">What do you have?</option>
                  {itemTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Item Details *</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700 resize-none" placeholder="Brand, model, condition, age, any damage, serial number if applicable..." />
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Add Photos (helps us give accurate offers)</label>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
                <div className="flex flex-wrap gap-3">
                  {photoPreviews.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/[0.08] group">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-5 h-5 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {(photos?.length ?? 0) < 5 && (
                    <button type="button" onClick={() => fileRef.current?.click()} className="w-20 h-20 border border-dashed border-white/[0.1] rounded-lg flex flex-col items-center justify-center text-gray-600 hover:text-white hover:border-white/20 transition-all">
                      <Camera className="w-5 h-5 mb-1" />
                      <span className="text-[10px]">Add Photo</span>
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-amber-600/50 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-600/20 flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><ArrowRight className="w-4 h-4" /> Get My Loan Offer</>}
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
                <Check className="w-3 h-3" />
                No credit check. No obligation. Response within 24 hours.
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-white font-semibold text-sm mb-3">What happens next?</h3>
              <ul className="space-y-3">
                {[
                  'We review your submission within 24 hours',
                  'We call you with our loan offer',
                  'You decide if you want to accept — no pressure',
                  'If you accept, bring your item in for cash same-day',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-white font-semibold text-sm mb-3">Have questions?</h3>
              <p className="text-gray-500 text-sm mb-4">Our team is here to help. Call us to discuss your item before submitting.</p>
              <a href="tel:3862264653" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
                <Phone className="w-4 h-4" />
                (386) 226-4653
              </a>
            </div>

            <div className="text-gray-600 text-xs">
              <p>By submitting, you agree to our terms. Your information stays private.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}