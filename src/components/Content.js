import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import './App.css';

import { Text } from '@react-three/drei';

import RotatingBox from './RotatingBox';

function Content() {
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <RotatingBox position={[0, -2, -20]} />
      <RotatingBox position={[0, -viewport.height / 2, -20]} />
      <Text
        color={'#FFFFFF'}
        fontSize={viewport.width / 1.1}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[0, viewport.width / 1.1, -20]}
      >
        Felix Gren
      </Text>

      <Text
        color={'#FFFFFF'}
        fontSize={viewport.width / 1.5}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="bottom"
        position={[-viewport.width / 0.5, viewport.width - 10, -40]}
      >
        Web Developer
      </Text>

      <Text
        color={'#FFFFFF'}
        fontSize={viewport.width / 1.1}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[viewport.width / 0.3, -10, -50]}
      >
        heyayaya!
      </Text>

      <group position={[-50, 0, 14]} rotation={[0, 20.4, 0]}>
        <Text
          color={'#FFFFFF'}
          fontSize={viewport.width / 1}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={(0, 0, 0)}
        >
          HELLO!
        </Text>

        <Text
          color={'#FFFFFF'}
          fontSize={viewport.width / 3}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={[0, -viewport.width / 1.8, 0]}
        >
          Knowledge and skills
        </Text>
      </group>
    </>
  );
}

export default Content;
