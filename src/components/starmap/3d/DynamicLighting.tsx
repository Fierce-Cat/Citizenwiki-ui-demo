import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const DynamicLighting = ({ focusTarget, isZoomedIn }: { focusTarget: THREE.Vector3, isZoomedIn: boolean }) => {
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
      <pointLight 
        ref={pointLightRef} 
        position={[0, 0, 0]} 
        intensity={3} 
        distance={0} 
        decay={0} 
        color="#ffffff" 
        castShadow
        shadow-bias={-0.0001}
        shadow-normalBias={0.05}
      />
      <directionalLight 
        ref={lightRef} 
        intensity={0} 
        color="#ffffff"
        castShadow
        shadow-bias={-0.0001}
      />

    </>
  );
};
