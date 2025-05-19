import React from 'react';
import "./Home.css";
import { BiBuildingHouse } from "react-icons/bi";
import { LiaWarehouseSolid } from "react-icons/lia";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { RiHome9Line } from "react-icons/ri";
import { Link } from 'react-router-dom';



function Home() {
  return (
    <main className='home-container'>
      <div className="hero-section">
        <div className="background-image">
          <div className="hero-background-title">
            <h1 className="background-title">Lets find your dream house.</h1>
          </div>
        </div>
        <p style={{color: "#d35400", textAlign: "center", marginTop: "10px"}}>Property By Requirement</p>
        <h2 style={{color: "#ffff", textAlign: "center", marginTop: "10px", marginBottom: "30px"}}>Explore Apartment <span style={{color: "#1a8f4d"}}>Types</span></h2>
        <div className="svg-container">
          <div className="svg-card">
          <BiBuildingHouse className='svgs' />
          <h3>Commercial</h3>
          </div>
          <div className="svg-card">
          <LiaWarehouseSolid className='svgs'/>
          <h3>Warehouse</h3>
          </div>
          <div className="svg-card">
          <MdOutlineVilla className='svgs'/>
          <h3>Villa</h3>
          </div>
          <div className="svg-card">
          <PiBuildingApartmentLight className='svgs'/>
          <h3>Apartment</h3>
          </div>
          <div className="svg-card">
          <RiHome9Line className='svgs'/>
          <h3>Homestay</h3>
          </div>
        </div>
      </div>
      <div className="intro-sect">
        <h1 className="intro-header">
          Find your <span style={{fontWeight: 700, color: "#2c3e50", lineHeight: 2}}>perfect</span> dream home with us! <br />
          We make it easy to find your dream home. <br />
        </h1>
        <p className="intro-text">
          We are a team of real estate experts dedicated to helping you find your dream home. <br />
          Our mission is to make the process of buying or selling a home as easy and stress-free as possible. <br />
          We understand that finding the right home can be overwhelming, which is why we are here to help you every step of the way. <br />
          Whether you are a first-time homebuyer or an experienced investor, we have the knowledge and expertise to help you achieve your real estate goals. <br />
          </p>
          <Link to = "/search" style={{color: "#1a8f4d", fontWeight: 700}}>Let's get started...</Link>
      </div>
    </main>
  )
}

export default Home