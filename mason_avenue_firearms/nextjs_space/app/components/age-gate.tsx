'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'age_verified';
const EXPIRATION_DAYS = 30;

function isVerified(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  
  try {
    const { timestamp } = JSON.parse(stored);
    const now = Date.now();
    const daysPassed = (now - timestamp) / (1000 * 60 * 60 * 24);
    return daysPassed < EXPIRATION_DAYS;
  } catch {
    return false;
  }
}

function setVerified(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
}

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isVerified()) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleEnter = () => {
    setVerified();
    setShow(false);
    document.body.style.overflow = '';
  };

  const handleExit = () => {
    window.location.href = 'https://google.com';
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Dark overlay with blur */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
          
          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-500" />
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              Age Verification
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              You must be 21 or older to access this site and purchase firearms or related products.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleEnter}
                className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2"
              >
                Enter Site (21+)
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleExit}
                className="w-full border border-white/10 hover:border-white/20 text-gray-400 hover:text-white py-3 rounded-xl text-sm font-medium transition-all"
              >
                Exit
              </button>
            </div>

            {/* Compliance note */}
            <p className="text-gray-700 text-[10px] mt-6">
              This verification is required by federal law for firearms commerce.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}