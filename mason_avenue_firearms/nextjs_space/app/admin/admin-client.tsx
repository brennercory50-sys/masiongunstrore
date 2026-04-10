'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/navbar';
import { ItemFormModal } from './item-form';
import { categoryMap } from '@/lib/departments';

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

  const defaultFormData = { name: '', brand: '', price: 0, department: 'firearms', category: 'handgun', condition: 'New', description: '', imageUrl: '', caliber: '', tag: '', status: 'available', inventoryStatus: 'in_stock', featured: false, sku: '' };
  const [formData, setFormData] = useState<any>(defaultFormData);

  useEffect(() => { if (status === 'unauthenticated') router.replace('/login'); }, [status, router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'inventory') {
        const res = await fetch('/api/inventory?status=all');
        setItems(await res.json() ?? []);
      } else if (activeTab === 'sell-requests') {
        const res = await fetch('/api/sell-request');
        setSellRequests(await res.json() ?? []);
      } else if (activeTab === 'pawn-requests') {
        const res = await fetch('/api/pawn-request');
        setPawnRequests(await res.json() ?? []);
      } else {
        const res = await fetch('/api/item-request');
        setItemRequests(await res.json() ?? []);
      }
    } catch (err) { console.error('Fetch error:', err); }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => { if (isAdmin) fetchData(); }, [isAdmin, fetchData]);

  const openNewItem = () => { setEditingItem(null); setFormData({ ...defaultFormData }); setShowForm(true); };
  const openEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({ name: item?.name ?? '', brand: item?.brand ?? '', price: item?.price ?? 0, department: item?.department ?? 'firearms', category: item?.category ?? 'handgun', condition: item?.condition ?? 'New', description: item?.description ?? '', imageUrl: item?.imageUrl ?? '', caliber: item?.caliber ?? '', tag: item?.tag ?? '', status: item?.status ?? 'available', inventoryStatus: item?.inventoryStatus ?? 'in_stock', featured: item?.featured ?? false, sku: item?.sku ?? '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...(formData ?? {}), price: parseFloat(formData?.price) || 0, featured: formData?.featured ?? false, tag: formData?.tag || null };
      const url = editingItem ? `/api/inventory/${editingItem?.id}` : '/api/inventory';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res?.ok) {
        setMessage({ type: 'success', text: editingItem ? 'Item updated!' : 'Item added!' });
        setShowForm(false);
        fetchData();
      } else { setMessage({ type: 'error', text: 'Failed to save item' }); }
    } catch { setMessage({ type: 'error', text: 'Failed to save item' }); }
    setSaving(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' });
      if (res?.ok) { setMessage({ type: 'success', text: 'Item deleted' }); fetchData(); }
    } catch { console.error('Delete error'); }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (status === 'loading' || !isAdmin) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 text-red-500 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 pb-16 max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          {activeTab === 'inventory' && <button onClick={openNewItem} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"><Plus className="w-4 h-4" />Add Item</button>}
        </div>
        {message?.text && <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${message?.type === 'success' ? 'bg-green-600/10 border border-green-600/20 text-green-400' : 'bg-red-600/10 border border-red-600/20 text-red-400'}`}>{message?.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}{message?.text}</div>}
        <div className="flex gap-1 mb-6 bg-[#060606] rounded-lg p-1 border border-white/[0.06] overflow-x-auto">
          {[
            { key: 'inventory' as Tab, label: 'Inventory' },
            { key: 'sell-requests' as Tab, label: 'Sell' },
            { key: 'item-requests' as Tab, label: 'Requests' },
            { key: 'pawn-requests' as Tab, label: 'Pawn' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap ${activeTab === tab.key ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>{tab.label}</button>
          ))}
        </div>
        {loading ? <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-red-500 animate-spin" /></div> : (
          <>
            {activeTab === 'inventory' && <InventoryTable items={items} onEdit={openEditItem} onDelete={handleDelete} />}
            {activeTab === 'sell-requests' && <RequestList requests={sellRequests} type="sell" />}
            {activeTab === 'item-requests' && <RequestList requests={itemRequests} type="item" />}
            {activeTab === 'pawn-requests' && <RequestList requests={pawnRequests} type="pawn" />}
          </>
        )}
      </div>
      <ItemFormModal show={showForm} editingItem={editingItem} formData={formData} currentCategories={categoryMap[formData?.department] || []} onClose={() => setShowForm(false)} onChange={setFormData} onSave={handleSave} saving={saving} />
    </div>
  );
}

function InventoryTable({ items, onEdit, onDelete }: { items: any[]; onEdit: (i: any) => void; onDelete: (id: string) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead><tr className="border-b border-white/[0.06]">
          <th className="text-left text-xs text-gray-500 uppercase py-3 px-3">Item</th>
          <th className="text-left text-xs text-gray-500 uppercase py-3 px-3 hidden md:table-cell">Dept</th>
          <th className="text-left text-xs text-gray-500 uppercase py-3 px-3 hidden md:table-cell">Category</th>
          <th className="text-left text-xs text-gray-500 uppercase py-3 px-3">Price</th>
          <th className="text-left text-xs text-gray-500 uppercase py-3 px-3 hidden md:table-cell">Status</th>
          <th className="text-right text-xs text-gray-500 uppercase py-3 px-3">Actions</th>
        </tr></thead>
        <tbody>
          {items.map(item => (
            <tr key={item?.id} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
              <td className="py-3 px-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded overflow-hidden">{item?.imageUrl && <img src={item.imageUrl} alt="" className="w-full h-full object-contain" />}</div>
                  <div><p className="text-white text-sm truncate max-w-[200px]">{item?.name}</p><p className="text-gray-500 text-xs">{item?.brand}</p></div>
                </div>
              </td>
              <td className="py-3 px-3 text-gray-400 text-sm capitalize hidden md:table-cell">{item?.department || 'firearms'}</td>
              <td className="py-3 px-3 text-gray-400 text-sm capitalize hidden md:table-cell">{item?.category}</td>
              <td className="py-3 px-3 text-white text-sm font-medium">${item?.price?.toLocaleString?.() ?? '0'}</td>
              <td className="py-3 px-3 hidden md:table-cell"><span className={`text-xs px-2 py-1 rounded ${item?.status === 'available' ? 'bg-green-600/10 text-green-400' : item?.status === 'sold' ? 'bg-gray-600/10 text-gray-400' : 'bg-amber-600/10 text-amber-400'}`}>{item?.status}</span></td>
              <td className="py-3 px-3 text-right"><div className="flex items-center gap-1 justify-end"><button onClick={() => onEdit(item)} className="p-2 text-gray-500 hover:text-white"><Edit className="w-4 h-4" /></button><button onClick={() => onDelete(item?.id)} className="p-2 text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RequestList({ requests, type }: { requests: any[]; type: string }) {
  const getLabel = (r: any) => type === 'sell' ? <><strong>Type:</strong> {r?.firearmType} • <strong>Condition:</strong> {r?.condition}</> : type === 'pawn' ? <><strong>Item:</strong> {r?.itemType}</> : <><strong>Looking for:</strong> {r?.itemType} {r?.brand ? `• ${r.brand}` : ''} {r?.model ? `• ${r.model}` : ''}</>;
  return (
    <div className="space-y-3">
      {requests?.length === 0 ? <p className="text-gray-500 text-center py-10">No {type} requests</p> : requests?.map((req: any) => (
        <div key={req?.id} className="bg-[#060606] rounded-lg p-5 border border-white/[0.06]">
          <div className="flex items-start justify-between mb-3">
            <div><h3 className="text-white font-semibold">{req?.name}</h3><p className="text-gray-500 text-xs">{req?.email} • {req?.phone}</p></div>
            <span className={`text-xs px-2 py-1 rounded ${req?.status === 'pending' ? 'bg-amber-600/10 text-amber-400' : 'bg-green-600/10 text-green-400'}`}>{req?.status}</span>
          </div>
          <p className="text-gray-400 text-sm">{getLabel(req)}</p>
          <p className="text-gray-400 text-sm mt-1">{req?.description}</p>
          <p className="text-gray-600 text-xs mt-2">{type === 'sell' || type === 'pawn' ? `Photos: ${req?.photoUrls?.length ?? 0} • ` : ''}{new Date(req?.createdAt)?.toLocaleDateString?.() ?? 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}