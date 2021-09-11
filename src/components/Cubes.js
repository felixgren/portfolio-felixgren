import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import RotatingBox from './RotatingBox';

export function Cubes() {
  const CubeGroup = useRef();
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // CubeGroup.current.rotation.x = time * 0.2;
    // CubeGroup.current.rotation.y = time * 0.2;
    CubeGroup.current.rotation.z = time * 0.2;

    // CubeGroup.current.scale.y = Math.sin(time * 0.22) * 1.1;
    // CubeGroup.current.scale.x = Math.sin(time * 0.22) * 1.1;

    // defaults
    // CubeGroup.scale.y = Math.sin(time * 0.22) * 1.1;
    // CubeGroup.scale.x = Math.sin(time * 0.22) * 1.1;
  });

  return (
    <group ref={CubeGroup}>
      <RotatingBox position={[0, 2, 0]} />
      <RotatingBox position={[-1, 1, 0]} />
      <RotatingBox position={[0, 1, 0]} />
      <RotatingBox position={[-1, 1, 0]} />
      <RotatingBox position={[1, 1, 0]} />
      <RotatingBox position={[2, 0, 0]} />
      <RotatingBox position={[1, 0, 0]} />
      <RotatingBox position={[0, 0, 0]} />
      <RotatingBox position={[-1, 0, 0]} />
      <RotatingBox position={[-2, 0, 0]} />
      <RotatingBox position={[-1, -1, 0]} />
      <RotatingBox position={[0, -1, 0]} />
      <RotatingBox position={[1, -1, 0]} />
      <RotatingBox position={[0, -2, 0]} />
    </group>
  );
}

function UselessCubes() {
  return (
    <group position={[-3, 13, -10]} rotation={[0, -15, 0]}>
      <Cubes />
    </group>
  );
}

export default UselessCubes;
