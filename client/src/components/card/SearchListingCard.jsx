import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { MdChair, MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaParking } from "react-icons/fa";

function SearchListingCard({ listing }) {
  return (
    <div className="card-container">
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt="cover" className="card-image" />
        <div className="card-text">
          <p style={{ color: "black", fontWeight: "bold" }}>
            {listing.name.length > 20
              ? `${listing.name.substring(0, 20)}...`
              : listing.name}
          </p>
        </div>
        <div className="card-icons">
          <MdLocationOn className="location-icon" />
          <p
            className="location"
            style={{
              textTransform: "capitalize",
              fontWeight: "500",
              fontSize: "small",
              color: "black",
            }}
          >
            {listing.address}
          </p>
        </div>
        <div className="card-details">
          <p
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
              color: "black",
            }}
          >
            {listing.description.length > 65
              ? `${listing.description.substring(0, 65)}...`
              : listing.description}
          </p>
        </div>
        <div className="card-amount">
          <p className="price" style={{ fontWeight: "bold", color: "black" }}>
            GHS {listing.price.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
        </div>
        <div className="amenity-types">
          <ul>
            <li>
              <FaBath className="location-icon" size={10}/>
              <p className="cat-value">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </p>
            </li>
            <li>
              <FaBed className="location-icon" size={10}/>
              <p className="cat-value">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} beds`
                  : `${listing.bathrooms} bed`}
              </p>
            </li>
            <li>
              <FaParking className="location-icon" size={10}/>
              <p className="cat-value">
                {listing.parking ? "Yes" : "No Parking"}
              </p>
            </li>
            <li>
              <MdChair className="location-icon" size={10}/>
              <p className="cat-value">
                {listing.parking ? "Yes" : "Not Furnished"}
              </p>
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
}

export default SearchListingCard;
