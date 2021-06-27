import React from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';

import RotatingBox from './RotatingBox';

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
