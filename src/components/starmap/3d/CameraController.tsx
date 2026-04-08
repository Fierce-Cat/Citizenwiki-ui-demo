import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { getBodySize } from '../../../data/starMap3D';

export const CameraController = ({
  target,
  focusId,
  zoomCommand
}: {
  target: THREE.Vector3,
  focusId: string | null,
  zoomCommand: { type: 'in' | 'out' | 'reset', id: number } | null
}) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const isAnimating = useRef(false);
  const targetCameraPos = useRef(new THREE.Vector3(0, 150, 300));

  useEffect(() => {
    if (!controlsRef.current) return;

    isAnimating.current = true;

    if (focusId === 'stanton' || !focusId) {
      targetCameraPos.current.set(0, 150, 300);
    } else {
      const size = getBodySize(focusId);
      const desiredDistance = size * 6; // Adjust distance based on object size

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
      const newDist = Math.max(dist * 0.6, 2);
      targetCameraPos.current.copy(currentTarget).add(dir.multiplyScalar(newDist));
    } else if (zoomCommand.type === 'out') {
      const dir = new THREE.Vector3().subVectors(camera.position, currentTarget).normalize();
      const dist = camera.position.distanceTo(currentTarget);
      const newDist = Math.min(dist * 1.6, 1000);
      targetCameraPos.current.copy(currentTarget).add(dir.multiplyScalar(newDist));
    } else if (zoomCommand.type === 'reset') {
      const size = focusId === 'stanton' || !focusId ? 50 : getBodySize(focusId);
      const desiredDistance = focusId === 'stanton' || !focusId ? 350 : size * 6;
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

  useFrame(() => {
    if (controlsRef.current) {
      if (isAnimating.current) {
        controlsRef.current.target.lerp(target, 0.05);
        camera.position.lerp(targetCameraPos.current, 0.05);

        if (controlsRef.current.target.distanceTo(target) < 0.1 && camera.position.distanceTo(targetCameraPos.current) < 0.1) {
          isAnimating.current = false;
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
      minDistance={2}
      maxDistance={1000}
      maxPolarAngle={Math.PI / 2 + 0.2}
      makeDefault
    />
  );
};
