import React from 'react';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

export const Skybox = ({ isLightMode }: { isLightMode: boolean }) => {
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
