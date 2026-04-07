import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
}

export function SidebarItem({ icon, label, href = "#", active }: SidebarItemProps) {
  return (
    <a 
      className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
        active 
          ? "bg-white shadow-sm text-slate-900" 
          : "text-[#64748b] hover:bg-white hover:shadow-sm"
      }`} 
      href={href}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
