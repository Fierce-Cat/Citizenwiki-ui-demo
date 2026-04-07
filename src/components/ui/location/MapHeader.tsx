import React from 'react';
import { Map as MapIcon } from 'lucide-react';

export function MapHeader() {
  return (
    <section className="relative h-[200px] md:h-[280px] w-full bg-[#f8fafc] border-b border-slate-100 p-4 md:p-8 overflow-hidden">
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
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center scale-75 md:scale-100">
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

      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 space-y-1">
        <p className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest">COORD: 18.0.2.1 - 42.4.9</p>
        <div className="flex items-center gap-2">
          <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#10B981]"></span>
          <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Airspace</span>
        </div>
      </div>

      <button className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-gradient-to-br from-[#0054c5] to-[#2b6de5] text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-[8px] md:text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-blue-200/50 transition-all hover:opacity-90">
        <MapIcon className="w-3 md:w-4 h-3 md:h-4" />
        EXPAND STARMAP
      </button>
    </section>
  );
}

