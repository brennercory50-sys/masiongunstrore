'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageSquare, Shield, CheckCircle } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';

const benefits = [
  { icon: <CheckCircle className="w-5 h-5" />, title: 'State Certified Instructors', desc: 'Our instructors are certified by the Florida Department of Law Enforcement' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Classroom & Live Fire', desc: 'We cover both classroom instruction and practical shooting exercises' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Certificate Provided', desc: 'Receive your certificate upon completion for your FL concealed weapon permit application' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Flexible Scheduling', desc: 'We offer weekend and weekday classes to fit your schedule' },
];

export default function CCWPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-[11px] font-bold px-5 py-2 rounded-full mb-6 tracking-[0.15em] uppercase">
            <Shield className="w-4 h-4" />
            Florida Concealed Carry
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            CCW <span className="text-red-500">Classes</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get your Florida concealed weapon permit with our state-certified instructors.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-red-500 mt-0.5">{item.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Class Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-black border border-white/[0.08] rounded-xl p-5">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-2">Duration</p>
                <p className="text-white font-semibold">4-8 Hours</p>
                <p className="text-gray-500 text-xs mt-1">Depending on class size</p>
              </div>
              <div className="bg-black border border-white/[0.08] rounded-xl p-5">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-2">Cost</p>
                <p className="text-white font-semibold">Call for Pricing</p>
                <p className="text-gray-500 text-xs mt-1">Includes certificate</p>
              </div>
              <div className="bg-black border border-white/[0.08] rounded-xl p-5">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.15em] mb-2">Location</p>
                <p className="text-white font-semibold">In-Store</p>
                <p className="text-gray-500 text-xs mt-1">347 Mason Ave</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Enroll?</h2>
            <p className="text-gray-400 text-sm mb-6">Call us to schedule your CCW class or ask any questions.</p>
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