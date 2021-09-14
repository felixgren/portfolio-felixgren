import React, { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './App.css';

function Content({ scroll }) {
  const viewport = useThree((state) => state.viewport);
  const [toggle, setToggle] = useState(true);

  useFrame(() => {
    if (scroll.current > 0.2 && toggle) {
      setToggle(false);
      console.log('hello');
    } else if (scroll.current < 0.2 && !toggle) {
      setToggle(true);
      console.log('hehehe');
    }
  });

  return (
    <>
      <Text
        color={toggle ? '#FFFFFF' : '#272730'}
        // fillOpacity={0.3}
        fontSize={viewport.width / 1.8}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={-0.04}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[0, viewport.width / 2, -20]}
      >
        Felix Gren
      </Text>

      <Text
        color={'#FFFFFF'}
        fontSize={viewport.width / 2.2}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={-0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="bottom"
        position={[
          -viewport.width / 1.2,
          viewport.width - viewport.width * 1.2,
          -40,
        ]}
      >
        Web Developer
      </Text>

      {/* <Text
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
      </Text> */}

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
