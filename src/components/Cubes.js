import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

export function OneCube(props) {
  const myCube = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    myCube.current.rotation.x = time;
  });

  return (
    <mesh {...props} ref={myCube}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
}

function Cubes(props) {
  return (
    <group position={[-3, 15, -10]} rotation={[0, -15, 0]}>
      <OneCube position={[0, 0, 0]} />
    </group>
  );
}

export default Cubes;
