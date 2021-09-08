import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

function Cubes(props) {
  const myCube = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    myCube.current.rotation.x = time;
  });

  return (
    <group position={[-3, 15, -10]} rotation={[0, -15, 0]}>
      <mesh ref={myCube}>
        <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}

export default Cubes;
