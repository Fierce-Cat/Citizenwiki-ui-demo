import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function SearchInput({ value, onChange, onClose }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when mounted
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the database..."
        className="w-full bg-surface border border-outline-variant/50 rounded-full py-4 pl-14 pr-32 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <span className="hidden sm:inline-block text-[10px] font-bold tracking-widest text-slate-300 uppercase">ESC TO CLOSE</span>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
