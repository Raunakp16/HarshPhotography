import React from 'react'
import './GalleryNavbar.css'
import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

const GalleryNavbar = () => {
  return (
    <div className='gallerynav'>
      <h1 >Harsh Photography</h1>
     <h3><Link className='link'  to="/Home">  <ArrowLeft size={12} />  Back to home</Link></h3>
    </div>
  )
}

export default GalleryNavbar
