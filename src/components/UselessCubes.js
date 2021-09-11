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
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // CubeGroup.current.rotation.x = time * 0.2;
    // CubeGroup.current.rotation.y = time * 0.2;
    CubeGroup.current.rotation.z = time * 0.2;

    // CubeGroup.current.scale.y = Math.sin(time * 0.22) * 1.1;
    // CubeGroup.current.scale.x = Math.sin(time * 0.22) * 1.1;

    // defaults
    // CubeGroup.scale.y = Math.sin(time * 0.22) * 1.1;
    // CubeGroup.scale.x = Math.sin(time * 0.22) * 1.1;
  });

  return (
    <group ref={CubeGroup}>
      <Cube position={[0, 2, 0]} />
      <Cube position={[-1, 1, 0]} />
      <Cube position={[0, 1, 0]} />
      <Cube position={[-1, 1, 0]} />
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
