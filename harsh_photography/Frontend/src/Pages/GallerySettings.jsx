import "./GallerySettings.css";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const GallerySettings = () => {
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

          <button>Wedding</button>
          <button>Pre Wedding</button>
          <button>Portraits</button>
          <button>Baby Shower</button>
        </div>

        <div className="gallery-content">
          <h3>Images</h3>

          <div className="image-grid">
            <div className="image-card">
              <button className="delete-icon">
                <Trash2 size={20} />
              </button>
              Image
            </div>
            <div className="image-card">
                <button className="delete-icon">
                <Trash2 size={20} />
              </button>
                Image
                </div>
            <div className="image-card">
                <button className="delete-icon">
                <Trash2 size={20} />
              </button>
                Image
                </div>
            <div className="image-card">
                <button className="delete-icon">
                <Trash2 size={20} />
              </button>
                Image
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySettings;
