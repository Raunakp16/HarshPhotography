import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./Card.css";

const Card = ({ image, title, category }) => {
  console.log("CARD CATEGORY:", category);
  return (
  
     
        <div className="card">
          <img src={image} alt="" />
          <div className="label">
            <h2>{title}</h2>
            <Link to={`/gallery/${category}`} className="view-btn">
              View More <ArrowRight size={12} />
            </Link>
       </div>
    </div>
  );
};

export default Card;
