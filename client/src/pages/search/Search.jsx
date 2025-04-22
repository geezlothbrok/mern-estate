import React, { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../components/loader/Loader";
import SearchListingCard from "../../components/card/SearchListingCard";

function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: "",
    furnished: "",
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log("current listings", listings);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      console.log("Fetching with query:", searchQuery);
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      console.log("API response:", data);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === "parking" || e.target.id === "furnished") {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <main className="search-main">
      <section className="left-side">
        <form onSubmit={handleSubmit}>
          <div className="search-term">
            <label>Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="search..."
              className="look-for"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="all-search">
            <div className="sea">
              <label>Type:</label>
              <input
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="hello">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
          </div>
          <div className="all-search">
            <div className="sea">
              <label>Amenities:</label>
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="hello">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="sort">
            <label>Sort:</label>
            <select
              id="sort_order"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="price_desc">Price high to low</option>
              <option value="price_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="sort-button">Search</button>
        </form>
      </section>
      <section className="right-side">
        <h1>Listing results:</h1>
        <div className="listings-info">
          {!loading && listings.length === 0 && (
            <p className="listings-response">No listing found!</p>
          )}
          {loading && <Loading />}
          {!loading && listings && listings.length > 0 && (
            <>
              {listings.map((listing) => (
                <SearchListingCard key={listing._id} listing={listing} />
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
