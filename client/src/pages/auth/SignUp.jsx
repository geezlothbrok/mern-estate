import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="form-container">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="username"
          required
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="username"
          required
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="username"
          required
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+233 4567890"
          pattern="\+?[0-9\s\-]{7,15}"
          inputmode="numeric"
          required
          className="username"
        />
        <button type="submit" className="submit" style={{ marginTop: 20 }}>
          sign up
        </button>
        <button
          type="button"
          className="submit"
          style={{ backgroundColor: "#DB4437" }}
        >
          continue with google
        </button>
        <div className="already-account">
          <p className="already-text">Already Have an Account?</p>
          <Link to="/sign-in">
            <span
              className="already-link"
              style={{ textTransform: "capitalize" }}
            >
              sign in
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
