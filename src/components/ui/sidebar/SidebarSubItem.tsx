import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarSubItemProps {
  label: string;
  href?: string;
  active?: boolean;
}

export function SidebarSubItem({ label, href = "#", active }: SidebarSubItemProps) {
  return (
    <Link 
      to={href}
      className={`block text-sm transition-colors py-1 ${
        active 
          ? "text-[#1e293b] font-medium" 
          : "text-[#8e9aaf] hover:text-[#1e293b]"
      }`} 
    >
      {label}
    </Link>
  );
}
