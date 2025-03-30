import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message || "Something went wrong"));
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("You have successfully Loged in!");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign In</h1>
      <form className="form-container" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="submit"
          style={{ marginTop: 20 }}
          disabled={loading}
        >
          {loading ? "loading" : "sign in"}
        </button>
        <div className="already-account">
          <p className="already-text">Dont have an account yet?</p>
          <Link to="/sign-up">
            <span
              className="already-link"
              style={{ textTransform: "capitalize" }}
            >
              create one
            </span>
          </Link>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default SignIn;
