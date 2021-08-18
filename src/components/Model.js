/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const color = new THREE.Color();

export default function Model({ scroll, ...props }) {
  const t = useRef(0);
  const group = useRef();
  const vec = new THREE.Vector3();
  const cameraRef = useRef();
  const { nodes, materials, animations } = useGLTF('/model.glb');
  const { actions, clips, mixer } = useAnimations(animations, group);
  const [hovered, set] = useState();
  const [toggle, setToggle] = useState(true);
  const extras = {
    receiveShadow: true,
    castShadow: true,
    'material-envMapIntensity': 0.2,
  };
  useEffect(() => void actions['CameraAction.005'].play(), []);
  useEffect(() => {
    if (hovered)
      group.current.getObjectByName(hovered).material.color.set('white');
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  useFrame((state) => {
    if (scroll.current > 0.1 && scroll.current < 0.2 && cameraRef) {
      // cameraRef.current.lookAt(-10, -10, -90);
    }

    const step = 0.05;
    state.camera.fov = THREE.MathUtils.lerp(
      state.camera.fov,
      toggle ? 90 : 28,
      step
    );
    state.camera.updateProjectionMatrix();
    state.camera.position.lerp(
      vec.set(toggle ? 10 : 0, toggle ? 0 : 0, toggle ? 0 : 0),
      step
    );
    // state.camera.lookAt(0, 0, 0);
    // state.camera.updateProjectionMatrix();
    // light.current.position.lerp(
    //   vec.set(toggle ? 4 : 0, toggle ? 3 : 8, toggle ? 3 : 5),
    //   step
    // );

    if (scroll.current > 0.2) {
      mixer.setTime(
        (t.current = THREE.MathUtils.lerp(
          t.current,
          // Calculate scroll between 0.2 and 1.0
          THREE.MathUtils.mapLinear(
            scroll.current,
            0.2,
            1.0,
            0,
            actions['CameraAction.005']._clip.duration
          ),
          0.05
        ))
      );
    } else {
      mixer.setTime((t.current = THREE.MathUtils.lerp(t.current, 0, 0.05)));
    }
    group.current.children[0].children.forEach((child, index) => {
      child.material.color.lerp(
        color
          .set(hovered === child.name ? 'blue' : '#202020')
          .convertSRGBToLinear(),
        hovered ? 0.1 : 0.05
      );
      const et = state.clock.elapsedTime;
      child.position.y = Math.sin((et + index * 2000) / 2) * 1;
      child.rotation.x = Math.sin((et + index * 2000) / 3) / 10;
      child.rotation.y = Math.cos((et + index * 2000) / 2) / 10;
      child.rotation.z = Math.sin((et + index * 2000) / 3) / 10;
    });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
        onPointerOut={(e) => (e.stopPropagation(), set(null))}
        onClick={(e) => {
          setToggle(!toggle);
          console.log(`click model! ${e.object.name}`);
        }}
        position={[0.06, 4.04, 0.35]}
        scale={[0.25, 0.25, 0.25]}
      >
        <mesh
          name="Headphones"
          geometry={nodes.Headphones.geometry}
          material={materials.M_Headphone}
          {...extras}
        />
        <mesh
          name="Notebook"
          geometry={nodes.Notebook.geometry}
          material={materials.M_Notebook}
          {...extras}
        />
        <mesh
          name="Rocket003"
          geometry={nodes.Rocket003.geometry}
          material={materials.M_Rocket}
          {...extras}
        />
        <mesh
          name="Roundcube001"
          geometry={nodes.Roundcube001.geometry}
          material={materials.M_Roundcube}
          {...extras}
        />
        <mesh
          name="Table"
          geometry={nodes.Table.geometry}
          material={materials.M_Table}
          {...extras}
        />
        <mesh
          name="VR_Headset"
          geometry={nodes.VR_Headset.geometry}
          material={materials.M_Headset}
          {...extras}
        />
        <mesh
          name="Zeppelin"
          geometry={nodes.Zeppelin.geometry}
          material={materials.M_Zeppelin}
          v
        />
      </group>
      <group
        name="Camera"
        position={[-1.78, 2.04, 23.58]}
        rotation={[1.62, 0.01, 0.11]}
      >
        <PerspectiveCamera
          makeDefault
          ref={cameraRef}
          far={100}
          near={0.1}
          // should be between 28 and 90
          fov={90}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </group>
  );
}

useGLTF.preload('/model.glb');
