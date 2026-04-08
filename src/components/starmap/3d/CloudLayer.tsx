import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export const CloudLayer = ({ url, size }: { url: string, size: number }) => {
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
