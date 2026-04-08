import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export const JumpPoint = ({
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
  const [labelZIndex, setLabelZIndex] = React.useState(1000);


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

    // Professional Depth Sorting
    const dist = state.camera.position.distanceTo(new THREE.Vector3(...position));
    const newZIndex = Math.floor(1000000 - dist / 1000);
    if (labelZIndex !== newZIndex) {
      setLabelZIndex(newZIndex);
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
        <Html position={[0, size + 5, 0]} center style={{ zIndex: labelZIndex }}>
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
