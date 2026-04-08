import React, { useEffect } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { stanton3DData, jumpPointsData, getBodyPosition } from '../../../data/starMap3D';
import { Planet } from './Planet';
import { Orbit } from './Orbit';
import { JumpPoint } from './JumpPoint';
import { SunFlare } from './SunFlare';

export const StarSystem = ({
  showOrbits,
  showJumpPoints,
  selectedId,
  focusedId,
  onSelect,
  onFocus,
  isLightMode,
  useAdvancedShader
}: {
  showOrbits: boolean;
  showJumpPoints: boolean;
  selectedId: string | null;
  focusedId: string | null;
  onSelect: (id: string) => void;
  onFocus: (id: string, pos: THREE.Vector3) => void;
  isLightMode: boolean;
  useAdvancedShader: boolean;
}) => {
  const { star, planets } = stanton3DData;

  // Initial focus
  useEffect(() => {
    if (selectedId) {
      const result = getBodyPosition(selectedId);
      if (result) onFocus(result.resolvedId, result.pos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group>
      {/* Central Star */}
      <group
        onClick={(e) => { e.stopPropagation(); onSelect('stanton'); }}
        onDoubleClick={(e) => { e.stopPropagation(); onFocus('stanton', new THREE.Vector3(0, 0, 0)); }}
      >
        <mesh>
          <sphereGeometry args={[star.size, 64, 64]} />
          <meshBasicMaterial color={isLightMode ? "#ffaa00" : star.color} />
        </mesh>
        {!isLightMode && <SunFlare size={star.size} color={star.color} />}
      </group>

      {/* Planets and Orbits */}
      {planets.map(planet => {
        const x = Math.cos(planet.angle) * planet.distance;
        const z = Math.sin(planet.angle) * planet.distance;

        return (
          <group key={planet.id}>
            {showOrbits && <Orbit radius={planet.distance} isLightMode={isLightMode} />}
            {isLightMode && (
              <group>
                <Line points={[new THREE.Vector3(x, 0, z), new THREE.Vector3(x, -50, z)]} color="#888888" lineWidth={1} />
                <mesh position={[x, -50, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.5, 1, 16]} />
                  <meshBasicMaterial color="#888888" />
                </mesh>
              </group>
            )}
            <Planet
              position={[x, 0, z]}
              color={planet.color}
              size={planet.size}
              name={planet.name}
              id={planet.id}
              selectedId={selectedId}
              focusedId={focusedId}
              onSelect={onSelect}
              onFocus={onFocus}
              textureUrl={planet.textureUrl}
              hdTextureUrl={planet.hdTextureUrl}
              reflectionUrl={planet.reflectionUrl}
              cloudsUrl={planet.cloudsUrl}
              moons={planet.moons}
              isLightMode={isLightMode}
              useAdvancedShader={useAdvancedShader}
            />
          </group>
        );
      })}

      {/* Jump Points */}
      {showJumpPoints && jumpPointsData.map(jp => {
        const x = Math.cos(jp.angle) * jp.distance;
        const z = Math.sin(jp.angle) * jp.distance;
        const y = jp.y || 0;
        return (
          <group key={jp.id}>
            {isLightMode && (
              <group>
                <Line points={[new THREE.Vector3(x, y, z), new THREE.Vector3(x, -50, z)]} color="#888888" lineWidth={1} />
                <mesh position={[x, -50, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.5, 1, 16]} />
                  <meshBasicMaterial color="#888888" />
                </mesh>
              </group>
            )}
            <JumpPoint
              position={[x, y, z]}
              color={jp.color}
              size={jp.size}
              name={jp.name}
              id={jp.id}
              selectedId={selectedId}
              onSelect={onSelect}
              onFocus={onFocus}
              isLightMode={isLightMode}
            />
          </group>
        );
      })}
    </group>
  );
};
