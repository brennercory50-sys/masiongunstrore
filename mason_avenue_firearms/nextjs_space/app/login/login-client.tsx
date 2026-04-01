'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Loader2, AlertCircle } from 'lucide-react';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setError('');
    setLoading(true);
    try {
      const result = await signIn?.('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.replace('/admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Shield className="w-10 h-10 text-red-600 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Mason Avenue Firearms & Pawn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
            <input
              type="email" value={email} onChange={(e: any) => setEmail(e?.target?.value ?? '')}
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600/50 transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
            <input
              type="password" value={password} onChange={(e: any) => setPassword(e?.target?.value ?? '')}
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
