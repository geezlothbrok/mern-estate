import React, { useEffect, useState } from "react";
import "./Home.css";
import { BiBuildingHouse } from "react-icons/bi";
import { LiaWarehouseSolid } from "react-icons/lia";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { RiHome9Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SearchListingCard from "../../components/card/SearchListingCard";

function Home() {
  const [recentListings, setRecentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings);
  console.log("rent Listings", rentListings);

  //   useEffect(() => {
  //       const fetchRentListings = async () => {
  //       try {
  //         const res = await fetch("/api/listing/get?type=rent&limit=4");
  //         const data = await res.json();
  //         setRentListings(data);
  //         fetchSaleListings();
  //       } catch (error) {
  //         console.log("Error fetching rent listings:", error);

  //       }
  //     }

  //     const fetchSaleListings = async () => {
  //       try {
  //         const res = await fetch("/api/listing/get?type=sale&limit=4");
  //         const data = await res.json();
  //         setSaleListings(data);
  //       } catch (error) {
  //         console.log("Error fetching sale listings:", error);
  //       }
  //     }

  //     fetchRentListings();
  // }, []);

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log("Error fetching rent listings:", error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log("Error fetching sale listings:", error);
      }
    };

    const fetchRecentListings = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?limit=4&sort=createdAt&order=desc"
        );
        const data = await res.json();
        setRecentListings(data);
      } catch (error) {
        console.log("Error fetching recent listings:", error);
      }
    };

    fetchRentListings();
    fetchSaleListings();
    fetchRecentListings();
  }, []);

  return (
    <main className="home-container">
      <div className="hero-section">
        <div className="background-image">
          <div className="hero-background-title">
            <h1 className="background-title">Lets find your dream house.</h1>
          </div>
        </div>
        <p style={{ color: "#d35400", textAlign: "center", marginTop: "10px" }}>
          Property By Requirement
        </p>
        <h2
          style={{
            color: "#ffff",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          Explore Apartment <span style={{ color: "#1a8f4d" }}>Types</span>
        </h2>
        <div className="svg-container">
          <div className="svg-card">
            <BiBuildingHouse className="svgs" />
            <h3>Commercial</h3>
          </div>
          <div className="svg-card">
            <LiaWarehouseSolid className="svgs" />
            <h3>Warehouse</h3>
          </div>
          <div className="svg-card">
            <MdOutlineVilla className="svgs" />
            <h3>Villa</h3>
          </div>
          <div className="svg-card">
            <PiBuildingApartmentLight className="svgs" />
            <h3>Apartment</h3>
          </div>
          <div className="svg-card">
            <RiHome9Line className="svgs" />
            <h3>Homestay</h3>
          </div>
        </div>
      </div>
      <div className="intro-sect">
        <h1 className="intro-header">
          Find your{" "}
          <span style={{ fontWeight: 700, color: "#2c3e50", lineHeight: 2 }}>
            perfect
          </span>{" "}
          dream home with us! <br />
          We make it easy to find your dream home. <br />
        </h1>
        <p className="intro-text">
          We are a team of real estate experts dedicated to helping you find
          your dream home. <br />
          Our mission is to make the process of buying or selling a home as easy
          and stress-free as possible. <br />
          We understand that finding the right home can be overwhelming, which
          is why we are here to help you every step of the way. <br />
          Whether you are a first-time homebuyer or an experienced investor, we
          have the knowledge and expertise to help you achieve your real estate
          goals. <br />
        </p>
        <Link
          to="/search"
          style={{ color: "#1a8f4d", fontWeight: 700 }}
          className="get-started"
        >
          Let's get started...
        </Link>
      </div>

      <Swiper navigation>
        {rentListings &&
          rentListings.length > 0 &&
          rentListings.map((rent) => (
            <SwiperSlide>
              <div
                className="swiper-cover"
                key={rent._id}
                style={{
                  background: `url(${rent.imageUrls[0]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "500px",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
        {/* Most recent listings */}
      <div className="home-listings">
        {recentListings && recentListings.length > 0 && (
          <div className="caption">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Most Recent Listings
            </h2>
            <Link to="/search?sort=createdAt&order=desc" className="view-all">
              View All
            </Link>
          </div>
        )}
        <div className="show-listings">
          {recentListings.map((listing) => (
            <SearchListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
{/* Recent places for rent */}
      <div className="home-listings">
        {rentListings && rentListings.length > 0 && (
          <div className="caption">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Recent Places for Rent
            </h2>
            <Link to="/search?type=rent" className="view-all">
              View All...
            </Link>
          </div>
        )}
        <div className="show-listings">
          {rentListings.map((rent) => (
            <SearchListingCard key={rent._id} listing={rent} />
          ))}
        </div>
      </div>

{/* Recent places for sale */}
      <div className="home-listings">
        {saleListings && saleListings.length > 0 && (
          <div className="caption">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Recent Places for Sale
            </h2>
            <Link to="/search?type=sale" className="view-all">
              View All
            </Link>
          </div>
        )}
        <div className="show-listings">
          {saleListings.map((sale) => (
            <SearchListingCard key={sale._id} listing={sale} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
