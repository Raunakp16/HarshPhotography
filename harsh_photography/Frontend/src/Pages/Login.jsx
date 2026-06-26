import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='mainbox'>
         <div className='loginbox'>
            <h1>Enter your Admin Email </h1>
      <input type="email" placeholder='enter admin email' />
      <button>Verify</button>
    </div>
    </div>
   
  )
}

export default Login
