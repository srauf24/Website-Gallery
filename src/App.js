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
const submitForm = () => {


}
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
          inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>

      </header>
    </div>
  );
}