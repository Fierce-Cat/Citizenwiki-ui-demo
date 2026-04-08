import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { StarMapDatabase } from '../../../data/starMap3D';

export const Grid = ({ isLightMode, scaleMode }: { isLightMode: boolean, scaleMode: 'display' | 'realistic' }) => {
  const isRealistic = scaleMode === 'realistic';
  
  // Dynamically derive grid radii from planetary distances to ensure perfect alignment
  const systemData = StarMapDatabase.stanton[scaleMode] as any;
  const radii = useMemo(() => {
    const planetDistances = systemData.planets.map((p: any) => p.distance);
    // Add a few extra aesthetic rings if we are in display mode
    if (!isRealistic) {
      const maxDist = Math.max(...planetDistances);
      return [...planetDistances, maxDist * 1.5, maxDist * 2.0];
    }
    return planetDistances;
  }, [systemData, isRealistic]);

  const maxRadius = Math.max(...radii);
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


