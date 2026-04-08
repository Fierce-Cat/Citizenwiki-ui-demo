import React from 'react';
import { ChevronRight, Globe, Moon, Anchor, Target, Compass } from 'lucide-react';
import { findBodyPath, ScaleMode } from '../../../data/starMap3D';

interface AddressBarProps {
  selectedId: string | null;
  isLightMode: boolean;
  scaleMode: ScaleMode;
  onNavigate: (id: string) => void;
}

export const AddressBar = ({ selectedId, isLightMode, scaleMode, onNavigate }: AddressBarProps) => {
  const path = findBodyPath(selectedId, scaleMode);

  const getIcon = (id: string, index: number) => {
    if (index === 0) return <Compass className="w-3.5 h-3.5" />;

    // In a real app, we'd check the type from the body data
    // For now, heuristics based on the path structure or ID
    if (id.includes('jp-')) return <Anchor className="w-3.5 h-3.5" />;
    if (id.includes('-l')) return <Target className="w-3.5 h-3.5" />;
    if (index === 1) return <Globe className="w-3.5 h-3.5" />;
    return <Moon className="w-3.5 h-3.5" />;
  };

  return (
    <div className={`flex items-left w-full max-w-4xl px-1 py-1 rounded-lg border shadow-sm backdrop-blur-xl transition-all duration-300 pointer-events-auto
      ${isLightMode
        ? 'bg-white/60 border-blue-200 shadow-blue-900/5'
        : 'bg-black/40 border-white/10 shadow-black/20'}`}
    >
      <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap px-1">
        {path.map((segment, index) => (
          <React.Fragment key={segment.id}>
            <button
              onClick={() => onNavigate(segment.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all group
                ${isLightMode
                  ? 'text-blue-900/70 hover:text-blue-900 hover:bg-blue-400/10'
                  : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <span className={`transition-transform duration-300 group-hover:scale-110
                ${isLightMode ? 'text-blue-600' : 'text-blue-400'}`}>
                {getIcon(segment.id, index)}
              </span>
              <span className="tracking-wide uppercase font-headline">
                {segment.name}
              </span>
            </button>

            {index < path.length - 1 && (
              <ChevronRight className={`w-3.5 h-3.5 shrink-0
                ${isLightMode ? 'text-blue-300' : 'text-white/20'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Search Input Placeholder or Quick Action could go here to match Explorer style */}
      {/* <div className={`ml-auto border-l pl-2 hidden md:flex items-center
        ${isLightMode ? 'border-blue-200' : 'border-white/10'}`}>
        <div className={`px-2 text-[10px] font-bold tracking-widest uppercase opacity-50
          ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
          NAV://{path.map(s => s.id).join('/')}
        </div>
      </div> */}
    </div>
  );
};
