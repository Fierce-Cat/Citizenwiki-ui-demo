import React from 'react';
import { Pen } from 'lucide-react';

export function FloatingActionButton() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#0054c5] to-[#2b6de5] text-white rounded-full shadow-[0_8px_24px_rgba(0,84,197,0.4)] flex items-center justify-center hover:brightness-110 hover:scale-105 transition-all z-[200]">
      <Pen className="w-6 h-6" />
    </button>
  );
}
