import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/registerActions';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyotpScreen() {
  const { userId, otpId } = useParams(); // Get userId and otpId from URL params
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
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
      setErrorMessage(verifyOtpError);
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
      await dispatch(verifyOTP(userId, otp, otpId)); // Pass otpId to verifyOTP action
      navigate('/homepage');
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrorMessage(error); // Display error message to the user
    }
  };

  const handleResendOTP = () => {
    dispatch(resendOTP(userId)) 
      .then(() => {
        setErrorMessage('');
        setResendDisabled(true);
      })
      .catch((error) => {
        console.error('Failed to resend OTP:', error);
        setErrorMessage(error); 
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
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default VerifyotpScreen;
