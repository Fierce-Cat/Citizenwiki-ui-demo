import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { Line, Html, useTexture } from '@react-three/drei';
import { BodyMaterial } from './BodyMaterial';
import { Atmosphere } from './Atmosphere';
import { CloudLayer } from './CloudLayer';
import { CelestialBody3D } from '../../../data/starMap3D';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  size: number;
  name: string;
  id: string;
  selectedId: string | null;
  focusedId: string | null;
  onSelect: (id: string) => void;
  onFocus: (id: string, pos: THREE.Vector3) => void;
  textureUrl?: string;
  hdTextureUrl?: string;
  reflectionUrl?: string;
  cloudsUrl?: string;
  moons?: CelestialBody3D[];
  isLightMode: boolean;
  useAdvancedShader: boolean;
}

interface HDLayerProps {
  hdTextureUrl: string | null | undefined;
  reflectionUrl: string | null | undefined;
  size: number;
  color: string;
  fadeOpacity: number;
  gl: THREE.WebGLRenderer;
  isPrewarmedRef: React.MutableRefObject<boolean>;
  stabilityTimer: number;
  cameraSpeed: number;
}

interface MoonComponentProps {
  moon: CelestialBody3D;
  selectedId: string | null;
  focusedId: string | null;
  onSelect: (id: string) => void;
  onFocus: (id: string, pos: THREE.Vector3) => void;
  isLightMode: boolean;
  useAdvancedShader: boolean;
  parentPosVec: THREE.Vector3;
  planetId: string;
  key?: React.Key;
}

export const Planet = ({
  position, color, size, name, id, selectedId, focusedId, onSelect, onFocus, textureUrl, hdTextureUrl, reflectionUrl, cloudsUrl, moons = [], isLightMode, useAdvancedShader
}: PlanetProps) => {
  const { gl } = useThree();
  const planetGroupRef = useRef<THREE.Group>(null);
  const [lodLevel, setLodLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const lastDistRef = useRef(0);
  const stabilityTimerRef = useRef(0);
  const isPrewarmedRef = useRef(false);
  const [cameraSpeed, setCameraSpeed] = useState(0);
  const posVec = useMemo(() => new THREE.Vector3(...position), [position]);

  const isPlanetSelected = selectedId === id;
  const isPlanetFocused = selectedId === id || focusedId === id;

  const baseTexture = useTexture(textureUrl || '') as THREE.Texture;

  const getGeometrySegments = (level: string) => {
    switch (level) {
      case 'HIGH': return 128;
      case 'MEDIUM': return 64;
      default: return 32;
    }
  };

  useFrame((state, delta) => {
    if (planetGroupRef.current) {
      planetGroupRef.current.rotation.y += 0.0005;

      const worldPos = new THREE.Vector3();
      planetGroupRef.current.getWorldPosition(worldPos);
      const dist = state.camera.position.distanceTo(worldPos);
      const speed = Math.abs(dist - lastDistRef.current) / delta;
      lastDistRef.current = dist;
      setCameraSpeed(speed);

      // HYBRID LOD CALCULATIONS
      const distWeight = THREE.MathUtils.clamp((100 - dist) / (100 - 45), 0, 1);
      const proximityFidelity = distWeight * 0.4;

      if (isPlanetFocused && dist < 55) {
        if (speed < 0.6) {
          stabilityTimerRef.current = Math.min(1.0, stabilityTimerRef.current + delta);
        } else {
          stabilityTimerRef.current = Math.max(0, stabilityTimerRef.current - delta * 2.0);
        }
      } else {
        stabilityTimerRef.current = 0;
      }
      const stabilityFidelity = stabilityTimerRef.current * 0.6;
      const targetFidelity = isPlanetFocused ? (proximityFidelity + stabilityFidelity) : 0;

      if (targetFidelity > 0.9) setLodLevel('HIGH');
      else if (dist < 150) setLodLevel('MEDIUM');
      else setLodLevel('LOW');

      if (fadeOpacity < targetFidelity) {
        setFadeOpacity(v => Math.min(targetFidelity, v + delta * 1.5));
      } else if (fadeOpacity > targetFidelity) {
        setFadeOpacity(v => Math.max(0, v - delta * (isPlanetFocused ? 1.0 : 3.0)));
      }
    }
  });

  return (
    <group position={position}>
      <group ref={planetGroupRef}>
        <mesh
          onClick={(e) => { e.stopPropagation(); onSelect(id); }}
          onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, posVec); }}
          renderOrder={0}
        >
          <sphereGeometry args={[size, getGeometrySegments(lodLevel), getGeometrySegments(lodLevel)]} />
          <BodyMaterial
            texture={baseTexture}
            color={color}
            transparent={false}
            opacity={1}
          />
        </mesh>

        {(lodLevel === 'HIGH' || fadeOpacity > 0.05) && (
          <Suspense fallback={null}>
            <HDLayer
              hdTextureUrl={(isPlanetFocused || fadeOpacity > 0.1) ? hdTextureUrl : null}
              reflectionUrl={(isPlanetFocused || fadeOpacity > 0.1) ? reflectionUrl : null}
              size={size}
              color={color}
              fadeOpacity={fadeOpacity}
              gl={gl}
              isPrewarmedRef={isPrewarmedRef}
              stabilityTimer={stabilityTimerRef.current}
              cameraSpeed={cameraSpeed}
            />
          </Suspense>
        )}
      </group>

      {!isLightMode && (
        <group renderOrder={10}>
          <Atmosphere size={size} id={id} color={color} useAdvancedShader={useAdvancedShader} />
        </group>
      )}

      {cloudsUrl && (
        <group renderOrder={5}>
          <CloudLayer url={cloudsUrl} size={size} />
        </group>
      )}

      {isPlanetSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 2, size + 2.5, 64]} />
          <meshBasicMaterial color={isLightMode ? "#ffaa00" : "#ffffff"} transparent opacity={0.5 * (1 - fadeOpacity * 0.5)} side={THREE.DoubleSide} />
        </mesh>
      )}

      {(isPlanetSelected || selectedId === 'stanton') && (
        <Html position={[0, size + 5, 0]} center zIndexRange={[0, 0]}>
          <div
            className={`${isLightMode ? 'bg-white/60 border-blue-200 shadow-sm' : 'bg-black/80 border-white/40'} border rounded-full px-4 py-1.5 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer pointer-events-auto transition-opacity duration-500 ${fadeOpacity > 0.8 ? 'opacity-40' : 'opacity-100'}`}
            onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, posVec); }}
            onClick={(e) => { e.stopPropagation(); onSelect(id); }}
          >
            <span className={`text-[10px] font-bold tracking-widest ${isLightMode ? 'text-blue-900' : 'text-white'} whitespace-nowrap leading-none mb-1`}>
              {name.toUpperCase()}
            </span>
            <div className="flex gap-1">
              <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/60' : 'bg-white/60'}`} />
              <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/60' : 'bg-white/60'}`} />
              <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/60' : 'bg-white/60'}`} />
            </div>
          </div>
        </Html>
      )}

      {moons.map((moon) => (
        <MoonComponent
          key={moon.id}
          moon={moon}
          selectedId={selectedId}
          focusedId={focusedId}
          onSelect={onSelect}
          onFocus={onFocus}
          isLightMode={isLightMode}
          useAdvancedShader={useAdvancedShader}
          parentPosVec={posVec}
          planetId={id}
        />
      ))}
    </group>
  );
};

const HDLayer = ({ hdTextureUrl, reflectionUrl, size, color, fadeOpacity, gl, isPrewarmedRef, stabilityTimer, cameraSpeed }: HDLayerProps) => {
  const hdTexture = useHighResTexture(hdTextureUrl);
  const reflectionTexture = useHighResTexture(reflectionUrl);
  const [uploadState, setUploadState] = useState<'IDLE' | 'DIFFUSE' | 'SPECULAR' | 'DONE'>('IDLE');

  useEffect(() => {
    // TRIGGER: Only if we are settling (0.4s) AND camera is almost still (< 0.1)
    if (stabilityTimer > 0.4 && cameraSpeed < 0.1 && uploadState === 'IDLE') {
      setUploadState('DIFFUSE');
    }
  }, [stabilityTimer, cameraSpeed, uploadState]);

  useEffect(() => {
    if (uploadState === 'DIFFUSE' && hdTexture && gl.initTexture) {
      gl.initTexture(hdTexture);
      // STAGGER: Wait for next frame before second upload
      requestAnimationFrame(() => setUploadState('SPECULAR'));
    } else if (uploadState === 'SPECULAR' && reflectionTexture && gl.initTexture) {
      gl.initTexture(reflectionTexture);
      setUploadState('DONE');
      if (isPrewarmedRef) isPrewarmedRef.current = true;
    } else if (uploadState === 'SPECULAR' && !reflectionTexture) {
      setUploadState('DONE');
      if (isPrewarmedRef) isPrewarmedRef.current = true;
    }
  }, [uploadState, hdTexture, reflectionTexture, gl, isPrewarmedRef]);

  // Reset pre-warm if we lose focus/timer
  useEffect(() => {
    if (stabilityTimer === 0 && uploadState !== 'IDLE') {
      setUploadState('IDLE');
      if (isPrewarmedRef) isPrewarmedRef.current = false;
    }
  }, [stabilityTimer, isPrewarmedRef, uploadState]);

  return (
    <mesh renderOrder={1}>
      <sphereGeometry args={[size + 0.001, 128, 128]} />
      <BodyMaterial
        texture={hdTexture}
        reflectionTexture={reflectionTexture}
        color={color}
        transparent
        opacity={fadeOpacity}
      />
    </mesh>
  );
};

function useHighResTexture(url: string | null | undefined) {
  const transparentPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const bitmap = useLoader(THREE.ImageBitmapLoader, url || transparentPixel, (loader) => {
    if (loader instanceof THREE.ImageBitmapLoader) {
      loader.setOptions({ imageOrientation: 'flipY' });
    }
  });

  return useMemo(() => {
    if (!url || !bitmap) return null;
    const texture = new THREE.Texture(bitmap);
    texture.image = bitmap;
    texture.flipY = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [bitmap, url]);
}

const MoonComponent = ({
  moon, selectedId, focusedId, onSelect, onFocus, isLightMode, useAdvancedShader, parentPosVec, planetId
}: MoonComponentProps) => {
  const { gl } = useThree();
  const moonGroupRef = useRef<THREE.Group>(null);
  const [moonLodLevel, setMoonLodLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [moonFadeOpacity, setMoonFadeOpacity] = useState(0);
  const [moonCameraSpeed, setMoonCameraSpeed] = useState(0);
  const lastDistRef = useRef(0);
  const stabilityTimerRef = useRef(0);
  const isPrewarmedRef = useRef(false);

  const isMoonSelected = selectedId === moon.id;
  const isMoonFocused = selectedId === moon.id || focusedId === moon.id;

  const baseTexture = useTexture(moon.textureUrl || '') as THREE.Texture;

  const moonX = Math.cos(moon.angle) * moon.distance;
  const moonZ = Math.sin(moon.angle) * moon.distance;
  const moonPosVec = useMemo(() => new THREE.Vector3(parentPosVec.x + moonX, 0, parentPosVec.z + moonZ), [parentPosVec, moonX, moonZ]);

  const getMoonSegments = (level: string) => {
    switch (level) {
      case 'HIGH': return 64;
      case 'MEDIUM': return 32;
      default: return 16;
    }
  };

  useFrame((state, delta) => {
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y += 0.0008 + (Math.abs(moon.angle) % 0.0005);
      const worldPos = new THREE.Vector3();
      moonGroupRef.current.getWorldPosition(worldPos);
      const dist = state.camera.position.distanceTo(worldPos);
      const speed = Math.abs(dist - lastDistRef.current) / delta;
      lastDistRef.current = dist;
      setMoonCameraSpeed(speed);

      const distWeight = THREE.MathUtils.clamp((50 - dist) / (50 - 20), 0, 1);
      const proximityFidelity = distWeight * 0.4;

      if (isMoonFocused && dist < 25) {
        if (speed < 0.6) {
          stabilityTimerRef.current = Math.min(1.0, stabilityTimerRef.current + delta);
        } else {
          stabilityTimerRef.current = Math.max(0, stabilityTimerRef.current - delta * 2.0);
        }
      } else {
        stabilityTimerRef.current = 0;
      }
      const stabilityFidelity = stabilityTimerRef.current * 0.6;
      const targetFidelity = isMoonFocused ? (proximityFidelity + stabilityFidelity) : 0;

      if (targetFidelity > 0.9) setMoonLodLevel('HIGH');
      else if (dist < 60) setMoonLodLevel('MEDIUM');
      else setMoonLodLevel('LOW');

      if (moonFadeOpacity < targetFidelity) {
        setMoonFadeOpacity(v => Math.min(targetFidelity, v + delta * 1.5));
      } else if (moonFadeOpacity > targetFidelity) {
        setMoonFadeOpacity(v => Math.max(0, v - delta * 2.0));
      }
    }
  });

  return (
    <group>
      <Line
        points={useMemo(() => {
          const pts = [];
          for (let j = 0; j <= 64; j++) {
            const t = (j / 64) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(t) * moon.distance, 0, Math.sin(t) * moon.distance));
          }
          return pts;
        }, [moon.distance])}
        color={isLightMode ? "#666666" : "#333333"}
        lineWidth={1}
      />
      <group position={[moonX, 0, moonZ]}>
        <group ref={moonGroupRef} rotation={[0, moon.angle, 0]}>
          <mesh
            onClick={(e) => { e.stopPropagation(); onSelect(moon.id); }}
            onDoubleClick={(e) => { e.stopPropagation(); onFocus(moon.id, moonPosVec); }}
            renderOrder={0}
          >
            <sphereGeometry args={[moon.size, getMoonSegments(moonLodLevel), getMoonSegments(moonLodLevel)]} />
            <BodyMaterial
              texture={baseTexture}
              color={moon.color}
              transparent={false}
              opacity={1}
            />
          </mesh>

          {(moonLodLevel === 'HIGH' || moonFadeOpacity > 0.05) && (
            <Suspense fallback={null}>
              <HDLayer
                hdTextureUrl={(isMoonFocused || moonFadeOpacity > 0.1) ? moon.hdTextureUrl : null}
                reflectionUrl={(isMoonFocused || moonFadeOpacity > 0.1) ? moon.reflectionUrl : null}
                size={moon.size}
                color={moon.color}
                fadeOpacity={moonFadeOpacity}
                gl={gl}
                isPrewarmedRef={isPrewarmedRef}
                stabilityTimer={stabilityTimerRef.current}
                cameraSpeed={moonCameraSpeed}
              />
            </Suspense>
          )}
        </group>
      </group>

      {!isLightMode && (
        <group position={[moonX, 0, moonZ]} renderOrder={10}>
          <Atmosphere size={moon.size} id={moon.id} color={moon.color} useAdvancedShader={useAdvancedShader} />
        </group>
      )}

      {isMoonSelected && (
        <mesh position={[moonX, 0, moonZ]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[moon.size + 1, moon.size + 1.5, 32]} />
          <meshBasicMaterial color={isLightMode ? "#ffaa00" : "#ffffff"} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}

      {(selectedId === planetId || isMoonSelected) && (
        <Html position={[moonX, moon.size + 2, moonZ]} center zIndexRange={[0, 0]}>
          <div
            className={`text-[8px] font-bold tracking-widest uppercase drop-shadow-md cursor-pointer ${isMoonSelected ? (isLightMode ? 'text-blue-900 bg-white/60 px-2 py-1 rounded-full border border-blue-200 shadow-sm' : 'text-white bg-black/80 px-2 py-1 rounded-full border border-white/40') : (isLightMode ? 'text-blue-900/60' : 'text-slate-400')}`}
            onDoubleClick={(e) => { e.stopPropagation(); onFocus(moon.id, moonPosVec); }}
            onClick={(e) => { e.stopPropagation(); onSelect(moon.id); }}
          >
            {moon.name}
          </div>
        </Html>
      )}
    </group>
  );
};
