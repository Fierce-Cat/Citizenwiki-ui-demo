import React, { useState, useRef, useMemo, useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line, Stars, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ArrowLeft, Search, Plus, Minus, Maximize, Target, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import useDarkMode from 'use-dark-mode';
import { StarMapLocationExplorer } from '../components/ui/sidebar/StarMapLocationExplorer';
import { stanton3DData, getBodyPosition, getBodyData, CelestialBody3D, jumpPointsData, JumpPoint3D } from '../data/starMap3D';
import smokeTextureUrl from '../assets/starmap/smoke.png';

// --- Error Boundary ---
class StarMapErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Star Map Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-red-500">Error Loading Star Map</h2>
            <p className="text-white/60">There was a problem loading the 3D assets.</p>
            <button 
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Three.js Components ---

const TexturedMaterial = ({ url, color }: { url: string, color: string }) => {
  const texture = useTexture(url);
  return <meshStandardMaterial map={texture} color={color} roughness={0.9} metalness={0.0} />;
};

const BodyMaterial = ({ url, color }: { url?: string, color: string }) => {
  if (!url) return <meshStandardMaterial color={color} roughness={0.9} metalness={0.0} />;
  return <TexturedMaterial url={url} color={color} />;
};

const CloudLayer = ({ url, size }: { url: string, size: number }) => {
  const texture = useTexture(url);
  const cloudRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={cloudRef}>
      <sphereGeometry args={[size * 1.02, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        transparent={true} 
        opacity={0.6} 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const Skybox = ({ isLightMode }: { isLightMode: boolean }) => {
  return (
    <group>
      {!isLightMode && <Stars radius={100} depth={800} count={7000} factor={6} saturation={0} fade speed={1} />}
      <mesh>
        <sphereGeometry args={[4000, 32, 32]} />
        <meshBasicMaterial color={isLightMode ? "#f8f8f8" : "#020208"} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// --- UPDATED NEBULA COMPONENT ---
const Nebula = ({ isLightMode }: { isLightMode: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  const nebulaParticles = useMemo(() => {
    const spread = 1000; // Matches Fierce-Cat's PARTICLE_SPREAD
    const particles = [];
    for (let i = 0; i < 50; i++) { // Matches Fierce-Cat's PARTICLE_COUNT
      const x = THREE.MathUtils.randFloatSpread(spread);
      const y = THREE.MathUtils.randFloatSpread(spread);
      const z = THREE.MathUtils.randFloatSpread(spread);
      particles.push(x, y, z);
    }
    return particles;
  }, []);

  const nebulaGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaParticles, 3));
    return geometry;
  }, [nebulaParticles]);

  const nebulaColors = useMemo(() => {
    // Array of hex colors matching Fierce-Cat's solar system config 
    // (creates the purple, pink, green, blue mix)
    const colors = ['#9966ff', '#ff6699', '#66ff99', '#4c72bf', '#ff0000']; 
    return colors.map(color => new THREE.Color(color));
  }, []);

  const nebulaTexture = useTexture(smokeTextureUrl);

  const nebulaMaterials = useMemo(() => {
    return nebulaColors.map(color => new THREE.PointsMaterial({
      size: 400, // Matches Fierce-Cat's MATERIAL_SIZE
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: isLightMode ? 0.02 : 0.1, // Matches Fierce-Cat's MATERIAL_OPACITY
      map: nebulaTexture,
      color: color.clone().multiplyScalar(0.1) // Matches Fierce-Cat's COLOR_MULTIPLIER to keep them ambient/darker
    }));
  }, [nebulaTexture, nebulaColors]);

  const nebula = useMemo(() => {
    const nebulaClusters: THREE.Points[] = [];
    const spread = 600; // Matches Fierce-Cat's CLUSTER_SPREAD

    nebulaColors.forEach((_, index) => {
      const points = new THREE.Points(nebulaGeometry, nebulaMaterials[index]);
      // Offsets clusters dynamically so the colors spread across different regions
      points.position.set(
        THREE.MathUtils.randFloatSpread(spread),
        THREE.MathUtils.randFloatSpread(spread),
        THREE.MathUtils.randFloatSpread(spread)
      );
      nebulaClusters.push(points);
    });
    return nebulaClusters;
  }, [nebulaGeometry, nebulaMaterials, nebulaColors]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0002;
      groupRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <group ref={groupRef}>
      {nebula.map((nebulaPoints, index) => (
        <primitive
          key={`nebula-${index}`}
          object={nebulaPoints}
          frustumCulled={true}
        />
      ))}
    </group>
  );
};
// -------------------------------

const Grid = ({ isLightMode }: { isLightMode: boolean }) => {
  return (
    <group>
      {isLightMode ? (
        <>
          {/* Concentric circles */}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(radius => (
            <Line 
              key={`grid-circle-${radius}`}
              points={useMemo(() => {
                const pts = [];
                for(let i=0; i<=128; i++) {
                  const t = (i/128)*Math.PI*2;
                  pts.push(new THREE.Vector3(Math.cos(t)*radius, -50, Math.sin(t)*radius));
                }
                return pts;
              }, [radius])} 
              color="#cccccc" 
              lineWidth={1} 
            />
          ))}
          {/* Crosshairs */}
          <Line points={[new THREE.Vector3(-1000, -50, 0), new THREE.Vector3(1000, -50, 0)]} color="#aaaaaa" lineWidth={1} />
          <Line points={[new THREE.Vector3(0, -50, -1000), new THREE.Vector3(0, -50, 1000)]} color="#aaaaaa" lineWidth={1} />
        </>
      ) : (
        <gridHelper args={[2000, 100, '#1a1a1a', '#0a0a0a']} position={[0, -50, 0]} />
      )}
    </group>
  );
};

const Orbit = ({ radius, isLightMode }: { radius: number, isLightMode: boolean }) => {
  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line points={points} color={isLightMode ? "#111111" : "#222222"} lineWidth={1} />
  );
};

const Planet = ({ 
  position, 
  color, 
  size, 
  name, 
  id,
  selectedId, 
  onSelect,
  onFocus,
  textureUrl,
  cloudsUrl,
  moons = [],
  isLightMode
}: { 
  position: [number, number, number], 
  color: string, 
  size: number, 
  name: string, 
  id: string,
  selectedId: string | null, 
  onSelect: (id: string) => void,
  onFocus: (id: string, pos: THREE.Vector3) => void,
  textureUrl?: string,
  cloudsUrl?: string,
  moons?: CelestialBody3D[],
  isLightMode: boolean
}) => {
  const posVec = useMemo(() => new THREE.Vector3(...position), [position]);
  const isPlanetSelected = selectedId === id;
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={planetRef} 
        onClick={(e) => { e.stopPropagation(); onSelect(id); }}
        onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, posVec); }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <BodyMaterial url={textureUrl} color={color} />
      </mesh>
      
      {cloudsUrl && <CloudLayer url={cloudsUrl} size={size} />}
      
      {/* Selection Ring */}
      {isPlanetSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 2, size + 2.5, 64]} />
          <meshBasicMaterial color={isLightMode ? "#ffaa00" : "#ffffff"} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Label */}
      {(isPlanetSelected || selectedId === 'stanton') && (
        <Html position={[0, size + 5, 0]} center zIndexRange={[0, 0]}>
          <div 
            className={`${isLightMode ? 'bg-white/60 border-blue-200 shadow-sm' : 'bg-black/80 border-white/40'} border rounded-full px-4 py-1.5 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer pointer-events-auto`}
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

      {/* Moons */}
      {moons.map((moon, i) => {
        const moonX = Math.cos(moon.angle) * moon.distance;
        const moonZ = Math.sin(moon.angle) * moon.distance;
        const isMoonSelected = selectedId === moon.id;
        const moonPosVec = new THREE.Vector3(posVec.x + moonX, 0, posVec.z + moonZ);

        return (
          <group key={moon.id}>
            <Line 
              points={useMemo(() => {
                const pts = [];
                for(let j=0; j<=64; j++) {
                  const t = (j/64)*Math.PI*2;
                  pts.push(new THREE.Vector3(Math.cos(t)*moon.distance, 0, Math.sin(t)*moon.distance));
                }
                return pts;
              }, [moon.distance])} 
              color={isLightMode ? "#666666" : "#333333"} 
              lineWidth={1} 
            />
            <mesh 
              position={[moonX, 0, moonZ]}
              onClick={(e) => { e.stopPropagation(); onSelect(moon.id); }}
              onDoubleClick={(e) => { e.stopPropagation(); onFocus(moon.id, moonPosVec); }}
            >
              <sphereGeometry args={[moon.size, 16, 16]} />
              <BodyMaterial url={moon.textureUrl} color={moon.color} />
            </mesh>

            {isMoonSelected && (
              <mesh position={[moonX, 0, moonZ]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[moon.size + 1, moon.size + 1.5, 32]} />
                <meshBasicMaterial color={isLightMode ? "#ffaa00" : "#ffffff"} transparent opacity={0.5} side={THREE.DoubleSide} />
              </mesh>
            )}

            {(isPlanetSelected || isMoonSelected) && (
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
      })}
    </group>
  );
};

import { sunVertexShaderCorona, sunFragmentShaderCorona } from '../shaders/sunShaders';

const SunFlare = ({ size, color }: { size: number, color: string }) => {
  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        coronaColor1: { value: new THREE.Color(color) }, // inner corona color
        coronaColor2: { value: new THREE.Color('#ffaa00') }, // outer corona color
      },
      vertexShader: sunVertexShaderCorona,
      fragmentShader: sunFragmentShaderCorona,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, [color]);

  useFrame((state) => {
    if (coronaMaterial) {
      coronaMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshBasicMaterial color={[4, 4, 3]} toneMapped={false} />
      </mesh>
      {/* Corona Shader */}
      <mesh material={coronaMaterial} scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[size, 64, 64]} />
      </mesh>
    </group>
  );
};

const JumpPoint = ({ 
  position, 
  color, 
  size, 
  name, 
  id, 
  selectedId, 
  onSelect, 
  onFocus,
  isLightMode
}: { 
  position: [number, number, number], 
  color: string, 
  size: number, 
  name: string, 
  id: string, 
  selectedId: string | null, 
  onSelect: (id: string) => void, 
  onFocus: (id: string, pos: THREE.Vector3) => void,
  isLightMode: boolean
}) => {
  const isSelected = selectedId === id;
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z += 0.02;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      {/* Core Marker */}
      <mesh 
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(id); }}
        onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, new THREE.Vector3(...position)); }}
      >
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial 
          color={isLightMode ? "#ffaa00" : color} 
          emissive={isLightMode ? "#ffaa00" : color} 
          emissiveIntensity={isSelected ? 4 : 2} 
          wireframe 
        />
      </mesh>

      {/* Glowing Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[size * 1.5, 0.05, 16, 100]} />
        <meshBasicMaterial color={isLightMode ? "#ffaa00" : color} transparent opacity={0.5} />
      </mesh>

      {/* Label */}
      {(isSelected || selectedId === 'stanton') && (
        <Html position={[0, size + 5, 0]} center zIndexRange={[0, 0]}>
          <div 
            className={`${isLightMode ? 'bg-white/60 border-blue-200 shadow-sm' : 'bg-black/80 border-white/40'} border rounded-full px-4 py-1.5 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer pointer-events-auto`}
            onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, new THREE.Vector3(...position)); }}
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
    </group>
  );
};

const StarSystem = ({ showOrbits, showJumpPoints, selectedId, onSelect, onFocus, isLightMode }: { showOrbits: boolean, showJumpPoints: boolean, selectedId: string | null, onSelect: (id: string) => void, onFocus: (id: string, pos: THREE.Vector3) => void, isLightMode: boolean }) => {
  const { star, planets } = stanton3DData;

  // Initial focus
  useEffect(() => {
    if (selectedId) {
      const result = getBodyPosition(selectedId);
      if (result) onFocus(result.resolvedId, result.pos);
    }
  }, []);

  return (
    <group>
      {/* Central Star */}
      <group 
        onClick={(e) => { e.stopPropagation(); onSelect('stanton'); }}
        onDoubleClick={(e) => { e.stopPropagation(); onFocus('stanton', new THREE.Vector3(0, 0, 0)); }}
      >
        <mesh>
          <sphereGeometry args={[star.size, 64, 64]} />
          <meshBasicMaterial color={isLightMode ? "#ffaa00" : star.color} />
        </mesh>
        {!isLightMode && <SunFlare size={star.size} color={star.color} />}
      </group>

      {/* Planets and Orbits */}
      {planets.map(planet => {
        const x = Math.cos(planet.angle) * planet.distance;
        const z = Math.sin(planet.angle) * planet.distance;
        
        return (
          <group key={planet.id}>
            {showOrbits && <Orbit radius={planet.distance} isLightMode={isLightMode} />}
            {isLightMode && (
              <group>
                <Line points={[new THREE.Vector3(x, 0, z), new THREE.Vector3(x, -50, z)]} color="#888888" lineWidth={1} />
                <mesh position={[x, -50, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.5, 1, 16]} />
                  <meshBasicMaterial color="#888888" />
                </mesh>
              </group>
            )}
            <Planet 
              position={[x, 0, z]} 
              color={planet.color} 
              size={planet.size} 
              name={planet.name}
              id={planet.id}
              selectedId={selectedId}
              onSelect={onSelect}
              onFocus={onFocus}
              textureUrl={planet.textureUrl}
              cloudsUrl={planet.cloudsUrl}
              moons={planet.moons}
              isLightMode={isLightMode}
            />
          </group>
        );
      })}

      {/* Jump Points */}
      {showJumpPoints && jumpPointsData.map(jp => {
        const x = Math.cos(jp.angle) * jp.distance;
        const z = Math.sin(jp.angle) * jp.distance;
        const y = jp.y || 0;
        return (
          <group key={jp.id}>
            {isLightMode && (
              <group>
                <Line points={[new THREE.Vector3(x, y, z), new THREE.Vector3(x, -50, z)]} color="#888888" lineWidth={1} />
                <mesh position={[x, -50, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.5, 1, 16]} />
                  <meshBasicMaterial color="#888888" />
                </mesh>
              </group>
            )}
            <JumpPoint 
              position={[x, y, z]}
              color={jp.color}
              size={jp.size}
              name={jp.name}
              id={jp.id}
              selectedId={selectedId}
              onSelect={onSelect}
              onFocus={onFocus}
              isLightMode={isLightMode}
            />
          </group>
        );
      })}
    </group>
  );
};

const getBodySize = (id: string) => {
  if (id === 'stanton') return stanton3DData.star.size;
  for (const jp of jumpPointsData) {
    if (jp.id === id) return jp.size;
  }
  for (const planet of stanton3DData.planets) {
    if (planet.id === id) return planet.size;
    if (planet.moons) {
      for (const moon of planet.moons) {
        if (moon.id === id) return moon.size;
      }
    }
  }
  return 5;
};

const CameraController = ({ 
  target, 
  focusId,
  zoomCommand
}: { 
  target: THREE.Vector3, 
  focusId: string | null,
  zoomCommand: { type: 'in' | 'out' | 'reset', id: number } | null
}) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const isAnimating = useRef(false);
  const targetCameraPos = useRef(new THREE.Vector3(0, 150, 300));

  useEffect(() => {
    if (!controlsRef.current) return;
    
    isAnimating.current = true;
    
    if (focusId === 'stanton' || !focusId) {
      targetCameraPos.current.set(0, 150, 300);
    } else {
      const size = getBodySize(focusId);
      const desiredDistance = size * 6; // Adjust distance based on object size
      
      // Calculate current direction from target to camera
      const currentDir = new THREE.Vector3().subVectors(camera.position, controlsRef.current.target).normalize();
      
      // If the current direction is almost zero (e.g. exactly at target), provide a default
      if (currentDir.lengthSq() < 0.01) {
        currentDir.set(1, 0.5, 1).normalize();
      }
      
      targetCameraPos.current.copy(target).add(currentDir.multiplyScalar(desiredDistance));
    }
  }, [target, focusId, camera]);

  useEffect(() => {
    if (!zoomCommand || !controlsRef.current) return;
    
    isAnimating.current = true;
    const controls = controlsRef.current;
    const currentTarget = controls.target;
    
    if (zoomCommand.type === 'in') {
      const dir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      const dist = camera.position.distanceTo(currentTarget);
      const newDist = Math.max(dist * 0.6, 2);
      targetCameraPos.current.copy(currentTarget).add(dir.multiplyScalar(newDist));
    } else if (zoomCommand.type === 'out') {
      const dir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      const dist = camera.position.distanceTo(currentTarget);
      const newDist = Math.min(dist * 1.6, 1000);
      targetCameraPos.current.copy(currentTarget).add(dir.multiplyScalar(newDist));
    } else if (zoomCommand.type === 'reset') {
      const size = focusId === 'stanton' || !focusId ? 50 : getBodySize(focusId);
      const desiredDistance = focusId === 'stanton' || !focusId ? 350 : size * 6;
      const currentDir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      if (currentDir.lengthSq() < 0.01) currentDir.set(1, 0.5, 1).normalize();
      targetCameraPos.current.copy(currentTarget).add(currentDir.multiplyScalar(desiredDistance));
    }
  }, [zoomCommand, camera]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      const onStart = () => { isAnimating.current = false; };
      controls.addEventListener('start', onStart);
      return () => controls.removeEventListener('start', onStart);
    }
  }, []);

  useFrame(() => {
    if (controlsRef.current) {
      if (isAnimating.current) {
        controlsRef.current.target.lerp(target, 0.05);
        camera.position.lerp(targetCameraPos.current, 0.05);
        
        if (controlsRef.current.target.distanceTo(target) < 0.1 && camera.position.distanceTo(targetCameraPos.current) < 0.1) {
          isAnimating.current = false;
        }
      }
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enableDamping={true} 
      dampingFactor={0.05} 
      minDistance={2} 
      maxDistance={1000} 
      maxPolarAngle={Math.PI / 2 + 0.2}
      makeDefault
    />
  );
};

const DynamicLighting = ({ focusTarget, isZoomedIn }: { focusTarget: THREE.Vector3, isZoomedIn: boolean }) => {
  const { camera } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
      lightRef.current.target.position.copy(focusTarget);
      lightRef.current.target.updateMatrixWorld();
    }
    if (pointLightRef.current) {
      const targetIntensity = isZoomedIn ? 0.5 : 3.0;
      pointLightRef.current.intensity = THREE.MathUtils.lerp(pointLightRef.current.intensity, targetIntensity, 0.05);
    }
    if (lightRef.current) {
      const targetDirIntensity = isZoomedIn ? 1.5 : 0.0;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetDirIntensity, 0.05);
    }
  });

  return (
    <>
      <pointLight ref={pointLightRef} position={[0, 0, 0]} intensity={3} distance={0} decay={0} color="#ffffff" />
      <directionalLight ref={lightRef} intensity={0} color="#ffffff" />
    </>
  );
};

// --- Main Page Component ---

export function StarMapPage() {
  const navigate = useNavigate();
  const [showOrbits, setShowOrbits] = useState(true);
  const [showJumpPoints, setShowJumpPoints] = useState(false);
  const [showQuantumLinks, setShowQuantumLinks] = useState(true);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const darkMode = useDarkMode(false);
  const isLightMode = !darkMode.value;
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

  const getBodyType = (id: string) => {
    if (id === 'stanton') return 'Star';
    if (id.startsWith('jp-')) return 'Jump Point';
    for (const p of stanton3DData.planets) {
      if (p.id === id) return 'Planet';
      if (p.moons?.some(m => m.id === id)) return 'Moon';
    }
    return 'Unknown';
  };

  return (
    <div className={`w-screen h-screen ${isLightMode ? 'bg-[#f0f0f0] text-black' : 'bg-black text-white'} overflow-hidden relative font-sans selection:bg-white/20`}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <StarMapErrorBoundary>
          <Canvas 
            camera={{ position: [0, 150, 300], fov: 50, near: 0.1, far: 10000 }}
            gl={{ 
              toneMapping: THREE.ACESFilmicToneMapping, 
              toneMappingExposure: 1.5 // Tweak this value (e.g., 0.1 to 1.0) to dim the whole scene
            }}>
            <color attach="background" args={[isLightMode ? '#f8f8f8' : '#050505']} />
            <Skybox isLightMode={isLightMode} />
            <ambientLight intensity={isLightMode ? 1.5 : 0.5} />
            <DynamicLighting focusTarget={focusTarget} isZoomedIn={focusedId !== 'stanton'} />
            <Grid isLightMode={isLightMode} />
            <Suspense fallback={null}>
              <Nebula isLightMode={isLightMode} />
              <StarSystem showOrbits={showOrbits} showJumpPoints={showJumpPoints} selectedId={selectedId} onSelect={handleSelect} onFocus={handleFocus} isLightMode={isLightMode} />
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

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 z-10">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start pointer-events-auto">
          {/* Top Left */}
          <div className="flex items-start gap-3 md:gap-4">
            <button 
              onClick={() => navigate('/')}
              className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border ${isLightMode ? 'border-blue-200 bg-white/40 shadow-sm hover:bg-white/60' : 'border-white/10 bg-black/50 hover:bg-white/10'} backdrop-blur-md flex items-center justify-center transition-colors`}
            >
              <ArrowLeft className={`w-4 h-4 md:w-5 md:h-5 ${isLightMode ? 'text-blue-900' : 'text-white'}`} />
            </button>
            <div>
              <h1 className={`text-xl md:text-2xl font-headline font-bold tracking-tighter flex items-center gap-2 ${isLightMode ? 'text-blue-900' : 'text-white'}`}>
                STANTON <span className={`${isLightMode ? 'text-blue-900/60' : 'text-white/50'} font-normal hidden sm:inline`}>SYSTEM</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className={`text-[8px] font-bold tracking-widest ${isLightMode ? 'text-blue-900/60' : 'text-white/50'} uppercase hidden sm:inline`}>
                  Synchronized with UDB NavNet
                </span>
                <span className={`text-[8px] font-bold tracking-widest ${isLightMode ? 'text-blue-900/60' : 'text-white/50'} uppercase sm:hidden`}>
                  UDB NavNet
                </span>
              </div>
            </div>
          </div>

          {/* Top Right */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative group hidden sm:block">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLightMode ? 'text-blue-900/40 group-hover:text-blue-900/80' : 'text-white/40 group-hover:text-white/80'} transition-colors`} />
              <input 
                type="text" 
                placeholder="Search system nodes..." 
                className={`${isLightMode ? 'bg-white/40 border-blue-200 text-blue-900 placeholder:text-blue-900/40 focus:border-blue-400 focus:bg-white/60 shadow-sm' : 'bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-black/80'} backdrop-blur-md border rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none transition-all w-48 md:w-64`}
                onFocus={() => setIsExplorerOpen(true)}
              />
            </div>
            <button 
              onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border ${isLightMode ? (isExplorerOpen ? 'border-blue-400 bg-white/60' : 'border-blue-200 bg-white/40') : (isExplorerOpen ? 'border-white/40 bg-white/10' : 'border-white/10 bg-black/50')} backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors`}
            >
              <Search className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-white'} sm:hidden`} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isLightMode ? 'text-blue-900' : 'text-white'} hidden sm:block`}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </button>
            <button 
              onClick={darkMode.toggle}
              className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border ${isLightMode ? 'border-blue-200 bg-white/40 shadow-sm hover:bg-white/60' : 'border-white/10 bg-black/50 hover:bg-white/10'} backdrop-blur-md flex items-center justify-center transition-colors`}
              title="Toggle Theme"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-blue-900" /> : <Sun className="w-4 h-4 text-white" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-8 h-8 shrink-0 rounded-full border ${isLightMode ? (isMobileMenuOpen ? 'border-blue-400 bg-white/60' : 'border-blue-200 bg-white/40') : (isMobileMenuOpen ? 'border-white/40 bg-white/10' : 'border-white/10 bg-black/50')} backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors`}
            >
              {isMobileMenuOpen ? <X className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-white'}`} /> : <Menu className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-white'}`} />}
            </button>
          </div>
        </div>

        {/* Middle Left: Info Cards */}
        <div className={`absolute left-4 md:left-6 top-24 md:top-32 flex-col gap-4 pointer-events-auto transition-all duration-500 ${isMobileMenuOpen ? 'flex opacity-100' : 'hidden md:flex md:opacity-100'}`}>
          {/* Selection Info Card */}
          <AnimatePresence mode="wait">
            {selectedBody && (
              <motion.div 
                key={selectedBody.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-lg' : 'bg-black/80 border-white/20 shadow-2xl'} backdrop-blur-xl border rounded-2xl p-4 md:p-5 w-56 md:w-72 relative group overflow-hidden`}
              >
                {/* Decorative background element */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl transition-colors duration-700 ${isLightMode ? 'bg-yellow-400/20 group-hover:bg-yellow-400/30' : 'bg-blue-500/10 group-hover:bg-blue-500/20'}`} />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <div className={`text-[8px] font-bold tracking-[0.2em] uppercase mb-1 ${isLightMode ? 'text-yellow-600' : 'text-blue-400'}`}>Celestial Object</div>
                    <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${isLightMode ? 'text-blue-900 group-hover:text-blue-700' : 'text-white group-hover:text-blue-50'}`}>{selectedBody.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedId(null)}
                    className={`p-1.5 rounded-full transition-all ${isLightMode ? 'hover:bg-blue-900/10 text-blue-900/40 hover:text-blue-900' : 'hover:bg-white/10 text-white/30 hover:text-white'}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/30'}`}>Classification</div>
                    <div className={`text-[10px] md:text-xs font-medium ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>{getBodyType(selectedBody.id)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/30'}`}>Distance</div>
                    <div className={`text-[10px] md:text-xs font-mono ${isLightMode ? 'text-yellow-600' : 'text-blue-300/80'}`}>
                      {selectedBody.id === 'stanton' ? '0.00' : selectedBody.distance.toFixed(1)} <span className="text-[8px] opacity-50">AU</span>
                    </div>
                  </div>
                  {selectedBody.destination && (
                    <div className="space-y-1 col-span-2">
                      <div className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/30'}`}>Destination</div>
                      <div className={`text-[10px] md:text-xs font-medium ${isLightMode ? 'text-yellow-600' : 'text-blue-400'}`}>{selectedBody.destination}</div>
                    </div>
                  )}
                  {selectedBody.travelTime && (
                    <div className="space-y-1 col-span-2">
                      <div className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/30'}`}>Est. Travel Time</div>
                      <div className={`text-[10px] md:text-xs font-mono ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>{selectedBody.travelTime}</div>
                    </div>
                  )}
                </div>

                <div className={`mt-5 pt-4 border-t flex items-center justify-between relative z-10 ${isLightMode ? 'border-blue-900/10' : 'border-white/5'}`}>
                  <div className="flex gap-1">
                    <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'}`} />
                    <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/20' : 'bg-white/10'}`} />
                    <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-blue-900/20' : 'bg-white/10'}`} />
                  </div>
                  <button 
                    onClick={() => {
                      const pos = getBodyPosition(selectedBody.id);
                      if (pos) handleFocus(selectedBody.id, pos.pos);
                    }}
                    className={`text-[9px] font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5 group/btn ${isLightMode ? 'text-blue-900/60 hover:text-blue-900' : 'text-white/40 hover:text-white'}`}
                  >
                    Focus Target
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-xl p-3 md:p-4 w-48 md:w-64`}>
            <div className={`text-[8px] font-bold tracking-widest uppercase mb-1 md:mb-2 ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Active Landing Zone</div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLightMode ? 'bg-yellow-500' : 'bg-blue-500'}`} />
              <div className={`text-xs md:text-sm font-bold tracking-wider ${isLightMode ? 'text-blue-900' : 'text-white'}`}>ORISON [CRU]</div>
            </div>
          </div>
          
          <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-xl p-3 md:p-4 w-48 md:w-64`}>
            <div className={`text-[8px] font-bold tracking-widest uppercase mb-1 md:mb-2 ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Security Alert</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className={`text-xs md:text-sm font-bold tracking-wider ${isLightMode ? 'text-blue-900' : 'text-white'}`}>CAUTION [PYRO]</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`flex justify-between items-end pointer-events-auto transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          {/* Bottom Left: Map Controls */}
          <div className={`flex flex-col gap-4 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
            <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-xl p-4 md:p-5 w-48 md:w-64`}>
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <div className={`text-[10px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/70' : 'text-white/60'}`}>Map Controls</div>
                <div className={`text-[8px] font-bold tracking-widest ${isLightMode ? 'text-blue-900/40' : 'text-white/30'}`}>v4.2.1-SEC</div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Orbital Paths</span>
                  <button 
                    onClick={() => setShowOrbits(!showOrbits)}
                    className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showOrbits ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
                  >
                    <div className={`absolute top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all ${showOrbits ? (isLightMode ? 'bg-yellow-600 left-4 md:left-4.5' : 'bg-blue-400 left-4 md:left-4.5') : (isLightMode ? 'bg-blue-900/40 left-0.5' : 'bg-white/30 left-0.5')}`} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Jump Points</span>
                  <button 
                    onClick={() => setShowJumpPoints(!showJumpPoints)}
                    className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showJumpPoints ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
                  >
                    <div className={`absolute top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all ${showJumpPoints ? (isLightMode ? 'bg-yellow-600 left-4 md:left-4.5' : 'bg-blue-400 left-4 md:left-4.5') : (isLightMode ? 'bg-blue-900/40 left-0.5' : 'bg-white/30 left-0.5')}`} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] md:text-xs ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>Quantum Links</span>
                  <button 
                    onClick={() => setShowQuantumLinks(!showQuantumLinks)}
                    className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-colors ${showQuantumLinks ? (isLightMode ? 'bg-yellow-400/40 border-yellow-500/50' : 'bg-blue-500/30 border-blue-500/50') : (isLightMode ? 'bg-blue-900/10 border-blue-900/20' : 'bg-white/5 border-white/10')} border`}
                  >
                    <div className={`absolute top-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all ${showQuantumLinks ? (isLightMode ? 'bg-yellow-600 left-4 md:left-4.5' : 'bg-blue-400 left-4 md:left-4.5') : (isLightMode ? 'bg-blue-900/40 left-0.5' : 'bg-white/30 left-0.5')}`} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 w-fit`}>
                <span className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Coord:</span>
                <span className={`text-[8px] md:text-[10px] font-mono ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>12.01.5 / 22.4.9</span>
              </div>
              <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 w-fit`}>
                <span className={`text-[8px] font-bold tracking-widest uppercase ${isLightMode ? 'text-blue-900/50' : 'text-white/40'}`}>Scale:</span>
                <span className={`text-[8px] md:text-[10px] font-mono ${isLightMode ? 'text-blue-900' : 'text-white/80'}`}>1:10^6 KM</span>
              </div>
            </div>
          </div>

          {/* Bottom Right: Zoom Controls */}
          <div className={`flex flex-col gap-2 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
            <div className={`${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm' : 'bg-black/60 border-white/10'} backdrop-blur-md border rounded-full flex flex-col overflow-hidden`}>
              <button 
                onClick={() => handleZoom('in')}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors border-b ${isLightMode ? 'hover:bg-white/60 border-blue-200' : 'hover:bg-white/10 border-white/10'}`}
              >
                <Plus className={`w-3 h-3 md:w-4 md:h-4 ${isLightMode ? 'text-blue-900' : 'text-white/80'}`} />
              </button>
              <button 
                onClick={() => handleZoom('out')}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors border-b ${isLightMode ? 'hover:bg-white/60 border-blue-200' : 'hover:bg-white/10 border-white/10'}`}
              >
                <Minus className={`w-3 h-3 md:w-4 md:h-4 ${isLightMode ? 'text-blue-900' : 'text-white/80'}`} />
              </button>
              <button 
                onClick={() => handleZoom('reset')}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors ${isLightMode ? 'hover:bg-white/60' : 'hover:bg-white/10'}`}
              >
                <Maximize className={`w-3 h-3 md:w-4 md:h-4 ${isLightMode ? 'text-blue-900' : 'text-white/80'}`} />
              </button>
            </div>
            <button 
              onClick={() => handleFocus('stanton', new THREE.Vector3(0, 0, 0))}
              className={`w-8 h-8 md:w-10 md:h-10 mt-1 md:mt-2 ${isLightMode ? 'bg-white/40 border-blue-200 shadow-sm hover:bg-white/60' : 'bg-black/60 border-white/10 hover:bg-white/10'} backdrop-blur-md border rounded-full flex items-center justify-center transition-colors`}
            >
              <Target className={`w-3 h-3 md:w-4 md:h-4 ${isLightMode ? 'text-blue-900' : 'text-white/80'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Location Explorer Sidebar (Star Map Version) */}
      <StarMapLocationExplorer 
        isOpen={isExplorerOpen} 
        onClose={() => setIsExplorerOpen(false)} 
        onLocationSelect={handleLocationSelect}
        isLightMode={isLightMode}
      />
    </div>
  );
}