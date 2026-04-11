'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Phone, MessageSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Nav Data ─────────────────────────────────────────────────────────────────
type NavDropItem = { href: string; label: string };
type NavItem = {
    href?: string;
    label: string;
    dropdown?: NavDropItem[];
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  {
        label: 'Inventory',
        dropdown: [
          { href: '/inventory', label: 'All Inventory' },
          { href: '/inventory?dept=firearms', label: 'Firearms' },
          { href: '/inventory?dept=ammo', label: 'Ammo' },
          { href: '/inventory?dept=accessories', label: 'Accessories' },
          { href: '/inventory?dept=jewelry', label: 'Jewelry' },
          { href: '/inventory?dept=electronics', label: 'Electronics' },
          { href: '/inventory?dept=tools', label: 'Tools' },
              ],
  },
  {
        label: 'Services',
        dropdown: [
          { href: '/ffl-transfer', label: 'FFL Transfers' },
          { href: '/pawn', label: 'Pawn Loans' },
          { href: '/sell', label: 'Sell to Us' },
          { href: '/ccw', label: 'CCW Classes' },
          { href: '/contact', label: 'Gunsmithing' },
              ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  ];

// DEV: validate all hrefs at startup
if (process.env.NODE_ENV === 'development') {
    NAV_ITEMS.forEach((item) => {
          if (item.href && !item.href.startsWith('/') && !item.href.startsWith('http')) {
                  console.warn(`[Nav] Suspicious href on "${item.label}": ${item.href}`);
          }
          item.dropdown?.forEach((d) => {
                  if (!d.href.startsWith('/') && !d.href.startsWith('http')) {
                            console.warn(`[Nav] Suspicious dropdown href on "${d.label}": ${d.href}`);
                  }
          });
    });
}

// ─── Dropdown (Desktop) ────────────────────────────────────────────────────────
function DesktopDropdown({
    item,
    isOpen,
    onOpen,
    onClose,
}: {
    item: NavItem;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    // 200 ms leave-delay prevents flicker when cursor briefly leaves the trigger
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        onOpen();
  }, [onOpen]);

  const handleMouseLeave = useCallback(() => {
        leaveTimer.current = setTimeout(() => {
                onClose();
        }, 200);
  }, [onClose]);

  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);

  const id = `dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
        <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              <button
                        className="flex items-center gap-1 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={id}
                      >
                {item.label}
                      <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                  aria-hidden="true"
                                />
              </button>button>
        
              <AnimatePresence>
                {isOpen && (
                          <motion.div
                                        id={id}
                                        role="menu"
                                        aria-label={`${item.label} submenu`}
                                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="absolute top-full left-0 pt-2 z-[9999]"
                                        // Keep open when cursor is inside dropdown panel
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                      >
                                      <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-xl shadow-black/60 overflow-hidden min-w-[180px]">
                                        {item.dropdown!.map((dropItem) => (
                                                        <Link
                                                                            key={dropItem.href}
                                                                            href={dropItem.href}
                                                                            role="menuitem"
                                                                            onClick={onClose}
                                                                            className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors first:pt-3 last:pb-3 focus:outline-none focus-visible:bg-white/[0.08]"
                                                                          >
                                                          {dropItem.label}
                                                        </Link>Link>
                                                      ))}
                                      </div>div>
                          </motion.div>motion.div>
                        )}
              </AnimatePresence>AnimatePresence>
        </div>div>
      );
}

// ─── Mobile Accordion Item ─────────────────────────────────────────────────────
function MobileAccordionItem({
    item,
    isExpanded,
    onToggle,
    onNavigate,
}: {
    item: NavItem;
    isExpanded: boolean;
    onToggle: () => void;
    onNavigate: () => void;
}) {
    const id = `mobile-accordion-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
    return (
          <div>
                <button
                          onClick={onToggle}
                          className="w-full flex items-center justify-between px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                          aria-expanded={isExpanded}
                          aria-controls={id}
                        >
                  {item.label}
                        <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                  />
                </button>button>
          
                <AnimatePresence initial={false}>
                  {isExpanded && (
                      <motion.div
                                    id={id}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                  <div className="ml-4 border-l border-white/[0.06] pl-2 pb-1">
                                    {item.dropdown!.map((dropItem) => (
                                                    <Link
                                                                        key={dropItem.href}
                                                                        href={dropItem.href}
                                                                        onClick={onNavigate}
                                                                        className="block px-4 py-2.5 text-sm text-gray-500 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                                                      >
                                                      {dropItem.label}
                                                    </Link>Link>
                                                  ))}
                                  </div>div>
                      </motion.div>motion.div>
                    )}
                </AnimatePresence>AnimatePresence>
          </div>div>
        );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
    const isAdmin = (session?.user as any)?.role === 'admin';
  
    // Close mobile menu on route change
    useEffect(() => {
          setMobileOpen(false);
          setMobileExpanded(null);
    }, [pathname]);
  
    // Scroll shadow
    useEffect(() => {
          const onScroll = () => setScrolled(window.scrollY > 8);
          window.addEventListener('scroll', onScroll, { passive: true });
          return () => window.removeEventListener('scroll', onScroll);
    }, []);
  
    // Lock body scroll when mobile menu open
    useEffect(() => {
          document.body.style.overflow = mobileOpen ? 'hidden' : '';
          return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);
  
    // Close dropdown on Escape key
    useEffect(() => {
          const onKey = (e: KeyboardEvent) => {
                  if (e.key === 'Escape') {
                            setOpenDropdown(null);
                            setMobileOpen(false);
                  }
          };
          document.addEventListener('keydown', onKey);
          return () => document.removeEventListener('keydown', onKey);
    }, []);
  
    const openHandler = useCallback((label: string) => setOpenDropdown(label), []);
    const closeHandler = useCallback(() => setOpenDropdown(null), []);
  
    const isActiveLink = useCallback(
          (href?: string) => {
                  if (!href) return false;
                  if (href === '/') return pathname === '/';
                  return pathname.startsWith(href.split('?')[0]);
          },
          [pathname]
        );
  
    const closeMobile = useCallback(() => {
          setMobileOpen(false);
          setMobileExpanded(null);
    }, []);
  
    return (
          <>
                <header
                          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                                      scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
                          }`}
                          role="banner"
                        >
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                          {/* Logo */}
                                  <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="Mason Avenue Firearms & Pawn – Home">
                                              <div className="w-10 h-10 sm:w-11 sm:h-11 relative rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                              src="/logo.png"
                                                                              alt=""
                                                                              fill
                                                                              className="object-cover"
                                                                              sizes="44px"
                                                                              priority
                                                                            />
                                              </div>div>
                                              <div className="hidden sm:block leading-tight">
                                                            <span className="text-white font-bold text-sm sm:text-base tracking-wide">MASON AVENUE</span>span>
                                                            <span className="block text-[9px] sm:text-[10px] text-gray-500 tracking-[0.25em] uppercase">Firearms &amp; Pawn</span>span>
                                              </div>div>
                                  </Link>Link>
                        
                          {/* Desktop Nav */}
                                  <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
                                    {NAV_ITEMS.map((item) =>
                                        item.dropdown ? (
                                                          <DesktopDropdown
                                                                              key={item.label}
                                                                              item={item}
                                                                              isOpen={openDropdown === item.label}
                                                                              onOpen={() => openHandler(item.label)}
                                                                              onClose={closeHandler}
                                                                            />
                                                        ) : (
                                                          <Link
                                                                              key={item.label}
                                                                              href={item.href!}
                                                                              className={`px-4 py-2 text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                                                                                                    isActiveLink(item.href)
                                                                                                      ? 'text-white bg-white/[0.06]'
                                                                                                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                                                                              }`}
                                                                              aria-current={isActiveLink(item.href) ? 'page' : undefined}
                                                                            >
                                                            {item.label}
                                                          </Link>Link>
                                                        )
                                      )}
                                    {isAdmin && (
                                        <Link href="/admin" className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-500/10">
                                                        Admin
                                        </Link>Link>
                                              )}
                                  </nav>nav>
                        
                          {/* Right CTAs */}
                                  <div className="flex items-center gap-2">
                                              <a
                                                              href="sms:3862264653"
                                                              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-blue-400 px-3 py-2 rounded-lg text-sm transition-colors"
                                                              aria-label="Text us"
                                                            >
                                                            <MessageSquare className="w-4 h-4" aria-hidden="true" />
                                                            Text
                                              </a>a>
                                              <a
                                                              href="tel:3862264653"
                                                              className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                                                              aria-label="Call (386) 226-4653"
                                                            >
                                                            <Phone className="w-4 h-4" aria-hidden="true" />
                                                            (386) 226-4653
                                              </a>a>
                                              <a
                                                              href="tel:3862264653"
                                                              className="sm:hidden flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-lg transition-colors"
                                                              aria-label="Call us"
                                                            >
                                                            <Phone className="w-4 h-4" aria-hidden="true" />
                                              </a>a>
                                  
                                    {/* Hamburger */}
                                              <button
                                                              onClick={() => setMobileOpen((o) => !o)}
                                                              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                                              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                                              aria-expanded={mobileOpen}
                                                              aria-controls="mobile-nav"
                                                            >
                                                            <AnimatePresence mode="wait" initial={false}>
                                                              {mobileOpen ? (
                                                                                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                                                                                    <X className="w-5 h-5" aria-hidden="true" />
                                                                                </motion.span>motion.span>
                                                                              ) : (
                                                                                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                                                                                    <Menu className="w-5 h-5" aria-hidden="true" />
                                                                                </motion.span>motion.span>
                                                                              )}
                                                            </AnimatePresence>AnimatePresence>
                                              </button>button>
                                  </div>div>
                        </div>div>
                </header>header>
          
            {/* Mobile Drawer – slide in from right */}
                <AnimatePresence>
                  {mobileOpen && (
                      <>
                        {/* Backdrop */}
                                  <motion.div
                                                  key="backdrop"
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  exit={{ opacity: 0 }}
                                                  transition={{ duration: 0.2 }}
                                                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                                                  onClick={closeMobile}
                                                  aria-hidden="true"
                                                />
                      
                        {/* Drawer panel */}
                                  <motion.nav
                                                  key="drawer"
                                                  id="mobile-nav"
                                                  role="navigation"
                                                  aria-label="Mobile navigation"
                                                  initial={{ x: '100%' }}
                                                  animate={{ x: 0 }}
                                                  exit={{ x: '100%' }}
                                                  transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
                                                  className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] bg-[#070707] border-l border-white/[0.06] flex flex-col overflow-y-auto lg:hidden"
                                                >
                                    {/* Drawer header */}
                                                <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06] flex-shrink-0">
                                                                <span className="text-white font-semibold tracking-wide text-sm">Menu</span>span>
                                                                <button
                                                                                    onClick={closeMobile}
                                                                                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                                                                    aria-label="Close menu"
                                                                                  >
                                                                                  <X className="w-5 h-5" aria-hidden="true" />
                                                                </button>button>
                                                </div>div>
                                  
                                    {/* Nav items */}
                                                <div className="flex-1 px-3 py-4 flex flex-col gap-1">
                                                  {NAV_ITEMS.map((item) =>
                                                                    item.dropdown ? (
                                                                                          <MobileAccordionItem
                                                                                                                  key={item.label}
                                                                                                                  item={item}
                                                                                                                  isExpanded={mobileExpanded === item.label}
                                                                                                                  onToggle={() =>
                                                                                                                                            setMobileExpanded((prev) => (prev === item.label ? null : item.label))
                                                                                                                    }
                                                                                                                  onNavigate={closeMobile}
                                                                                                                />
                                                                                        ) : (
                                                                                          <Link
                                                                                                                  key={item.label}
                                                                                                                  href={item.href!}
                                                                                                                  onClick={closeMobile}
                                                                                                                  className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                                                                                                                                            isActiveLink(item.href)
                                                                                                                                              ? 'text-white bg-white/[0.06]'
                                                                                                                                              : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                                                                                                                    }`}
                                                                                                                  aria-current={isActiveLink(item.href) ? 'page' : undefined}
                                                                                                                >
                                                                                            {item.label}
                                                                                            </Link>Link>
                                                                                        )
                                                                  )}
                                                
                                                  {isAdmin && (
                                                                    <Link
                                                                                          href="/admin"
                                                                                          onClick={closeMobile}
                                                                                          className="px-4 py-3.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
                                                                                        >
                                                                                        Admin Panel
                                                                    </Link>Link>
                                                                )}
                                                
                                                  {session ? (
                                                                    <button
                                                                                          onClick={() => { signOut({ callbackUrl: '/' }); closeMobile(); }}
                                                                                          className="px-4 py-3.5 text-left text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
                                                                                        >
                                                                                        Logout
                                                                    </button>button>
                                                                  ) : (
                                                                    <Link
                                                                                          href="/login"
                                                                                          onClick={closeMobile}
                                                                                          className="px-4 py-3.5 text-gray-500 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
                                                                                        >
                                                                                        Admin Login
                                                                    </Link>Link>
                                                                )}
                                                </div>div>
                                  
                                    {/* Drawer footer CTAs */}
                                                <div className="px-5 py-5 border-t border-white/[0.06] flex flex-col gap-3 flex-shrink-0">
                                                                <a
                                                                                    href="tel:3862264653"
                                                                                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white px-5 py-3.5 rounded-xl font-semibold transition-colors"
                                                                                  >
                                                                                  <Phone className="w-4 h-4" aria-hidden="true" />
                                                                                  (386) 226-4653
                                                                </a>a>
                                                                <a
                                                                                    href="sms:3862264653"
                                                                                    className="flex items-center justify-center gap-2 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 px-5 py-3 rounded-xl text-sm transition-colors"
                                                                                  >
                                                                                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                                                                                  Send a Text
                                                                </a>a>
                                                </div>div>
                                  </motion.nav>motion.nav>
                      </>>
                    )}
                </AnimatePresence>AnimatePresence>
          </>>
        );
}</></></div>
