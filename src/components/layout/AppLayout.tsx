import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LocationExplorer } from '../ui/sidebar/LocationExplorer';
import { FloatingActionButton } from '../ui/FloatingActionButton';
import { useUI } from '../../contexts/UIContext';
import { motion, AnimatePresence } from 'motion/react';
import { SearchOverlay } from '../ui/search/SearchOverlay';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isLocationExplorerOpen, closeLocationExplorer, openSearch } = useUI();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Handle CTRL+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed-variant h-screen flex flex-col relative">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence>
            {/* Location Explorer Overlay Backdrop */}
            {isLocationExplorerOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"
                onClick={closeLocationExplorer}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {/* Location Explorer Overlay */}
            {isLocationExplorerOpen && (
              <motion.div 
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="absolute inset-y-0 left-0 z-20 h-full shadow-2xl border-r border-outline-variant/20 bg-background w-full lg:w-auto flex"
              >
                <LocationExplorer />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Outlet Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
      <FloatingActionButton />
      <SearchOverlay />
    </div>
  );
}



