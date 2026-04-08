import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sunVertexShaderCorona, sunFragmentShaderCorona } from '../../../shaders/sunShaders';

export const SunFlare = ({ size, color }: { size: number, color: string }) => {
  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        coronaColor1: { value: new THREE.Color(color) }, // inner corona color
        coronaColor2: { value: new THREE.Color('#ffaa00') }, // outer corona color
      },
      vertexShader: sunVertexShaderCorona,
      fragmentShader: sunFragmentShaderCorona,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, [color]);

  useFrame((state) => {
    if (coronaMaterial) {
      coronaMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshBasicMaterial color={[4, 4, 3]} toneMapped={false} />
      </mesh>
      {/* Corona Shader */}
      <mesh material={coronaMaterial} scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[size, 64, 64]} />
      </mesh>
    </group>
  );
};
