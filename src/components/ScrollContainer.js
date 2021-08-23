import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import './App.css';

function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree();
  const group = useRef();
  const vector = new THREE.Vector3();
  const multiplier = 5;
  useFrame(() =>
    group.current.position.lerp(
      vector.set(0, viewport.height * scroll.current * multiplier, 0),
      0.1
    )
  );
  return <group ref={group}>{children}</group>;
}

export default ScrollContainer;
