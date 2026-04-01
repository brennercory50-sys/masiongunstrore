import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <p className="text-gray-500 text-sm mb-8">Page not found</p>
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
