'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, MapPin, Phone, Clock, Award, CheckCircle, MessageSquare, Mail } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StickyMobileCTA from '../components/sticky-mobile-cta';

const teamMembers = [
  { name: 'Owner', role: 'Licensed FFL Dealer', desc: '20+ years in the firearms & pawn industry' },
];

const certifications = [
  { icon: <Shield className="w-5 h-5" />, title: 'Licensed FFL Dealer', desc: 'Federal Firearms License' },
  { icon: <Award className="w-5 h-5" />, title: 'State Licensed', desc: 'Florida pawn dealer license' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'NICS Certified', desc: 'Background check provider' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            About <span className="text-red-500">Mason Avenue</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your trusted local source for firearms, pawn services, and more in Daytona Beach, Florida.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Mason Avenue Firearms & Pawn has been serving the Daytona Beach community for years as a trusted local firearms dealer and pawn shop. We specialize in quality firearms, jewelry, electronics, tools, and offer reliable pawn loan services.
              </p>
              <p>
                As a licensed FFL dealer, we handle firearm transfers, background checks, and ensure all transactions comply with federal and Florida state laws. Our goal is to provide honest, fair, and professional service to every customer.
              </p>
              <p>
                Whether you're looking to buy a firearm, sell your items, get a pawn loan, or transfer a firearm purchased online, we're here to help. Visit us at our Daytona Beach location or contact us today.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((item, i) => (
              <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl p-6">
                <div className="text-red-500 mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-16">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Visit Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-400 text-sm">347 Mason Ave, Daytona Beach, FL 32117</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Phone className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a href="tel:3862264653" className="text-gray-400 text-sm hover:text-red-400 transition-colors">(386) 226-4653</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400 text-sm">info@masonavenue.com</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Store Hours</p>
                    <p className="text-gray-400 text-sm">Monday - Friday: 9 AM - 5 PM</p>
                    <p className="text-gray-500 text-sm">Saturday: 10 AM - 4 PM</p>
                    <p className="text-gray-500 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center">
          <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Visit?</h2>
            <p className="text-gray-400 text-sm mb-6">Stop by our store or reach out to learn more about what we offer.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:3862264653" className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2 active:scale-95">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a href="sms:3862264653" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-95">
                <MessageSquare className="w-5 h-5" />
                Text Now
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