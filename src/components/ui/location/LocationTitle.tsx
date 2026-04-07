import React from 'react';
import { Share2, Download, Circle } from 'lucide-react';

export function LocationTitle() {
  return (
    <div className="px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tighter text-[#1e293b]">AREA 18</h1>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <span className="bg-surface-container-low text-slate-500 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase border border-outline-variant/15">LANDING ZONE</span>
          <div className="flex items-center gap-2">
            <Circle className="w-2 md:w-2.5 h-2 md:h-2.5 text-[#10B981] fill-current" />
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">SECURE AIRSPACE</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-surface-container-low text-[#1e293b] p-2 rounded-full border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
          <Share2 className="w-4 md:w-5 h-4 md:h-5" />
        </button>
        <button className="bg-surface-container-low text-[#1e293b] p-2 rounded-full border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
          <Download className="w-4 md:w-5 h-4 md:h-5" />
        </button>
      </div>
    </div>
  );
}

