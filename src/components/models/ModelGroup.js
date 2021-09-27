import React from 'react';
import { useGLTF } from '@react-three/drei';

export function DoomGuyModel() {
  const { nodes, materials } = useGLTF('models/modelGroup.glb');
  return (
    <group
      position={[33.65, window.innerHeight < 800 ? 10.5 : 12, -17.34]}
      rotation={[-Math.PI, 0.6, -Math.PI]}
      scale={[0.2, 0.2, 0.2]}
    >
      <primitive object={nodes._rootJoint} />
      <mesh
        name="ThreeArena"
        geometry={nodes.rock_GEO_Rock_MAT_0.geometry}
        material={materials.Rock_MAT}
      />
      <mesh
        name="ThreeArena"
        geometry={nodes.sides_GEO_Side_MAT_0.geometry}
        material={materials.Side_MAT}
      />
      <mesh
        name="ThreeArena"
        geometry={nodes.ground_GEO_treeline_MAT_0.geometry}
        material={materials.treeline_MAT}
      />
      <mesh
        name="ThreeArena"
        geometry={nodes.rocks_GEO_Rock_MAT_0.geometry}
        material={materials.Rock_MAT_0}
      />
      <mesh
        name="ThreeArena"
        geometry={nodes.shadow_GEO_Shadow_MAT_0.geometry}
        material={materials.Shadow_MAT}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.sword.geometry}
        material={materials.Doom_MAT_0}
        skeleton={nodes.sword.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.flame.geometry}
        material={materials.Doom_MAT_1}
        skeleton={nodes.flame.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.shotgun.geometry}
        material={nodes.shotgun.material}
        skeleton={nodes.shotgun.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.fists.geometry}
        material={nodes.fists.material}
        skeleton={nodes.fists.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.body.geometry}
        material={nodes.body.material}
        skeleton={nodes.body.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.arms.geometry}
        material={materials.Doom_MAT_3}
        skeleton={nodes.arms.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.blade.geometry}
        material={materials.Doom_MAT_2}
        skeleton={nodes.blade.skeleton}
      />
      <skinnedMesh
        name="ThreeArena"
        geometry={nodes.head.geometry}
        material={materials.Doom_MAT}
        skeleton={nodes.head.skeleton}
      />
    </group>
  );
}

export function DeloreanModel() {
  const { nodes, materials } = useGLTF('models/modelGroup.glb');
  const extras = {
    'material-envMapIntensity': 0.2,
  };

  return (
    <group
      position={[14.71, window.innerWidth < 800 ? 19.21 : 23.21, -32.71]}
      scale={[3, 3, 3]}
      rotation={[-1.44, -0.15, -0.67]}
    >
      <mesh
        name="Electric"
        geometry={nodes.Delorean.geometry}
        material={materials.M_Delorean}
        {...extras}
      />
      <mesh
        name="Electric"
        geometry={nodes.DeloreanShock.geometry}
        material={materials.M_Shock}
      />
    </group>
  );
}

export function NookBagModel() {
  const { nodes, materials } = useGLTF('models/modelGroup.glb');
  return (
    <group
      position={[
        window.innerWidth < 800 ? -20 : -36.34,
        window.innerWidth < 800 ? 18 : 28,
        -12,
      ]}
      rotation={[-Math.PI, -1.05, -Math.PI]}
      scale={
        window.innerWidth < 800 ? [0.055, 0.055, 0.055] : [0.04, 0.04, 0.04]
      }
    >
      <group
        position={[-5.59, 134.86, -11.56]}
        rotation={[-Math.PI / 2, 0, 1.31]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Bag_bag_Mat00_0.geometry}
          material={materials.bag_Mat00}
        />
      </group>
      <group
        position={[-3.66, 177.74, -18.8]}
        rotation={[-1.76, 0.03, 1.32]}
        scale={[45.01, 44.27, 61.54]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Ribbon001_ribbon_Mat00_0.geometry}
          material={nodes.bell_Ribbon001_ribbon_Mat00_0.material}
        />
      </group>
      <group
        position={[59.12, 145.46, 56.44]}
        rotation={[-3.07, 0.39, -2.68]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Ribbon002_ribbon_Mat00_0.geometry}
          material={nodes.bell_Ribbon002_ribbon_Mat00_0.material}
        />
      </group>
      <group
        position={[-91.11, 133.84, -34.65]}
        rotation={[-0.07, -0.39, 0.46]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Ribbon_ribbon_Mat00_0.geometry}
          material={nodes.bell_Ribbon_ribbon_Mat00_0.material}
        />
      </group>
      <group
        position={[84.4, 86.6, 117.71]}
        rotation={[2.81, 0.65, -1.55]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin_bell_Mat00_0.geometry}
          material={nodes.bell_Coin_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[-138.53, 304.91, -75.78]}
        rotation={[2.95, 0.51, 2.72]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin001_bell_Mat00_0.geometry}
          material={nodes.bell_Coin001_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[46.72, 428.62, -33.36]}
        rotation={[2.81, 0.65, -1.55]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin002_bell_Mat00_0.geometry}
          material={nodes.bell_Coin002_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[122.47, 351.52, -116.6]}
        rotation={[-2.33, 0.76, 2.3]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin003_bell_Mat00_0.geometry}
          material={nodes.bell_Coin003_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[-185.29, 143.48, 29.52]}
        rotation={[3.02, -0.57, 0.98]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin004_bell_Mat00_0.geometry}
          material={nodes.bell_Coin004_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[-91.38, 419.22, -30.81]}
        rotation={[2.04, -0.01, 3.08]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin005_bell_Mat00_0.geometry}
          material={nodes.bell_Coin005_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[-119.72, 205.86, -180.75]}
        rotation={[-2.44, -0.51, 1.44]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin007_bell_Mat00_0.geometry}
          material={nodes.bell_Coin007_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[142.76, 253.41, -10.37]}
        rotation={[-1.44, 0.8, -0.7]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin008_bell_Mat00_0.geometry}
          material={nodes.bell_Coin008_bell_Mat00_0.material}
        />
      </group>
      <group
        position={[193.25, 271.61, 97.33]}
        rotation={[-2.86, 0.39, 2.39]}
        scale={[100, 100, 100]}
      >
        <mesh
          name="NookInc"
          geometry={nodes.bell_Coin009_bell_Mat00_0.geometry}
          material={nodes.bell_Coin009_bell_Mat00_0.material}
        />
      </group>
    </group>
  );
}
