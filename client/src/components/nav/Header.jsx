import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/display_photo.jpg";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";


function Header() {
  const {currentUser} = useSelector(state => state.user)
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(searchTerm, "searchTerm");
    const seachQuery = urlParams.toString();
    navigate(`/search?${seachQuery}`);
  };

  useEffect(() => {
   const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  
  }, [location.search])
  
  return (
    <>
    {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
      <header className="header-container">
        <nav className="navbar-container">
          <div className="logo">
            <h2 className="logo-bold">mern</h2>
            <span className="logo-text">estate</span>
          </div>

          {/* Sidebar for small screens */}
          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <IoClose className="close-icon" onClick={() => setIsOpen(false)} />
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about-us" onClick={() => setIsOpen(false)}>
              About Us
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
            <NavLink to="/listings" onClick={() => setIsOpen(false)}>
              Listings
            </NavLink>
            <NavLink to="/sign-in" onClick={() => setIsOpen(false)}>
              Sign in
            </NavLink>
            <input type="text" placeholder="search..." className="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={handleSubmit}>search</button>
          </div>

          {/* Desktop Navbar */}
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/listings">Listings</NavLink>
          </div>
          <div className="nav-search">
            <input type="text" placeholder="search..." className="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={handleSubmit}>search</button>
          </div>

          <div className="nav-auth">
            <Link to="/profile">
            {currentUser ? (<img src={currentUser.avatar} alt="display avatar" className="avatar"/>) : (<img src={avatar} alt="display avatar" className="avatar"/>)}
            </Link>
            {/* {currentUser && <span className="">{currentUser.username}</span>} */}
            {!currentUser && <NavLink to="/sign-in">Sign in</NavLink>}
          </div>
          {/* Mobile menu icon */}
          <div className="nav-mobile" onClick={() => setIsOpen(true)}>
            <HiMenuAlt2 />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
