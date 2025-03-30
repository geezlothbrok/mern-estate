import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { toast } from "react-toastify";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("Account created successfully!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="username"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="username"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="username"
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+233 4567890"
          pattern="^\+?[0-9]{7,15}$"
          inputmode="numeric"
          required
          onChange={handleChange}
          className="username"
        />
        <button
          type="submit"
          className="submit"
          style={{ marginTop: 20 }}
          disabled={loading}
        >
          {loading ? "loading" : "sign up"}
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
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default SignUp;
