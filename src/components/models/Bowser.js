import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Bowser() {
  const { nodes, materials } = useGLTF('models/bowser.glb');
  return (
    <group
      position={window.innerWidth < 800 ? [4.5, -13.5, 40] : [-1, -19, 47]}
      rotation={window.innerWidth < 800 ? [-0.3, 0.2, 0.1] : [0, -0.9, 0]}
      scale={window.innerWidth < 800 ? [0.04, 0.04, 0.04] : [0.05, 0.05, 0.05]}
    >
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME.geometry}
        material={materials['011-0-11']}
        position={[132.82, 119.42, 65.44]}
        rotation={[1.93, 0.13, 0.14]}
        scale={[1.31, 1.31, 1.31]}
      />
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME001.geometry}
        material={materials['010-0-10']}
        position={[80.8, 114.64, 63.08]}
        rotation={[0.97, 0.75, -2.55]}
        scale={[1.14, -0.99, 0.99]}
      />
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME002.geometry}
        material={materials['007-0-7']}
        position={[87.79, 104.47, 40.83]}
        rotation={[2.16, 0.67, 2.32]}
        scale={[1.6, -1.47, 1.71]}
      />
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME003.geometry}
        material={materials['006-0-6']}
        position={[77.93, 103.16, 71.88]}
        rotation={[Math.PI / 2, 0.96, -Math.PI]}
        scale={[1.7, -1.7, 1.7]}
      />
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME005.geometry}
        material={materials['005-0-5']}
        position={[97.36, 104.47, 40.83]}
        rotation={[2.16, -0.67, 0.82]}
        scale={[1.6, 1.47, 1.71]}
      />
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME006.geometry}
        material={materials['004-0-4']}
        position={[109.94, 112.59, 71.88]}
        rotation={[Math.PI / 2, -0.96, 0]}
        scale={[1.47, 1.47, 1.47]}
      />
      <mesh
        geometry={nodes.BOWSER_BIG_FLAMES.geometry}
        material={materials['009-0-9']}
        position={[78.96, -115.84, -119.92]}
        scale={[31.28, 31.28, 31.28]}
      />
      <mesh
        geometry={nodes.BOWSER_SMOL_FLAME004.geometry}
        material={materials['008-0-8']}
        position={[66.74, 107.11, 37.66]}
        rotation={[0.94, -0.56, 2.56]}
        scale={[0.97, -0.72, 0.72]}
      />
      <mesh
        geometry={nodes.BOWSER_CHAINS.geometry}
        material={materials['002-0-2']}
        position={[78.96, 11.47, -119.92]}
      />
      <mesh
        geometry={nodes.BOWSER_SHELL.geometry}
        material={materials['003-0-3']}
        position={[78.96, 11.47, -119.92]}
      />
      <mesh
        geometry={nodes.BOWSER_BODY.geometry}
        material={materials['001-0-1']}
        position={[78.96, 11.47, -119.92]}
      />
      <mesh
        geometry={nodes.BOWSER_FACE.geometry}
        material={materials['000-0-0']}
        position={[78.96, 11.47, -119.92]}
      />
    </group>
  );
}

useGLTF.preload('models/bowser.glb');
