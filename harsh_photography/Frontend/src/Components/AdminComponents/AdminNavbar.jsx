import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowLeft} from 'lucide-react';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <div>
        <div className='Admin-nav'>
      <h1 >Harsh Photography</h1>
     <h3><Link className='link'  to="/home">  <ArrowLeft size={12} />  Back to homepage </Link></h3>
     <h3><Link className='link'  to="/admin/gallery-settings">  Gallery Settings </Link></h3>
    </div>
    </div>
  )
}

export default AdminNavbar
