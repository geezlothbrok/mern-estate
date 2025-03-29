import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className='signup-container'>
      <h1 className="signup-title">Sign Up</h1>
      <form className='form-container'>
        <input type="text" placeholder='username' id='username' className='username'/>
        <input type="email" placeholder='email' id='email' className='username'/>
        <input type="password" placeholder='password' id='password' className='username'/>
        <input type="tel" name="" id="phone" placeholder='tel' className='username'/>
        <button type="submit">sign up</button>
        <button>continue with google</button>
        <div className="already-account">
          <p className="already-text">Already Have an Account?</p>
          <Link to="/sign-in">
          <span className="already-link">sign in</span></Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp