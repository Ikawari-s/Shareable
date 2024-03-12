import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/registerActions';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyotpScreen() {
  const { userId } = useParams(); 
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false); // State to manage resend button disable
  const [countdown, setCountdown] = useState(60); // Countdown timer
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

  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  useEffect(() => {
    if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
  }, [countdown]);

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
        setResendDisabled(true); // Disable resend button
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
      <button onClick={handleResendOTP} disabled={resendDisabled}>Re-send OTP</button>
      {resendDisabled && <p>Resend OTP in: {countdown} seconds</p>}
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
}

export default VerifyotpScreen;
