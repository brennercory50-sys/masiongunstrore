'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, Clock, Shield, Phone, Camera, X, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';
import { itemTypes, conditionOptions, benefits } from './sell-data';

export default function SellClient() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', firearmType: '', condition: '', description: '' });
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
    if ((photos?.length ?? 0) + files.length > 5) { setError('Maximum 5 photos allowed'); return; }
    setPhotos((prev: any) => [...(prev ?? []), ...files]);
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => { setPhotoPreviews((prev: any) => [...(prev ?? []), reader?.result as string]); };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev: any) => (prev ?? []).filter((_: any, i: number) => i !== index));
    setPhotoPreviews((prev: any) => (prev ?? []).filter((_: any, i: number) => i !== index));
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    const res = await fetch('/api/upload/presigned', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileName: file.name, contentType: file.type, isPublic: false }) });
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
    if (!form?.name || !form?.phone || !form?.email || !form?.firearmType || !form?.condition) { setError('Please fill in all required fields'); return; }
    setSubmitting(true);
    try {
      const photoUrls: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        try { photoUrls.push(await uploadPhoto(photos[i])); } catch { setError(`Failed to upload photo ${i + 1}. Please try again.`); setSubmitting(false); return; }
      }
      const res = await fetch('/api/sell-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, photoUrls }) });
      if (res?.ok) setSuccess(true); else { const data = await res.json(); setError(data?.error || 'Something went wrong.'); }
    } catch { setError('Something went wrong. Please call us directly.'); }
    setSubmitting(false);
  };

  if (success) return <SuccessView />;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <InfoSection />
          <SellForm form={form} photos={photos} photoPreviews={photoPreviews} error={error} submitting={submitting} fileRef={fileRef} onChange={handleChange} onPhotoChange={handlePhotos} onRemovePhoto={removePhoto} onSubmit={handleSubmit} />
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
          <h2 className="text-2xl font-bold text-white mb-3">Submission Received</h2>
          <p className="text-gray-400 text-sm mb-2">We&apos;ll review your item and get back to you within 24 hours.</p>
          <p className="text-gray-600 text-xs mb-8">No pressure. No obligation.</p>
          <a href="tel:3862264653" className="inline-flex items-center gap-2 text-red-400 text-sm hover:text-red-300"><Phone className="w-4 h-4" /> Need it faster? Call (386) 226-4653</a>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

function InfoSection() {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">Sell Your Items<span className="text-red-500"> — Get Paid Fast</span></h1>
        <div className="space-y-5 mb-8">
          {benefits.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="text-red-500 mt-0.5">{item.icon}</div>
              <div><p className="text-white font-medium text-sm">{item.title}</p><p className="text-gray-600 text-xs">{item.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
          <p className="text-gray-500 text-sm mb-3">We buy collections, individual items, and everyday goods across all departments.</p>
          <a href="tel:3862264653" className="text-red-400 text-sm inline-flex items-center gap-1.5 hover:text-red-300"><Phone className="w-3.5 h-3.5" /> Prefer to call? (386) 226-4653</a>
        </div>
      </motion.div>
    </div>
  );
}

function SellForm({ form, photos, photoPreviews, error, submitting, fileRef, onChange, onPhotoChange, onRemovePhoto, onSubmit }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <form onSubmit={onSubmit} className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="mb-2">
          <h2 className="text-white font-bold text-xl">Get Your Offer</h2>
          <p className="text-gray-500 text-sm">Tell us what you have and we&apos;ll get back to you fast.</p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block font-medium">Name *</label><input name="name" value={form.name} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" placeholder="Your name" /></div>
          <div><label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block font-medium">Phone *</label><input name="phone" value={form.phone} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" placeholder="(xxx) xxx-xxxx" /></div>
        </div>
        <div><label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block font-medium">Email *</label><input name="email" type="email" value={form.email} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" placeholder="your@email.com" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block font-medium">Item Type *</label><select name="firearmType" value={form.firearmType} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3.5 text-base text-white appearance-none"><option value="">Select type</option>{itemTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          <div><label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block font-medium">Condition *</label><select name="condition" value={form.condition} onChange={onChange} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3.5 text-base text-white appearance-none"><option value="">Select condition</option>{conditionOptions.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        </div>
        <div><label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block font-medium">Description</label><textarea name="description" value={form.description} onChange={onChange} rows={4} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600 resize-none" placeholder="Brand, model, condition, accessories..." /></div>
        <div>
          <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Photos (up to 5)</label>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={onPhotoChange} className="hidden" />
          <div className="flex flex-wrap gap-3">
            {photoPreviews.map((src: string, i: number) => (
              <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/[0.08] group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => onRemovePhoto(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"><X className="w-3.5 h-3.5 text-white" /></button>
              </div>
            ))}
            {(photos?.length ?? 0) < 5 && <button type="button" onClick={() => fileRef.current?.click()} className="w-24 h-24 border border-dashed border-white/[0.1] rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-colors"><Camera className="w-6 h-6 mb-1" /><span className="text-xs">Add Photo</span></button>}
          </div>
        </div>
        <button type="submit" disabled={submitting} className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2">
          {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><ArrowRight className="w-4 h-4" /> Get My Offer</>}
        </button>
        <p className="text-gray-600 text-xs text-center flex items-center justify-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-500" />No pressure. No obligation. Response within 24 hours.</p>
      </form>
    </motion.div>
  );
}