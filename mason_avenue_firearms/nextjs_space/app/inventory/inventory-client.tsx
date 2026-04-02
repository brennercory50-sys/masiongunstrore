'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Loader2, ChevronDown, Crosshair, Gem, Smartphone, Wrench, ArrowUpDown, Phone, ArrowRight, MapPin, Clock, MessageSquare } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ProductCard from '../components/product-card';
import StatusBadge from '../components/status-badge';
import StickyMobileCTA from '../components/sticky-mobile-cta';
import { departments, categoryMap, brandMap } from '@/lib/departments';
import { placeholderInventory, USE_PLACEHOLDER_INVENTORY, getPlaceholderByDepartment } from '@/lib/placeholderInventory';

const conditions = ['All', 'New', 'Like New', 'Excellent', 'Good', 'Fair'];
const priceRanges = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under $300', min: '', max: '300' },
  { label: '$300 - $500', min: '300', max: '500' },
  { label: '$500 - $800', min: '500', max: '800' },
  { label: '$800 - $1,200', min: '800', max: '1200' },
  { label: '$1,200+', min: '1200', max: '' },
];
const inventoryStatuses = [
  { value: 'all', label: 'All Availability' },
  { value: 'in_stock', label: 'In Stock' },
  { value: 'available_to_order', label: 'Available to Order' },
  { value: 'sourced', label: 'Request / Source' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured' },
];

const deptIcons: Record<string, React.ReactNode> = {
  firearms: <Crosshair className="w-4 h-4" />,
  jewelry: <Gem className="w-4 h-4" />,
  electronics: <Smartphone className="w-4 h-4" />,
  tools: <Wrench className="w-4 h-4" />,
};

export default function InventoryClient() {
  const searchParams = useSearchParams();
  const initialDept = searchParams?.get('dept') || 'all';

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(initialDept);
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [brand, setBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [invStatus, setInvStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Reset category/brand when department changes
  useEffect(() => {
    setCategory('All');
    setBrand('All');
  }, [department]);

  const currentCategories = department !== 'all' ? ['All', ...(categoryMap[department] || [])] : ['All'];
  const currentBrands = department !== 'all' ? ['All', ...(brandMap[department] || [])] : ['All'];

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (department !== 'all') params.set('department', department);
      if (category !== 'All') params.set('category', category.toLowerCase());
      if (condition !== 'All') params.set('condition', condition);
      if (brand !== 'All') params.set('brand', brand);
      if (invStatus !== 'all') params.set('inventoryStatus', invStatus);
      const pr = priceRanges?.[priceRange];
      if (pr?.min) params.set('minPrice', pr.min);
      if (pr?.max) params.set('maxPrice', pr.max);
      if (sort) params.set('sort', sort);
      
      const res = await fetch(`/api/inventory?${params.toString()}`);
      let data = await res.json();
      
      // Use placeholder if no real data or placeholder mode enabled
      if (USE_PLACEHOLDER_INVENTORY && (!data || data.length === 0)) {
        let filtered = getPlaceholderByDepartment(department === 'all' ? 'firearms' : department);
        if (department !== 'all') {
          filtered = filtered.filter(item => item.department === department);
        }
        if (condition !== 'All') {
          filtered = filtered.filter(item => item.condition === condition);
        }
        if (search) {
          filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            (item.brand && item.brand.toLowerCase().includes(search.toLowerCase()))
          );
        }
        data = filtered;
      }
      
      setItems(data ?? []);
    } catch (err: any) {
      console.error('Fetch error:', err);
      // Fallback to placeholder on error
      if (USE_PLACEHOLDER_INVENTORY) {
        const fallback = department === 'all' 
          ? placeholderInventory 
          : getPlaceholderByDepartment(department);
        setItems(fallback);
      } else {
        setItems([]);
      }
    }
    setLoading(false);
  }, [search, department, category, condition, brand, priceRange, invStatus, sort]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 300);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const activeFilters = [category, condition, brand, invStatus].filter(f => f !== 'All' && f !== 'all').length + (priceRange > 0 ? 1 : 0) + (department !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setDepartment('all');
    setCategory('All');
    setCondition('All');
    setBrand('All');
    setPriceRange(0);
    setInvStatus('all');
    setSearch('');
  };

  const FilterSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div>
      <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white appearance-none cursor-pointer hover:border-white/15 transition-colors"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Browse Inventory</h1>
        </div>

        {/* Department Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setDepartment('all')}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              department === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-[#0a0a0a] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/15'
            }`}
          >
            All Departments
          </button>
          {departments.map(d => (
            <button
              key={d.key}
              onClick={() => setDepartment(d.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                department === d.key
                  ? 'bg-red-600 text-white'
                  : 'bg-[#0a0a0a] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/15'
              }`}
            >
              {deptIcons[d.key]}
              {d.label}
            </button>
          ))}
        </div>

        {/* Trust banner */}
        <div className="flex items-center gap-4 mb-6 px-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-lg">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-medium">Local Inventory</span>
          </div>
          <div className="w-px h-4 bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">Same-Day Pickup</span>
          </div>
          <div className="w-px h-4 bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span className="text-xs font-medium">386-226-4653</span>
          </div>
          <div className="hidden sm:flex flex-1 justify-end">
            <Link href="/order" className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors">
              Don&apos;t see it? We can source it →
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* SIDEBAR FILTERS - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-[#060606] border border-white/[0.06] rounded-xl p-5 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Filters</span>
                {activeFilters > 0 && (
                  <button onClick={clearFilters} className="text-red-400 text-xs hover:text-red-300 transition-colors">
                    Clear all
                  </button>
                )}
              </div>

              {/* Availability filter */}
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-2 block font-medium">Availability</label>
                <div className="space-y-1">
                  {inventoryStatuses.map(s => (
                    <button
                      key={s.value}
                      onClick={() => setInvStatus(s.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        invStatus === s.value
                          ? 'bg-red-600/10 text-red-400 border border-red-500/20'
                          : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {department !== 'all' && currentCategories.length > 1 && (
                <FilterSelect label="Type" value={category} onChange={setCategory} options={currentCategories} />
              )}
              {department !== 'all' && currentBrands.length > 1 && (
                <FilterSelect label="Brand" value={brand} onChange={setBrand} options={currentBrands} />
              )}
              <FilterSelect label="Condition" value={condition} onChange={setCondition} options={conditions} />

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Price Range</label>
                <div className="relative">
                  <select
                    value={priceRange}
                    onChange={e => setPriceRange(parseInt(e.target.value))}
                    className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white appearance-none cursor-pointer hover:border-white/15 transition-colors"
                  >
                    {priceRanges.map((pr, i) => <option key={i} value={i}>{pr.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            {/* Search + controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={department === 'all' ? 'Search all items...' : `Search ${department}...`}
                  className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl pl-11 pr-4 py-4 text-base text-white placeholder:text-gray-600 hover:border-white/15 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                {/* Sort dropdown */}
                <div className="relative hidden sm:block">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="h-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white appearance-none cursor-pointer hover:border-white/15 transition-colors pr-10"
                  >
                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-5 py-4 bg-[#0a0a0a] border border-white/[0.08] rounded-xl text-sm text-gray-400 hover:text-white transition-colors active:scale-95"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  {activeFilters > 0 && (
                    <span className="bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFilters}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden bg-[#060606] border border-white/[0.06] rounded-xl p-5 mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Filters</span>
                  <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-white p-1"><X className="w-5 h-5" /></button>
                </div>
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-2 block font-medium">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {inventoryStatuses.map(s => (
                      <button
                        key={s.value}
                        onClick={() => setInvStatus(s.value)}
                        className={`px-4 py-2.5 rounded-lg text-sm transition-all active:scale-95 ${
                          invStatus === s.value
                            ? 'bg-red-600/10 text-red-400 border border-red-500/20'
                            : 'text-gray-500 border border-white/[0.08] hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                {department !== 'all' && currentCategories.length > 1 && (
                  <FilterSelect label="Type" value={category} onChange={setCategory} options={currentCategories} />
                )}
                {department !== 'all' && currentBrands.length > 1 && (
                  <FilterSelect label="Brand" value={brand} onChange={setBrand} options={currentBrands} />
                )}
                <FilterSelect label="Condition" value={condition} onChange={setCondition} options={conditions} />
                {activeFilters > 0 && (
                  <div className="flex gap-3 pt-2">
                    <button onClick={clearFilters} className="flex-1 py-3 text-red-400 text-sm font-medium border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all active:scale-95">
                      Clear All
                    </button>
                    <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-500 transition-all active:scale-95">
                      Apply
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile sort */}
            <div className="sm:hidden mb-4">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white appearance-none cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Results */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-[#060606] border border-white/[0.06] rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-[#0a0a0a]" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[#0a0a0a] rounded w-1/3" />
                      <div className="h-4 bg-[#0a0a0a] rounded w-3/4" />
                      <div className="h-5 bg-[#0a0a0a] rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (items?.length ?? 0) === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-16 h-16 bg-[#0a0a0a] rounded-full flex items-center justify-center mb-6">
                  <Search className="w-7 h-7 text-gray-600" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">No items found</h3>
                <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
                  {search || department !== 'all' 
                    ? "We couldn't find anything matching your criteria. Try adjusting your filters or search terms."
                    : "We don't have any items in this category right now."}
                </p>
                <div className="mb-8 p-4 bg-blue-950/20 border border-blue-500/20 rounded-xl text-center">
                  <p className="text-white font-medium text-sm mb-1">Can't find it? Buy online and ship it to us.</p>
                  <p className="text-gray-400 text-xs">Transfers starting at $25 • Handguns $25 • Long guns $35 +$5 background check</p>
                  <Link href="/ffl-transfer" className="text-blue-400 hover:text-blue-300 text-xs font-semibold mt-2 inline-flex items-center gap-1">
                    Learn about FFL transfers <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                
                {/* Ammo & Accessories suggestion */}
                <div className="mb-8 p-4 bg-orange-950/10 border border-orange-500/10 rounded-xl text-center">
                  <p className="text-white font-medium text-sm mb-2">Browse ammo and accessories while you decide</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link href="/inventory?dept=ammo" className="text-orange-400 text-xs hover:text-orange-300">
                      Shop Ammo →
                    </Link>
                    <Link href="/inventory?dept=accessories" className="text-orange-400 text-xs hover:text-orange-300">
                      Shop Accessories →
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setDepartment('all')}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Browse All
                  </button>
                  <a 
                    href="tel:3862264653"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0a0a0a] border border-white/[0.08] hover:border-white/15 text-white rounded-lg font-medium text-sm transition-colors active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a 
                    href="sms:3862264653"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0a0a0a] border border-white/[0.08] hover:border-white/15 text-blue-400 rounded-lg font-medium text-sm transition-colors active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Text
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold text-lg">{items.length}</span>
                    <span className="text-gray-500 text-sm">item{items.length !== 1 ? 's' : ''} found</span>
                  </div>
                  <button
                    onClick={() => { setDepartment('all'); setSearch(''); }}
                    className="text-gray-500 hover:text-white text-sm transition-colors hidden sm:block"
                  >
                    View all inventory
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {items.map((item: any, i: number) => (
                    <ProductCard key={item?.id ?? i} item={item} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
