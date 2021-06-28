import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Plane } from '@react-three/drei';
import './App.css';

import RotatingBox from './RotatingBox';

function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree();
  const group = useRef();
  const vector = new THREE.Vector3();
  useFrame(() =>
    group.current.position.lerp(
      vector.set(0, viewport.height * scroll.current, 0),
      0.1
    )
  );
  return <group ref={group}>{children}</group>;
}

function ScrollScene() {
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <RotatingBox position={[0, -2, 0]} />
      <RotatingBox position={[0, -viewport.height / 2, 0]} />
    </>
  );
}

function App() {
  const scrollRef = useRef();
  const scroll = useRef(0);
  const doScroll = (e) =>
    (scroll.current = e.target.scrollTop / e.target.scrollHeight);
  return (
    <div id="App">
      <Canvas onCreated={(state) => state.events.connect(scrollRef.current)}>
        <RotatingBox position={[-2, 0, 0]} />
        <RotatingBox position={[2, 0, 0]} />

        <ScrollContainer scroll={scroll}>
          <ScrollScene />
        </ScrollContainer>

        <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
          <meshBasicMaterial color="white" wireframe attach="material" />
        </Plane>
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={10} // Depth of area where stars should fit (default=50)
          count={1000} // Amount of stars (default=5000)
          factor={3} // Size factor (default=4)
          saturation={1} // Saturation 0-1 (default=0)
          fade={true} // Faded dots (default=false)
        />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
      </Canvas>
      <div ref={scrollRef} onScroll={doScroll} className="scroll">
        <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
      </div>
    </div>
  );
}

export default App;
