import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { getBodySize } from '../../../data/starMap3D';

export const CameraController = ({
  target,
  focusId,
  zoomCommand,
  scaleMode
}: {
  target: THREE.Vector3,
  focusId: string | null,
  zoomCommand: { type: 'in' | 'out' | 'reset', id: number } | null,
  scaleMode: 'display' | 'realistic'
}) => {
  const isRealistic = scaleMode === 'realistic';
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const isAnimating = useRef(false);
  
  const defaultPos = isRealistic 
    ? new THREE.Vector3(0, 50000000, 100000000) 
    : new THREE.Vector3(0, 150, 300);
    
  const targetCameraPos = useRef(defaultPos.clone());


  useEffect(() => {
    if (!controlsRef.current) return;

    isAnimating.current = true;

    if (focusId === 'stanton' || !focusId) {
      targetCameraPos.current.copy(defaultPos);
    } else {
      const size = getBodySize(focusId, scaleMode);
      const desiredDistance = size * (isRealistic ? 3.5 : 6); // Slightly tighter orbit for massive realistic bodies


      // Calculate current direction from target to camera
      const currentDir = new THREE.Vector3().subVectors(camera.position, controlsRef.current.target).normalize();

      // If the current direction is almost zero (e.g. exactly at target), provide a default
      if (currentDir.lengthSq() < 0.01) {
        currentDir.set(1, 0.5, 1).normalize();
      }

      targetCameraPos.current.copy(target).add(currentDir.multiplyScalar(desiredDistance));
    }
  }, [target, focusId, camera]);

  useEffect(() => {
    if (!zoomCommand || !controlsRef.current) return;

    isAnimating.current = true;
    const controls = controlsRef.current;
    const currentTarget = controls.target;

    if (zoomCommand.type === 'in') {
      const dir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      const dist = camera.position.distanceTo(currentTarget);
      const newDist = Math.max(dist * 0.6, isRealistic ? 10 : 2);
      targetCameraPos.current.copy(currentTarget).add(dir.multiplyScalar(newDist));
    } else if (zoomCommand.type === 'out') {
      const dir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      const dist = camera.position.distanceTo(currentTarget);
      const newDist = Math.min(dist * 1.6, isRealistic ? 200000000 : 1000);
      targetCameraPos.current.copy(currentTarget).add(dir.multiplyScalar(newDist));
    } else if (zoomCommand.type === 'reset') {
      const size = focusId === 'stanton' || !focusId ? (isRealistic ? 10000000 : 50) : getBodySize(focusId, scaleMode);
      const desiredDistance = focusId === 'stanton' || !focusId ? (isRealistic ? 80000000 : 350) : size * (isRealistic ? 3.5 : 6);
      const currentDir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      if (currentDir.lengthSq() < 0.01) currentDir.set(1, 0.5, 1).normalize();
      targetCameraPos.current.copy(currentTarget).add(currentDir.multiplyScalar(desiredDistance));
    }

  }, [zoomCommand, camera]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      const onStart = () => { isAnimating.current = false; };
      controls.addEventListener('start', onStart);
      return () => controls.removeEventListener('start', onStart);
    }
  }, []);

  useFrame((state) => {
    if (controlsRef.current) {
      if (isAnimating.current) {
        controlsRef.current.target.lerp(target, 0.05);
        camera.position.lerp(targetCameraPos.current, 0.05);

        if (controlsRef.current.target.distanceTo(target) < 0.1 && camera.position.distanceTo(targetCameraPos.current) < 0.1) {
          isAnimating.current = false;
        }
      }

      // ADAPTIVE CLIPPING for 1:1 Scale
      if (isRealistic) {
        const dist = camera.position.distanceTo(controlsRef.current.target);
        const size = focusId === 'stanton' || !focusId ? 200000 : getBodySize(focusId!, scaleMode);
        
        // If we are close to a body, pull the near plane in aggressively
        // We want near to be much smaller than the distance to the surface
        const newNear = Math.max(0.1, Math.min(10, dist * 0.0001));
        const newFar = Math.max(500000000, dist * 10);

        if (Math.abs(camera.near - newNear) > newNear * 0.05 || Math.abs(camera.far - newFar) > newFar * 0.05) {
          camera.near = newNear;
          camera.far = newFar;
          camera.updateProjectionMatrix();
        }
      }

      controlsRef.current.update();
    }
  });


  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={isRealistic ? 10 : 2}
      maxDistance={isRealistic ? 200000000 : 1000}
      maxPolarAngle={Math.PI / 2 + 0.2}
      makeDefault
    />

  );
};
