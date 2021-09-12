import * as THREE from 'three';
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import AudioVisualizer from './AudioVisualizer';

import Cube from './Cube';
import SongURL from '../audio/bamboo.aac';

function Sound({ url }) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setDistanceModel('linear');
    sound.current.setRolloffFactor(2);
    sound.current.setMaxDistance(20);
    sound.current.setLoop(true);
    sound.current.setVolume(0.6);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  }, [buffer, camera, listener]);
  return <positionalAudio ref={sound} args={[listener]} />;
}

export function Cubes() {
  const CubeGroup = useRef();
  const [hovering, setHover] = useState(false);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    // CubeGroup.current.rotation.x = time * 0.2;
    // CubeGroup.current.rotation.y = time * 0.2;
    // CubeGroup.current.rotation.z = time * 0.2;

    CubeGroup.current.rotation.z = THREE.Math.lerp(
      CubeGroup.current.rotation.z, // current
      hovering ? 10 : 0, // target
      0.05 * delta // amount
    );

    // for (let i = 0; i < CubeGroup.current.children.length; i++) {
    //   CubeGroup.current.children[i].rotation.x = THREE.Math.lerp(
    //     CubeGroup.current.children[i].rotation.x, // current
    //     hovering ? 5 + i : 0, // target
    //     0.05 * delta // amount
    //   );
    // }

    // if (hovering) {
    //   for (let i = 0; i < CubeGroup.current.children.length; i++) {
    //     CubeGroup.current.children[i].scale.x = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.x, // current
    //       Math.abs(Math.tan(time * 0.5) * 0.5), // target
    //       0.001 * time // amount
    //     );
    //     CubeGroup.current.children[i].scale.z = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.z, // current
    //       time * 0.22 * 1.1, // target
    //       0.001 * time // amount
    //     );
    //   }
    // } else {
    //   for (let i = 0; i < CubeGroup.current.children.length; i++) {
    //     CubeGroup.current.children[i].scale.x = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.x, // current
    //       0.5, // target
    //       0.001 * time // amount
    //     );
    //     CubeGroup.current.children[i].scale.z = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.z, // current
    //       0.5, // target
    //       0.001 * time // amount
    //     );
    //   }
    // }

    // if (hovering) {
    //   for (let i = 0; i < CubeGroup.current.children.length; i++) {
    //     CubeGroup.current.children[i].scale.x = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.x, // current
    //       Math.abs(Math.tan(time * 0.5) * 0.5), // target
    //       0.001 * time // amount
    //     );
    //     CubeGroup.current.children[i].scale.z = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.z, // current
    //       time * 0.22 * 1.1, // target
    //       0.001 * time // amount
    //     );
    //   }
    // } else {
    //   for (let i = 0; i < CubeGroup.current.children.length; i++) {
    //     CubeGroup.current.children[i].scale.x = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.x, // current
    //       0.5, // target
    //       0.001 * time // amount
    //     );
    //     CubeGroup.current.children[i].scale.z = THREE.Math.lerp(
    //       CubeGroup.current.children[i].scale.z, // current
    //       0.5, // target
    //       0.001 * time // amount
    //     );
    //   }
    // }

    // CubeGroup.current.scale.y = Math.tan(time * 0.22) * 1.1;
    // CubeGroup.current.scale.x = Math.tan(time * 0.22) * 1.1;

    // defaults
    // CubeGroup.scale.y = Math.sin(time * 0.22) * 1.1;
    // CubeGroup.scale.x = Math.sin(time * 0.22) * 1.1;
  });

  return (
    <group
      ref={CubeGroup}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Cube position={[0, 2, 0]} />
      <Cube position={[-1, 1, 0]} />
      <Cube position={[0, 1, 0]} />
      <Cube position={[1, 1, 0]} />
      <Cube position={[2, 0, 0]} />
      <Cube position={[1, 0, 0]} />
      <Cube position={[0, 0, 0]} />
      <Cube position={[-1, 0, 0]} />
      <Cube position={[-2, 0, 0]} />
      <Cube position={[-1, -1, 0]} />
      <Cube position={[0, -1, 0]} />
      <Cube position={[1, -1, 0]} />
      <Cube position={[0, -2, 0]} />
    </group>
  );
}

function UselessCubes() {
  return (
    <group position={[-3, 13, -10]} rotation={[0, -15, 0]}>
      <Cubes />
      <Suspense fallback={null}>
        <mesh position={[-2, -3, 10]}>
          <Sound url={SongURL} />
          {/* <boxGeometry /> */}
          {/* <meshPhongMaterial color="royalblue" /> */}
        </mesh>
        <AudioVisualizer position={[0, -3, 0]} url={SongURL} />
      </Suspense>
    </group>
  );
}

export default UselessCubes;
