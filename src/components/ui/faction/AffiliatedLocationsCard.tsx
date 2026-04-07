import React from 'react';
import { ChevronRight } from 'lucide-react';

export function AffiliatedLocationsCard() {
  const locations = [
    'Orison, Stanton III',
    'Cellin (Moon)',
    'Daymar (Moon)',
    'Yela (Moon)'
  ];

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm mb-6">
      <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
        Affiliated Locations
      </h3>
      
      <div className="space-y-1">
        {locations.map((loc, idx) => (
          <button key={idx} className="w-full flex items-center justify-between py-3 text-left group">
            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
              {loc}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
