import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { locationData, LocationData } from '../../../data/locations';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUI } from '../../../contexts/UIContext';
import { motion, AnimatePresence } from 'motion/react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export function LocationExplorer() {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { closeLocationExplorer } = useUI();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Initialize selectedPath based on current URL if needed, or default to empty for root
  useEffect(() => {
    if (selectedPath.length === 0 && location.pathname.includes('/location/')) {
      // We could parse the URL to find the path, but for now we'll just open stanton as default if we're deep linked
      // Actually, it's better to start empty if they just click "Universe"
    }
  }, []);

  // Find the node corresponding to the last item in selectedPath
  const currentNode = useMemo(() => {
    if (selectedPath.length === 0) return null;
    let current: LocationData | undefined;
    let children = locationData;
    
    for (const id of selectedPath) {
      current = current ? current.children?.find(node => node.id === id) : children.find(node => node.id === id);
      if (!current) break;
    }
    return current;
  }, [selectedPath]);

  // Find the parent of the current node to get its siblings
  const parentNode = useMemo(() => {
    if (selectedPath.length <= 1) return null;
    let current: LocationData | undefined;
    let children = locationData;
    
    for (let i = 0; i < selectedPath.length - 1; i++) {
      current = current ? current.children?.find(node => node.id === selectedPath[i]) : children.find(node => node.id === selectedPath[i]);
      if (!current) break;
    }
    return current;
  }, [selectedPath]);

  const secondaryList = selectedPath.length <= 1 
    ? locationData 
    : (parentNode ? parentNode.children || [] : locationData);
    
  const secondaryTitle = selectedPath.length <= 1 
    ? 'SYSTEMS' 
    : (parentNode ? `LOCATIONS IN ${parentNode.name.toUpperCase()}` : 'SYSTEMS');

  const tertiaryList = currentNode ? currentNode.children || [] : [];
  const tertiaryTitle = currentNode ? `LOCATIONS IN ${currentNode.name.toUpperCase()}` : '';

  const groupedTertiaryList = useMemo(() => {
    const groups: Record<string, LocationData[]> = {};
    tertiaryList.forEach(node => {
      const type = node.type || 'other';
      if (!groups[type]) groups[type] = [];
      groups[type].push(node);
    });
    return groups;
  }, [tertiaryList]);

  const typeLabels: Record<string, string> = {
    landing_zone: 'Landing Zones',
    moon: 'Moons',
    space_station: 'Space Stations',
    planet: 'Planets',
    system: 'Systems',
    other: 'Other'
  };

  const handleSelectSecondary = (node: LocationData) => {
    if (selectedPath.length <= 1) {
      setSelectedPath([node.id]);
    } else {
      // Replace the last element in the path
      const newPath = [...selectedPath];
      newPath[newPath.length - 1] = node.id;
      setSelectedPath(newPath);
    }
  };

  const handleSelectTertiary = (node: LocationData) => {
    if (node.children && node.children.length > 0) {
      setSelectedPath([...selectedPath, node.id]);
    } else {
      // If no children, just navigate to the view
      navigate(`/location/${node.id}`);
      if (window.innerWidth < 1024) {
        closeLocationExplorer();
      }
    }
  };

  const handleBack = () => {
    if (selectedPath.length > 0) {
      setSelectedPath(selectedPath.slice(0, -1));
    }
  };

  const handleViewClick = (e: React.MouseEvent, node: LocationData) => {
    e.stopPropagation();
    navigate(`/location/${node.id}`);
    if (window.innerWidth < 1024) {
      closeLocationExplorer();
    }
  };

  const handleClose = () => {
    closeLocationExplorer();
  };

  return (
    <div className="flex h-full bg-background w-full relative overflow-hidden">
      {/* Secondary Sidebar */}
      <AnimatePresence initial={false}>
        {(isDesktop || selectedPath.length === 0) && (
          <motion.div 
            initial={!isDesktop ? { x: '-50%', opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={!isDesktop ? { x: '-50%', opacity: 0 } : undefined}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className={`
              border-r border-outline-variant/20 flex-col bg-background shrink-0
              w-full lg:w-64 flex
              ${!isDesktop ? 'absolute inset-0 z-10' : ''}
            `}
          >
            <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between z-10 bg-background">
              <div className="flex items-center gap-3">
                {selectedPath.length > 1 && (
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{secondaryTitle}</h2>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-slate-900 transition-colors p-1 rounded-md hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={parentNode ? parentNode.id : 'root'}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 overflow-y-auto py-2"
                >
                  {secondaryList.map(node => (
                    <button
                      key={node.id}
                      onClick={() => handleSelectSecondary(node)}
                      className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors group
                        ${selectedPath[selectedPath.length - 1] === node.id 
                          ? 'text-primary bg-primary/5' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
                      `}
                    >
                      <span className={`text-sm ${selectedPath[selectedPath.length - 1] === node.id ? 'font-bold' : 'font-semibold'}`}>{node.name}</span>
                      <ChevronRight className={`w-4 h-4 transition-opacity ${selectedPath[selectedPath.length - 1] === node.id ? 'text-primary opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tertiary Sidebar */}
      <AnimatePresence initial={false}>
        {selectedPath.length > 0 && (
          <motion.div 
            initial={{ x: isDesktop ? -20 : '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isDesktop ? -20 : '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className={`
              border-r border-outline-variant/20 flex-col bg-background shrink-0
              w-full lg:w-80 flex
              ${!isDesktop ? 'absolute inset-0 z-20' : ''}
            `}
          >
            <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between z-10 bg-background">
              <div className="flex items-center gap-3">
                <button onClick={handleBack} className="lg:hidden text-slate-400 hover:text-slate-900 transition-colors p-1 -ml-1 rounded-md hover:bg-slate-100">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{tertiaryTitle}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 hidden sm:inline-block">{tertiaryList.length} RESULTS</span>
                <button onClick={handleClose} className="text-slate-400 hover:text-slate-900 transition-colors p-1 rounded-md hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={currentNode ? currentNode.id : 'empty'}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 overflow-y-auto p-4 space-y-6"
                >
                  {Object.entries(groupedTertiaryList).map(([type, nodes]: [string, any]) => (
                    <div key={type} className="space-y-2">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
                        {typeLabels[type] || typeLabels.other}
                      </h3>
                      <div className="space-y-2">
                        {(nodes as LocationData[]).map(node => (
                          <motion.div
                            layoutId={`tertiary-${node.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={node.id}
                            className="group flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 hover:border-outline-variant/40 hover:bg-surface-container-lowest transition-all cursor-pointer"
                            onClick={() => handleSelectTertiary(node)}
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-slate-900">{node.name}</span>
                                {node.tag && (
                                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest bg-slate-100 text-slate-500 border border-slate-200">
                                    {node.tag}
                                  </span>
                                )}
                              </div>
                              {node.subtitle && (
                                <p className="text-[10px] text-slate-500">{node.subtitle}</p>
                              )}
                            </div>
                            <button 
                              onClick={(e) => handleViewClick(e, node)}
                              className="px-3 py-1.5 rounded bg-surface-container-low text-slate-600 text-[10px] font-bold tracking-widest uppercase hover:bg-slate-200 transition-colors"
                            >
                              View
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {tertiaryList.length === 0 && (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      No locations found.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


