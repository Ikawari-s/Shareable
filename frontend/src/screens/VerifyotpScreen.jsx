import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/registerActions';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyotpScreen() {
  const { userId } = useParams(); 
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifyOtpError = useSelector(state => state.verifyOtpError);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  useEffect(() => {
    if (verifyOtpError) {
      setErrorMessage(verifyOtpError); // Set error message when verifyOtpError state changes
    }
  }, [verifyOtpError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await dispatch(verifyOTP(userId, otp)); 
      console.log('OTP submitted:', otp);
      navigate('/homepage');
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrorMessage('OTP verification failed. Please try again.');
    }
  };

  const handleResendOTP = () => {
    console.log('OTP re-sent');
    dispatch(resendOTP(userId)) 
      .then(() => {
        console.log('OTP re-sent successfully');
        setErrorMessage(''); // Clear error message when OTP is resent successfully
      })
      .catch((error) => {
        console.error('Failed to resend OTP:', error);
        setErrorMessage('Failed to resend OTP. Please try again.');
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
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
}

export default VerifyotpScreen;
