import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export const Grid = ({ isLightMode, scaleMode }: { isLightMode: boolean, scaleMode: 'display' | 'realistic' }) => {
  const isRealistic = scaleMode === 'realistic';
  const radii = isRealistic
    ? [10000000, 20000000, 30000000, 40000000, 50000000]
    : [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const maxRadius = radii[radii.length - 1];
  const yPos = isRealistic ? -5000000 : -50;
  const gridColor = isLightMode ? (isRealistic ? "#bbbbbb" : "#cccccc") : "#222222";

  return (
    <group>
      {radii.map(radius => {
        const pts = [];
        for (let i = 0; i <= 128; i++) {
          const t = (i / 128) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(t) * radius, yPos, Math.sin(t) * radius));
        }

        return (
          <Line
            key={`grid-circle-${radius}`}
            points={pts}
            color={gridColor}
            lineWidth={1}
            transparent
            opacity={isRealistic ? 0.3 : 1}
          />
        );
      })}
      <Line points={[new THREE.Vector3(-maxRadius, yPos, 0), new THREE.Vector3(maxRadius, yPos, 0)]} color={gridColor} lineWidth={1} transparent opacity={isRealistic ? 0.4 : 1} />
      <Line points={[new THREE.Vector3(0, yPos, -maxRadius), new THREE.Vector3(0, yPos, maxRadius)]} color={gridColor} lineWidth={1} transparent opacity={isRealistic ? 0.4 : 1} />
    </group>
  );
};


