import React from 'react';
import navlogo from "../../assets/shop_logo.jpg";
import navProfile from "../../assets/subha.jpg";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
    <img src={navlogo} alt="" className='nav-logo' />
    <p>SHOPPER</p>
    <img src={navProfile} alt="" className='nav-profile' />
      
    </div>
  )
}

export default Navbar
