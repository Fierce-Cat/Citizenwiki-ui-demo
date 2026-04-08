import React, { useState, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useDarkMode } from 'usehooks-ts';
import { Environment } from '@react-three/drei';

import { stanton3DData, jumpPointsData, getBodyPosition, getBodyData } from '../data/starMap3D';
import { StarMapErrorBoundary } from '../components/starmap/utils/StarMapErrorBoundary';
import { Skybox } from '../components/starmap/3d/Skybox';
import { Nebula } from '../components/starmap/3d/Nebula';
import { Grid } from '../components/starmap/3d/Grid';
import { StarSystem } from '../components/starmap/3d/StarSystem';
import { CameraController } from '../components/starmap/3d/CameraController';
import { DynamicLighting } from '../components/starmap/3d/DynamicLighting';
import { StarMapInterface } from '../components/starmap/ui/StarMapInterface';

export function StarMapPage() {
  const navigate = useNavigate();
  const [showOrbits, setShowOrbits] = useState(true);
  const [showJumpPoints, setShowJumpPoints] = useState(false);
  const [showQuantumLinks, setShowQuantumLinks] = useState(true);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [useAdvancedShader, setUseAdvancedShader] = useState(false);
  const darkMode = useDarkMode({ defaultValue: false });
  const isLightMode = !darkMode.isDarkMode;
  const [focusTarget, setFocusTarget] = useState(new THREE.Vector3(0, 0, 0));
  const [selectedId, setSelectedId] = useState<string | null>('crusader');
  const [focusedId, setFocusedId] = useState<string | null>('stanton');
  const [zoomCommand, setZoomCommand] = useState<{ type: 'in' | 'out' | 'reset', id: number } | null>(null);

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
    const result = getBodyPosition(id);
    if (result) {
      handleFocus(result.resolvedId, result.pos);
    }
  };

  const selectedBody = useMemo(() => {
    if (!selectedId) return null;
    return getBodyData(selectedId);
  }, [selectedId]);

  return (
    <div className={`w-screen h-screen ${isLightMode ? 'bg-[#f0f0f0] text-black' : 'bg-black text-white'} overflow-hidden relative font-sans selection:bg-white/20`}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <StarMapErrorBoundary>
          <Canvas
            camera={{ position: [0, 150, 300], fov: 50, near: 0.1, far: 10000 }}
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.5
            }}>
            <color attach="background" args={[isLightMode ? '#f8f8f8' : '#050505']} />
            <Skybox isLightMode={isLightMode} />
            <Environment preset={isLightMode ? "city" : "night"} />
            <ambientLight intensity={isLightMode ? 1.5 : 0.5} />
            <DynamicLighting focusTarget={focusTarget} isZoomedIn={focusedId !== 'stanton'} />
            <Grid isLightMode={isLightMode} />
            <Suspense fallback={null}>
              <Nebula isLightMode={isLightMode} />
              <StarSystem
                showOrbits={showOrbits}
                showJumpPoints={showJumpPoints}
                selectedId={selectedId}
                focusedId={focusedId}
                onSelect={handleSelect}
                onFocus={handleFocus}
                isLightMode={isLightMode}
                useAdvancedShader={useAdvancedShader}
              />
            </Suspense>
            <CameraController target={focusTarget} focusId={focusedId} zoomCommand={zoomCommand} />
            {!isLightMode && (
              <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={2} radius={0.8} />
              </EffectComposer>
            )}
          </Canvas>
        </StarMapErrorBoundary>
      </div>

      <StarMapInterface
        isLightMode={isLightMode}
        toggleLightMode={darkMode.toggle}
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
      />
    </div>
  );
}