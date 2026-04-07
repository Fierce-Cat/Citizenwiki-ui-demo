import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUI } from '../../../contexts/UIContext';
import { SearchInput } from './SearchInput';
import { SearchFilter } from './SearchFilter';
import { SearchTrendingCard } from './SearchTrendingCard';
import { SearchHistoryItem } from './SearchHistoryItem';
import { MapPin, Rocket, Shield, Package, ArrowUpDown, CornerDownLeft, ArrowRightLeft } from 'lucide-react';

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-md flex flex-col"
      >
        {/* Header Area (matches the real header height roughly) */}
        <div className="w-full py-4 px-4 md:px-8 border-b border-transparent flex justify-center">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            onClose={closeSearch} 
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="max-w-3xl mx-auto px-6 pt-12">
            
            {/* Quick Filters */}
            <div className="mb-12">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 border border-slate-300 rounded-sm flex items-center justify-center text-[8px]">F</span>
                QUICK FILTERS
              </h4>
              <div className="flex flex-wrap gap-3">
                <SearchFilter 
                  icon={<MapPin className="w-4 h-4" />} 
                  label="Locations" 
                  isActive={activeFilter === 'locations'}
                  onClick={() => setActiveFilter(activeFilter === 'locations' ? null : 'locations')}
                />
                <SearchFilter 
                  icon={<Rocket className="w-4 h-4" />} 
                  label="Ships" 
                  isActive={activeFilter === 'ships'}
                  onClick={() => setActiveFilter(activeFilter === 'ships' ? null : 'ships')}
                />
                <SearchFilter 
                  icon={<Shield className="w-4 h-4" />} 
                  label="Factions" 
                  isActive={activeFilter === 'factions'}
                  onClick={() => setActiveFilter(activeFilter === 'factions' ? null : 'factions')}
                />
                <SearchFilter 
                  icon={<Package className="w-4 h-4" />} 
                  label="Items" 
                  isActive={activeFilter === 'items'}
                  onClick={() => setActiveFilter(activeFilter === 'items' ? null : 'items')}
                />
              </div>
            </div>

            {/* Trending Searches */}
            <div className="mb-12">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 border border-slate-300 rounded-sm flex items-center justify-center text-[8px]">T</span>
                TRENDING SEARCHES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <SearchTrendingCard 
                  icon={<MapPin className="w-5 h-5" />}
                  title="Pyro System"
                  subtitle="STAR SYSTEM"
                />
                <SearchTrendingCard 
                  icon={<Rocket className="w-5 h-5" />}
                  title="Drake Corsair"
                  subtitle="SHIP"
                />
                <SearchTrendingCard 
                  icon={<Shield className="w-5 h-5" />}
                  title="Inevitable Min"
                  subtitle="FACTION"
                />
                <SearchTrendingCard 
                  icon={<Package className="w-5 h-5" />}
                  title="Salvage Multi-Tool"
                  subtitle="ITEM"
                />
              </div>
            </div>

            {/* Recent History */}
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                RECENT HISTORY
              </h4>
              <div className="flex flex-col">
                <SearchHistoryItem title="New Babbage Transit Hub" timeAgo="12 MINUTES AGO" />
                <SearchHistoryItem title="Crusader Ares Ion" timeAgo="2 HOURS AGO" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Keyboard Hints */}
        <div className="fixed bottom-0 left-0 w-full py-6 flex justify-center gap-8 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-1.5 py-0.5 border border-slate-200 rounded text-[9px] font-bold text-slate-400">
              <ArrowUpDown className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">NAVIGATE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-1.5 py-0.5 border border-slate-200 rounded text-[9px] font-bold text-slate-400">
              ENTER
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">SELECT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-1.5 py-0.5 border border-slate-200 rounded text-[9px] font-bold text-slate-400">
              TAB
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">SWITCH CATEGORY</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
