import React, { useState } from "react";
import "./CreateListing.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase.config";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CreateListing() {
  const [files, setFiles] = React.useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    price: 50,
    bathrooms: 1,
    bedrooms: 1,
    type: "rent",
    parking: false,
    furnished: false,
  });
  console.log(formData);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Handle image upload
  // This function is triggered when the user selects files to upload
  // It checks if the number of files is between 1 and 6, and then uploads them to Firebase Storage
  // After successful upload, it updates the formData with the new image URLs
  // If the number of files exceeds 6, it alerts the user
  // and resets the uploading state
  // The function also handles errors during the upload process
  // and logs them to the console
  // The function uses the Firebase Storage API to upload files and get their download URLs
  // The function uses the useState hook to manage the state of the files and formData
  const handleImageUpload = (e) => {
    e.preventDefault(); // Prevent unnecessary form submission
    if (files.length > 0 && files.length + formData.imageUrls < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: [...formData.imageUrls, ...urls],
          });
          setUploading(false);
        })

        .catch((error) => {
          console.error("Error uploading images: ", error);
          setUploading(false);
        });
    } else {
      alert("Please select between 1 and 6 images.");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  // Handle image removal
  // This function is triggered when the user clicks on the remove icon of an image
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // Handle form submission
  // This function is triggered when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        toast.error("Please upload at least one image.");
      }
      setLoading(true);
      setError(false);
      toast.success("Listing created successfully!");
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <main className="listing-container">
        <h2 className="listing-title">Create a Listing</h2>

        <form className="listing-form-content" onSubmit={handleSubmit}>
          <div className="form-listing">
            <input
              type="text"
              id="name"
              placeholder="Enter title"
              required
              className="input-field"
              minLength={10}
              maxLength={62}
              onChange={handleChange}
              value={formData.name}
            />

            <textarea
              id="description"
              placeholder="Enter description"
              required
              className="input-field"
              type="text"
              onChange={handleChange}
              value={formData.description}
            />

            <input
              type="text"
              id="address"
              placeholder="Enter location"
              required
              className="input-field"
              onChange={handleChange}
              value={formData.location}
            />

            <div className="input-label">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                required
                className="input-fields"
                min={50}
                max={500000000}
                onChange={handleChange}
                value={formData.price}
              />
              <label htmlFor="bed">Bed</label>
              <input
                type="number"
                id="bedrooms"
                required
                className="input-fields"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bed}
              />
              <label htmlFor="bath">Baths</label>
              <input
                type="number"
                id="bathrooms"
                required
                className="input-fields"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bath}
              />
            </div>
            <div className="checkboxes">
              <label htmlFor="sale">Sale</label>
              <input
                type="radio"
                id="sale"
                required
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <label htmlFor="rent">Rent</label>
              <input
                type="radio"
                id="rent"
                required
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <label htmlFor="parking">Parking spot</label>
              <input
                type="checkbox"
                id="parking"
                required
                onChange={handleChange}
                checked={formData.parking}
              />
              <label htmlFor="furnished">Furnished</label>
              <input
                type="checkbox"
                id="furnished"
                required
                onChange={handleChange}
                checked={formData.furnished}
              />
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
              <div className="file-flex">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  required
                  className="files"
                  onChange={(e) => setFiles(Array.from(e.target.files))} // Convert FileList to an array
                />
                <button
                  type="button"
                  className="uploa"
                  onClick={handleImageUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading" : "Upload"}
                </button>
              </div>

              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div className="image-cover">
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="image-preview"
                    />
                    <AiOutlineCloseCircle
                      className="svg-icon"
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                ))}
            </div>
            <button type="submit" className="listing-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </main>
    </>
  );
}

export default CreateListing;
