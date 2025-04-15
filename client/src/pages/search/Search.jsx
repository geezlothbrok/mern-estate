import React from "react";
import "./Search.css";

function Search() {
  return (
    <main className="search-main">
      <section className="left-side">
        <form>
          <div className="search-term">
            <label>Search Term:</label>
            <input
              type="text"
              id="search"
              placeholder="search..."
              className="look-for"
            />
          </div>
          <div className="all-search">
            <div className="sea">
              <label>Type:</label>
              <input type="checkbox" id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className="hello">
              <input type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="">
              <input type="checkbox" id="sale" />
              <span>Sale</span>
            </div>
          </div>
          <div className="all-search">
            <div className="sea">
              <label>Aminities:</label>
              <input type="checkbox" id="all" />
              <span>Parking</span>
            </div>
            <div className="hello">
              <input type="checkbox" id="rent" />
              <span>Furnished</span>
            </div>
            
          </div>
        </form>
      </section>
      <section className="right-side">
        <h1>Listing results:</h1>
      </section>
    </main>
  );
}

export default Search;
