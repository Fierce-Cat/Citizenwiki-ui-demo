import React from 'react';

interface SearchTrendingCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export function SearchTrendingCard({ icon, title, subtitle, onClick }: SearchTrendingCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-5 rounded-2xl border border-outline-variant/30 bg-surface hover:border-outline-variant/60 hover:shadow-sm transition-all text-left w-full"
    >
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-600">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-sm mb-1">{title}</h3>
      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{subtitle}</p>
    </button>
  );
}
