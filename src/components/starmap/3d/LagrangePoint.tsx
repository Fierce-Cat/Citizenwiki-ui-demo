import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface LagrangePointProps {
  position: [number, number, number];
  size: number;
  id: string;
  name: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onFocus: (id: string, pos: THREE.Vector3) => void;
  isLightMode: boolean;
  key?: React.Key;
}


export const LagrangePoint = ({
  position,
  size,
  id,
  name,
  selectedId,
  onSelect,
  onFocus,
  isLightMode
}: LagrangePointProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedId === id;
  const posVec = useMemo(() => new THREE.Vector3(...position), [position]);
  const [labelZIndex, setLabelZIndex] = useState(1000);

  const color = isLightMode ? "#0066cc" : "#00aaff";

  const accentColor = isLightMode ? "#ffaa00" : "#ffffff";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the wireframe octahedron
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.z = time * 0.3;
    }

    // Pulse the core
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.2;
      coreRef.current.scale.set(scale, scale, scale);
      
      if (coreRef.current.material instanceof THREE.MeshBasicMaterial) {
        coreRef.current.material.opacity = 0.4 + Math.sin(time * 3) * 0.3;
      }
    }

    // Professional Depth Sorting
    const dist = state.camera.position.distanceTo(posVec);
    const newZIndex = Math.floor(1000000 - dist / 1000);
    if (labelZIndex !== newZIndex) {
      setLabelZIndex(newZIndex);
    }

  });

  return (
    <group 
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, posVec); }}
    >
      {/* Outer Octahedron Wireframe */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[size * 1.5, 0]} />
        <meshBasicMaterial 
          color={isSelected ? accentColor : color} 
          wireframe 
          transparent 
          opacity={hovered || isSelected ? 0.8 : 0.4} 
        />
      </mesh>

      {/* Inner Pulsing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[size * 0.4, 16, 16]} />
        <meshBasicMaterial 
          color={isSelected ? accentColor : color} 
          transparent 
          opacity={0.6} 
        />
      </mesh>

      {/* Selection Ring */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 2, size * 2.2, 32]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Label */}
      {(isSelected || selectedId === 'stanton') && (
        <Html position={[0, size * 2, 0]} center style={{ zIndex: labelZIndex }}>
          <div 
            className={`${isLightMode ? 'bg-white/60 border-blue-200 shadow-sm' : 'bg-black/80 border-white/40'} border rounded-full px-4 py-1.5 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer pointer-events-auto transition-all duration-300 ${isSelected ? 'scale-110' : 'scale-100'} ${hovered ? 'border-amber-400/50' : ''}`}
            onClick={(e) => { e.stopPropagation(); onSelect(id); }}
            onDoubleClick={(e) => { e.stopPropagation(); onFocus(id, posVec); }}
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
