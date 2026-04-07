import React from 'react';
import { Building2, Shield } from 'lucide-react';

export function Affiliations() {
  return (
    <section className="space-y-3">
      <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Affiliations</h4>
        <div className="p-4 flex items-center gap-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-sm">
          <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center border border-outline-variant/15 shadow-sm">
            <Building2 className="text-primary w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">ArcCorp</p>
            <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Primary Governor</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-sm">
          <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center border border-outline-variant/15 shadow-sm">
            <Shield className="text-secondary w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">Centurion Defense</p>
            <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Private Security</p>
          </div>
        </div>
    </section>
  );
}
