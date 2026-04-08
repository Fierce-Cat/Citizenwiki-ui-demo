import React, { useState, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useLocalStorage } from 'usehooks-ts';
import { Environment } from '@react-three/drei';

import { ScaleMode, StarMapDatabase, getBodyPosition, getBodyData } from '../data/starMap3D';
import { StarMapErrorBoundary } from '../components/starmap/utils/StarMapErrorBoundary';
import { Skybox } from '../components/starmap/3d/Skybox';
import { Nebula } from '../components/starmap/3d/Nebula';
import { Grid } from '../components/starmap/3d/Grid';
import { StarSystem } from '../components/starmap/3d/StarSystem';
import { CameraController } from '../components/starmap/3d/CameraController';
import { DynamicLighting } from '../components/starmap/3d/DynamicLighting';
import { StarMapInterface } from '../components/starmap/ui/StarMapInterface';
import { StarMapLoader } from '../components/starmap/ui/StarMapLoader';

export function StarMapPage() {
  const navigate = useNavigate();
  const [showOrbits, setShowOrbits] = useState(true);
  const [showJumpPoints, setShowJumpPoints] = useState(false);
  const [showQuantumLinks, setShowQuantumLinks] = useState(true);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [colorMode, setColorMode] = useLocalStorage<'light' | 'dark' | 'realistic'>('starmap-color-mode', 'light');
  const isLightMode = colorMode === 'light';
  const useAdvancedShader = colorMode === 'realistic';
  const setUseAdvancedShader = (v: boolean) => setColorMode(v ? 'realistic' : 'dark');
  const cycleColorMode = () => setColorMode(c => c === 'light' ? 'dark' : c === 'dark' ? 'realistic' : 'light');
  const [focusTarget, setFocusTarget] = useState(new THREE.Vector3(0, 0, 0));
  const [selectedId, setSelectedId] = useState<string | null>('crusader');
  const [focusedId, setFocusedId] = useState<string | null>('stanton');
  const [zoomCommand, setZoomCommand] = useState<{ type: 'in' | 'out' | 'reset', id: number } | null>(null);
  const [scaleMode, setScaleMode] = useLocalStorage<ScaleMode>('starmap-scale-mode', 'display');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleScaleMode = () => {
    setIsTransitioning(true);
    // Short delay to allow loader to appear before heavy 3D remount
    setTimeout(() => {
      setScaleMode(prev => prev === 'display' ? 'realistic' : 'display');
      // Keep loader visible for exactly 2 total seconds to hide the snap
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1600);
    }, 400);

  };


  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleFocus = (id: string, pos: THREE.Vector3) => {
    setSelectedId(id);
    setFocusedId(id);
    setFocusTarget(pos.clone());
  };

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    setZoomCommand({ type, id: Date.now() });
    // Reset zoom command after a short delay so it doesn't re-trigger on focus changes
    setTimeout(() => setZoomCommand(null), 100);
  };

  const handleLocationSelect = (id: string) => {
    const result = getBodyPosition(id, scaleMode);
    if (result) {
      handleFocus(result.resolvedId, result.pos);
    }
  };


  const selectedBody = useMemo(() => {
    if (!selectedId) return null;
    return getBodyData(selectedId, scaleMode);
  }, [selectedId, scaleMode]);


  return (
    <div className={`w-screen h-screen ${isLightMode ? 'bg-[#f0f0f0] text-black' : 'bg-black text-white'} overflow-hidden relative font-sans selection:bg-white/20`}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <StarMapErrorBoundary>
          <Canvas
            camera={{ 
              position: scaleMode === 'realistic' ? [0, 50000000, 100000000] : [0, 150, 300], 
              fov: 50, 
              near: scaleMode === 'realistic' ? 10 : 0.1, 
              far: scaleMode === 'realistic' ? 500000000 : 10000
            }}
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.5
            }}>

            <color attach="background" args={[isLightMode ? '#f8f8f8' : '#050505']} />
            <Skybox isLightMode={isLightMode} />
            <Environment preset={isLightMode ? "city" : "night"} />
            <ambientLight intensity={isLightMode ? 1.5 : 0.5} />
            <DynamicLighting focusTarget={focusTarget} isZoomedIn={focusedId !== 'stanton'} />
            <Grid isLightMode={isLightMode} scaleMode={scaleMode} />

            <Suspense fallback={null}>
              <Nebula isLightMode={isLightMode} />
              <group key={scaleMode}>
                <StarSystem
                  scaleMode={scaleMode}
                  showOrbits={showOrbits}
                  showJumpPoints={showJumpPoints}
                  selectedId={selectedId}
                  focusedId={focusedId}
                  onSelect={handleSelect}
                  onFocus={handleFocus}
                  isLightMode={isLightMode}
                  useAdvancedShader={useAdvancedShader}
                />
              </group>
            </Suspense>


            <CameraController target={focusTarget} focusId={focusedId} zoomCommand={zoomCommand} scaleMode={scaleMode} />

            {colorMode === 'realistic' && (
              <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={2} radius={0.8} />
              </EffectComposer>
            )}
          </Canvas>
        </StarMapErrorBoundary>
      </div>

      <StarMapLoader colorMode={colorMode} forceShow={isTransitioning} />


      <StarMapInterface
        isLightMode={isLightMode}
        colorMode={colorMode}
        cycleColorMode={cycleColorMode}
        scaleMode={scaleMode}
        toggleScaleMode={toggleScaleMode}
        isExplorerOpen={isExplorerOpen}
        setIsExplorerOpen={setIsExplorerOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        showOrbits={showOrbits}
        setShowOrbits={setShowOrbits}
        showJumpPoints={showJumpPoints}
        setShowJumpPoints={setShowJumpPoints}
        showQuantumLinks={showQuantumLinks}
        setShowQuantumLinks={setShowQuantumLinks}
        useAdvancedShader={useAdvancedShader}
        setUseAdvancedShader={setUseAdvancedShader}
        selectedBody={selectedBody}
        setSelectedId={setSelectedId}
        handleFocus={handleFocus}
        handleZoom={handleZoom}
        onNavigateHome={() => navigate('/')}
        handleLocationSelect={handleLocationSelect}
        showTerminal={showTerminal}
        setShowTerminal={setShowTerminal}
      />

    </div>
  );
}