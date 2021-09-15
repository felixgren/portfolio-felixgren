/*
GLTF imports with the help of: https://gltf.pmnd.rs/ https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'wouter';
import UselessCubes from './UselessCubes';

const color = new THREE.Color();

export default function Model({ scroll, ...props }) {
  const t = useRef(0);
  const group = useRef();
  const cameraRef = useRef();
  const groupCameraRef = useRef();
  const defaultPos = new THREE.Vector3(0, 0, 0);
  const defaultQuart = new THREE.Quaternion(0, 0, 0, 1);
  const localCamPosVec = new THREE.Vector3();
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
  const worldCameraPosition = new THREE.Vector3();
  const worldCameraDirection = new THREE.Vector3();
  const worldCameraQuaternion = new THREE.Quaternion();

  const { nodes, materials, animations } = useGLTF('/model.glb');
  const { actions, mixer } = useAnimations(animations, group);

  const [cameraReady, setCameraReady] = useState(false);
  const [isThirdPhase, setIsThirdPhase] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [hovered, set] = useState();
  const [location, setLocation] = useLocation('/');

  const extras = {
    receiveShadow: true,
    castShadow: true,
    'material-envMapIntensity': 0.2,
  };

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
      scrollElement.scrollTop = currentLocation.offsetTop - 250;
      // Enable link after seeing project
      // const currentLink = document.querySelector(`#${locationId}-link`);
      // currentLink.style.display = 'initial';
      scrollElement.style.webkitMaskImage = 'none';

      setTimeout(
        () =>
          Array.from(projectButtons).map((projectButton) => {
            projectButton.style.opacity = '1';
            projectButton.style.pointerEvents = 'initial';
            devNav.style.opacity = '1';
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
          projectButton.style.opacity = '0';
          projectButton.style.pointerEvents = 'none';
          devNav.style.opacity = '0';
        }),
      600
    );
  }

  // I should check if dependency affects performance in any way
  // eslint-disable-next-line
  useEffect(() => void actions['CameraAction.005'].play(), []);

  useEffect(() => {
    if (hovered)
      group.current.getObjectByName(hovered).material.color.set('white');
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state, delta) => {
    state.camera.getWorldPosition(worldCameraPosition);
    state.camera.getWorldDirection(worldCameraDirection);
    state.camera.getWorldQuaternion(worldCameraQuaternion);

    const step = 5 * delta;
    state.camera.fov = THREE.MathUtils.lerp(
      state.camera.fov,
      toggle ? 55 : 28,
      step
    );
    state.camera.position.lerp(
      localCamPosVec.set(toggle ? 0 : 0, toggle ? 0 : 0, toggle ? 0 : 0),
      step
    );
    state.camera.updateProjectionMatrix();

    group.current.children[0].children.forEach((child, index) => {
      if (child.children[0].material) {
        child.children[0].material.color.lerp(
          color
            .set(hovered === child.children[0].name ? 'blue' : '#202020')
            .convertSRGBToLinear(),
          hovered ? 0.1 : 0.05
        );
      }
      const time = state.clock.elapsedTime;
      child.position.y = Math.sin((time + index * 2000) / 2) * 1;
      child.rotation.x = Math.sin((time + index * 2000) / 3) / 30;
      child.rotation.y = Math.cos((time + index * 2000) / 2) / 30;
      child.rotation.z = Math.sin((time + index * 2000) / 3) / 30;
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
        (t.current = THREE.MathUtils.lerp(
          t.current,
          // Calculate scroll between scrollStart (0.5) and scrollEnd (1)
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
      mixer.setTime((t.current = THREE.MathUtils.lerp(t.current, 5.8, 0.05)));
      if (t.current >= 5.75) {
        mixer.stopAllAction();
        state.camera.quaternion.copy(animEndQuaternion);
        groupCameraRef.current.position.copy(animEndPosition);
      }
    }
    // Prep for phase 2 -> phase 1
    else if (actions['CameraAction.005'].isRunning()) {
      mixer.setTime((t.current = THREE.MathUtils.lerp(t.current, 0, 0.05)));

      // Switch to phase 1 when camera in position
      if (t.current < 0.02 && actions['CameraAction.005'].isRunning()) {
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
        onPointerOver={(e) => [e.stopPropagation(), set(e.object.name)]}
        onPointerOut={(e) => [e.stopPropagation(), set(null)]}
        position={[0.06, 4.04, 0.35]}
        scale={[0.25, 0.25, 0.25]}
      >
        {/* mario model */}
        <group
          onClick={() => {
            setToggle(!toggle);
            setTimeout(
              () => setLocation(toggle ? '/nintendo-event' : '/'),
              500
            );
          }}
        >
          <group
            position={[18, -15.37, 20.62]}
            rotation={[-Math.PI / 2, 0, -0.32]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mario.geometry}
              material={materials.MarioMat}
            />
          </group>
        </group>
        ´{/* three arena model */}
        <group
          onClick={() => {
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/three-arena' : '/'), 500);
          }}
        >
          <group
            position={[33.65, 11.08, -17.34]}
            rotation={[-Math.PI, 0.6, -Math.PI]}
            scale={[0.2, 0.2, 0.2]}
          >
            <primitive object={nodes._rootJoint} />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.rock_GEO_Rock_MAT_0.geometry}
              material={materials.Rock_MAT}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.sides_GEO_Side_MAT_0.geometry}
              material={materials.Side_MAT}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ground_GEO_treeline_MAT_0.geometry}
              material={materials.treeline_MAT}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.rocks_GEO_Rock_MAT_0.geometry}
              material={materials.Rock_MAT_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.shadow_GEO_Shadow_MAT_0.geometry}
              material={materials.Shadow_MAT}
            />
            <skinnedMesh
              geometry={nodes.sword.geometry}
              material={materials.Doom_MAT_0}
              skeleton={nodes.sword.skeleton}
            />
            <skinnedMesh
              geometry={nodes.flame.geometry}
              material={materials.Doom_MAT_1}
              skeleton={nodes.flame.skeleton}
            />
            <skinnedMesh
              geometry={nodes.shotgun.geometry}
              material={nodes.shotgun.material}
              skeleton={nodes.shotgun.skeleton}
            />
            <skinnedMesh
              geometry={nodes.fists.geometry}
              material={nodes.fists.material}
              skeleton={nodes.fists.skeleton}
            />
            <skinnedMesh
              geometry={nodes.body.geometry}
              material={nodes.body.material}
              skeleton={nodes.body.skeleton}
            />
            <skinnedMesh
              geometry={nodes.arms.geometry}
              material={materials.Doom_MAT_3}
              skeleton={nodes.arms.skeleton}
            />
            <skinnedMesh
              geometry={nodes.blade.geometry}
              material={materials.Doom_MAT_2}
              skeleton={nodes.blade.skeleton}
            />
            <skinnedMesh
              geometry={nodes.head.geometry}
              material={materials.Doom_MAT}
              skeleton={nodes.head.skeleton}
            />
          </group>
        </group>
        {/* electric model */}
        <group
          onClick={() => {
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/electric' : '/'), 500);
          }}
        >
          <group
            position={[12.71, 22.21, -32.71]}
            scale={[3, 3, 3]}
            rotation={[-1.44, -0.15, -0.77]}
          >
            <mesh
              name="Delorean"
              geometry={nodes.Delorean.geometry}
              material={materials.M_Delorean}
              {...extras}
            />
            <mesh
              geometry={nodes.DeloreanShock.geometry}
              material={materials.M_Shock}
            />
          </group>
        </group>
        {/* useless cubes model */}
        <UselessCubes
          onClickEvent={() => {
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/useless-web' : '/'), 500);
          }}
        />
        {/* nook inc model */}
        <group
          onClick={() => {
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/nook-inc' : '/'), 500);
          }}
        >
          <group
            position={[-31.34, 28.14, -12.87]}
            rotation={[-Math.PI, -1.05, -Math.PI]}
            scale={[0.05, 0.05, 0.05]}
          >
            <group
              position={[-5.59, 134.86, -11.56]}
              rotation={[-Math.PI / 2, 0, 1.31]}
              scale={[100, 100, 100]}
            >
              <mesh
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
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
                castShadow
                receiveShadow
                geometry={nodes.bell_Coin009_bell_Mat00_0.geometry}
                material={nodes.bell_Coin009_bell_Mat00_0.material}
              />
            </group>
          </group>
        </group>
        {/* task repo model */}
        <group
          onClick={() => {
            setToggle(!toggle);
            setTimeout(() => setLocation(toggle ? '/task-repo' : '/'), 500);
          }}
        >
          <mesh
            name="Zeppelin"
            geometry={nodes.Zeppelin.geometry}
            material={materials.M_Zeppelin}
            {...extras}
          />
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
