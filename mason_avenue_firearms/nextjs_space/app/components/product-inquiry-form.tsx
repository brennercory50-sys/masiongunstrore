'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, Loader2, CheckCircle, X } from 'lucide-react';

interface ProductInquiryFormProps {
  productName?: string;
  productId?: string;
  variant?: 'modal' | 'inline';
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function ProductInquiryForm({ 
  productName, 
  productId,
  variant = 'inline',
  onSuccess,
  onClose 
}: ProductInquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: productName ? `I'm interested in: ${productName}` : '',
    itemId: productId || '',
    itemName: productName || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/item-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitted(true);
        onSuccess?.();
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Request Sent!</h3>
              <p className="text-gray-400 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h3 className="text-white font-semibold text-xl mb-1">Get More Info</h3>
              <p className="text-gray-500 text-sm mb-6">We'll respond quickly with details.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#060606] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#060606] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors"
                      placeholder="(xxx) xxx-xxxx"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#060606] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#060606] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#060606] border border-white/[0.06] rounded-xl p-5">
      <h3 className="text-white font-semibold text-base mb-1">Interested in this item?</h3>
      <p className="text-gray-500 text-sm mb-5">Get more details or check availability.</p>
      
      {submitted ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-white font-medium text-sm">Request sent!</p>
          <p className="text-gray-500 text-xs mt-1">We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="itemId" value={formData.itemId} />
          <input type="hidden" name="itemName" value={formData.itemName} />
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors"
                placeholder="(xxx) xxx-xxxx"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Message</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-red-500/50 outline-none transition-colors resize-none"
              placeholder="Questions or requests..."
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-white py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
            Send Inquiry
          </button>
          <p className="text-gray-600 text-xs text-center">We typically respond within 24 hours</p>
        </form>
      )}
    </div>
  );
}