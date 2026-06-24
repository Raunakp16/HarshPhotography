import React from "react";
import "./PhotoCategory.css";
import { useEffect } from "react";

const PhotoCategory = ({
  images,
  loading,
  category,
  selectedImage,
  setSelectedImage,
}) =>
 // Forward and backward arrow function 
  {
  const currentIndex = images.findIndex(
  (img) => img.url === selectedImage?.url
);
  const loadPrevImage = () => {
  if (currentIndex > 0) {
    setSelectedImage(images[currentIndex - 1]);
  }
};
  const loadnextImage = () => {
    if (currentIndex < images.length-1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  // Key Action function 
  useEffect(()=>{
    const handleKeyDown= (e) => {
      // ESC => close modal 
      if(e.key === "Escape"){
        setSelectedImage(null)
      }

      // Left arrow functionality 
      if(e.key === "ArrowLeft"){
        if(currentIndex >0){
          setSelectedImage(images[currentIndex -1])
        }
      }

      // Right arrow functionality 
      if(e.key === "ArrowRight"){
        if(currentIndex <images.length-1){
          setSelectedImage(images[currentIndex +1])
        }
      }
    }
     // Adding Keyboard functionality 
      if(selectedImage){
        window.addEventListener("keydown",handleKeyDown)
      }
      // clean up functionality 
      return() =>{
        window.removeEventListener("keydown",handleKeyDown)
      }
  },[selectedImage,currentIndex,images])
  return (
    <div className="category">
      <h1>The Gallery</h1>
      <p>A curated collection of moments captured through the times</p>

      {/* Category name */}
      <h2>{category}</h2>

      {/* Loading state */}
      {loading && <p>Loading images...</p>}

      {/* Images grid */}
      <div className="image-grid">
        {!loading && images && images.length > 0
          ? images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`gallery-${index}`}
                onClick={() => setSelectedImage(img)}
              />
            ))
          : !loading && <p>No images found</p>}
      </div>
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {currentIndex > 0 && (
  <button
    className="nav-arrow left-arrow"
    onClick={loadPrevImage}
  >
    ❮
  </button>
)}

{currentIndex < images.length - 1 && (
  <button
    className="nav-arrow right-arrow"
    onClick={loadnextImage}
  >
    ❯
  </button>
)}
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            <img src={selectedImage.url} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCategory;
