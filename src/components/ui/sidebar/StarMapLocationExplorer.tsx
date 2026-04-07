import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { locationData, LocationData } from '../../../data/locations';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface StarMapLocationExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect?: (id: string) => void;
  isLightMode?: boolean;
}

export function StarMapLocationExplorer({ isOpen, onClose, onLocationSelect, isLightMode = false }: StarMapLocationExplorerProps) {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

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
    jump_point: 'Jump Points',
    other: 'Other'
  };

  const handleSelectSecondary = (node: LocationData) => {
    if (selectedPath.length <= 1) {
      setSelectedPath([node.id]);
    } else {
      const newPath = [...selectedPath];
      newPath[newPath.length - 1] = node.id;
      setSelectedPath(newPath);
    }
    if (onLocationSelect) onLocationSelect(node.id);
  };

  const handleSelectTertiary = (node: LocationData) => {
    if (node.children && node.children.length > 0) {
      setSelectedPath([...selectedPath, node.id]);
    }
    if (onLocationSelect) {
      onLocationSelect(node.id);
    } else if (!node.children || node.children.length === 0) {
      navigate(`/location/${node.id}`);
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="absolute inset-y-0 right-0 z-50 h-full flex pointer-events-auto w-full lg:w-auto"
        >
          {/* Tertiary Sidebar (appears when a secondary item is selected) */}
          <AnimatePresence initial={false}>
            {selectedPath.length > 0 && (
              <motion.div 
                initial={{ x: isDesktop ? 20 : '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: isDesktop ? 20 : '100%', opacity: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                className={`
                  ${isLightMode ? 'bg-white/60 border-blue-200' : 'bg-black/80 border-white/10'} backdrop-blur-xl border-l flex flex-col shadow-2xl
                  w-full lg:w-80
                  ${!isDesktop ? 'absolute inset-0 z-20' : ''}
                `}
              >
                <div className={`px-6 py-5 border-b ${isLightMode ? 'border-blue-900/10' : 'border-white/10'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <button onClick={handleBack} className={`${isLightMode ? 'text-blue-900/40 hover:text-blue-900 hover:bg-blue-900/10' : 'text-white/40 hover:text-white hover:bg-white/10'} transition-colors p-1 -ml-1 rounded-md`}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h2 className={`text-[10px] font-bold uppercase tracking-widest ${isLightMode ? 'text-blue-900/50' : 'text-white/50'}`}>{tertiaryTitle}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold ${isLightMode ? 'text-blue-900/30' : 'text-white/30'} hidden sm:inline-block`}>{tertiaryList.length} RESULTS</span>
                    {!isDesktop && (
                      <button onClick={onClose} className={`${isLightMode ? 'text-blue-900/40 hover:text-blue-900 hover:bg-blue-900/10' : 'text-white/40 hover:text-white hover:bg-white/10'} transition-colors p-1 rounded-md`}>
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                  {Object.entries(groupedTertiaryList).map(([type, nodes]: [string, any]) => (
                    <div key={type} className="space-y-2">
                      <h3 className={`text-[10px] font-bold uppercase tracking-widest ${isLightMode ? 'text-blue-900/40' : 'text-white/40'} px-2`}>
                        {typeLabels[type] || typeLabels.other}
                      </h3>
                      <div className="space-y-2">
                        {(nodes as LocationData[]).map(node => (
                          <motion.div
                            layoutId={`starmap-tertiary-${node.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={node.id}
                            className={`group flex items-center justify-between p-4 rounded-xl border ${isLightMode ? 'border-blue-900/10 hover:border-blue-400 hover:bg-white/40' : 'border-white/10 hover:border-white/30 hover:bg-white/5'} transition-all cursor-pointer`}
                            onClick={() => handleSelectTertiary(node)}
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-bold ${isLightMode ? 'text-blue-900' : 'text-white/90'}`}>{node.name}</span>
                                {node.tag && (
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest ${isLightMode ? 'bg-blue-900/10 text-blue-900/60 border-blue-900/20' : 'bg-white/10 text-white/60 border-white/20'} border`}>
                                    {node.tag}
                                  </span>
                                )}
                              </div>
                              {node.subtitle && (
                                <p className={`text-[10px] ${isLightMode ? 'text-blue-900/40' : 'text-white/40'}`}>{node.subtitle}</p>
                              )}
                            </div>
                            <button 
                              onClick={(e) => handleViewClick(e, node)}
                              className={`px-3 py-1.5 rounded ${isLightMode ? 'bg-blue-900/10 text-blue-900/70 hover:bg-blue-900/20' : 'bg-white/10 text-white/70 hover:bg-white/20'} text-[10px] font-bold tracking-widest uppercase transition-colors`}
                            >
                              View
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {tertiaryList.length === 0 && (
                    <div className={`p-8 text-center ${isLightMode ? 'text-blue-900/30' : 'text-white/30'} text-sm`}>
                      No locations found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secondary Sidebar (Main list) */}
          <AnimatePresence initial={false}>
            {(isDesktop || selectedPath.length === 0) && (
              <motion.div 
                initial={!isDesktop ? { x: '-100%', opacity: 0 } : false}
                animate={{ x: 0, opacity: 1 }}
                exit={!isDesktop ? { x: '-100%', opacity: 0 } : undefined}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                className={`
                  ${isLightMode ? 'bg-white/80 border-blue-200' : 'bg-black/90 border-white/10'} backdrop-blur-xl border-l flex flex-col shadow-2xl z-10
                  w-full lg:w-64
                  ${!isDesktop ? 'absolute inset-0' : ''}
                `}
              >
                <div className={`px-6 py-5 border-b ${isLightMode ? 'border-blue-900/10' : 'border-white/10'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    {selectedPath.length > 1 && (
                      <button onClick={handleBack} className={`${isLightMode ? 'text-blue-900/40 hover:text-blue-900' : 'text-white/40 hover:text-white'} transition-colors`}>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    )}
                    <h2 className={`text-[10px] font-bold uppercase tracking-widest ${isLightMode ? 'text-blue-900/50' : 'text-white/50'}`}>{secondaryTitle}</h2>
                  </div>
                  <button onClick={onClose} className={`${isLightMode ? 'text-blue-900/40 hover:text-blue-900 hover:bg-blue-900/10' : 'text-white/40 hover:text-white hover:bg-white/10'} transition-colors p-1 rounded-md`}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={parentNode ? parentNode.id : 'root'}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {secondaryList.map(node => (
                        <button
                          key={node.id}
                          onClick={() => handleSelectSecondary(node)}
                          className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors group
                            ${selectedPath[selectedPath.length - 1] === node.id 
                              ? (isLightMode ? 'text-blue-700 bg-blue-500/10' : 'text-blue-400 bg-blue-500/10')
                              : (isLightMode ? 'text-blue-900/60 hover:text-blue-900 hover:bg-white/40' : 'text-white/60 hover:text-white hover:bg-white/5')}
                          `}
                        >
                          <span className={`text-sm ${selectedPath[selectedPath.length - 1] === node.id ? 'font-bold' : 'font-semibold'}`}>{node.name}</span>
                          <ChevronRight className={`w-4 h-4 transition-opacity ${selectedPath[selectedPath.length - 1] === node.id ? (isLightMode ? 'text-blue-700 opacity-100' : 'text-blue-400 opacity-100') : (isLightMode ? 'text-blue-900/30 opacity-0 group-hover:opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100')}`} />
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
