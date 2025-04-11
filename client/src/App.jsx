import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/auth/Profile";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Header from "./components/nav/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/private/PrivateRoute";
import CreateListing from "./pages/listing/CreateListing";
import UpdateListing from "./pages/listing/UpdateListing";
import Listing from "./pages/listing/Listing";
import Search from "./pages/search/Search";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          </Route>
          <Route path="/about-us" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
