import React from "react";
import "./CreateListing.css";

function CreateListing() {
  return (
    <main className="listing-container">
      <h2 className="listing-title">Create a Listing</h2>

      <form className="listing-form-content">
        <div className="form-listing">
          <input
            type="text"
            id="name"
            placeholder="Enter title"
            required
            className="input-field"
            minLength="10"
            maxLength="62"
          />

          <textarea
            id="description"
            placeholder="Enter description"
            required
            className="input-field"
            type="text"
          />

          <input
            type="text"
            id="location"
            placeholder="Enter location"
            required
            className="input-field"
          />

          <div className="input-label">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              required
              className="input-fields"
              min={1}
              max={500000000}
            />
            <label htmlFor="bed">Bed</label>
            <input
              type="number"
              id="bed"
              required
              className="input-fields"
              min={1}
              max={10}
            />
            <label htmlFor="bath">Baths</label>
            <input
              type="number"
              id="bath"
              required
              className="input-fields"
              min={1}
              max={10}
            />
          </div>
          <div className="checkboxes">
            <label htmlFor="sale">Sale</label>
            <input type="checkbox" id="sale" required />
            <label htmlFor="rent">Rent</label>
            <input type="checkbox" id="rent" required />
            <label htmlFor="parking">Parking spot</label>
            <input type="checkbox" id="parking" required />
            <label htmlFor="furnished">Furnished</label>
            <input type="checkbox" id="furnished" required />
          </div>
        </div>

        <div className="listing-image">
          <div className="caution-container">
            <p className="caution-title">Images:</p>
            <span className="caution-text">
              The first image shall be the cover (max 6)
            </span>
          </div>
          <div className="image-container">
            <input
              type="file"
              id="image"
              accept="image/*"
              multiple
              required
              className="files"
            />
            <button type="button" className="uploa">
              upload
            </button>
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
