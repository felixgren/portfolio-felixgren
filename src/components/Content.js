import React, { useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './App.css';

function Content({ scroll }) {
  const viewport = useThree((state) => state.viewport);
  const [isWhite, setWhite] = useState(false);

  useFrame(() => {
    if (
      (scroll.current > 0.25 && isWhite && scroll.current < 0.76 && isWhite) ||
      scroll.current > 0.86
    ) {
      setWhite(false);
    } else if (
      (scroll.current < 0.25 && !isWhite) ||
      (scroll.current > 0.76 && !isWhite)
    ) {
      setWhite(true);
    }
  });

  return (
    <>
      <Text
        color={isWhite ? '#FFFFFF' : '#272730'}
        // Opacity should be tested for performance cost
        fillOpacity={isWhite ? 1 : 0.2}
        fontSize={
          window.innerWidth < 800 ? viewport.width / 2.1 : viewport.width / 3.4
        }
        maxWidth={200}
        lineHeight={1}
        letterSpacing={-0.04}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[
          0,
          window.innerWidth < 800 ? viewport.width / 2.5 : viewport.width / 5.4,
          -20,
        ]}
      >
        Felix Gren
      </Text>

      <Text
        color="#272730"
        fillOpacity={0.15}
        fontSize={
          window.innerWidth < 800 ? viewport.width / 2.1 : viewport.width / 2.4
        }
        maxWidth={200}
        lineHeight={1}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[
          18,
          window.innerWidth < 800
            ? viewport.width / 4
            : -(viewport.width / 0.9),
          18,
        ]}
        rotation={[0, -8, 0]}
      >
        Projects
      </Text>

      <Text
        color={isWhite ? '#FFFFFF' : '#272730'}
        fillOpacity={isWhite ? 1 : 0.15}
        fontSize={
          window.innerWidth < 800 ? viewport.width / 2.2 : viewport.width / 4.5
        }
        maxWidth={200}
        lineHeight={1}
        letterSpacing={-0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="bottom"
        position={[
          -viewport.width / 2,
          viewport.width - viewport.width * 1.2,
          -40,
        ]}
      >
        Web Developer
      </Text>

      <group position={[-50, 0, 14]} rotation={[0, 20.4, 0]}>
        <Text
          color={isWhite ? '#FFFFFF' : '#272730'}
          fillOpacity={isWhite ? 1 : 0}
          fontSize={
            window.innerWidth < 800 ? viewport.width / 2.1 : viewport.width / 4
          }
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={[0, -viewport.width / 15, -10]}
        >
          Knowledge & Skills
        </Text>
      </group>
    </>
  );
}

export default Content;
