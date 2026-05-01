export default function PreviewPage() {
  return (
    <div className="text-white font-sans">

      {/* ── OPTION 1: Dark Charcoal Gradient ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'linear-gradient(160deg, #1c1c1c 0%, #111111 40%, #0a0a0a 100%)' }}
      >
        <div className="mb-6 px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-widest uppercase text-white/50">Option 1</div>
        <h1 className="text-4xl font-bold mb-3">Dark Charcoal Gradient</h1>
        <p className="text-gray-400 max-w-sm">Warm charcoal fading to near-black. Subtle depth, clean and professional.</p>
        <div className="mt-8 flex gap-3">
          <div className="px-6 py-3 bg-red-600 rounded-xl text-sm font-semibold">Call Now</div>
          <div className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold">Browse Inventory</div>
        </div>
      </section>

      {/* ── OPTION 2: Red Glow ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
        style={{ background: '#08080a' }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(200,20,20,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(120,0,0,0.1) 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <div className="mb-6 px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-widest uppercase text-white/50">Option 2</div>
          <h1 className="text-4xl font-bold mb-3">Red Glow</h1>
          <p className="text-gray-400 max-w-sm">Dark background with a dramatic red radial glow — bold, intense, matches your brand.</p>
          <div className="mt-8 flex gap-3 justify-center">
            <div className="px-6 py-3 bg-red-600 rounded-xl text-sm font-semibold">Call Now</div>
            <div className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold">Browse Inventory</div>
          </div>
        </div>
      </section>

      {/* ── OPTION 3: Dark Dot Grid ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #0a0a0a 80%)' }} />
        <div className="relative z-10">
          <div className="mb-6 px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-widest uppercase text-white/50">Option 3</div>
          <h1 className="text-4xl font-bold mb-3">Dark Dot Grid</h1>
          <p className="text-gray-400 max-w-sm">Subtle dot pattern over near-black — tactical, technical, unique texture.</p>
          <div className="mt-8 flex gap-3 justify-center">
            <div className="px-6 py-3 bg-red-600 rounded-xl text-sm font-semibold">Call Now</div>
            <div className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold">Browse Inventory</div>
          </div>
        </div>
      </section>

      {/* ── OPTION 4: Blurred Gun Photo ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.78)' }} />
        <div className="relative z-10">
          <div className="mb-6 px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-widest uppercase text-white/50">Option 4</div>
          <h1 className="text-4xl font-bold mb-3">Blurred Gun Photo</h1>
          <p className="text-gray-400 max-w-sm">Your firearms photo, heavily blurred and darkened — ties the whole site together with your brand imagery.</p>
          <div className="mt-8 flex gap-3 justify-center">
            <div className="px-6 py-3 bg-red-600 rounded-xl text-sm font-semibold">Call Now</div>
            <div className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold">Browse Inventory</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-black text-center py-8 text-gray-500 text-sm">
        Tell me which option you want — 1, 2, 3, or 4 — and I&apos;ll apply it to every page.
      </div>

    </div>
  );
}
