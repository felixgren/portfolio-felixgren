import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const ComputerModel = ({ onClickEvent }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/computer.glb');

  return (
    <group
      position={[32, 12, 1]}
      scale={[1.8, 1.8, 1.8]}
      rotation={[0, 0, 0]}
      onClick={onClickEvent}
      ref={group}
      dispose={null}
    >
      <group rotationX={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, -0.7]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes['Cube008'].geometry}
          />
          <mesh
            material={materials['matte.001']}
            geometry={nodes['Cube008_1'].geometry}
          />
          <mesh
            geometry={nodes['Cube008_2'].geometry}
            material={materials['screen.001']}
          ></mesh>
        </group>
      </group>

      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[3.3, 0, 1.55]}
        rotation={[0, 0.7, 0]}
      />

      <group position={[1.9, -0.1, 2.7]} rotation={[0, 0.7, 0]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes['Cube002'].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes['Cube002_1'].geometry}
        />
      </group>
    </group>
  );
};

export default ComputerModel;
