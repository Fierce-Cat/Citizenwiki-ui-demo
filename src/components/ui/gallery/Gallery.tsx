import React, { useState } from 'react';
import { Image as ImageIcon, ChevronDown } from 'lucide-react';
import { GalleryImage, GalleryCollection } from '../../../data/galleryData';
import { GalleryExplorer } from './GalleryExplorer';

interface GalleryProps {
  images?: GalleryImage[];
  collections?: GalleryCollection[];
}

export function Gallery({ images, collections }: GalleryProps) {
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCollectionId, setActiveCollectionId] = useState(collections?.[0]?.id || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine which images to show
  const activeCollection = collections?.find(c => c.id === activeCollectionId);
  const displayImages = activeCollection ? activeCollection.images : (images || []);

  const openExplorer = (index: number) => {
    setSelectedIndex(index);
    setExplorerOpen(true);
  };

  const handleCollectionSelect = (id: string) => {
    setActiveCollectionId(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-sans text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-800">Visual Database</h3>
          
          {collections && collections.length > 1 && (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container rounded-lg text-xs font-bold text-slate-600 transition-colors"
              >
                {activeCollection?.name || 'Select Gallery'}
                <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-outline-variant/20 shadow-lg z-20 overflow-hidden">
                    {collections.map(collection => (
                      <button
                        key={collection.id}
                        onClick={() => handleCollectionSelect(collection.id)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                          activeCollectionId === collection.id 
                            ? 'bg-primary/5 text-primary' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {collection.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        <button className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-primary transition-colors self-start sm:self-auto">
          View All ({displayImages.length})
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {displayImages.map((img, idx) => (
          <button 
            key={img.id}
            onClick={() => openExplorer(idx)}
            className="relative shrink-0 w-64 md:w-72 h-40 md:h-48 rounded-xl border border-outline-variant/20 overflow-hidden group snap-start bg-slate-50 flex items-center justify-center"
          >
            <img 
              src={img.thumbnailUrl} 
              alt={img.filename} 
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Fallback icon if image doesn't load or just as a placeholder style */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
              <ImageIcon className="w-8 h-8 text-white drop-shadow-md" />
            </div>
          </button>
        ))}
      </div>

      {explorerOpen && (
        <GalleryExplorer 
          images={displayImages} 
          initialIndex={selectedIndex} 
          onClose={() => setExplorerOpen(false)} 
        />
      )}
    </div>
  );
}
