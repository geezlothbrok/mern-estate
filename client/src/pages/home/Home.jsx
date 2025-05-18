import React from 'react';
import "./Home.css";
import { BiBuildingHouse } from "react-icons/bi";
import { LiaWarehouseSolid } from "react-icons/lia";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { RiHome9Line } from "react-icons/ri";



function Home() {
  return (
    <main className='home-container'>
      <div className="hero-section">
        <div className="background-image">
          <div className="hero-background-title">
            <h1 className="background-title">Lets find your dream house.</h1>
          </div>
        </div>
        <p style={{color: "#d35400", textAlign: "center", marginTop: "10px"}}>Property by Requirement</p>
        <h2 style={{color: "#ffff", textAlign: "center", marginTop: "10px", marginBottom: "30px"}}>Explore Appartment <span style={{color: "#1a8f4d"}}>Types</span></h2>
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
    </main>
  )
}

export default Home