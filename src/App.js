import './App.css';
import React, { useState } from 'react';
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
  const [screenShot, setScreenShot] = useState({});
  const [inputs, setInputs] = useState({
    url: '',
    format: '',
    no_ads: '',
    no_cookie_banners: '',
    width: '',
    height: '',
  });
  const reset = () => {
    setInputs({
      url: '',
      format: '',
      no_ads: '',
      no_cookie_banners: '',
      width: '',
      height: '',
    });
  }

  const submitForm = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    let defaultValues = {
      format: 'jpeg',
      no_ads: 'true',
      no_cookie_banners: 'true',
      width: '1920',
      height: '1080',
    };

    if (!inputs.url.trim()) {
      alert('Please enter a URL.');
      return;
    } else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value === '') {
          inputs[key] = defaultValues[key];
        }
      }
      makeQuery();
    }
  };

  const makeQuery = () => {
    let wait_until = 'network_idle';
    let response_type = 'json';
    let fail_on_status = '400%2C404%2C500-511';
    let url_starter = 'https://';
    let fullURL = url_starter + inputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);

    // Add your form submission logic here
  };
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
}

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Build Your Own Screenshot 📸</h1>
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
        <br />
      </header>
    </div>
  );
}