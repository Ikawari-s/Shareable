import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/registerActions';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyotpScreen() {
  const { email } = useParams();
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(verifyOTP(email, otp))
      .then(() => {
        console.log("OTP submitted:", otp);
        navigate('/'); // Redirect to the login page after successful OTP verification
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        // Handle error if OTP verification fails
      });
  };

  const handleResendOTP = () => {
    console.log("OTP re-sent");
    dispatch(resendOTP(email)) // Dispatch resendOTP action with email parameter
      .then(() => {
        console.log("OTP re-sent successfully");
      })
      .catch((error) => {
        console.error("Failed to resend OTP:", error);
        // Handle error if OTP resend fails
      });
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otpInput">OTP:</label>
        <input
          id="otpInput"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleResendOTP}>Re-send OTP</button>
    </div>
  );
}

export default VerifyotpScreen;
