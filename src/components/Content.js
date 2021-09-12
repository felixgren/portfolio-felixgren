import React from 'react';
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './App.css';

import Cube from './Cube';

function Content() {
  const viewport = useThree((state) => state.viewport);
  console.log(viewport.width);
  return (
    <>
      {/* <Cube position={[0, -2, -20]} />
      <Cube position={[0, -viewport.height / 2, -20]} /> */}
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
        position={[
          -viewport.width / 0.52,
          viewport.width - viewport.width * 0.6,
          -40,
        ]}
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
          position={[0, 0, 0]}
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
