import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

function RotatingBox() {
  const myMesh = useRef();
  const [active, setActive] = useState(false);
  const [hovering, setHover] = useState(false);

  const { scale } = useSpring({
    scale: active ? 2 : 1,
    config: { mass: 1, tension: 500, friction: 20 },
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => {
        setActive(!active);
        console.log('click!');
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color={hovering ? 'red' : 'royalblue'} />
    </animated.mesh>
  );
}

export default RotatingBox;
