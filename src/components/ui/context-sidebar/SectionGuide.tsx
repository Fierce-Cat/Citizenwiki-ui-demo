import React from 'react';

export function SectionGuide() {
  return (
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
  );
}
