import './App.css';
import React from 'react';
import '@google/model-viewer/dist/model-viewer';

export default function App() {
  const modelStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '150px',
    height: '150px',
    zIndex: 0,
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gallery</h1>
        <h2>3D Model Viewer</h2>
        <model-viewer
          src="/Polaroids.glb"
          alt="Computer Model"
          auto-rotate={true} // Enable auto-rotation
          interaction-prompt="none" // Remove drag hand prompt
          disable-zoom={true} // Prevent zooming
          rotation-per-second="30deg" // Spin clockwise
          style={modelStyle} // Add inline styles
        ></model-viewer>
      </header>
    </div>
  );
}