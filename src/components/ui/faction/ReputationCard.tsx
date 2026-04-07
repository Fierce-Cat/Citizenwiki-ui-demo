import React from 'react';

export function ReputationCard() {
  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm mb-6">
      <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
        Reputation Standing
      </h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">Current Rank</span>
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Legendary Partner</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-red-400 w-1/4" />
          <div className="h-full bg-slate-200 w-1/4" />
          <div className="h-full bg-green-500 w-1/2" />
        </div>
        <div className="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <span>Hostile</span>
          <span>Neutral</span>
          <span>Allied</span>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Trade Bonus</span>
          <span className="text-xs font-bold text-green-600">+12.5%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Landing Priority</span>
          <span className="text-xs font-bold text-green-600">EXEMPT</span>
        </div>
      </div>
    </div>
  );
}
