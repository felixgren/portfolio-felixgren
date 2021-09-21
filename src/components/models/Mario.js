import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Mario() {
  const { nodes, materials } = useGLTF('models/mario.glb');
  return (
    <group
      position={window.innerWidth < 800 ? [11, -12, 43] : [-2, -17, 58]}
      rotation={
        window.innerWidth < 800
          ? [-Math.PI / 2, 0, 0.35]
          : [-Math.PI / 2, 0, -0.32]
      }
      scale={[0.2, 0.2, 0.2]}
    >
      <mesh
        name="NintendoEvent"
        castShadow
        receiveShadow
        geometry={nodes.Mario.geometry}
        material={materials.MarioMat}
      />
    </group>
  );
}

useGLTF.preload('models/mario.glb');
