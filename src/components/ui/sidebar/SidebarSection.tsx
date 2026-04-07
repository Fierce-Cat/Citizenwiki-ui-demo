import React from 'react';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  hasBorderTop?: boolean;
}

export function SidebarSection({ title, children, hasBorderTop = false }: SidebarSectionProps) {
  return (
    <div className={hasBorderTop ? "pt-4 border-t border-[#e2e8f0]" : "space-y-4"}>
      <div className={hasBorderTop ? "px-3 pb-2" : "space-y-1 px-2"}>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e9aaf]">{title}</p>
      </div>
      <nav className="space-y-0.5">
        {children}
      </nav>
    </div>
  );
}
