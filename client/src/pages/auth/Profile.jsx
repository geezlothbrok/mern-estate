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
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { MdEdit } from "react-icons/md";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
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

  // This function handles the delete user event and sends a DELETE request to delete the user account.
  // It uses the fetch API to send the request and updates the Redux store accordingly.
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account deleted successfully!");
    } catch (error) {
      dispatch(deleteUserFailureUserFailure(error.message));
      toast.error(error.message);
    }
  };

  // This function handles the sign-out event and sends a POST request to sign out the user.
  // It uses the fetch API to send the request and updates the Redux store accordingly.
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout"); // Sign out the user
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
      toast.error(error.message);
    }
  };


  // This function handles the show listings event and sends a GET request to fetch the user's listings.
  // It uses the fetch API to send the request and updates the userListings state with the response data.
  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUserListings(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteListing = async (listingId) => {};
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
          <Link
            to="/create-listing"
            type="button"
            className="submit"
            style={{
              marginTop: 20,
              backgroundColor: "#2c3e50",
              color: "wheat",
              letterSpacing: 1,
              textAlign: "center",
            }}
            // disabled={loading}
          >
            create listing
          </Link>

          <div className="already-account">
            <span
              onClick={handleDeleteUser}
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
              onClick={handleSignOut}
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
            onClick={handleShowListings}
            className="show-listing"
            style={{ color: "#186a3b", cursor: "pointer", fontWeight: "bold" }}
          >
            Show Listings
          </p>
        </form>
        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <div className="user-listing" key={listing._id}>
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="cover"
                  className="listing-cover"
                />
              </Link>
              <Link to={`/listing/${listing._id}`}>
                <p className="listing-name">
                  {listing.name.length > 20
                    ? listing.name.slice(0, 25) + "..."
                    : listing.name}
                </p>
              </Link>
              <div className="listing-actions">
                <CiTrash className="listing-delete" onClick={handleDeleteListing}/>
                <MdEdit className="listing-edit" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Profile;
