import React from 'react';
import * as THREE from 'three';

interface BodyMaterialProps {
  texture?: THREE.Texture | null;
  reflectionTexture?: THREE.Texture | null;
  color: string;
  opacity?: number;
  transparent?: boolean;
}

export const BodyMaterial = ({ 
  texture, 
  reflectionTexture, 
  color, 
  opacity = 1, 
  transparent = false 
}: BodyMaterialProps) => {
  return (
    <meshStandardMaterial 
      map={texture || null} 
      color={color} 
      metalnessMap={reflectionTexture || null}
      metalness={reflectionTexture ? 0.9 : 0.0}
      roughness={0.7} 
      opacity={opacity} 
      transparent={transparent} 
    />
  );
};
