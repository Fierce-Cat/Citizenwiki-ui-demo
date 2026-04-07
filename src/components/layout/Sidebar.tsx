import React from 'react';
import { Home, CircleDot, Circle, Database, Tag, Shield, X } from 'lucide-react';
import { SidebarSection } from '../ui/sidebar/SidebarSection';
import { SidebarItem } from '../ui/sidebar/SidebarItem';
import { SidebarMenu } from '../ui/sidebar/SidebarMenu';
import { SidebarSubItem } from '../ui/sidebar/SidebarSubItem';
import { SidebarStatus } from '../ui/sidebar/SidebarStatus';
import { MainNavigation } from '../ui/sidebar/MainNavigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUI } from '../../contexts/UIContext';
import { motion, AnimatePresence } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLocationExplorerOpen, toggleLocationExplorer } = useUI();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[140] lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {(isDesktop || isOpen) && (
          <motion.aside 
            initial={isDesktop ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={isDesktop ? undefined : { x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-[150] w-64 bg-background border-r border-outline-variant/20 flex flex-col py-6 px-4 overflow-y-auto shrink-0 lg:static"
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Menu</span>
              <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <MainNavigation onCloseSidebar={onClose} />
              
              <SidebarSection title="Navigation">
                <SidebarItem icon={<Home className="w-5 h-5" />} label="Home" />
                
                <div 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${isLocationExplorerOpen ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  onClick={() => {
                    toggleLocationExplorer();
                    if (!isDesktop) {
                      onClose();
                    }
                  }}
                >
                  <CircleDot className={`w-5 h-5 ${isLocationExplorerOpen ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="text-sm font-semibold">Universe</span>
                </div>

                <SidebarMenu icon={<Shield className="w-5 h-5 text-slate-400" />} label="Factions" defaultOpen={true}>
                  <SidebarSubItem label="Crusader Ind." href="/factions" active={location.pathname === '/factions'} />
                  <SidebarSubItem label="Roberts Space Ind." href="#" />
                  <SidebarSubItem label="Drake Interplanetary" href="#" />
                </SidebarMenu>
                
                <SidebarMenu icon={<Database className="w-5 h-5 text-slate-400" />} label="Database" defaultOpen={true}>
                  <SidebarSubItem label="Facilities" href="/facilities/voyager-bar" active={location.pathname.startsWith('/facilities')} />
                  <SidebarSubItem label="Items" href="#" />
                </SidebarMenu>
              </SidebarSection>

              <SidebarSection title="Bookmarks" hasBorderTop>
                <SidebarItem icon={<Tag className="w-4 h-4 opacity-40" />} label="Crusader Industries" />
                <SidebarItem icon={<Tag className="w-4 h-4 opacity-40" />} label="Drake Caterpillar" />
                <SidebarItem icon={<Tag className="w-4 h-4 opacity-40" />} label="Lorville, Hurston" />
              </SidebarSection>
            </div>

            <div className="mt-auto pt-6">
              <SidebarStatus />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}



