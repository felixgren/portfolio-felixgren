import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.css';

function RotatingBox() {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);
  const [hovering, setHover] = useState(false);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh
      scale={active ? 1.5 : 1}
      onClick={() => {
        setActive(!active);
        console.log('click!');
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color={hovering ? 'red' : 'royalblue'} />
    </mesh>
  );
}

function App() {
  return (
    <div id="App">
      <Canvas>
        <RotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
}

export default App;
