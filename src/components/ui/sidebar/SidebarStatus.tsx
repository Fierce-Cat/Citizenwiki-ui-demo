import React from 'react';
import { Radio } from 'lucide-react';

export function SidebarStatus() {
  return (
    <div className="mt-auto pt-6 border-t border-[#e2e8f0] px-2 bg-background sticky bottom-0">
      <div className="flex items-center justify-between py-2 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Wiki Status: Online</span>
        </div>
        <a className="text-slate-400 hover:text-primary transition-colors" href="#">
          <Radio className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
