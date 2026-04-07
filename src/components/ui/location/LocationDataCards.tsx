import React from 'react';
import { MapPin, Wind } from 'lucide-react';

export function LocationDataCards() {
  return (
    <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Spatial Data Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(23,28,33,0.04)] space-y-6 md:space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <MapPin className="w-4 h-4" /> Spatial Data
          </h3>
          <span className="text-[8px] font-bold text-slate-300 tracking-widest uppercase">Verified Data</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
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
      <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(23,28,33,0.04)] space-y-6 md:space-y-8">
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
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2">
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
  );
}

