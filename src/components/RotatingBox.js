import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';

function RotatingBox(props) {
  const myMesh = useRef();
  const [active, setActive] = useState(false);
  const [hovering, setHover] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1 : 0.5,
    config: { mass: 1, tension: 500, friction: 20 },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    myMesh.current.rotation.x = time;

    // myMesh.current.position.z = Math.sin(
    //   time * 3 +
    //     Math.sqrt(
    //       myMesh.current.position.x * myMesh.current.position.x +
    //         myMesh.current.position.y * myMesh.current.position.y
    //     )
    // );

    // myMesh.current.position.z = Math.tan(
    //   time * 0.1 +
    //     Math.sqrt(
    //       myMesh.current.position.x * myMesh.current.position.x +
    //         myMesh.current.position.y * myMesh.current.position.y
    //     )
    // );
  });

  return (
    <animated.mesh
      {...props}
      scale={scale}
      onClick={() => {
        setActive(!active);
        console.log('click!');
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      ref={myMesh}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={hovering ? 'red' : 'royalblue'} />
    </animated.mesh>
  );
}

export default RotatingBox;
