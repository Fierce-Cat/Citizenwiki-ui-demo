import React from 'react';

interface SearchFilterProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SearchFilter({ icon, label, isActive, onClick }: SearchFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
        isActive 
          ? 'border-primary bg-primary/5 text-primary' 
          : 'border-outline-variant/50 bg-surface text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={isActive ? 'text-primary' : 'text-slate-400'}>{icon}</span>
      {label}
    </button>
  );
}
