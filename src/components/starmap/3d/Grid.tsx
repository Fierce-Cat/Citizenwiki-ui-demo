import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export const Grid = ({ isLightMode }: { isLightMode: boolean }) => {
  return (
    <group>
      {isLightMode ? (
        <>
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(radius => (
            <Line
              key={`grid-circle-${radius}`}
              points={useMemo(() => {
                const pts = [];
                for (let i = 0; i <= 128; i++) {
                  const t = (i / 128) * Math.PI * 2;
                  pts.push(new THREE.Vector3(Math.cos(t) * radius, -50, Math.sin(t) * radius));
                }
                return pts;
              }, [radius])}
              color="#cccccc"
              lineWidth={1}
            />
          ))}
          <Line points={[new THREE.Vector3(-1000, -50, 0), new THREE.Vector3(1000, -50, 0)]} color="#aaaaaa" lineWidth={1} />
          <Line points={[new THREE.Vector3(0, -50, -1000), new THREE.Vector3(0, -50, 1000)]} color="#aaaaaa" lineWidth={1} />
        </>
      ) : (
        <>
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(radius => (
            <Line
              key={`grid-circle-${radius}`}
              points={useMemo(() => {
                const pts = [];
                for (let i = 0; i <= 128; i++) {
                  const t = (i / 128) * Math.PI * 2;
                  pts.push(new THREE.Vector3(Math.cos(t) * radius, -50, Math.sin(t) * radius));
                }
                return pts;
              }, [radius])}
              color="#222222"
              lineWidth={1}
            />
          ))}
          <Line points={[new THREE.Vector3(-1000, -50, 0), new THREE.Vector3(1000, -50, 0)]} color="#222222" lineWidth={1} />
          <Line points={[new THREE.Vector3(0, -50, -1000), new THREE.Vector3(0, -50, 1000)]} color="#222222" lineWidth={1} />
        </>
      )}
    </group>
  );
};
