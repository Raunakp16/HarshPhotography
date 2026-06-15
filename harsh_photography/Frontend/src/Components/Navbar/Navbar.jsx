import logo from '../../assets/Images/Eng_logo.png' 
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
      <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default Navbar
