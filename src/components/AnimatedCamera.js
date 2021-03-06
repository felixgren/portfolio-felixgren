import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'wouter';
import UselessCubesComponent from './models/UselessCubesGroup';
import HackerNewsModel from './models/Computer';
import FakeNewsModel from './models/Arcade';
import BowserModel from './models/Bowser';
import MarioModel from './models/Mario';
import {
  DoomGuyModel as ThreeArenaModel,
  DeloreanModel as Electric,
  NookBagModel as NookIncModel,
} from './models/ModelGroup';

export default function Models({ scroll, ...props }) {
  const time = useRef(0);
  const group = useRef();
  const cameraRef = useRef();
  const groupCameraRef = useRef();
  const defaultPos = new THREE.Vector3(0, 0, 0);
  const defaultQuart = new THREE.Quaternion(0, 0, 0, 1);
  const animStartPosition = new THREE.Vector3(-10.722, -5.981, 2.297);
  const animStartQuaternion = new THREE.Quaternion(
    0.17168,
    -0.77445,
    0.23707,
    0.56084
  );
  const animEndPosition = new THREE.Vector3(-18.193, 14.412, 14.28);
  const animEndQuaternion = new THREE.Quaternion(0.0928, -0.3936, 0.04, 0.9136);
  const thirdPhaseQuart = new THREE.Quaternion(0, 0.7, 0, 0.7122);

  const { animations } = useGLTF('models/modelGroup.glb');
  const { actions, mixer } = useAnimations(animations, group);

  const [cameraReady, setCameraReady] = useState(false);
  const [isThirdPhase, setIsThirdPhase] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [location, setLocation] = useLocation('/');

  const scrollStart = 0;
  const transitionPhase = 0.25;
  const secondPhase = 0.3;
  const secondPhaseEnd = 0.7;
  const thirdPhase = 0.75;

  const locationId = location.substring(1);
  const scrollElement = document.querySelector('.scroll');
  const projectButtons = document.querySelectorAll('.project-buttons');
  const devNav = document.querySelector('#dev-nav');

  if (!toggle) {
    if (locationId !== '') {
      const currentLocation = document.querySelector(`#${locationId}`);

      if (window.innerWidth > 800) {
        scrollElement.scrollTop = currentLocation.offsetTop - 230;
      } else {
        scrollElement.scrollTop = currentLocation.offsetTop - 130;
      }

      if (window.innerWidth > 800 && locationId === 'nintendo-event') {
        scrollElement.scrollTop =
          currentLocation.offsetTop - window.innerHeight / 3;
      }

      // Enable link after seeing project
      // const currentLink = document.querySelector(`#${locationId}-link`);
      // currentLink.style.display = 'initial';
      scrollElement.style.webkitMaskImage = 'none';

      setTimeout(
        () =>
          Array.from(projectButtons).map((projectButton) => {
            return (
              (projectButton.style.opacity = '1'),
              (projectButton.style.pointerEvents = 'initial'),
              (devNav.style.opacity = '1')
            );
          }),
        100
      );
    }
    setTimeout(() => (scrollElement.style.overflow = 'hidden'), 100);
  } else {
    scrollElement.style.overflow = 'auto';
    scrollElement.style.webkitMaskImage =
      'linear-gradient(to bottom, black 40%, transparent 70%)';

    setTimeout(
      () =>
        Array.from(projectButtons).map((projectButton) => {
          return (
            (projectButton.style.opacity = '0'),
            (projectButton.style.pointerEvents = 'none'),
            (devNav.style.opacity = '0')
          );
        }),
      600
    );
  }

  const setHover = (isHovered) => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  };

  useFrame((state, delta) => {
    const step = 5 * delta;
    state.camera.fov = THREE.MathUtils.lerp(
      state.camera.fov,
      toggle
        ? window.innerWidth < 800
          ? 65
          : 57
        : window.innerWidth < 800
        ? 42
        : 28,
      step
    );

    state.camera.updateProjectionMatrix();

    group.current.children[0].children.forEach((child, index) => {
      const time = state.clock.elapsedTime;
      const movement = window.innerHeight < 800 ? 1000 : 2000;

      child.position.y = Math.sin((time + index * movement) / 3) * 0.5;
      child.rotation.x = Math.sin((time + index * movement) / 5) / 50;
      child.rotation.y = Math.cos((time + index * movement) / 3) / 50;
      child.rotation.z = Math.sin((time + index * movement) / 5) / 50;
    });

    // There are 3 phases.
    // 1. Scrolling flat plane (intro/hero)
    // 2. Camera rotating around models (project showcase)
    // 3. Scrolling flat plane (about me)

    // The camera is taken over by an animation path in the second stage.
    // We ensure a seamless looking transition by setting camera to the anim start position before starting the phase 2.
    // We ensure a seamless transition out of phase 2 by waiting for camera to reach the anim end position before starting phase 3.

    // Camera goes to first phase
    if (
      scroll.current < transitionPhase &&
      !actions['CameraAction.005'].isRunning()
    ) {
      groupCameraRef.current.position.lerp(defaultPos, 4 * delta);
      state.camera.quaternion.slerp(defaultQuart, 8 * delta);
    }

    // Camera prep for second phase
    if (
      !actions['CameraAction.005'].isRunning() &&
      scroll.current > transitionPhase &&
      scroll.current < secondPhase
    ) {
      setCameraReady(false);
      groupCameraRef.current.position.lerp(animStartPosition, 5 * delta);
      state.camera.quaternion.slerp(animStartQuaternion, 5 * delta);
    }

    // Camera enter second phase when camera is READY
    if (
      scroll.current > secondPhase &&
      scroll.current < secondPhaseEnd &&
      cameraReady &&
      !isThirdPhase
    ) {
      cameraRef.current.rotation.set(-Math.PI / 2, 0, 0);
      actions['CameraAction.005'].play();
      mixer.setTime(
        (time.current = THREE.MathUtils.lerp(
          time.current,
          // Calculate scroll between scrollStart (0.3) and scrollEnd (0.7)
          THREE.MathUtils.mapLinear(
            scroll.current,
            secondPhase,
            secondPhaseEnd,
            scrollStart,
            actions['CameraAction.005']._clip.duration
          ),
          0.05
        ))
      );
    }
    // Go to phase 2 start position and set camera to READY when in position
    else if (scroll.current > secondPhase && !cameraReady) {
      groupCameraRef.current.position.lerp(animStartPosition, 10 * delta);
      state.camera.quaternion.slerp(animStartQuaternion, 10 * delta);
      if (
        !cameraReady &&
        Math.abs(
          groupCameraRef.current.position.distanceTo(animStartPosition)
        ) < 0.1
      ) {
        setCameraReady(true);
        console.log('Camera is ready to switch!');
      }
    }
    // Go to phase 2 end, enter phase 3 when in position
    else if (
      scroll.current > secondPhaseEnd &&
      actions['CameraAction.005'].isRunning() &&
      !isThirdPhase
    ) {
      mixer.setTime(
        (time.current = THREE.MathUtils.lerp(time.current, 5.8, 0.05))
      );
      if (time.current >= 5.75) {
        mixer.stopAllAction();
        state.camera.quaternion.copy(animEndQuaternion);
        groupCameraRef.current.position.copy(animEndPosition);
      }
    }
    // Prep for phase 2 -> phase 1
    else if (actions['CameraAction.005'].isRunning()) {
      mixer.setTime(
        (time.current = THREE.MathUtils.lerp(time.current, 0, 0.05))
      );

      // Switch to phase 1 when camera in position
      if (time.current < 0.02 && actions['CameraAction.005'].isRunning()) {
        actions['CameraAction.005'].stop();
        groupCameraRef.current.position.copy(animStartPosition);
        cameraRef.current.rotation.setFromQuaternion(animStartQuaternion);
      }
    }
    // Prep for phase 3 -> phase 2
    else if (
      !actions['CameraAction.005'].isRunning() &&
      scroll.current < thirdPhase &&
      isThirdPhase
    ) {
      groupCameraRef.current.position.lerp(animEndPosition, 5 * delta);
      state.camera.quaternion.slerp(animEndQuaternion, 10 * delta);

      if (
        Math.abs(state.camera.quaternion.x - animEndQuaternion.x) < 0.01 &&
        Math.abs(state.camera.quaternion.y - animEndQuaternion.y) < 0.01 &&
        Math.abs(state.camera.quaternion.z - animEndQuaternion.z) < 0.01 &&
        Math.abs(state.camera.quaternion.w - animEndQuaternion.w) < 0.01
      ) {
        console.log('Third phase set to false!');
        setIsThirdPhase(false);
      }
    }

    // Go to phase 3 when camera in position
    if (
      !actions['CameraAction.005'].isRunning() &&
      scroll.current > thirdPhase &&
      // scroll.current < thirdPhase &&
      !isThirdPhase
    ) {
      state.camera.quaternion.slerp(thirdPhaseQuart, 10 * delta);
      if (
        Math.abs(state.camera.quaternion.x - thirdPhaseQuart.x) < 0.01 &&
        Math.abs(state.camera.quaternion.y - thirdPhaseQuart.y) < 0.01 &&
        Math.abs(state.camera.quaternion.z - thirdPhaseQuart.z) < 0.01 &&
        Math.abs(state.camera.quaternion.w - thirdPhaseQuart.w) < 0.01
      ) {
        console.log('Third phase set to true!');
        setIsThirdPhase(true);
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        onPointerOver={(e) => [e.stopPropagation(), setHover(true)]}
        onPointerOut={(e) => [e.stopPropagation(), setHover(false)]}
        position={[0.06, 4.04, 0.35]}
        scale={[0.25, 0.25, 0.25]}
      >
        {/****  START OF ALL MODELS  ****/}
        <group
          onClick={(e) => {
            e.stopPropagation();
            setToggle(!toggle);
            setTimeout(
              () => setLocation(toggle ? '/nintendo-event' : '/'),
              500
            );
          }}
        >
          <MarioModel />
          <BowserModel />
        </group>
        <group>
          <group
            position={window.innerWidth < 800 ? [42, -2, 1] : [42, -2, 5]}
            rotation={[0, window.innerWidth < 800 ? 0.2 : -0.15, 0]}
            onClick={(e) => {
              e.stopPropagation();
              setToggle(!toggle);
              setTimeout(() => setLocation(toggle ? '/hacker-news' : '/'), 500);
            }}
          >
            <HackerNewsModel />
          </group>
        </group>
        <group
          onClick={(e) => {
            e.stopPropagation();
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/three-arena' : '/'), 500);
          }}
        >
          <ThreeArenaModel />
        </group>
        <group
          onClick={(e) => {
            e.stopPropagation();
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/electric' : '/'), 500);
          }}
        >
          <Electric />
        </group>
        <UselessCubesComponent
          onClickEvent={() => {
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/useless-web' : '/'), 500);
          }}
        />
        <group
          onClick={(e) => {
            e.stopPropagation();
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/nook-inc' : '/'), 500);
          }}
        >
          <NookIncModel />
        </group>
        <group>
          <group
            visible={
              locationId === '' || locationId === 'fake-news' ? true : false
            }
            position={[-33, 32, window.innerWidth < 800 ? 21 : 30]}
            rotation={[0.3, -1.1, 0.2]}
            scale={[0.4, 0.4, 0.4]}
          >
            <FakeNewsModel
              onClick={(e) => {
                e.stopPropagation();
                setToggle(!toggle);
                setTimeout(() => setLocation(toggle ? '/fake-news' : '/'), 500);
              }}
            />
          </group>
        </group>
      </group>
      <group name="Camera" ref={groupCameraRef}>
        <PerspectiveCamera
          makeDefault
          ref={cameraRef}
          far={1000}
          near={0.1}
          fov={90}
        >
          <directionalLight
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

useGLTF.preload('/modelGroup.glb');
