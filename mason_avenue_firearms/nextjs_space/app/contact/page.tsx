'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageSquare, Mail, Shield } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out however works best for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-600/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <a href="tel:3862264653" className="text-gray-400 text-sm hover:text-red-400 transition-colors block">
              (386) 226-4653
            </a>
            <p className="text-gray-600 text-xs mt-1">Mon-Sat: 9 AM - 7 PM</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Text</h3>
            <a href="sms:3862264653" className="text-gray-400 text-sm hover:text-blue-400 transition-colors block">
              (386) 226-4653
            </a>
            <p className="text-gray-600 text-xs mt-1">Fast replies via SMS</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6">
            <div className="w-12 h-12 bg-amber-600/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-gray-400 text-sm">347 Mason Ave</p>
            <p className="text-gray-500 text-xs">Daytona Beach, FL 32117</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6">
            <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">info@masonavenue.com</p>
            <p className="text-gray-600 text-xs mt-1">We respond within 24 hours</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form className="space-y-4 max-w-lg">
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Name</label>
                <input type="text" className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="Your name" />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Phone</label>
                <input type="tel" className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="(386) 555-0123" />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Email</label>
                <input type="email" className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Message</label>
                <textarea rows={4} className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-700 resize-none" placeholder="How can we help you?" />
              </div>
              <button type="button" className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-600/20">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-2">FFL & Compliance</h3>
              <p className="text-gray-400 text-sm">
                For FFL transfer inquiries, please call us directly at (386) 226-4653 or visit our FFL Transfer page.
              </p>
              <Link href="/ffl-transfer" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors inline-block mt-2">
                FFL Transfers → 
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}