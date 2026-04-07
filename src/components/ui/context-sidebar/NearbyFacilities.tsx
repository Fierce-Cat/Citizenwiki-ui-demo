import React from 'react';

export function NearbyFacilities() {
  return (
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
  );
}
