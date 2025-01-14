// src/Components/Gallery.js
import React from 'react';
import './Gallery.css'; // Optional: Create and import CSS for styling

function Gallery({ images }) {
  if (!images || images.length === 0) {
    return <p>No screenshots available.</p>;
  }

  return (
    <div className="gallery">
      {images.map((url, index) => (
        <div key={index} className="gallery-item">
          <img src={url} alt={`Screenshot ${index + 1}`} className="gallery-image" />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
