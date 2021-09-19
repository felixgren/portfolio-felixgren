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

  const resumeAudio = () => {
    sound.current.context.resume();
    document.removeEventListener('click', resumeAudio);
    console.log('AudioContext resumed');
  };
  if (sound.current && sound.current.context.state === 'suspended') {
    document.addEventListener('click', resumeAudio);
  }

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
  // eslint-disable-next-line
  const [hovering, setHover] = useState(false);

  useFrame((state, delta) => {
    CubeGroup.current.rotation.z = THREE.Math.lerp(
      CubeGroup.current.rotation.z, // current
      hovering ? 10 : 0, // target
      0.05 * delta
    );
  });

  return (
    <group
      ref={CubeGroup}
      // onPointerOver={() => setHover(true)}
      // onPointerOut={() => setHover(false)}
      scale={window.innerWidth < 800 ? [3, 3, 3] : [4, 4, 4]}
      position={window.innerWidth < 800 ? [-4, 22, -40] : [-10, 25, -40]}
      rotation={[0, -15, 0]}
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

const UselessCubes = ({ onClickEvent }) => {
  return (
    <group onClick={onClickEvent}>
      <Cubes />
      <Suspense fallback={null}>
        <mesh position={[-36, 16, -98]} scale={[4, 4, 4]}>
          <Sound url={SongURL} />
          {/* <boxGeometry /> */}
          {/* <meshPhongMaterial color="royalblue" /> */}
        </mesh>

        <AudioVisualizer
          rotation={[0, -15, 0]}
          scale={[5, 5, 5]}
          position={[-11, window.innerWidth < 800 ? 12 : 15, -40]}
          url={SongURL}
        />
      </Suspense>
    </group>
  );
};

export default UselessCubes;
