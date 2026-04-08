import React from 'react';
import { ArrowLeft, Search, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';

export const TopNavigation = ({
  isLightMode,
  colorMode,
  cycleColorMode,
  isExplorerOpen,
  setIsExplorerOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onNavigateHome
}: {
  isLightMode: boolean;
  colorMode: 'light' | 'dark' | 'realistic';
  cycleColorMode: () => void;
  isExplorerOpen: boolean;
  setIsExplorerOpen: (v: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  onNavigateHome: () => void;
}) => {
  return (
    <div className="flex justify-between items-start pointer-events-none">
      {/* Top Left */}
      <div className="flex items-start gap-3 md:gap-4 pointer-events-auto">
        <button
          onClick={onNavigateHome}
          className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border ${isLightMode ? 'border-blue-200 bg-white/40 shadow-sm hover:bg-white/60' : 'border-white/10 bg-black/50 hover:bg-white/10'} backdrop-blur-md flex items-center justify-center transition-colors`}
        >
          <ArrowLeft className={`w-4 h-4 md:w-5 md:h-5 ${isLightMode ? 'text-blue-900' : 'text-white'}`} />
        </button>
        <div>
          <h1 className={`text-xl md:text-2xl font-headline font-bold tracking-tighter flex items-center gap-2 ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
            STANTON <span className={`${isLightMode ? 'text-blue-900/60' : 'text-white/50'} font-normal hidden sm:inline`}>SYSTEM</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className={`text-[8px] font-bold tracking-widest ${isLightMode ? 'text-blue-900/60' : 'text-white/50'} uppercase hidden sm:inline`}>
              Synchronized with UDB NavNet
            </span>
            <span className={`text-[8px] font-bold tracking-widest ${isLightMode ? 'text-blue-900/60' : 'text-white/50'} uppercase sm:hidden`}>
              UDB NavNet
            </span>
          </div>
        </div>
      </div>

      {/* Top Right */}
      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
        <div className="relative group hidden sm:block">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLightMode ? 'text-blue-900/40 group-hover:text-blue-900/80' : 'text-white/40 group-hover:text-white/80'} transition-colors`} />
          <input
            type="text"
            placeholder="Search system nodes..."
            className={`${isLightMode ? 'bg-white/40 border-blue-200 text-blue-900 placeholder:text-blue-900/40 focus:border-blue-400 focus:bg-white/60 shadow-sm' : 'bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-black/80'} backdrop-blur-md border rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none transition-all w-48 md:w-64`}
            onFocus={() => setIsExplorerOpen(true)}
          />
        </div>
        <button
          onClick={() => setIsExplorerOpen(!isExplorerOpen)}
          className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border ${isLightMode ? (isExplorerOpen ? 'border-blue-400 bg-white/60' : 'border-blue-200 bg-white/40') : (isExplorerOpen ? 'border-white/40 bg-white/10' : 'border-white/10 bg-black/50')} backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors`}
        >
          <Search className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-white'} sm:hidden`} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isLightMode ? 'text-blue-900' : 'text-white'} hidden sm:block`}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </button>
        <button
          onClick={cycleColorMode}
          className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border ${isLightMode ? 'border-blue-200 bg-white/40 shadow-sm hover:bg-white/60' : 'border-white/10 bg-black/50 hover:bg-white/10'} backdrop-blur-md flex items-center justify-center transition-colors`}
          title="Toggle Theme"
        >
          {colorMode === 'light' ? <Sun className="w-4 h-4 text-blue-900" /> : colorMode === 'realistic' ? <Sparkles className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden w-8 h-8 shrink-0 rounded-full border ${isLightMode ? (isMobileMenuOpen ? 'border-blue-400 bg-white/60' : 'border-blue-200 bg-white/40') : (isMobileMenuOpen ? 'border-white/40 bg-white/10' : 'border-white/10 bg-black/50')} backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors`}
        >
          {isMobileMenuOpen ? <X className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-white'}`} /> : <Menu className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-white'}`} />}
        </button>
      </div>
    </div>
  );
};
