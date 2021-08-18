import React from 'react';
import { useThree } from '@react-three/fiber';
import './App.css';

import { Text } from '@react-three/drei';

import RotatingBox from './RotatingBox';

function ScrollScene() {
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <RotatingBox position={[0, -2, -20]} />
      <RotatingBox position={[0, -viewport.height / 2, -20]} />
      <Text
        color={'#FFFFFF'}
        fontSize={12}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[0, 10, -20]}
      >
        Felix Gren
      </Text>

      <Text
        color={'#FFFFFF'}
        fontSize={12}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[40, -20, -50]}
      >
        heyayaya!
      </Text>
    </>
  );
}

export default ScrollScene;
