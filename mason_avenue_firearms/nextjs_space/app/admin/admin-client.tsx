'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Package, DollarSign, Search as SearchIcon, Plus, Edit, Trash2, Eye,
  Loader2, X, Save, AlertCircle, CheckCircle, ChevronDown,
  LayoutGrid, FileText, MessageSquare, Banknote
} from 'lucide-react';
import Navbar from '../components/navbar';
import { departments, categoryMap } from '@/lib/departments';

type Tab = 'inventory' | 'sell-requests' | 'item-requests' | 'pawn-requests';

export default function AdminClient() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('inventory');
  const [items, setItems] = useState<any[]>([]);
  const [sellRequests, setSellRequests] = useState<any[]>([]);
  const [itemRequests, setItemRequests] = useState<any[]>([]);
  const [pawnRequests, setPawnRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const isAdmin = (session?.user as any)?.role === 'admin';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'inventory') {
        const res = await fetch('/api/inventory?status=all');
        const data = await res.json();
        setItems(data ?? []);
      } else if (activeTab === 'sell-requests') {
        const res = await fetch('/api/sell-request');
        const data = await res.json();
        setSellRequests(data ?? []);
      } else if (activeTab === 'pawn-requests') {
        const res = await fetch('/api/pawn-request');
        const data = await res.json();
        setPawnRequests(data ?? []);
      } else {
        const res = await fetch('/api/item-request');
        const data = await res.json();
        setItemRequests(data ?? []);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  const defaultFormData = {
    name: '', brand: '', price: 0, department: 'firearms', category: 'handgun', condition: 'New',
    description: '', imageUrl: '', caliber: '', tag: '', status: 'available',
    inventoryStatus: 'in_stock', featured: false, sku: '',
  };
  const [formData, setFormData] = useState<any>(defaultFormData);

  const openNewItem = () => {
    setEditingItem(null);
    setFormData({ ...defaultFormData });
    setShowForm(true);
  };

  const openEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item?.name ?? '', brand: item?.brand ?? '', price: item?.price ?? 0,
      department: item?.department ?? 'firearms',
      category: item?.category ?? 'handgun', condition: item?.condition ?? 'New',
      description: item?.description ?? '', imageUrl: item?.imageUrl ?? '',
      caliber: item?.caliber ?? '', tag: item?.tag ?? '', status: item?.status ?? 'available',
      inventoryStatus: item?.inventoryStatus ?? 'in_stock', featured: item?.featured ?? false, sku: item?.sku ?? '',
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...(formData ?? {}),
        price: parseFloat(formData?.price) || 0,
        featured: formData?.featured ?? false,
        tag: formData?.tag || null,
      };
      const url = editingItem ? `/api/inventory/${editingItem?.id}` : '/api/inventory';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res?.ok) {
        setMessage({ type: 'success', text: editingItem ? 'Item updated!' : 'Item added!' });
        setShowForm(false);
        fetchData();
      } else {
        setMessage({ type: 'error', text: 'Failed to save item' });
      }
    } catch (err: any) {
      console.error('Save error:', err);
      setMessage({ type: 'error', text: 'Failed to save item' });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' });
      if (res?.ok) {
        setMessage({ type: 'success', text: 'Item deleted' });
        fetchData();
      }
    } catch (err: any) {
      console.error('Delete error:', err);
    }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const currentCategories = categoryMap[formData?.department] || categoryMap.firearms;

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-500">Unauthorized. Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 pb-16 max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          {activeTab === 'inventory' && (
            <button onClick={openNewItem} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          )}
        </div>

        {/* Message */}
        {message?.text && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${message?.type === 'success' ? 'bg-green-600/10 border border-green-600/20 text-green-400' : 'bg-red-600/10 border border-red-600/20 text-red-400'}`}>
            {message?.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message?.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#060606] rounded-lg p-1 border border-white/[0.06] overflow-x-auto">
          {[
            { key: 'inventory' as Tab, label: 'Inventory', icon: <LayoutGrid className="w-4 h-4" /> },
            { key: 'sell-requests' as Tab, label: 'Sell', icon: <DollarSign className="w-4 h-4" /> },
            { key: 'item-requests' as Tab, label: 'Requests', icon: <MessageSquare className="w-4 h-4" /> },
            { key: 'pawn-requests' as Tab, label: 'Pawn', icon: <Banknote className="w-4 h-4" /> },
          ]?.map?.((tab: any) => (
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab?.key ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab?.icon}
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left text-xs text-gray-500 uppercase tracking-wider py-3 px-3">Item</th>
                      <th className="text-left text-xs text-gray-500 uppercase tracking-wider py-3 px-3 hidden md:table-cell">Dept</th>
                      <th className="text-left text-xs text-gray-500 uppercase tracking-wider py-3 px-3 hidden md:table-cell">Category</th>
                      <th className="text-left text-xs text-gray-500 uppercase tracking-wider py-3 px-3">Price</th>
                      <th className="text-left text-xs text-gray-500 uppercase tracking-wider py-3 px-3 hidden md:table-cell">Status</th>
                      <th className="text-right text-xs text-gray-500 uppercase tracking-wider py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(items ?? [])?.map?.((item: any) => (
                      <tr key={item?.id} className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#1a1a1a] rounded overflow-hidden relative shrink-0">
                              {item?.imageUrl && (
                                <img src={item.imageUrl} alt={item?.name ?? ''} className="w-full h-full object-contain" />
                              )}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium truncate max-w-[200px]">{item?.name}</p>
                              <p className="text-gray-500 text-xs">{item?.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-400 text-sm capitalize hidden md:table-cell">{item?.department || 'firearms'}</td>
                        <td className="py-3 px-3 text-gray-400 text-sm capitalize hidden md:table-cell">{item?.category}</td>
                        <td className="py-3 px-3 text-white text-sm font-medium">${item?.price?.toLocaleString?.() ?? '0'}</td>
                        <td className="py-3 px-3 hidden md:table-cell">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item?.status === 'available' ? 'bg-green-600/10 text-green-400' :
                            item?.status === 'sold' ? 'bg-gray-600/10 text-gray-400' :
                            'bg-amber-600/10 text-amber-400'
                          }`}>{item?.status}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <button onClick={() => openEditItem(item)} className="p-2 text-gray-500 hover:text-white transition-colors" aria-label="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item?.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors" aria-label="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SELL REQUESTS TAB */}
            {activeTab === 'sell-requests' && (
              <div className="space-y-3">
                {(sellRequests ?? [])?.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">No sell requests yet</p>
                ) : (
                  (sellRequests ?? [])?.map?.((req: any) => (
                    <div key={req?.id} className="bg-[#060606] rounded-lg p-5 border border-white/[0.06]">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{req?.name}</h3>
                          <p className="text-gray-500 text-xs">{req?.email} \u2022 {req?.phone}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${req?.status === 'pending' ? 'bg-amber-600/10 text-amber-400' : 'bg-green-600/10 text-green-400'}`}>
                          {req?.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm"><strong>Type:</strong> {req?.firearmType} \u2022 <strong>Condition:</strong> {req?.condition}</p>
                      <p className="text-gray-400 text-sm mt-1">{req?.description}</p>
                      <p className="text-gray-600 text-xs mt-2">Photos: {req?.photoUrls?.length ?? 0} uploaded \u2022 {new Date(req?.createdAt)?.toLocaleDateString?.() ?? 'N/A'}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ITEM REQUESTS TAB */}
            {activeTab === 'item-requests' && (
              <div className="space-y-3">
                {(itemRequests ?? [])?.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">No item requests yet</p>
                ) : (
                  (itemRequests ?? [])?.map?.((req: any) => (
                    <div key={req?.id} className="bg-[#060606] rounded-lg p-5 border border-white/[0.06]">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{req?.name}</h3>
                          <p className="text-gray-500 text-xs">{req?.email} \u2022 {req?.phone}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${req?.status === 'pending' ? 'bg-amber-600/10 text-amber-400' : 'bg-green-600/10 text-green-400'}`}>
                          {req?.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm"><strong>Looking for:</strong> {req?.itemType} {req?.brand ? `\u2022 ${req.brand}` : ''} {req?.model ? `\u2022 ${req.model}` : ''}</p>
                      <p className="text-gray-400 text-sm mt-1">{req?.description}</p>
                      {req?.budget && <p className="text-gray-500 text-xs mt-1">Budget: {req.budget}</p>}
                      <p className="text-gray-600 text-xs mt-2">{new Date(req?.createdAt)?.toLocaleDateString?.() ?? 'N/A'}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PAWN REQUESTS TAB */}
            {activeTab === 'pawn-requests' && (
              <div className="space-y-3">
                {(pawnRequests ?? [])?.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">No pawn loan requests yet</p>
                ) : (
                  (pawnRequests ?? [])?.map?.((req: any) => (
                    <div key={req?.id} className="bg-[#060606] rounded-lg p-5 border border-white/[0.06]">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{req?.name}</h3>
                          <p className="text-gray-500 text-xs">{req?.email} \u2022 {req?.phone}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${req?.status === 'pending' ? 'bg-amber-600/10 text-amber-400' : 'bg-green-600/10 text-green-400'}`}>
                          {req?.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm"><strong>Item Type:</strong> {req?.itemType}</p>
                      <p className="text-gray-400 text-sm mt-1">{req?.description}</p>
                      <p className="text-gray-600 text-xs mt-2">Photos: {req?.photoUrls?.length ?? 0} uploaded \u2022 {new Date(req?.createdAt)?.toLocaleDateString?.() ?? 'N/A'}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* Item Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-[#060606] rounded-lg border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Name *</label>
                    <input type="text" value={formData?.name ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), name: e?.target?.value ?? '' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Brand *</label>
                    <input type="text" value={formData?.brand ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), brand: e?.target?.value ?? '' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Price *</label>
                    <input type="number" step="0.01" value={formData?.price ?? 0} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), price: e?.target?.value ?? 0 }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Department</label>
                    <select value={formData?.department ?? 'firearms'} onChange={(e: any) => {
                      const dept = e?.target?.value ?? 'firearms';
                      const cats = categoryMap[dept] || [];
                      setFormData((p: any) => ({ ...(p ?? {}), department: dept, category: (cats[0] || 'other').toLowerCase() }));
                    }}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50">
                      {departments.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Category</label>
                    <select value={formData?.category ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), category: e?.target?.value ?? '' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50">
                      {currentCategories.map((c: string) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Condition</label>
                    <select value={formData?.condition ?? 'New'} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), condition: e?.target?.value ?? 'New' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50">
                      {['New','Like New','Excellent','Good','Fair']?.map?.((c: string) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Caliber</label>
                    <input type="text" value={formData?.caliber ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), caliber: e?.target?.value ?? '' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50"
                      placeholder={formData?.department === 'firearms' ? 'e.g. 9mm' : 'N/A'} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">SKU</label>
                    <input type="text" value={formData?.sku ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), sku: e?.target?.value ?? '' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Status</label>
                    <select value={formData?.status ?? 'available'} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), status: e?.target?.value ?? 'available' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50">
                      <option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Inventory Status</label>
                    <select value={formData?.inventoryStatus ?? 'in_stock'} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), inventoryStatus: e?.target?.value ?? 'in_stock' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50">
                      <option value="in_stock">In Stock (Physical)</option><option value="available_to_order">Available to Order (Distributor)</option><option value="sourced">Request / Source</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Tag</label>
                    <select value={formData?.tag ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), tag: e?.target?.value ?? '' }))}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50">
                      <option value="">None</option><option value="just_in">Just In</option><option value="hot">Hot</option><option value="rare">Rare</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData?.featured ?? false} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), featured: e?.target?.checked ?? false }))}
                        className="w-4 h-4 rounded border-white/10 bg-black accent-red-600" />
                      <span className="text-sm text-gray-400">Featured Item</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Image URL *</label>
                  <input type="text" value={formData?.imageUrl ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), imageUrl: e?.target?.value ?? '' }))}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50"
                    placeholder="https://..." />
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Description *</label>
                  <textarea value={formData?.description ?? ''} onChange={(e: any) => setFormData((p: any) => ({ ...(p ?? {}), description: e?.target?.value ?? '' }))}
                    rows={3} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-600/50 resize-none" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} disabled={saving}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Item'}
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
