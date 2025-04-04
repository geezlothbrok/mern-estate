import React, { useState } from "react";
import "./CreateListing.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {app} from "../../firebase/firebase.config";
import { AiOutlineCloseCircle } from "react-icons/ai";


function CreateListing() {
  const [files, setFiles] = React.useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading, setUploading] = useState(false);
  console.log(formData);
  
const handleImageUpload = (e) => {
  e.preventDefault(); // Prevent unnecessary form submission
    if (files.length > 0 && files.length +formData.imageUrls < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] });
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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  const handleRemoveImage = (index) => {
   setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_, i) => i !== index),
   })
  };
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
            minLength={10}
            maxLength= {62}
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
              onChange={(e) => setFiles(Array.from(e.target.files))} // Convert FileList to an array
            />
            <button type="button" className="uploa"  onClick={handleImageUpload} disabled={uploading}>
              {uploading ? "Uploading" : "Upload"}
            </button>
            {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
             <div className="image-cover">
               <img key={index} src={url} alt={`Uploaded ${index}`} className="image-preview" />
               <AiOutlineCloseCircle className="svg-icon" onClick={() => handleRemoveImage(index)}/>
             </div>
            ))}

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
