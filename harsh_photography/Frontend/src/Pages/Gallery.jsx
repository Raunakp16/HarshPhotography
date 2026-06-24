import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import GalleryNavbar from '../Components/Gallery/GalleryNavbar';
import PhotoCategory from '../Components/Gallery/PhotoCategory';

const Gallery = () => {
  const { category } = useParams();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage,setSelectedImage]=useState(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);

        if (!category) {
          console.warn("No category provided in URL");
          setImages([]);
          setLoading(false);
          return;
        }
      const res = await axios.get(
  `http://localhost:5000/api/gallery/${category}`
);

        console.log("API RESPONSE:", res.data);

        // 🔥 SAFE ACCESS (prevents crash)
        const galleryData = res.data?.data || res.data;

        setImages(galleryData?.images || []);

      } catch (error) {
        console.error("Error loading gallery:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [category]);

  return (
    <div style={{ color: 'white' }}>
      <GalleryNavbar />

      <PhotoCategory
        images={images}
        loading={loading}
        category={category || "Unknown Category"}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default Gallery;