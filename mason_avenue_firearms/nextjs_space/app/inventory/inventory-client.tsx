'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Loader2, ChevronDown, Crosshair, Gem, Smartphone, Wrench } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ProductCard from '../components/product-card';
import StatusBadge from '../components/status-badge';
import StickyMobileCTA from '../components/sticky-mobile-cta';
import { departments, categoryMap, brandMap } from '@/lib/departments';

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
      const res = await fetch(`/api/inventory?${params.toString()}`);
      const data = await res.json();
      setItems(data ?? []);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setItems([]);
    }
    setLoading(false);
  }, [search, department, category, condition, brand, priceRange, invStatus]);

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
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Inventory</h1>
          <p className="text-gray-600 text-sm mt-1">Browse our full selection across all departments</p>
        </div>

        {/* Department Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
          <button
            onClick={() => setDepartment('all')}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
            {/* Search + mobile filter toggle */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={department === 'all' ? 'Search all items...' : `Search ${department}...`}
                  className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-600 hover:border-white/15 transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border border-white/[0.08] rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFilters > 0 && (
                  <span className="bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFilters}</span>
                )}
              </button>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden bg-[#060606] border border-white/[0.06] rounded-xl p-5 mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Filters</span>
                  <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <div>
                  <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-2 block font-medium">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {inventoryStatuses.map(s => (
                      <button
                        key={s.value}
                        onClick={() => setInvStatus(s.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          invStatus === s.value
                            ? 'bg-red-600/10 text-red-400 border border-red-500/20'
                            : 'text-gray-500 border border-white/[0.08] hover:text-white'
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
                {activeFilters > 0 && <button onClick={clearFilters} className="text-red-400 text-xs">Clear All Filters</button>}
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
              </div>
            ) : (items?.length ?? 0) === 0 ? (
              <div className="text-center py-32">
                <p className="text-gray-600 text-sm">No items found</p>
                <button onClick={clearFilters} className="text-red-400 text-sm mt-2 hover:text-red-300">Clear filters</button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-xs mb-4">{items.length} item{items.length !== 1 ? 's' : ''}</p>
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
