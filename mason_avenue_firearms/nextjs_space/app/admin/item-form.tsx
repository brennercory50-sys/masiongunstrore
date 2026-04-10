'use client';

import React from 'react';
import { X, Loader2, Save } from 'lucide-react';
import { departments, categoryMap } from '@/lib/departments';

interface ItemFormProps {
  show: boolean;
  editingItem: any;
  formData: any;
  currentCategories: string[];
  onClose: () => void;
  onChange: (data: any) => void;
  onSave: () => void;
  saving: boolean;
}

export function ItemFormModal({ show, editingItem, formData, currentCategories, onClose, onChange, onSave, saving }: ItemFormProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#060606] rounded-lg border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Name *</label>
              <input type="text" value={formData?.name ?? ''} onChange={(e: any) => onChange({ ...formData, name: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Brand *</label>
              <input type="text" value={formData?.brand ?? ''} onChange={(e: any) => onChange({ ...formData, brand: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Price *</label>
              <input type="number" step="0.01" value={formData?.price ?? 0} onChange={(e: any) => onChange({ ...formData, price: e?.target?.value ?? 0 })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Department</label>
              <select value={formData?.department ?? 'firearms'} onChange={(e: any) => { const dept = e?.target?.value ?? 'firearms'; const cats = categoryMap[dept] || []; onChange({ ...formData, department: dept, category: (cats[0] || 'other').toLowerCase() }); }} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white">
                {departments.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
              <select value={formData?.category ?? ''} onChange={(e: any) => onChange({ ...formData, category: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white">
                {currentCategories.map((c: string) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Condition</label>
              <select value={formData?.condition ?? 'New'} onChange={(e: any) => onChange({ ...formData, condition: e?.target?.value ?? 'New' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white">
                {['New','Like New','Excellent','Good','Fair'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Caliber</label>
              <input type="text" value={formData?.caliber ?? ''} onChange={(e: any) => onChange({ ...formData, caliber: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" placeholder={formData?.department === 'firearms' ? 'e.g. 9mm' : 'N/A'} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">SKU</label>
              <input type="text" value={formData?.sku ?? ''} onChange={(e: any) => onChange({ ...formData, sku: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
              <select value={formData?.status ?? 'available'} onChange={(e: any) => onChange({ ...formData, status: e?.target?.value ?? 'available' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white">
                <option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Inventory Status</label>
              <select value={formData?.inventoryStatus ?? 'in_stock'} onChange={(e: any) => onChange({ ...formData, inventoryStatus: e?.target?.value ?? 'in_stock' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white">
                <option value="in_stock">In Stock</option><option value="available_to_order">Available to Order</option><option value="sourced">Source</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Tag</label>
              <select value={formData?.tag ?? ''} onChange={(e: any) => onChange({ ...formData, tag: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white">
                <option value="">None</option><option value="just_in">Just In</option><option value="hot">Hot</option><option value="rare">Rare</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData?.featured ?? false} onChange={(e: any) => onChange({ ...formData, featured: e?.target?.checked ?? false })} className="w-4 h-4 rounded border-white/10 bg-black accent-red-600" />
                <span className="text-sm text-gray-400">Featured Item</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Image URL *</label>
            <input type="text" value={formData?.imageUrl ?? ''} onChange={(e: any) => onChange({ ...formData, imageUrl: e?.target?.value ?? '' })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Description *</label>
            <textarea value={formData?.description ?? ''} onChange={(e: any) => onChange({ ...formData, description: e?.target?.value ?? '' })} rows={4} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-base text-white placeholder:text-gray-600 resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onSave} disabled={saving} className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Item'}
            </button>
            <button onClick={onClose} className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}