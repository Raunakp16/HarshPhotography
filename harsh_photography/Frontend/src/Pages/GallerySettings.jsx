import "./GallerySettings.css";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const GallerySettings = () => {
  const fetchCategories = async () => {
    try{
      const response = await axios.get("http://localhost:5000/api/gallery/categories");
      setCategories(response.data.data);
      console.log("Categories fetched:", response.data);
      
    }
    catch(error){
      console.error("Error fetching categories:",error);
    }
  }

  const fetchImages = async (category) => {
    try{
      const response = await axios.get(`http://localhost:5000/api/gallery/${category}`);
      console.log(response.data.data);
       setImages(response.data.data.images);
        console.log("Images fetched:", response.data);
    }
    catch(error){
      console.error("Error fetching images:",error);
    }
  }

 const deleteImage = async (publicId) => {
  // 1. instantly remove from UI (FAST FEEL)
  setImages((prev) =>
    prev.filter((img) => img.public_id !== publicId)
  );

  try {
    // 2. send request in background
    await axios.delete(
      `http://localhost:5000/api/gallery/delete/${encodeURIComponent(publicId)}`
    );

  } catch (error) {
    console.error("Delete failed:", error);

    // 3. rollback if something fails
    fetchImages(); // or restore state
  }
};

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() =>{
    fetchCategories();
  },[])
  
  console.log(categories);
  console.log(images);
  return (
    <div className="gallery-settings">
      <div className="gallerySettingNavbar">
        <h1>Gallery Settings</h1>
        <button className="link">
          <Link to="/Admin">adminpage</Link>
        </button>
      </div>

      <div className="gallery-layout">
        <div className="category-sidebar">
          <h3>Categories</h3>

         {
          categories.map((item) => (
            <button key={item._id} onClick={() => fetchImages(item.category)}>
              {item.category}
            </button>
          ))
         }
        </div>

        <div className="gallery-content">
  <h3>Images</h3>

  <div className="image-grid">
    {
      images.map((img) => (
        <div
          key={img.public_id}
          className="image-card"
        >
          <button className="delete-icon" onClick={() => deleteImage(img.public_id)}>
            <Trash2 size={20} />
          </button>

          <img
            src={img.url}
            alt=""
          />
        </div>
      ))
    }
  </div>
</div>
      </div>
    </div>
  );
};

export default GallerySettings;
