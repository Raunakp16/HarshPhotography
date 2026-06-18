import React from 'react';
import './PhotoCategory.css';

const PhotoCategory = ({ images, loading, category }) => {
  return (
    <div className='category'>
      
      <h1>The Gallery</h1>
      <p>A curated collection of moments captured through the times</p>

      {/* Category name */}
      <h2>{category}</h2>

      {/* Loading state */}
      {loading && <p>Loading images...</p>}

      {/* Images grid */}
      <div className="image-grid">
        {!loading && images && images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`gallery-${index}`}
            />
          ))
        ) : (
          !loading && <p>No images found</p>
        )}
      </div>

    </div>
  );
};

export default PhotoCategory;