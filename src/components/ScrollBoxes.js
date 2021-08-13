import React from 'react';
import { useThree } from '@react-three/fiber';
import './App.css';

import RotatingBox from './RotatingBox';

function ScrollScene() {
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <RotatingBox position={[0, -2, 0]} />
      <RotatingBox position={[0, -viewport.height / 2, 0]} />
    </>
  );
}

export default ScrollScene;
