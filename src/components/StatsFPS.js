import React from 'react';
import { Stats } from '@react-three/drei';
import './App.css';

// Render FPS counter if query ?debug=true
const StatsFPS = () => {
  if (window.location.search.indexOf('debug=true') !== -1) {
    return <Stats showPanel={0} className="fps-counter" />;
  } else return null;
};

export default StatsFPS;
