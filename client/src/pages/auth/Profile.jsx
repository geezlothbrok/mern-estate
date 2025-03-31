import React from "react";
import "./SignUp.css";
import avatar from "../../assets/images/display_photo.jpg";
import { useSelector } from "react-redux";

function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="signup-container" style={{paddingBlock: "1rem"}}>
      <h1 className="signup-title">profile</h1>
      <form className="form-container" style={{marginTop: 0}}>
        <img src={currentUser.avatar }  alt="profile" style={{borderRadius: "50%", marginBlock: "1rem", height: "200px", width: "200px", objectFit: "cover"}}/>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="username"
          // onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="username"
          // onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="username"
          // onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+233 4567890"
          pattern="^\+?[0-9]{7,15}$"
          inputmode="numeric"
          // onChange={handleChange}
          className="username"
        />
        <button
          type="submit"
          className="submit"
          style={{ marginTop: 20, backgroundColor: "#4caf50", letterSpacing: 1 }}
          // disabled={loading}
        >
          update
        </button>
        <button
          type="submit"
          className="submit"
          style={{ marginTop: 20, backgroundColor: "#2c3e50" , color: "wheat", letterSpacing: 1}}
          // disabled={loading}
        >
          create listing
        </button>
        
        <div className="already-account">
          <span
            className="already-link"
            style={{ textTransform: "capitalize", color: "red", cursor: "pointer" }}
          >
            delete account
          </span>

          <span
            className="already-link"
            style={{ textTransform: "capitalize", cursor: "pointer", marginLeft: "3rem", color: "red", }}
          >
            sign out
          </span>
        </div>
        <p className="show-listing" style={{color: "#186a3b", cursor: "pointer", fontWeight: "bold",}}>Show Listings</p>
        {/* {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  );
}

export default Profile;
