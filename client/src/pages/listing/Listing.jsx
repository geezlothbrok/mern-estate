import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipetCore from "swiper";
import { Navigation } from "swiper/modules";
import { MdChair, MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import "./CreateListing.css";

function Listing() {
  SwipetCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <Loader />}
      {error && <p className="error">Something went wrong</p>}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="swiper-slide"
                  style={{
                    background: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "500px",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="listing-info">
            <h1>{listing.name}</h1>
            
            <div className="location-box" style={{marginTop: "1.2rem"}}>
                <MdLocationOn className="location-icon" />
                <p className="location" style={{textTransform: "capitalize", fontWeight: "bold"}}>{listing.address}</p>
            </div>
            <p className="price" style={{fontWeight: "bold", marginTop: "1.2rem"}}>GHS {listing.price.toLocaleString("en-US")}</p>
            <p className="type" style={{marginTop: "1.2rem"}}> For {listing.type}</p>

            <p style={{marginTop: "1.2rem"}}>
                <span className="desc">Description - </span>
                <span className="description">
                {listing.description }
                </span>
               
            </p>
            <div className="categories">
                <div className="cat">
                    <FaBath className="location-icon"/>
                    <p className="cat-value">{listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrroms} bathroom`}</p>
                </div>
                <div className="cat">
                <FaBed className="location-icon"/>
                    <p className="cat-value">{listing.bathrooms > 1 ? `${listing.bathrooms} bedrooms` : `${listing.bathrroms} bedroom`}</p>
                </div>
                <div className="cat">
                <FaParking className="location-icon"/>
                <p className="cat-value">{listing.parking ? "Yes" : "No Parking"}</p>
                </div>
                <div className="cat">
                <MdChair className="location-icon"/>
                <p className="cat-value">{listing.parking ? "Yes" : "Not Furnished"}</p>
                </div>
            </div>
            <div className="user-box">
                <img src={currentUser.avatar} alt="" className="user-image" />
                <div className="user-info">
                <p className="user-name">{currentUser.username}</p>
                {currentUser && currentUser._id === listing.userId && (
                  <p className="user-role">You</p>
                )}
                <p className="phone-number">  
                    <span className="tel" style={{fontWeight: 700, fontSize: "small"}}>Phone - </span>
                    <span className="tel-number">{currentUser.phone}</span>
                </p>
                </div>
                
                </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
