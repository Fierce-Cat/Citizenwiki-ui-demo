import React from 'react';

export function LiveTraffic() {
  return (
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
  );
}
