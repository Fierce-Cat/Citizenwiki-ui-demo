import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createSmokeTexture } from '../utils/canvasUtils';

export const Nebula = ({ isLightMode }: { isLightMode: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  const nebulaParticles = useMemo(() => {
    const spread = 1000;
    const particles = [];
    for (let i = 0; i < 50; i++) {
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
    const colors = ['#9966ff', '#ff6699', '#66ff99', '#4c72bf', '#ff0000'];
    return colors.map(color => new THREE.Color(color));
  }, []);

  const nebulaTexture = useMemo(() => createSmokeTexture(), []);

  const nebulaMaterials = useMemo(() => {
    return nebulaColors.map(color => new THREE.PointsMaterial({
      size: 400,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: isLightMode ? 0.02 : 0.1,
      map: nebulaTexture,
      color: color.clone().multiplyScalar(0.1)
    }));
  }, [nebulaTexture, nebulaColors, isLightMode]);

  const nebula = useMemo(() => {
    const nebulaClusters: THREE.Points[] = [];
    const spread = 600;

    nebulaColors.forEach((_, index) => {
      const points = new THREE.Points(nebulaGeometry, nebulaMaterials[index]);
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
