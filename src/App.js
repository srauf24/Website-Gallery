import './App.css';
import React from 'react';
import {useState} from "react"
import '@google/model-viewer/dist/model-viewer';
import InputForm from './Components/InputForm';
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

export default function App() {
  const modelStyle = {
    position: 'absolute',
    top: '5px',
    right: '10px',
    width: '150px',
    height: '150px',
    zIndex: 0,

  };
  const [inputs, setInputs] = useState({
  url: "",
  format: "",
  no_ads: "",
  no_cookie_banners: "",
  width: "",
  height: "",
});

  return (
    <div className="App">
      <header className="App-header">
        <h1 className={"title"}>Build Your Own Screenshot 📸</h1>
        <h3> Select your Image Attributes</h3>
        <model-viewer
          src="/Deer.glb"
          alt="Computer Model"
          auto-rotate={true} // Enable auto-rotation
          interaction-prompt="none" // Remove drag hand prompt
          disable-zoom={true} // Prevent zooming
          rotation-per-second="30deg" // Spin clockwise
          style={modelStyle} // Add inline styles
        ></model-viewer>
        <InputForm
          title="url"
          description="Input a link to any website you would like to take a screenshot of, do not worry about including https or any protocol"
        />
        <InputForm
          title="format"
          description="Input which image format you would prefer for your screenshot: jpeg, png, or webp"
        />
        <InputForm
          title="no_ads"
          description="Input true or false if you would like your website screenshot to not contain any ads"
        />
        <InputForm
          title="no_cookie_banners"
          description="Input true or false if you would like your website screenshot to not contain those annoying 'allow cookies' banners"
        />
        <InputForm
          title="width"
          description="Choose the width of your screenshot (in pixels)"
        />
        <InputForm
          title="height"
          description="Choose the height of your screenshot (in pixels)"
        />


      </header>
    </div>
  );
}