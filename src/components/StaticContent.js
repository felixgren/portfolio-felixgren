import React from 'react';
import { useThree } from '@react-three/fiber';
import { Text, Plane } from '@react-three/drei';
import './App.css';

function StaticContent() {
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      {/* <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
        <meshBasicMaterial color="white" wireframe attach="material" />
      </Plane> */}
      <group position={[-3, 16, -10]} rotation={[0, -15, 0]}>
        {/* <Text
          color={'#FFFFFF'}
          fontSize={viewport.width / 8}
          maxWidth={10}
          lineHeight={1}
          letterSpacing={0.02}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
        >
          cubes will go here
        </Text> */}
      </group>
    </>
  );
}

export default StaticContent;
