const Gallery = ({ images }) => {
  return (
    <div>
      {images.length > 0 ? (
        images.map((image, index) => (
          <img key={index} src={image} alt={`Screenshot ${index + 1}`} />
        ))
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
};

export default Gallery;