import { React , useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import error from '../designs/images/error.gif';  

function InvalidScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  return (
    <div id="error">
      <div id='lol'>
        <h1>NOOOOOOOOOOOOOOOOOO</h1>
      </div>
      <div id='hab'> <img src={error} alt="sad" /></div>
      <div id='jab'>
        <h2>Invalid Reset Password Link</h2>
          <p>The reset password link you provided is invalid or has expired.</p>
          <p>Please try again or contact support for assistance.</p>
          <Link id='uhoh'  to="/">Go back to Login</Link>
      </div>    
    </div>
  )
}

export default InvalidScreen