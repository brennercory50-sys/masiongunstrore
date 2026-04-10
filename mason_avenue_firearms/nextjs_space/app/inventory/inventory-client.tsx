'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown, ArrowUpDown, Phone, ArrowRight, MapPin, Clock, MessageSquare } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ProductCard from '../components/product-card';
import StickyMobileCTA from '../components/sticky-mobile-cta';
import { departments, categoryMap, brandMap } from '@/lib/departments';
import { placeholderInventory, USE_PLACEHOLDER_INVENTORY, getPlaceholderByDepartment } from '@/lib/placeholderInventory';
import { conditions, priceRanges, inventoryStatuses, sortOptions } from './inventory-filters';

const deptIcons: Record<string, React.ReactNode> = {
  firearms: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  jewelry: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6c-2 0-3 1-3 3 0 1.5 1 2.5 2 3.5S12 12 12 13c0 1-1 2-2 2.5-.5.25-1 .5-1 .5s.5.25 1 .5c1 .5 2 1.5 2 2.5 0 2-1 3-3 3s-3-1-3-3c0-1.5-1-2.5-2-3.5S7 12 7 11c0-1 1-2 2-2.5.5-.25 1-.5 1-.5s-.5-.25-1-.5c-1-.5-2-1.5-2-2.5 0-2 1-3 3-3z" /></svg>,
  electronics: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  tools: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

interface FilterSelectProps { label: string; value: string; onChange: (v: string) => void; options: string[]; }

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <div>
      <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">{label}</label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white appearance-none cursor-pointer hover:border-white/15">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
      </div>
    </div>
  );
}

function SidebarFilters({ department, category, condition, brand, invStatus, priceRange, activeFilters, currentCategories, currentBrands, setCategory, setCondition, setBrand, setInvStatus, setPriceRange, clearFilters }: any) {
  return (
    <div className="sticky top-28 bg-[#060606] border border-white/[0.06] rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Filters</span>
        {activeFilters > 0 && <button onClick={clearFilters} className="text-red-400 text-xs hover:text-red-300">Clear all</button>}
      </div>
      <div>
        <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-2 block font-medium">Availability</label>
        <div className="space-y-1">
          {inventoryStatuses.map(s => (
            <button key={s.value} onClick={() => setInvStatus(s.value)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${invStatus === s.value ? 'bg-red-600/10 text-red-400 border border-red-500/20' : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {department !== 'all' && currentCategories.length > 1 && <FilterSelect label="Type" value={category} onChange={setCategory} options={currentCategories} />}
      {department !== 'all' && currentBrands.length > 1 && <FilterSelect label="Brand" value={brand} onChange={setBrand} options={currentBrands} />}
      <FilterSelect label="Condition" value={condition} onChange={setCondition} options={conditions} />
      <div>
        <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-1.5 block font-medium">Price Range</label>
        <div className="relative">
          <select value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white appearance-none cursor-pointer">
            {priceRanges.map((pr, i) => <option key={i} value={i}>{pr.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function MobileFilters({ show, department, category, condition, brand, invStatus, priceRange, activeFilters, currentCategories, currentBrands, setCategory, setCondition, setBrand, setInvStatus, setPriceRange, onClose }: any) {
  if (!show) return null;
  return (
    <div className="lg:hidden bg-[#060606] border border-white/[0.06] rounded-xl p-5 mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Filters</span>
        <button onClick={onClose} className="text-gray-500 hover:text-white p-1"><X className="w-5 h-5" /></button>
      </div>
      <div>
        <label className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-2 block font-medium">Availability</label>
        <div className="flex flex-wrap gap-2">
          {inventoryStatuses.map(s => (
            <button key={s.value} onClick={() => setInvStatus(s.value)} className={`px-4 py-2.5 rounded-lg text-sm ${invStatus === s.value ? 'bg-red-600/10 text-red-400 border border-red-500/20' : 'text-gray-500 border border-white/[0.08] hover:text-white'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {department !== 'all' && currentCategories.length > 1 && <FilterSelect label="Type" value={category} onChange={setCategory} options={currentCategories} />}
      {department !== 'all' && currentBrands.length > 1 && <FilterSelect label="Brand" value={brand} onChange={setBrand} options={currentBrands} />}
      <FilterSelect label="Condition" value={condition} onChange={setCondition} options={conditions} />
      {activeFilters > 0 && (
        <div className="flex gap-3 pt-2">
          <button onClick={() => { setCategory('All'); setCondition('All'); setBrand('All'); setPriceRange(0); setInvStatus('all'); }} className="flex-1 py-3 text-red-400 text-sm font-medium border border-red-500/30 rounded-lg hover:bg-red-500/10">Clear All</button>
          <button onClick={onClose} className="flex-1 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg">Apply</button>
        </div>
      )}
    </div>
  );
}

function EmptyState({ search, department, onClear }: { search: string; department: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 bg-[#0a0a0a] rounded-full flex items-center justify-center mb-6"><Search className="w-7 h-7 text-gray-600" /></div>
      <h3 className="text-white font-semibold text-lg mb-2">No items found</h3>
      <p className="text-gray-500 text-sm text-center max-w-sm mb-6">{search || department !== 'all' ? "We couldn't find anything matching your criteria." : "We don't have any items in this category right now."}</p>
      <div className="mb-8 p-4 bg-blue-950/20 border border-blue-500/20 rounded-xl text-center">
        <p className="text-white font-medium text-sm mb-1">Can't find it? Buy online and ship it to us.</p>
        <p className="text-gray-400 text-xs">Transfers starting at $25</p>
        <Link href="/ffl-transfer" className="text-blue-400 hover:text-blue-300 text-xs font-semibold mt-2 inline-flex items-center gap-1">Learn about FFL transfers <ArrowRight className="w-3 h-3" /></Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onClear} className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm"><ArrowRight className="w-4 h-4" />Browse All</button>
        <a href="tel:3862264653" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0a0a0a] border border-white/[0.08] text-white rounded-lg font-medium text-sm"><Phone className="w-4 h-4" />Call</a>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
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
  );
}

export default function InventoryClient() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(searchParams?.get('dept') || 'all');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [brand, setBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [invStatus, setInvStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { setCategory('All'); setBrand('All'); }, [department]);

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
      if (USE_PLACEHOLDER_INVENTORY && (!data || data.length === 0)) {
        let filtered = getPlaceholderByDepartment(department === 'all' ? 'firearms' : department);
        if (department !== 'all') filtered = filtered.filter((item: any) => item.department === department);
        if (condition !== 'All') filtered = filtered.filter((item: any) => item.condition === condition);
        if (search) filtered = filtered.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()) || (item.brand && item.brand.toLowerCase().includes(search.toLowerCase())));
        data = filtered;
      }
      setItems(data ?? []);
    } catch {
      setItems(USE_PLACEHOLDER_INVENTORY ? (department === 'all' ? placeholderInventory : getPlaceholderByDepartment(department)) : []);
    }
    setLoading(false);
  }, [search, department, category, condition, brand, priceRange, invStatus, sort]);

  useEffect(() => { const t = setTimeout(fetchItems, 300); return () => clearTimeout(t); }, [fetchItems]);

  const activeFilters = [category, condition, brand, invStatus].filter(f => f !== 'All' && f !== 'all').length + (priceRange > 0 ? 1 : 0) + (department !== 'all' ? 1 : 0);
  const clearFilters = () => { setDepartment('all'); setCategory('All'); setCondition('All'); setBrand('All'); setPriceRange(0); setInvStatus('all'); setSearch(''); };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 sm:pt-28 pb-16 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="mb-6"><h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Browse Inventory</h1></div>
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button onClick={() => setDepartment('all')} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${department === 'all' ? 'bg-red-600 text-white' : 'bg-[#0a0a0a] border border-white/[0.08] text-gray-400'}`}>All Departments</button>
          {departments.map(d => <button key={d.key} onClick={() => setDepartment(d.key)} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${department === d.key ? 'bg-red-600 text-white' : 'bg-[#0a0a0a] border border-white/[0.08] text-gray-400'}`}>{d.label}</button>)}
        </div>
        <div className="flex items-center gap-4 mb-6 px-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-lg">
          <div className="flex items-center gap-2 text-gray-400"><MapPin className="w-4 h-4" /><span className="text-xs font-medium">Local Inventory</span></div>
          <div className="w-px h-4 bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-gray-400"><Clock className="w-4 h-4" /><span className="text-xs font-medium">Same-Day Pickup</span></div>
          <div className="w-px h-4 bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-gray-400"><Phone className="w-4 h-4" /><span className="text-xs font-medium">386-226-4653</span></div>
          <div className="hidden sm:flex flex-1 justify-end"><Link href="/order" className="text-red-400 hover:text-red-300 text-xs font-medium">Don't see it? We can source it →</Link></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <SidebarFilters department={department} category={category} condition={condition} brand={brand} invStatus={invStatus} priceRange={priceRange} activeFilters={activeFilters} currentCategories={currentCategories} currentBrands={currentBrands} setCategory={setCategory} setCondition={setCondition} setBrand={setBrand} setInvStatus={setInvStatus} setPriceRange={setPriceRange} clearFilters={clearFilters} />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={department === 'all' ? 'Search all items...' : `Search ${department}...`} className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl pl-11 pr-4 py-4 text-base text-white placeholder:text-gray-600" />
              </div>
              <div className="flex gap-2">
                <div className="relative hidden sm:block">
                  <select value={sort} onChange={e => setSort(e.target.value)} className="h-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white appearance-none pr-10">
                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-5 py-4 bg-[#0a0a0a] border border-white/[0.08] rounded-xl text-sm text-gray-400">
                  <SlidersHorizontal className="w-5 h-5" />
                  {activeFilters > 0 && <span className="bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFilters}</span>}
                </button>
              </div>
            </div>
            <MobileFilters show={showFilters} department={department} category={category} condition={condition} brand={brand} invStatus={invStatus} priceRange={priceRange} activeFilters={activeFilters} currentCategories={currentCategories} currentBrands={currentBrands} setCategory={setCategory} setCondition={setCondition} setBrand={setBrand} setInvStatus={setInvStatus} setPriceRange={setPriceRange} onClose={() => setShowFilters(false)} />
            <div className="sm:hidden mb-4">
              <select value={sort} onChange={e => setSort(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white appearance-none">
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            {loading ? <LoadingSkeleton /> : items.length === 0 ? <EmptyState search={search} department={department} onClear={() => { setDepartment('all'); setSearch(''); }} /> : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3"><span className="text-white font-semibold text-lg">{items.length}</span><span className="text-gray-500 text-sm">item{items.length !== 1 ? 's' : ''} found</span></div>
                  <button onClick={() => { setDepartment('all'); setSearch(''); }} className="text-gray-500 hover:text-white text-sm hidden sm:block">View all inventory</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {items.map((item: any, i: number) => <ProductCard key={item?.id ?? i} item={item} index={i} />)}
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