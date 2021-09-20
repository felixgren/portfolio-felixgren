import React from 'react';
import { Stats } from '@react-three/drei';
import './App.css';

const StatsFPS = () => {
  return <Stats showPanel={0} className="fps-counter" />;
};

export default StatsFPS;
