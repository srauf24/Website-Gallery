// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import '@google/model-viewer/dist/model-viewer';
import InputForm from './Components/InputForm';
import Gallery from "./Components/Gallery";
import { fireStore } from './firebase';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error('❌ Missing environment variable: REACT_APP_ACCESS_KEY');
}

export default function App() {
  const modelStyle = {
    position: 'absolute',
    top: '5px',
    right: '10px',
    width: '150px',
    height: '150px',
    zIndex: 0,
  };

  const [currentImage, setCurrentImage] = useState(null);
  const [previousImages, setPreviousImages] = useState([]);
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
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const defaultValues = {
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
      // Clone the inputs to avoid direct state mutation
      const updatedInputs = { ...inputs };
      for (const [key, value] of Object.entries(updatedInputs)) {
        if (value === '') {
          updatedInputs[key] = defaultValues[key];
        }
      }
      setInputs(updatedInputs); // Update state with defaults where necessary
      makeQuery(updatedInputs);
    }
  };

  const makeQuery = (currentInputs) => {
    const wait_until = 'network_idle';
    const response_type = 'json';
    const fail_on_status = '400%2C404%2C500-511';

    const fullURL = currentInputs.url.startsWith('http')
      ? currentInputs.url
      : 'https://' + currentInputs.url;

    const queryURL = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${encodeURIComponent(fullURL)}&format=${currentInputs.format}&width=${currentInputs.width}&height=${currentInputs.height}&no_cookie_banners=${currentInputs.no_cookie_banners}&no_ads=${currentInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    console.log("query url", queryURL);
    callAPI(queryURL);
  };

  const viewDatabase = async () => {
    try {
      const snapshotQuery = query(collection(fireStore, 'gallery'));
      const docsSnapshot = await getDocs(snapshotQuery);
      const inventoryList = [];
      docsSnapshot.forEach((doc) => {
        inventoryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("Inventory List:", inventoryList);
      // Update previousImages state with URLs from Firestore
      setPreviousImages(inventoryList.map(item => item.url));
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const callAPI = async (queryURL) => {
    try {
      const response = await fetch(queryURL);
      console.log("API Response:", response);
      const json = await response.json();
      if (!json.url) {
        alert("The screenshot couldn't be taken.");
      } else {
        setCurrentImage(json.url);
        setPreviousImages((images) => [...images, json.url]);
        reset();
        // Add the new screenshot URL to Firestore
        await addScreenshotToFirestore(json.url);
      }
    } catch (error) {
      console.error('Error fetching the screenshot:', error);
      alert("An error occurred while taking the screenshot.");
    }
  };

  const addScreenshotToFirestore = async (url) => {
    try {
      const galleryCollection = collection(fireStore, 'gallery');
      const docRef = await addDoc(galleryCollection, {
        url: url,
        createdAt: new Date(),
      });
      console.log("Screenshot added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Fetch existing screenshots when the component mounts
  useEffect(() => {
    viewDatabase();
  }, []);

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
        {currentImage ? (
          <img
            className="screenshot"
            src={currentImage}
            alt="Screenshot returned"
          />
        ) : (
          <div></div>
        )}
        <div className="container">
          <h3> Current Query Status: </h3>
          <p>
            https://api.apiflash.com/v1/urltoimage?access_key={ACCESS_KEY}
            <br />
            &url={inputs.url} <br />
            &format={inputs.format} <br />
            &width={inputs.width}
            <br />
            &height={inputs.height}
            <br />
            &no_cookie_banners={inputs.no_cookie_banners}
            <br />
            &no_ads={inputs.no_ads}
            <br />
          </p>
          <h1> Screenshot Gallery</h1>
          <Gallery images={previousImages} />
        </div>
        <br />
      </header>
    </div>
  );
}
