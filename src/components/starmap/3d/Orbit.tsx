import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export const Orbit = ({ radius, isLightMode }: { radius: number, isLightMode: boolean }) => {
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
