import React, { useEffect, useState, useRef } from 'react';
import { TerminalLogEvent } from '../utils/TerminalLogger';
import { Terminal } from 'lucide-react';

interface TerminalWidgetProps {
  colorMode: 'light' | 'dark' | 'realistic';
  isVisible: boolean;
}

export const TerminalWidget = ({ colorMode, isVisible }: TerminalWidgetProps) => {
  const [logs, setLogs] = useState<TerminalLogEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLightMode = colorMode === 'light';

  useEffect(() => {
    const handleLog = (e: Event) => {
      const customEvent = e as CustomEvent<TerminalLogEvent>;
      setLogs((prev) => {
        const newLogs = [...prev, customEvent.detail];
        return newLogs.slice(-50); // Keep last 50 logs
      });
    };

    window.addEventListener('starmap-log', handleLog);
    return () => window.removeEventListener('starmap-log', handleLog);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`pointer-events-auto flex flex-col w-64 md:w-80 h-48 md:h-64 rounded-xl border backdrop-blur-md overflow-hidden ${isLightMode ? 'bg-white/60 border-blue-200 shadow-sm' : 'bg-black/80 border-white/10 shadow-lg'} transition-all duration-300`}>
      <div className={`px-3 py-2 flex items-center gap-2 border-b ${isLightMode ? 'border-blue-200' : 'border-white/10'}`}>
        <Terminal className={`w-3 h-3 ${isLightMode ? 'text-blue-900' : 'text-white/60'}`} />
        <span className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/70' : 'text-white/50'}`}>
          Subsystem Diagnostics
        </span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent font-mono text-[9px] md:text-[10px]">
        {logs.length === 0 ? (
          <div className={isLightMode ? 'text-blue-900/40' : 'text-white/30'}>Awaiting telemetry...</div>
        ) : (
          logs.map((log) => {
            let textColor = '';
            let dotColor = '';
            if (isLightMode) {
              if (log.level === 'warn') { textColor = 'text-orange-600'; dotColor = 'bg-orange-500'; }
              else if (log.level === 'success') { textColor = 'text-green-700'; dotColor = 'bg-green-600'; }
              else { textColor = 'text-blue-900/80'; dotColor = 'bg-blue-500'; }
            } else {
              if (log.level === 'warn') { textColor = 'text-orange-400'; dotColor = 'bg-orange-400'; }
              else if (log.level === 'success') { textColor = 'text-green-400'; dotColor = 'bg-green-400'; }
              else { textColor = 'text-white/70'; dotColor = 'bg-white/40'; }
            }

            return (
              <div key={log.timestamp + log.message} className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-16 shrink-0 opacity-50 select-none">
                  [{new Date(log.timestamp).toISOString().substring(11, 23)}]
                </div>
                <div className={`flex items-center gap-1.5 flex-1 ${textColor}`}>
                  <div className={`w-1 h-1 rounded-full shrink-0 ${dotColor}`} />
                  <span className="leading-tight">{log.message}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
