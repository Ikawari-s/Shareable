import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/registerActions';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyotpScreen() {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(verifyOTP(email, otp))
      .then(() => {
        console.log('OTP submitted:', otp);
        navigate('/'); 
      })
      .catch((error) => {
        console.error('OTP verification failed:', error);

      });
  };

  const handleResendOTP = () => {
    console.log('OTP re-sent');
    dispatch(resendOTP(email)) 
      .then(() => {
        console.log('OTP re-sent successfully');
      })
      .catch((error) => {
        console.error('Failed to resend OTP:', error);

      });
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otpInput">OTP:</label>
        <input id="otpInput" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleResendOTP}>Re-send OTP</button>
    </div>
  );
}

export default VerifyotpScreen;
