import React from 'react';
import { Link } from 'react-router-dom';
import "./SignUp.css";

function SignUp() {
  return (
    <div className='signup-container'>
      <h1 className="signup-title">Sign Up</h1>
      <form className='form-container'>
        <input type="text" placeholder='username' id='username' className='username'/>
        <input type="email" placeholder='email' id='email' className='username'/>
        <input type="password" placeholder='password' id='password' className='username'/>
        <input type="tel" name="" id="phone" placeholder='tel' className='username'/>
        <button type="submit" className='submit' style={{marginTop: 20}}>sign up</button>
        <button className='submit' style={{backgroundColor: "#DB4437"}}>continue with google</button>
        <div className="already-account">
          <p className="already-text">Already Have an Account?</p>
          <Link to="/sign-in">
          <span className="already-link" style={{textTransform: "capitalize"}}>sign in</span></Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp