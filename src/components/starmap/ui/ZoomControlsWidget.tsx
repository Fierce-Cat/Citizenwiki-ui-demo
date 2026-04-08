import React from 'react';
import * as THREE from 'three';
import { Target } from 'lucide-react';
import { CelestialBody3D, getBodyPosition } from '../../../data/starMap3D';

export const ZoomControlsWidget = ({
  isLightMode,
  isMobileMenuOpen,
  handleZoom,
  handleFocus
}: {
  isLightMode: boolean;
  isMobileMenuOpen: boolean;
  handleZoom: (type: 'in' | 'out' | 'reset') => void;
  handleFocus: (id: string, pos: THREE.Vector3) => void;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
      <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-full flex flex-col overflow-hidden`}>
        <button
          onClick={() => handleZoom('in')}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors border-b ${isLightMode ? 'hover:bg-white/60 border-blue-200' : 'hover:bg-white/10 border-white/10'}`}
        >
          <span className={`text-lg md:text-xl font-light leading-none ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>+</span>
        </button>
        <button
          onClick={() => handleZoom('out')}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors border-b ${isLightMode ? 'hover:bg-white/60 border-blue-200' : 'hover:bg-white/10 border-white/10'}`}
        >
          <span className={`text-lg md:text-xl font-light leading-none ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>−</span>
        </button>
        <button
          onClick={() => handleZoom('reset')}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors ${isLightMode ? 'hover:bg-white/60' : 'hover:bg-white/10'}`}
        >
          <Target className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isLightMode ? 'text-blue-900' : 'text-white/80'}`} />
        </button>
      </div>
      <button
        onClick={() => handleFocus('stanton', new THREE.Vector3(0, 0, 0))}
        className={`w-8 h-8 md:w-10 md:h-10 mt-1 md:mt-2 ${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm hover:bg-white/60' : 'bg-black/60 border-white/10 hover:bg-white/10'} backdrop-blur-md border rounded-full flex items-center justify-center transition-colors`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isLightMode ? 'text-blue-900' : 'text-white/80'}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </button>
    </div>
  );
};
