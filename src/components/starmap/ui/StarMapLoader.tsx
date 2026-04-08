import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { addTerminalLog } from '../utils/TerminalLogger';

export const StarMapLoader = ({ colorMode }: { colorMode: 'light' | 'dark' | 'realistic' }) => {
  const { progress, active, total, item } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);
  const isLightMode = colorMode === 'light';

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!hasBooted) {
      if (!active && progress === 100) {
        // First boot complete
        timeout = setTimeout(() => {
          setIsVisible(false);
          setHasBooted(true);
          addTerminalLog('NavNet Initialization Complete', 'success');
        }, 500);
      }
    } else {
      // Background loading after boot
      if (active) {
        // We only log when it starts a new batch, or just log generally
        // But doing it for every item is too spammy, so we just log the name of the texture occasionally
        if (item && item.includes('textures')) {
          const fileName = item.split('/').pop()?.split('?')[0];
          if (fileName) {
             addTerminalLog(`Fetching surface data: ${fileName}...`, 'info');
          }
        }
      } else if (!active && progress === 100) {
        addTerminalLog('Background data sync complete', 'success');
      }
    }
    
    return () => clearTimeout(timeout);
  }, [active, progress, hasBooted, item]);

  if (!isVisible && hasBooted) return null;

  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
      !active && progress === 100 ? 'opacity-0' : 'opacity-100'
    } ${isLightMode ? 'bg-[#f0f0f0]' : 'bg-black'}`}>
      
      <div className={`text-2xl md:text-4xl font-headline font-bold tracking-tighter flex items-center gap-3 mb-8 animate-pulse ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
        STANTON <span className={`${isLightMode ? 'text-blue-900/60' : 'text-white/50'} font-normal`}>SYSTEM</span>
      </div>

      <div className="w-64 md:w-96 relative">
        <div className={`text-[10px] font-bold tracking-widest uppercase mb-2 flex justify-between ${isLightMode ? 'text-blue-900/70' : 'text-white/60'}`}>
          <span>Connecting to NavNet...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div className={`h-1 w-full rounded-full overflow-hidden ${isLightMode ? 'bg-blue-900/10' : 'bg-white/10'}`}>
          <div 
            className={`h-full transition-all duration-300 ease-out ${isLightMode ? 'bg-blue-500' : 'bg-white'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className={`text-[8px] font-mono mt-2 text-center opacity-50 ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
          {total > 0 ? `Loading Asset Data Blocks...` : 'Initializing Render Engine...'}
        </div>
      </div>
    </div>
  );
};
