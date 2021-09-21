/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Daniel Brück (https://sketchfab.com/daniel.brueck)
created: Wed Sep 22 09:02:37 2021
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/0b43f85af5384ea4bac5d6e2d3cbd008
title: Pacman Arcade + animation
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function ArcadeModel(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/arcademachine.glb');
  const { actions } = useAnimations(animations, group);
  //   useEffect(() => void actions['Take 001'].play(), []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[7.3, 37.7, -1.7]}
        rotation={[-0.8, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      >
        <group rotation={[0, 0, 0]}>
          <group position={[0, -0.3, 0]}>
            <mesh
              geometry={nodes['mouth_top_pac_&_ghost_0'].geometry}
              material={nodes['mouth_top_pac_&_ghost_0'].material}
            />
          </group>
        </group>
        <group rotation={[0, 0, 0]}>
          <group position={[0, -0.3, 0]}>
            <mesh
              geometry={nodes['mouth_bott_pac_&_ghost_0'].geometry}
              material={nodes['mouth_bott_pac_&_ghost_0'].material}
            />
          </group>
        </group>
        <group position={[0, -0.3, 0]}>
          <mesh
            geometry={nodes['pacman_pac_&_ghost_0'].geometry}
            material={nodes['pacman_pac_&_ghost_0'].material}
          />
        </group>
      </group>
      <group
        position={[-0.9, 37.7, -1.6]}
        rotation={[-0.8, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      >
        <mesh
          geometry={nodes['ghost1_pac_&_ghost_0'].geometry}
          material={nodes['ghost1_pac_&_ghost_0'].material}
        />
      </group>
      <group
        position={[6.7, 41.9, -6.1]}
        rotation={[-0.8, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      >
        <mesh
          geometry={nodes['ghost2_pac_&_ghost_0'].geometry}
          material={nodes['ghost2_pac_&_ghost_0'].material}
        />
      </group>
      <group
        position={[0.9, 37.6, -1.6]}
        rotation={[-0.8, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      >
        <mesh
          geometry={nodes['ghost3_pac_&_ghost_0'].geometry}
          material={nodes['ghost3_pac_&_ghost_0'].material}
        />
      </group>
      <group
        position={[-3.9, 37.7, -1.7]}
        rotation={[-0.8, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      >
        <mesh
          geometry={nodes['ghost4_pac_&_ghost_0'].geometry}
          material={nodes['ghost4_pac_&_ghost_0'].material}
        />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.pac_man_machine_automat_0.geometry}
          material={materials.automat}
        />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.scheibe_scheibe_0.geometry}
          material={materials.scheibe}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/arcademachine.glb');