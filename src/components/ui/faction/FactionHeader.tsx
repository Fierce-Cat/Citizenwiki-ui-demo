import React from 'react';
import { Box } from 'lucide-react';

export function FactionHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-12">
      <div className="w-24 h-24 shrink-0 bg-white rounded-2xl border border-outline-variant/20 flex items-center justify-center shadow-sm">
        <Box className="w-10 h-10 text-slate-800" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
            Crusader Industries
          </h1>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold tracking-widest uppercase border border-green-200">
            Active / Corporate
          </span>
        </div>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
          A leading starship manufacturer and the sole corporate administrator of the Stanton III gas giant. Founded by August Dunlow, Crusader is defined by its humanitarian mission and commitment to elegant, functional spacecraft design.
        </p>
      </div>
    </div>
  );
}
