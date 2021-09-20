import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './App.css';

import Content from './Content';
import ScrollContainer from './ScrollContainer';
import Models from './Models';
import Text from './Text';
import DetailedText from './DetailedText';
import Fade from './Fade';
import StartFade from './StartFade';
// eslint-disable-next-line
import StatsFPS from './StatsFPS';

function App() {
  const scrollRef = useRef();
  const scroll = useRef(0);
  return (
    <div id="App">
      <Canvas
        onCreated={(state) => state.events.connect(scrollRef.current)}
        raycaster={{
          computeOffsets: ({ clientX, clientY }) => ({
            offsetX: clientX,
            offsetY: clientY,
          }),
        }}
      >
        <ScrollContainer scroll={scroll}>
          <Content scroll={scroll} />
        </ScrollContainer>

        <Suspense fallback={null}>
          <Models scroll={scroll} />
        </Suspense>

        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={10} // Depth of area where stars should fit (default=50)
          count={1000} // Amount of stars (default=5000)
          factor={3} // Size factor (default=4)
          saturation={1} // Saturation 0-1 (default=0)
          fade={true} // Faded dots (default=false)
        />

        <ambientLight intensity={0.1} />

        <directionalLight color="red" position={[0, 0, 5]} />
      </Canvas>

      <Text ref={scrollRef} scroll={scroll} />

      <DetailedText />

      <StartFade />

      <Fade />

      <StatsFPS />
    </div>
  );
}

export default App;
