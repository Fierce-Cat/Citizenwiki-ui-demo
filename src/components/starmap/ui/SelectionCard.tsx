import React from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { CelestialBody3D, getBodyPosition } from '../../../data/starMap3D';

export const SelectionCard = ({
  isLightMode,
  selectedBody,
  setSelectedId,
  handleFocus,
  isMobileMenuOpen
}: {
  isLightMode: boolean;
  selectedBody: CelestialBody3D | null;
  setSelectedId: (id: string | null) => void;
  handleFocus: (id: string, pos: THREE.Vector3) => void;
  isMobileMenuOpen: boolean;
}) => {
  return (
    <div className={`absolute left-4 md:left-6 top-24 md:top-32 flex-col gap-4 pointer-events-none transition-all duration-500 ${isMobileMenuOpen ? 'flex opacity-100' : 'hidden md:flex md:opacity-100'}`}>
      {/* Selection Info Card */}
      <AnimatePresence mode="wait">
        {selectedBody && (
          <motion.div
            key={selectedBody.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-lg' : 'bg-black/80 border-white/20 shadow-2xl'} backdrop-blur-xl border rounded-2xl p-4 md:p-5 w-56 md:w-72 relative group overflow-hidden pointer-events-auto`}
          >
            {/* Decorative background element */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl transition-colors duration-700 ${isLightMode ? 'bg-yellow-400/20 group-hover:bg-yellow-400/30' : 'bg-blue-500/10 group-hover:bg-blue-500/20'}`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <div className={`text-[8px] font-bold tracking-[0.2em] uppercase mb-1 ${isLightMode ? 'text-yellow-600' : 'text-blue-400'}`}>Celestial Object</div>
                <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${isLightMode ? 'text-blue-900 group-hover:text-blue-700' : 'text-white group-hover:text-blue-50'}`}>{selectedBody.name}</h3>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className={`p-1.5 rounded-full transition-all ${isLightMode ? 'hover:bg-blue-900/10 text-blue-900/40 hover:text-blue-900' : 'hover:bg-white/10 text-white/30 hover:text-white'}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className={`text-[8px] font-bold tracking-widest uppercase mb-1 ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Classification</div>
                  <div className={`text-xs md:text-sm font-semibold ${isLightMode ? 'text-blue-900' : 'text-white'}`}>{selectedBody.type ? selectedBody.type.charAt(0).toUpperCase() + selectedBody.type.slice(1).replace('_', ' ') : 'Planet'}</div>
                </div>
                <div>
                  <div className={`text-[8px] font-bold tracking-widest uppercase mb-1 ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Distance</div>
                  <div className={`text-xs md:text-sm font-semibold ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
                    <span className={isLightMode ? 'text-blue-600' : 'text-blue-400'}>{selectedBody.distance !== undefined ? selectedBody.distance.toFixed(1) : '0.0'}</span> <span className={`text-[10px] ${isLightMode ? 'text-blue-900/50' : 'text-white/50'}`}>AU</span>
                  </div>
                </div>
              </div>

              <div className={`h-px w-full ${isLightMode ? 'bg-gradient-to-r from-blue-200/50 via-blue-200 to-transparent' : 'bg-gradient-to-r from-white/10 via-white/5 to-transparent'}`} />

              <div className="flex items-center justify-between group/btn cursor-pointer mt-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/20' : 'bg-white/10'}`} />
                  <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/20' : 'bg-white/10'}`} />
                  <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/20' : 'bg-white/10'}`} />
                </div>
                <button
                  onClick={() => {
                    const pos = getBodyPosition(selectedBody.id);
                    if (pos) handleFocus(selectedBody.id, pos.pos);
                  }}
                  className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase flex items-center transition-colors ${isLightMode ? 'text-blue-900/60 group-hover/btn:text-blue-900' : 'text-white/50 group-hover/btn:text-white'}`}
                >
                  Focus Target <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover/btn:translate-x-1 ${isLightMode ? 'text-blue-600' : 'text-blue-400'}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Zone Example Card (Shows when Crusader is selected) */}
      {selectedBody?.id === 'crusader' && (
        <>
          <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-xl p-3 md:p-4 w-48 md:w-64 pointer-events-auto`}>
            <div className={`text-[8px] font-bold tracking-widest uppercase mb-1 md:mb-2 ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Active Landing Zone</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <div className={`text-xs md:text-sm font-bold tracking-wider ${isLightMode ? 'text-blue-900' : 'text-white'}`}>ORISON [CRU]</div>
            </div>
          </div>

          <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-xl p-3 md:p-4 w-48 md:w-64 pointer-events-auto`}>
            <div className={`text-[8px] font-bold tracking-widest uppercase mb-1 md:mb-2 ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Security Alert</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              <div className={`text-xs md:text-sm font-bold tracking-wider ${isLightMode ? 'text-blue-900' : 'text-white'}`}>CAUTION [PYRO]</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
