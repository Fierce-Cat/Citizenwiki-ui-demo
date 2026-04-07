import React from 'react';
import { Compass, Search, Bell, Settings, Menu } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { openSearch } = useUI();

  return (
    <header className="grid grid-cols-2 md:grid-cols-3 items-center w-full py-2 sticky top-0 z-[100] bg-white border-b border-slate-100 px-4 md:px-8">
      <div className="flex items-center gap-4 lg:gap-6">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mr-4">
          <div className="bg-primary w-6 h-6 rounded flex items-center justify-center">
            <Compass className="text-white w-4 h-4" />
          </div>
          <h1 className="text-sm font-bold tracking-tight text-slate-900 font-sans">
            Citizen<span className="text-slate-400 font-medium">Wiki</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a className="text-slate-500 hover:text-primary font-sans font-bold uppercase tracking-widest text-[9px] transition-colors" href="#">Universe</a>
          <a className="text-slate-400 hover:text-slate-800 font-sans font-bold uppercase tracking-widest text-[9px] transition-colors" href="/starmap">Star Map</a>
          <a className="text-slate-400 hover:text-slate-800 font-sans font-bold uppercase tracking-widest text-[9px] transition-colors" href="#">ComNav</a>
          <a className="text-slate-400 hover:text-slate-800 font-sans font-bold uppercase tracking-widest text-[9px] transition-colors" href="#">Events</a>
          <a className="text-slate-400 hover:text-slate-800 font-sans font-bold uppercase tracking-widest text-[9px] transition-colors" href="/design-system">Design System</a>
        </nav>
      </div>
      
      {/* Centered Search Bar */}
      <div className="hidden md:flex justify-center">
        <div 
          className="relative hidden lg:block group w-full max-w-xs cursor-text"
          onClick={openSearch}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-hover:text-primary transition-colors" />
          <div className="bg-slate-50 border border-slate-100 rounded-full py-1.5 pl-9 pr-12 text-[11px] w-full transition-all text-slate-400 flex items-center h-[30px] group-hover:border-slate-200 group-hover:bg-white">
            Search...
          </div>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[7px] font-bold text-slate-300 border border-slate-100 px-1 rounded">CTRL+K</span>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 lg:gap-4">
        <button className="p-1.5 rounded-full hover:bg-slate-100 transition-colors md:hidden" onClick={openSearch}>
          <Search className="text-slate-300 hover:text-slate-600 transition-colors w-5 h-5" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="text-slate-300 hover:text-slate-600 transition-colors w-5 h-5" />
        </button>
        <button className="hidden sm:block p-1.5 rounded-full hover:bg-slate-100 transition-colors">
          <Settings className="text-slate-300 hover:text-slate-600 transition-colors w-5 h-5" />
        </button>
        <img alt="User profile avatar" className="w-7 h-7 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6b52RKkXQ8YpW9pYLtMdNAZaJUFNjLH0S-trOayNoruEDq6Bf7YIeMTK9s8xOFea42ksAbvZikey5eUDa81HKwTSaI4eCmd3r4LhU-LGhX23suDP9t-tK4qGW-0L6t8I_B9_IvKfOXuZi1cs-T2C1y7Sqv1WcPdG0CDtzU2MZgx5p8IDOs9R7BAq-qIgOUOqy0hWZ7gDklPXU53bk8G_v0pzkEBgmsatkib8GTlj4ymZbWI15DLKgrzSAW5fK0NId0h6149UA9-KD" />
      </div>
    </header>
  );
}

