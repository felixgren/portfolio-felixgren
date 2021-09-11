import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAsset } from 'use-asset';

// This code is heavily based on the following three-fiber example.
// https://codesandbox.io/s/simple-audio-analyser-wu51m

export default function AudioVisaulizer({
  url,
  y = 200,
  space = 1.8,
  width = 0.1,
  height = 0.2,
  obj = new THREE.Object3D(),
  ...props
}) {
  const ref = useRef();
  const { gain, context, update, data } = useAsset(() => createAudio(url), url);
  useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame((state) => {
    let avg = update();
    for (let i = 0; i < data.length; i++) {
      obj.position.set(
        i * width * space - (data.length * width * space) / 2,
        data[i] / y,
        0
      );
      obj.updateMatrix();
      ref.current.setMatrixAt(i, obj.matrix);
    }
    // Set the hue according to the frequency average
    ref.current.material.color.setHSL(avg / 250, 0.5, 0.5);
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      castShadow
      ref={ref}
      args={[null, null, data.length]}
      {...props}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

async function createAudio(url) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = true;
  source.start(0);
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  gain.gain.value = 0;
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);
  const data = new Uint8Array(analyser.frequencyBinCount);
  return {
    context,
    source,
    gain,
    data,
    update: () => {
      analyser.getByteFrequencyData(data);
      // Calculate a frequency average
      return (data.avg = data.reduce(
        (prev, cur) => prev + cur / data.length,
        0
      ));
    },
  };
}
