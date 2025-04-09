import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {Swiper, SwiperSlide} from "swiper/react";
import SwipetCore from "swiper";
import {Navigation} from "swiper/modules";
import "swiper/css/bundle";
import "./CreateListing.css";

function Listing() {
    SwipetCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

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
      {listing && !loading && !error && 
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
> 
                
            </div>
            </SwiperSlide>
        ))}
      </Swiper>
      </>
      }
    </main>
  );
}

export default Listing;
