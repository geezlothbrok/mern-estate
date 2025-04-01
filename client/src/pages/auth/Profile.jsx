import React, { useRef, useState, useEffect } from "react";
import "./SignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase/firebase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader"

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  const dispatch = useDispatch();

  // This useEffect hook is used to set the initial state of the formData object with the current user's data.
  // It uses the useSelector hook to get the current user data from the Redux store.
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // This function handles the file upload to Firebase Storage
  // and updates the formData state with the download URL of the uploaded file.
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        setFileUploadError(true);
        toast.error("Error in uploading image!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // This function handles the change event for the input fields and updates the formData state accordingly.
  // It uses the spread operator to create a new object with the updated field value.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // This function handles the form submission event and sends a POST request to update the user profile.
  // It uses the fetch API to send the request and updates the Redux store with the new user data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <>
    {loading && <Loader />}
    {error && toast.error(error)}
    <div className="signup-container" style={{ paddingBlock: "1rem" }}>
      <h1 className="signup-title">profile</h1>
      <form
        className="form-container"
        style={{ marginTop: 0 }}
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          style={{
            borderRadius: "50%",
            marginBlock: "1rem",
            height: "200px",
            width: "200px",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => fileRef.current.click()}
        />
        <p>
          {fileUploadError ? (
            <span style={{ color: "red", fontSize: "12px" }}>
              Error in Uploading image
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span
              style={{ color: "#58d68d", fontSize: "12px" }}
            >{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span style={{ color: "#186a3b", fontSize: "12px" }}>
              Image Uploaded Successfully!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          className="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="username"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="username"
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+233 4567890"
          pattern="^\+?[0-9]{7,15}$"
          inputmode="numeric"
          defaultValue={currentUser.phone}
          onChange={handleChange}
          className="username"
        />
        <button
          type="submit"
          className="submit"
          style={{
            marginTop: 20,
            backgroundColor: "#4caf50",
            letterSpacing: 1,
          }}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <button
          type="submit"
          className="submit"
          style={{
            marginTop: 20,
            backgroundColor: "#2c3e50",
            color: "wheat",
            letterSpacing: 1,
          }}
          // disabled={loading}
        >
          create listing
        </button>

        <div className="already-account">
          <span
            className="already-link"
            style={{
              textTransform: "capitalize",
              color: "red",
              cursor: "pointer",
            }}
          >
            delete account
          </span>

          <span
            className="already-link"
            style={{
              textTransform: "capitalize",
              cursor: "pointer",
              marginLeft: "3rem",
              color: "red",
            }}
          >
            sign out
          </span>
        </div>
        <p
          className="show-listing"
          style={{ color: "#186a3b", cursor: "pointer", fontWeight: "bold" }}
        >
          Show Listings
        </p>
         <p className="error">{error ? error : ""}</p>
      </form>
    </div>
    </>
  );
}

export default Profile;
