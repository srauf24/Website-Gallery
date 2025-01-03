import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
const { scene } = useGLTF('/Computer 90s.glb');
  return <primitive object={scene} />;
}

export default function ThreeModel() {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}
