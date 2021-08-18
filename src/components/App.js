// eslint-disable-next-line
import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
// eslint-disable-next-line
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Plane, PerspectiveCamera } from '@react-three/drei';
import './App.css';

import RotatingBox from './RotatingBox';
import ScrollContent from './ScrollBoxes';
import ScrollContainer from './ScrollContainer';
import Model from './Model';

function App() {
  const scrollRef = useRef();
  const scroll = useRef(0);
  const doScroll = (e) => {
    scroll.current =
      e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
  };
  return (
    <div id="App">
      <Canvas
        onCreated={(state) => state.events.connect(scrollRef.current)}
        // camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
        raycaster={{
          computeOffsets: ({ clientX, clientY }) => ({
            offsetX: clientX,
            offsetY: clientY,
          }),
        }}
      >
        <ScrollContainer scroll={scroll}>
          <ScrollContent />
        </ScrollContainer>

        <Suspense fallback={null}>
          <Model scroll={scroll} />
        </Suspense>

        <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
          <meshBasicMaterial color="white" wireframe attach="material" />
        </Plane>
        <RotatingBox position={[-2, 0, -20]} />
        <RotatingBox position={[2, 0, -20]} />
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
      <div ref={scrollRef} onScroll={doScroll} id="TEST" className="scroll">
        <div style={{ height: `200vh`, color: 'white' }}>hej1</div>
        <div style={{ height: `200vh`, color: 'white' }}>hej2</div>
        <div style={{ height: `100vh`, color: 'white' }}>hej3</div>
      </div>
    </div>
  );
}

export default App;
