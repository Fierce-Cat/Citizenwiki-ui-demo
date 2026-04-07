import React from 'react';
import { User } from 'lucide-react';

export function HierarchyCard() {
  const executives = [
    {
      name: 'Kelly Caplan',
      role: 'CEO • Current Head'
    },
    {
      name: 'August Dunlow',
      role: 'Founder • Emeritus'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm mb-6">
      <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
        Executive Hierarchy
      </h3>
      
      <div className="space-y-4">
        {executives.map((exec, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-outline-variant/10 shrink-0">
              <User className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{exec.name}</div>
              <div className="text-[10px] text-slate-500">{exec.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
