import React from 'react';

interface ShipCardProps {
  key?: React.Key;
  title: string;
  subtitle: string;
  tags: string[];
  modelClass?: string;
}

export function ShipCard({ title, subtitle, tags, modelClass = "S-CLASS SHIP MODEL" }: ShipCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
      <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase z-10">
          {modelClass}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <h3 className="font-sans text-sm font-black uppercase tracking-wider text-slate-900 mb-1">
          {title}
        </h3>
        <p className="text-slate-600 text-sm font-medium mb-4">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 rounded bg-surface-container-low text-slate-500 text-[9px] font-bold tracking-widest uppercase border border-outline-variant/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
