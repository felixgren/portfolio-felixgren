import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

function Cube(props) {
  const cube = useRef();
  const [active, setActive] = useState(false);
  const [hovering, setHover] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1 : 0.6,
    config: { mass: 1, tension: 500, friction: 20 },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    cube.current.rotation.x = time;

    cube.current.position.z = Math.sin(
      time * 2 +
        Math.sqrt(
          cube.current.position.x * cube.current.position.x +
            cube.current.position.y * cube.current.position.y
        )
    );
  });

  return (
    <animated.mesh
      {...props}
      scale={scale}
      onClick={() => {
        setActive(!active);
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      ref={cube}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={hovering ? 'red' : 'royalblue'} />
    </animated.mesh>
  );
}

export default Cube;
