import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarMenuProps {
  icon?: React.ReactNode;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  isSubmenu?: boolean;
}

export function SidebarMenu({ icon, label, defaultOpen = true, children, isSubmenu = false }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (isSubmenu) {
    return (
      <div className="space-y-0.5">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full relative px-3 py-1 bg-white rounded-lg border border-[#e2e8f0] flex items-center justify-between shadow-sm hover:bg-slate-50 transition-colors"
        >
          <span className="text-sm font-medium text-[#1e293b]">{label}</span>
          {isOpen ? <ChevronDown className="w-4 h-4 text-[#94a3b8]" /> : <ChevronRight className="w-4 h-4 text-[#94a3b8]" />}
        </button>
        {isOpen && (
          <div className="pt-1 px-3 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#64748b] hover:bg-white hover:shadow-sm transition-all group"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-medium text-slate-900">{label}</span>
        </div>
      </button>
      {isOpen && (
        <div className="ml-4 pl-4 border-l border-[#e2e8f0] space-y-0.5 py-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
