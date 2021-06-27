import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Plane } from '@react-three/drei';
import './App.css';

import RotatingBox from './RotatingBox';

function App() {
  return (
    <div id="App">
      <Canvas>
        <RotatingBox position={[-2, 0, 0]} />
        <RotatingBox position={[0, 0, 0]} />
        <RotatingBox position={[2, 0, 0]} />
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
    </div>
  );
}

export default App;
