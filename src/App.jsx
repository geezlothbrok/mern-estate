import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Profile from './pages/auth/Profile'
import Home from './pages/home/Home'
import About from './pages/About'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App