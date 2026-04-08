import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { atmosphereVertexShader, atmosphereFragmentShader } from '../../../shaders/atmosphereShaders';
import { advancedAtmosphereVertexShader, advancedAtmosphereFragmentShader } from '../../../shaders/advancedAtmosphereShaders';
import { atmosphereConfigs, AtmosphereConfig } from '../../../data/starMap3D';

const defaultAtmosphere: AtmosphereConfig = {
  scatterColor: [0.5, 0.6, 0.8],
  heightFraction: 0.06,
  viewDepthScale: 5.0,
  ambientLight: 0.35,
};

const AtmosphereSimple = ({ size, id }: { size: number, id: string }) => {
  const config = atmosphereConfigs[id] || defaultAtmosphere;

  const atmosphereRadius = size * (1.0 + config.heightFraction * 1.5);
  const atmosphereHeight = size * (config.heightFraction / (config.viewDepthScale * 0.5));

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        planetRadius: { value: size },
        atmosphereRadius: { value: atmosphereRadius },
        scatterColor: { value: new THREE.Vector3(...config.scatterColor) },
        atmosphereHeight: { value: atmosphereHeight },
        sunDirection: { value: new THREE.Vector3(0, 0, 0) }, // updated per frame
        relativeCameraPosition: { value: new THREE.Vector3() },
        ambientLight: { value: config.ambientLight },
      },

      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, [size, id, atmosphereRadius, atmosphereHeight, config]);

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {

    if (meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      const sunDir = worldPos.clone().negate().normalize();
      material.uniforms.sunDirection.value.copy(sunDir);
      
      const relCamPos = new THREE.Vector3().subVectors(state.camera.position, worldPos);
      material.uniforms.relativeCameraPosition.value.copy(relCamPos);
    }
  });


  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[atmosphereRadius, 48, 48]} />
    </mesh>
  );
};

const AtmosphereAdvanced = ({ size, color }: { size: number, color: string }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => {
    const baseColor = new THREE.Color(color);
    const Kr = new THREE.Color(
      Math.max(0.1, baseColor.r * 0.5),
      Math.max(0.1, baseColor.g * 0.5),
      Math.max(0.1, baseColor.b * 0.5)
    );

    return {
      relativeCameraPosition: { value: new THREE.Vector3() },
      planetRadius: { value: size },
      atmosphereRadius: { value: size * 1.05 }, // Match geometry scale
      lightDirection: { value: new THREE.Vector3(0, 0, 0) },
      lightColor: { value: new THREE.Color(0.8, 0.8, 0.8) },
      Kr: { value: Kr },
      time: { value: 0.0 }
    };
  }, [size, color]);

  useFrame((state) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);

      const lightDir = new THREE.Vector3(0, 0, 0).sub(worldPosition).normalize();
      materialRef.current.uniforms.lightDirection.value.copy(lightDir);

      const relCamPos = new THREE.Vector3().subVectors(state.camera.position, worldPosition);
      materialRef.current.uniforms.relativeCameraPosition.value.copy(relCamPos);
    }

  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size * 1.05, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={advancedAtmosphereVertexShader}
        fragmentShader={advancedAtmosphereFragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

export const Atmosphere = ({ size, id, color, useAdvancedShader }: { size: number, id: string, color: string, useAdvancedShader: boolean }) => {
  if (useAdvancedShader) {
    return <AtmosphereAdvanced size={size} color={color} />;
  }
  return <AtmosphereSimple size={size} id={id} />;
};
