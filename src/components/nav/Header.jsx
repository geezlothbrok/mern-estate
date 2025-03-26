import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import avatar from "../../assets/images/display_photo.jpg";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function Header() {
  return (
    <header className="header-container fluid">
    
        <div className="logo">
          <h2 className="logo-bold">mern</h2>
          <span className="logo-text">estate</span>
        </div>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about-us">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/listings">Listings</NavLink>
        </div>

        <div className="nav-search">
          <input
            type="text"
            placeholder="search..."
            id="search"
            className="search"
          />
        </div>

        <div className="nav-auth">
          <img src={avatar} alt="" className="avatar"/>
          <NavLink to="/sign-in">Sign in</NavLink>
        </div>

        <div className="nav-mobile">
          <HiMenuAlt2 />
          <IoClose />
        </div>
    
    </header>
  );
}

export default Header;
