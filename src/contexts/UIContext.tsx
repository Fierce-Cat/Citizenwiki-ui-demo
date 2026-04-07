import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isLocationExplorerOpen: boolean;
  openLocationExplorer: () => void;
  closeLocationExplorer: () => void;
  toggleLocationExplorer: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isLocationExplorerOpen, setIsLocationExplorerOpen] = useState(() => {
    return window.location.pathname.startsWith('/location');
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openLocationExplorer = () => setIsLocationExplorerOpen(true);
  const closeLocationExplorer = () => setIsLocationExplorerOpen(false);
  const toggleLocationExplorer = () => setIsLocationExplorerOpen(prev => !prev);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  return (
    <UIContext.Provider value={{
      isLocationExplorerOpen,
      openLocationExplorer,
      closeLocationExplorer,
      toggleLocationExplorer,
      isSearchOpen,
      openSearch,
      closeSearch,
      toggleSearch
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
