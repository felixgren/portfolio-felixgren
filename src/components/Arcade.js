/*
author: Daniel Brück (https://sketchfab.com/daniel.brueck)
created: Wed Sep 21 16:22:14 2021
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/0b43f85af5384ea4bac5d6e2d3cbd008
title: Pacman Arcade + animation
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function ArcadeModel(props) {
  const arcadeGroup = useRef();
  const { nodes, materials, animations } = useGLTF('/arcademachine.glb');
  const { actions } = useAnimations(animations, arcadeGroup);
  useEffect(() => void actions['Take 001'].play(), []);
  return (
    <group ref={arcadeGroup} {...props} dispose={null}>
      <group name="ArcadeScene">
        <group name="ArcadeRootNode">
          <group
            name="PacmanGroup"
            position={[7.3, 37.7, -1.7]}
            rotation={[-0.8, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
          >
            <group name="PacTopMouth" rotation={[0, 0, 0]}>
              <group name="TopMouth" position={[0, -0.3, 0]}>
                <mesh
                  name="mouth_top_pac_&_ghost_0"
                  geometry={nodes['mouth_top_pac_&_ghost_0'].geometry}
                  material={nodes['mouth_top_pac_&_ghost_0'].material}
                />
              </group>
            </group>
            <group name="PacBotMouth" rotation={[0, 0, 0]}>
              <group name="BotMouth" position={[0, -0.3, 0]}>
                <mesh
                  name="mouth_bott_pac_&_ghost_0"
                  geometry={nodes['mouth_bott_pac_&_ghost_0'].geometry}
                  material={nodes['mouth_bott_pac_&_ghost_0'].material}
                />
              </group>
            </group>
            <group name="PacBody" position={[0, -0.3, 0]}>
              <mesh
                name="Body"
                geometry={nodes.Body.geometry}
                material={nodes.Body.material}
              />
            </group>
          </group>
          <group
            name="Ghost1Root"
            position={[-0.9, 37.7, -1.6]}
            rotation={[-0.8, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
          >
            <mesh
              name="Ghost1"
              geometry={nodes.Ghost1.geometry}
              material={nodes.Ghost1.material}
            />
          </group>
          <group
            name="Ghost2Root"
            position={[6.7, 41.9, -6.1]}
            rotation={[-0.8, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
          >
            <mesh
              name="Ghost2"
              geometry={nodes.Ghost2.geometry}
              material={nodes.Ghost2.material}
            />
          </group>
          <group
            name="Ghost3Root"
            position={[0.9, 37.6, -1.6]}
            rotation={[-0.8, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
          >
            <mesh
              name="Ghost3"
              geometry={nodes.Ghost3.geometry}
              material={nodes.Ghost3.material}
            />
          </group>
          <group
            name="Ghost4Root"
            position={[-3.9, 37.7, -1.7]}
            rotation={[-0.8, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
          >
            <mesh
              name="Ghost4"
              geometry={nodes.Ghost4.geometry}
              material={nodes.Ghost4.material}
            />
          </group>
          <group name="PacMachineRoot" rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              name="PacMachine"
              geometry={nodes.PacMachine.geometry}
              material={materials.automat}
            />
          </group>
          <group name="FilthRoot" rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              name="Filth"
              geometry={nodes.Filth.geometry}
              material={materials.scheibe}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/arcademachine.glb');
