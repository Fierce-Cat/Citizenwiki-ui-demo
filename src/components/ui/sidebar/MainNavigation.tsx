import React from 'react';
import { Globe, Navigation, Calendar, Layout } from 'lucide-react';
import { useUI } from '../../../contexts/UIContext';
import { useNavigate } from 'react-router-dom';

interface MainNavigationProps {
  onCloseSidebar?: () => void;
}

export function MainNavigation({ onCloseSidebar }: MainNavigationProps) {
  const { isLocationExplorerOpen, toggleLocationExplorer } = useUI();
  const navigate = useNavigate();

  const navItems = [
    { 
      label: 'Universe', 
      icon: <Globe className="w-4 h-4" />, 
      onClick: () => {
        toggleLocationExplorer();
        if (onCloseSidebar) onCloseSidebar();
      },
      active: isLocationExplorerOpen 
    },
    { 
      label: 'Star Map', 
      icon: <Navigation className="w-4 h-4" />, 
      onClick: () => {
        navigate('/starmap');
        if (onCloseSidebar) onCloseSidebar();
      }
    },
    { label: 'Navigation', icon: <Navigation className="w-4 h-4" />, href: '#' },
    { label: 'Events', icon: <Calendar className="w-4 h-4" />, href: '#' },
    { 
      label: 'Design System', 
      icon: <Layout className="w-4 h-4" />, 
      onClick: () => {
        navigate('/design-system');
        if (onCloseSidebar) onCloseSidebar();
      }
    },
  ];

  return (
    <div className="space-y-1 mb-8 lg:hidden">
      <div className="px-3 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Main Menu</span>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {navItems.map((item) => {
          const content = (
            <>
              <span className={item.active ? 'text-primary' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </>
          );

          const className = `
            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-left
            ${item.active 
              ? 'bg-primary/5 text-primary border border-primary/10' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}
          `;

          if (item.onClick) {
            return (
              <button key={item.label} onClick={item.onClick} className={className}>
                {content}
              </button>
            );
          }

          return (
            <a key={item.label} href={item.href} className={className}>
              {content}
            </a>
          );
        })}
      </div>
      <div className="h-px bg-outline-variant/10 mx-3 mt-6"></div>
    </div>
  );
}
