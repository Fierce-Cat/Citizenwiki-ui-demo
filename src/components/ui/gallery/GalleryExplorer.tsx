import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Minus, Download, PlusCircle, Copy } from 'lucide-react';
import { GalleryImage } from '../../../data/galleryData';

interface GalleryExplorerProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryExplorer({ images, initialIndex, onClose }: GalleryExplorerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentImage = images[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-500 bg-white flex flex-col font-sans overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-outline-variant/20 shrink-0">
        <div className="min-w-0 flex-1 mr-4">
          <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-0.5 lg:mb-1 truncate">Visual Database</p>
          <p className="text-xs lg:text-sm font-medium text-slate-900 truncate">{currentImage.filename}</p>
        </div>
        
        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden sm:flex items-center bg-white rounded-md border border-outline-variant/30 shadow-sm overflow-hidden">
            <button className="px-3 py-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <div className="px-3 py-1.5 border-x border-outline-variant/30">
              <span className="text-[10px] font-bold text-slate-600">100%</span>
            </div>
            <button className="px-3 py-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors border border-outline-variant/30">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* Image Viewer */}
        <div className="flex-1 relative flex flex-col bg-[#fafafa] min-h-[40vh] lg:min-h-0">
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative">
            <button 
              onClick={handlePrev}
              className="absolute left-4 lg:left-8 p-2 lg:p-3 rounded-full bg-white/80 lg:bg-white border border-outline-variant/20 shadow-sm text-slate-400 hover:text-slate-900 hover:shadow transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={currentImage.url} 
                alt={currentImage.filename}
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-outline-variant/10"
                referrerPolicy="no-referrer"
              />
            </div>

            <button 
              onClick={handleNext}
              className="absolute right-4 lg:right-8 p-2 lg:p-3 rounded-full bg-white/80 lg:bg-white border border-outline-variant/20 shadow-sm text-slate-400 hover:text-slate-900 hover:shadow transition-all z-10"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="h-20 lg:h-24 border-t border-outline-variant/20 bg-white flex items-center justify-start lg:justify-center gap-3 px-4 lg:px-6 overflow-x-auto hide-scrollbar shrink-0">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-14 h-10 lg:w-16 lg:h-12 rounded bg-slate-100 border-2 overflow-hidden transition-all ${
                  idx === currentIndex ? 'border-[#1e3a5f]' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img 
                  src={img.thumbnailUrl} 
                  alt="" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Metadata */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-outline-variant/20 bg-white overflow-y-auto shrink-0">
          <div className="p-5 lg:p-6 space-y-6 lg:space-y-8">
            
            <section className="space-y-3 lg:space-y-4">
              <h3 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Metadata</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div>
                  <p className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 lg:mb-1">Data Source</p>
                  <p className="text-[11px] lg:text-xs font-medium text-slate-900">{currentImage.dataSource}</p>
                </div>
                <div>
                  <p className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 lg:mb-1">File Resolution</p>
                  <p className="text-[11px] lg:text-xs font-medium text-slate-900">{currentImage.resolution}</p>
                </div>
                <div>
                  <p className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 lg:mb-1">Capture Device</p>
                  <p className="text-[11px] lg:text-xs font-medium text-slate-900">{currentImage.captureDevice}</p>
                </div>
                <div>
                  <p className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 lg:mb-1">Timestamp</p>
                  <p className="text-[11px] lg:text-xs font-medium text-slate-900">{currentImage.timestamp}</p>
                </div>
              </div>
            </section>

            <section className="space-y-2 lg:space-y-3">
              <h3 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Coordinates</h3>
              <div className="flex items-center justify-between px-3 py-2 border border-outline-variant/30 rounded-lg bg-slate-50">
                <span className="text-[11px] lg:text-xs font-mono text-slate-700">{currentImage.coordinates}</span>
                <button className="text-slate-400 hover:text-slate-900 transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            <section className="space-y-2 lg:space-y-3 pb-6 lg:pb-0">
              <h3 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                <button className="w-full flex items-center justify-center gap-2 bg-[#0054c5] hover:bg-[#152a47] text-white py-2 lg:py-2.5 rounded-lg text-[10px] lg:text-xs font-bold tracking-wide transition-colors">
                  <Download className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  DOWNLOAD RAW
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-outline-variant/30 hover:bg-slate-50 text-slate-700 py-2 lg:py-2.5 rounded-lg text-[10px] lg:text-xs font-bold tracking-wide transition-colors">
                  <PlusCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  ADD TO COLLECTION
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
