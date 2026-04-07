import React from 'react';
import { Clock } from 'lucide-react';

interface SearchHistoryItemProps {
  title: string;
  timeAgo: string;
  onClick?: () => void;
}

export function SearchHistoryItem({ title, timeAgo, onClick }: SearchHistoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-3 group"
    >
      <div className="flex items-center gap-4">
        <Clock className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{title}</span>
      </div>
      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">{timeAgo}</span>
    </button>
  );
}
