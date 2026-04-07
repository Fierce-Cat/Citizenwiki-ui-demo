import React from 'react';
import { Edit2, Plus } from 'lucide-react';

export function FactionFABs() {
  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-4 z-50">
      <button className="w-12 h-12 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all hover:shadow-md">
        <Edit2 className="w-5 h-5" />
      </button>
      <button className="h-12 px-6 rounded-full bg-[#1e3a5f] text-white flex items-center gap-2 font-bold text-sm shadow-md hover:bg-[#152a45] transition-all hover:shadow-lg">
        <Plus className="w-4 h-4" />
        JOIN AFFILIATION
      </button>
    </div>
  );
}
