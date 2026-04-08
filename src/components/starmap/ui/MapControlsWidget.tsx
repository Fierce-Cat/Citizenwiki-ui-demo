import React from 'react';

export const MapControlsWidget = ({
  isLightMode,
  showOrbits,
  setShowOrbits,
  showJumpPoints,
  setShowJumpPoints,
  showQuantumLinks,
  setShowQuantumLinks,
  isMobileMenuOpen,
  useAdvancedShader,
  setUseAdvancedShader,
  showTerminal,
  setShowTerminal,
  scaleMode,
  toggleScaleMode
}: {
  isLightMode: boolean;
  showOrbits: boolean;
  setShowOrbits: (v: boolean) => void;
  showJumpPoints: boolean;
  setShowJumpPoints: (v: boolean) => void;
  showQuantumLinks: boolean;
  setShowQuantumLinks: (v: boolean) => void;
  isMobileMenuOpen: boolean;
  useAdvancedShader: boolean;
  setUseAdvancedShader: (v: boolean) => void;
  showTerminal: boolean;
  setShowTerminal: (v: boolean) => void;
  scaleMode: 'display' | 'realistic';
  toggleScaleMode: () => void;
}) => {

  return (
    <div className={`flex flex-col gap-2 pointer-events-auto ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
      <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-xl p-3 md:p-4 w-48 md:w-64`}>
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div className={`text-[10px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/70' : 'text-white/60'}`}>Map Controls</div>
          <div className={`text-[8px] font-bold tracking-widest ${isLightMode ? 'text-blue-900/40' : 'text-white/30'}`}>v4.2.1-SEC</div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Orbital Paths</span>
            <button
              onClick={() => setShowOrbits(!showOrbits)}
              className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showOrbits ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
            >
              <div className={`absolute top-[1px] md:top-[1.5px] w-3 h-3 md:w-3 md:h-3 rounded-full transition-all ${showOrbits ? 'left-[14px] md:left-[16px] bg-[currentColor] shadow-[0_0_8px_currentColor] ' + (isLightMode ? 'text-yellow-600' : 'text-blue-400') : 'left-[1.5px] bg-[currentColor] ' + (isLightMode ? 'text-blue-900/40' : 'text-white/40')}`} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Jump Points</span>
            <button
              onClick={() => setShowJumpPoints(!showJumpPoints)}
              className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showJumpPoints ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
            >
              <div className={`absolute top-[1px] md:top-[1.5px] w-3 h-3 md:w-3 md:h-3 rounded-full transition-all ${showJumpPoints ? 'left-[14px] md:left-[16px] bg-[currentColor] shadow-[0_0_8px_currentColor] ' + (isLightMode ? 'text-yellow-600' : 'text-blue-400') : 'left-[1.5px] bg-[currentColor] ' + (isLightMode ? 'text-blue-900/40' : 'text-white/40')}`} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Quantum Links</span>
            <button
              onClick={() => setShowQuantumLinks(!showQuantumLinks)}
              className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showQuantumLinks ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
            >
              <div className={`absolute top-[1px] md:top-[1.5px] w-3 h-3 md:w-3 md:h-3 rounded-full transition-all ${showQuantumLinks ? 'left-[14px] md:left-[16px] bg-[currentColor] shadow-[0_0_8px_currentColor] ' + (isLightMode ? 'text-yellow-600' : 'text-blue-400') : 'left-[1.5px] bg-[currentColor] ' + (isLightMode ? 'text-blue-900/40' : 'text-white/40')}`} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Advanced Atmosphere</span>
            <button
              onClick={() => setUseAdvancedShader(!useAdvancedShader)}
              className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${useAdvancedShader ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
            >
              <div className={`absolute top-[1px] md:top-[1.5px] w-3 h-3 md:w-3 md:h-3 rounded-full transition-all ${useAdvancedShader ? 'left-[14px] md:left-[16px] bg-[currentColor] shadow-[0_0_8px_currentColor] ' + (isLightMode ? 'text-yellow-600' : 'text-blue-400') : 'left-[1.5px] bg-[currentColor] ' + (isLightMode ? 'text-blue-900/40' : 'text-white/40')}`} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Terminal Output</span>
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showTerminal ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
            >
            </button>
          </div>
          <div className="flex justify-between items-center transition-all">

            <span className={`text-[10px] md:text-xs font-bold ${isLightMode ? 'text-blue-900' : 'text-blue-400/90'}`}>
              Realistic 1:1 Scale
            </span>
            <button
              onClick={toggleScaleMode}
              className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${scaleMode === 'realistic' ? (isLightMode ? 'bg-blue-600/40 border-blue-600/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
            >
              <div className={`absolute top-[1px] md:top-[1.5px] w-3 h-3 md:w-3 md:h-3 rounded-full transition-all ${scaleMode === 'realistic' ? 'left-[14px] md:left-[16px] bg-[currentColor] shadow-[0_0_8px_currentColor] ' + (isLightMode ? 'text-blue-600' : 'text-blue-400') : 'left-[1.5px] bg-[currentColor] ' + (isLightMode ? 'text-blue-900/40' : 'text-white/40')}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 w-fit`}>
          <span className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Coord:</span>
          <span className={`text-[8px] md:text-[10px] font-mono ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
            {scaleMode === 'realistic' ? 'RAW_GEOM_DATA' : '12.01.5 / 22.4.9'}
          </span>
        </div>
        <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 w-fit`}>
          <span className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Scale:</span>
          <span className={`text-[8px] md:text-[10px] font-mono ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
            {scaleMode === 'realistic' ? '1:1 REAL_WORLD' : 'STYLE_NORMALIZED'}
          </span>
        </div>
      </div>

    </div>
  );
};
