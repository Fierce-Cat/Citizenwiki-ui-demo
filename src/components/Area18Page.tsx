import React from 'react';
import {
  Map as MapIcon,
  Share2,
  Download,
  MapPin,
  Wind,
  Building2,
  Shield,
  Circle
} from 'lucide-react';

export default function Area18Page() {
  return (
    <>
      {/* Main Content Area */}
      <main className="flex-1 bg-surface-container-lowest overflow-y-auto">
        <div className="max-w-[960px] mx-auto w-full">
          {/* Interactive Map Header Section */}
          <section className="relative h-[280px] w-full bg-[#f8fafc] border-b border-slate-100 p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-blue-500 rounded-full animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-slate-300 rounded-full"></div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-16 border border-slate-200 rounded-lg flex items-center justify-center relative">
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-slate-300"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-slate-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-slate-300"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-slate-300"></div>
                <div className="text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Target Lock</p>
                  <p className="text-[10px] font-black text-slate-800 uppercase">AREA 18 [ARC]</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 space-y-1">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">COORD: 18.0.2.1 - 42.4.9</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Airspace</span>
              </div>
            </div>

            <button className="absolute bottom-8 right-8 bg-gradient-to-br from-[#0054c5] to-[#2b6de5] text-white px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-blue-200/50 transition-all hover:opacity-90">
              <MapIcon className="w-4 h-4" />
              EXPAND STARMAP
            </button>
          </section>

          {/* Title & Actions Bar */}
          <div className="px-12 py-10 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-6xl font-bold font-display tracking-tighter text-[#1e293b]">AREA 18</h1>
              <div className="flex items-center gap-4">
                <span className="bg-surface-container-low text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-outline-variant/15">LANDING ZONE</span>
                <div className="flex items-center gap-2">
                  <Circle className="w-2.5 h-2.5 text-[#10B981] fill-current" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SECURE AIRSPACE</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-surface-container-low text-[#1e293b] p-2 rounded-full border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="bg-surface-container-low text-[#1e293b] p-2 rounded-full border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description Snippet */}
          <div className="px-12 pb-12">
            <p className="text-[#64748b] leading-relaxed text-lg max-w-3xl">
              Area 18 serves as the massive commercial heart of <span className="text-primary font-bold">ArcCorp</span>, a planet almost entirely covered by industrial and corporate infrastructure. Originally established as a central hub for the company's research and development, it has evolved into one of the most bustling trade and transit ports in the Stanton system.
            </p>
          </div>

          {/* Data Cards Grid */}
          <div className="px-12 grid grid-cols-2 gap-6">
            {/* Spatial Data Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-8 shadow-[0_8px_24px_rgba(23,28,33,0.04)] space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <MapPin className="w-4 h-4" /> Spatial Data
                </h3>
                <span className="text-[8px] font-bold text-slate-300 tracking-widest uppercase">Verified Data</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Planet</p>
                  <p className="text-sm font-bold text-slate-800">ArcCorp</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">System</p>
                  <p className="text-sm font-bold text-slate-800">Stanton</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-bold text-slate-800">Riker Memorial Spaceport</p>
                </div>
              </div>
            </div>

            {/* Atmospherics Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-8 shadow-[0_8px_24px_rgba(23,28,33,0.04)] space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <Wind className="w-4 h-4" /> Atmospherics
                </h3>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                  <span className="w-1 h-1 bg-blue-100 rounded-full"></span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Pressure</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">1.0 G (Artificial)</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Atmosphere</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                    <p className="text-sm font-bold text-slate-800 leading-tight">Breathable</p>
                  </div>
                </div>
                <div className="col-span-2 mt-2">
                  <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Temp Range</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">-15°C / +45°C</p>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <section className="px-12 py-16 space-y-8">
            <h3 className="font-sans text-sm font-black uppercase tracking-[0.3em] text-slate-800 border-b border-slate-100 pb-4">
              BACKGROUND & HISTORY
            </h3>
            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-slate-500 leading-relaxed text-[15px] font-normal">
                Area 18 serves as the massive commercial heart of <span className="text-primary font-semibold">ArcCorp</span>, a planet almost entirely covered by industrial and corporate infrastructure. Originally established as a central hub for the company's research and development, it has evolved into one of the most bustling trade and transit ports in the Stanton system.
              </p>
              <p className="text-slate-500 leading-relaxed text-[15px] font-normal">
                Known for its iconic neon-soaked skyline and the massive holographic advertisements that dominate the clouds, the zone offers a unique blend of high-end corporate luxury and gritty industrial reality. From the Riker Memorial Spaceport, thousands of vessels depart daily, carrying everything from refined ores to top-tier quantum components. The Archive notes that despite the dense population, the automated security systems maintained by ArcCorp keep the landing zone one of the safest commercial environments in known space.
              </p>
            </div>
          </section>

          <div className="px-12 pb-24">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(23,28,33,0.06)] border border-outline-variant/15">
              <img alt="Area 18 cityscape" className="w-full h-80 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCylhtCpksW-em_O-W15BEaZknnKXV9C1C0heYY3wNXkMb3IuOdQDt57vwv1haEdghB02_JbP1YCoqRYKEY5yLk_vNZq7XFyU01YSEsQW4BIxtawq0ZFfM1QiiJ3FjDflWTPdT6fAsxczljig1JMCRPfKkwJ6wJCNeNRxk2besXGUvvaNfk-1ZbZxC3-2SUBR-SHSGNUWMRo1NwKrJbaxZpO8LXb5eotNgf3dWd03nmHFchx3qp0Ss4fPvSdW9X8J5QHHjlLD5idEi5" referrerPolicy="no-referrer" />
              <div className="p-4 bg-surface-container-low text-[10px] text-slate-500 italic">
                Fig 1.2: Panoramic view of the Zone 3 central district during dusk.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Context Sidebar */}
      <aside className="w-80 bg-background border-l border-outline-variant/20 flex flex-col py-8 px-6 space-y-8 overflow-y-auto shrink-0">
        {/* Section Guide */}
        <section className="space-y-4">
          <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Section Guide</h4>
          <div className="grid grid-cols-2 gap-2">
            <a className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/15 hover:border-primary/40 hover:bg-primary/5 transition-all group shadow-sm" href="#">
              <p className="text-[8px] font-bold text-slate-400 mb-0.5">01</p>
              <p className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Overview</p>
            </a>
            <a className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/15 hover:border-primary/40 hover:bg-primary/5 transition-all group shadow-sm" href="#">
              <p className="text-[8px] font-bold text-slate-400 mb-0.5">02</p>
              <p className="text-[10px] font-bold text-on-surface uppercase tracking-wider">History</p>
            </a>
            <a className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/15 hover:border-primary/40 hover:bg-primary/5 transition-all group shadow-sm" href="#">
              <p className="text-[8px] font-bold text-slate-400 mb-0.5">03</p>
              <p className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Logistics</p>
            </a>
            <a className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/15 hover:border-primary/40 hover:bg-primary/5 transition-all group shadow-sm" href="#">
              <p className="text-[8px] font-bold text-slate-400 mb-0.5">04</p>
              <p className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Security</p>
            </a>
          </div>
        </section>

        {/* Affiliations */}
        <section className="space-y-4">
          <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Affiliations</h4>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-sm">
            <div className="p-4 flex items-center gap-4 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center border border-outline-variant/15 shadow-sm">
                <Building2 className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">ArcCorp</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Primary Governor</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center border border-outline-variant/15 shadow-sm">
                <Shield className="text-secondary w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Centurion Defense</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Private Security</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Facilities */}
        <section className="space-y-4">
          <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#8e9aaf]">Nearby Facilities</h4>
          <div className="space-y-5 px-1">
            <div className="flex items-start gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
              <div>
                <p className="text-[13px] font-bold text-[#334155] leading-tight">Voyager Bar</p>
                <p className="text-[11px] text-[#94a3b8]">Social Hub • Cloudview Center</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
              <div>
                <p className="text-[13px] font-bold text-[#334155] leading-tight">Green Circle Habitation</p>
                <p className="text-[11px] text-[#94a3b8]">Lodging • Providence</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
              <div>
                <p className="text-[13px] font-bold text-[#334155] leading-tight">Crusader Showroom</p>
                <p className="text-[11px] text-[#94a3b8]">Retail • Cloudview Center</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-40">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5"></span>
              <div>
                <p className="text-[13px] font-bold text-[#334155] leading-tight">Cousin Crow's (Closed)</p>
                <p className="text-[11px] text-[#94a3b8]">Repair • Industrial</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Traffic Data */}
        <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-6">
              <h5 className="text-[10px] font-bold text-[#475569] uppercase tracking-widest">Live Traffic Data</h5>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-[#1e293b]">1,402</p>
                <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">Arrivals (24h)</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
              <div className="absolute -bottom-4 left-0 right-0 flex items-end justify-center gap-[2px] h-8">
                <div className="w-1.5 bg-primary/20 h-3"></div>
                <div className="w-1.5 bg-primary/40 h-5"></div>
                <div className="w-1.5 bg-primary/20 h-2"></div>
                <div className="w-1.5 bg-primary h-8"></div>
                <div className="w-1.5 bg-primary/60 h-4"></div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
            <span className="text-[11px] text-[#94a3b8] font-medium">Status</span>
            <span className="text-[11px] font-bold text-[#10B981] tracking-widest uppercase">Nominal</span>
          </div>
        </div>
      </aside>
    </>
  );
}
