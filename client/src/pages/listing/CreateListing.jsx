import React from "react";
import "./CreateListing.css";

function CreateListing() {
  return (
    <main className="listing-container">
      <h2 className="listing-title">Create a Listing</h2>

      <form className="listing-form-content">
        <div className="form-listing">
          <input type="text" id="title" placeholder="Enter title" required />

          <textarea
            id="description"
            placeholder="Enter description"
            required
          ></textarea>

          <input
            type="text"
            id="location"
            placeholder="Enter location"
            required
          />

<div className="input-label"><label htmlFor="price">Price</label>
          <input type="number" id="price" placeholder="Enter price" required />
          <label htmlFor="sale">Sale</label>
          <input type="checkbox" id="sale" required />
          <label htmlFor="rent">Rent</label>
          <input type="checkbox" id="rent" required />
          <label htmlFor="parking">Parking spot</label>
          <input type="checkbox" id="parking" required />
          <label htmlFor="furnished">Furnished</label>
          <input type="checkbox" id="furnished" required />
          <label htmlFor="bed">Bed</label>
          <input type="number" id="bed" required />
          <label htmlFor="bath">Baths</label>
          <input type="number" id="bath" required /></div>
          
        </div>

        <div className="listing-image">
          <div className="caution-container">
            <p className="caution-title">Images:</p>
            <span className="caution-text">
              The first image shall be the cover
            </span>
          </div>
          <div className="image-container">
            <input type="file" id="image" accept="image/*" multiple required />
            <button type="button">upload</button>
          </div>
          <button type="submit" className="listing-submit">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
