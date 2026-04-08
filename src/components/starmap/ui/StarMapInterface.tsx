import React from 'react';
import * as THREE from 'three';
import { TopNavigation } from './TopNavigation';
import { MapControlsWidget } from './MapControlsWidget';
import { ZoomControlsWidget } from './ZoomControlsWidget';
import { SelectionCard } from './SelectionCard';
import { StarMapLocationExplorer } from '../../ui/sidebar/StarMapLocationExplorer';
import { CelestialBody3D } from '../../../data/starMap3D';

export const StarMapInterface = ({
  isLightMode,
  toggleLightMode,
  isExplorerOpen,
  setIsExplorerOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  showOrbits,
  setShowOrbits,
  showJumpPoints,
  setShowJumpPoints,
  showQuantumLinks,
  setShowQuantumLinks,
  selectedBody,
  setSelectedId,
  handleFocus,
  handleZoom,
  onNavigateHome,
  handleLocationSelect,
  useAdvancedShader,
  setUseAdvancedShader
}: {
  isLightMode: boolean;
  toggleLightMode: () => void;
  isExplorerOpen: boolean;
  setIsExplorerOpen: (v: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  showOrbits: boolean;
  setShowOrbits: (v: boolean) => void;
  showJumpPoints: boolean;
  setShowJumpPoints: (v: boolean) => void;
  showQuantumLinks: boolean;
  setShowQuantumLinks: (v: boolean) => void;
  selectedBody: CelestialBody3D | null;
  setSelectedId: (id: string | null) => void;
  handleFocus: (id: string, pos: THREE.Vector3) => void;
  handleZoom: (type: 'in' | 'out' | 'reset') => void;
  onNavigateHome: () => void;
  handleLocationSelect: (location: any) => void;
  useAdvancedShader: boolean;
  setUseAdvancedShader: (v: boolean) => void;
}) => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 z-10">
        <TopNavigation
          isLightMode={isLightMode}
          toggleLightMode={toggleLightMode}
          isExplorerOpen={isExplorerOpen}
          setIsExplorerOpen={setIsExplorerOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onNavigateHome={onNavigateHome}
        />

        <SelectionCard
          isLightMode={isLightMode}
          selectedBody={selectedBody}
          setSelectedId={setSelectedId}
          handleFocus={handleFocus}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <div className="flex justify-between items-end pointer-events-none">
          <MapControlsWidget
            isLightMode={isLightMode}
            showOrbits={showOrbits}
            setShowOrbits={setShowOrbits}
            showJumpPoints={showJumpPoints}
            setShowJumpPoints={setShowJumpPoints}
            showQuantumLinks={showQuantumLinks}
            setShowQuantumLinks={setShowQuantumLinks}
            isMobileMenuOpen={isMobileMenuOpen}
            useAdvancedShader={useAdvancedShader}
            setUseAdvancedShader={setUseAdvancedShader}
          />

          <ZoomControlsWidget
            isLightMode={isLightMode}
            isMobileMenuOpen={isMobileMenuOpen}
            handleZoom={handleZoom}
            handleFocus={handleFocus}
          />
        </div>
      </div>

      <StarMapLocationExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        onLocationSelect={handleLocationSelect}
        isLightMode={isLightMode}
      />
    </>
  );
};
