import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/registerActions';
import { useParams, useNavigate } from 'react-router-dom';
import logotext from '../designs/images/logotext.png';  

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
    <div id="OTP">
      <div id="gab"> <img src={logotext} alt="Logo" /></div>
    <div className="container" style={{ paddingTop: '8.5rem'}}>
      <div className="card custom-card-background wrapper">
        <div className="card-header">
          <h1 className="text-center">Enter OTP</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="otpInput" className="form-label">
                OTP:
              </label>
              <input
                placeholder="Enter your OTP"
                className="form-control"
                id="otpInput" 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} required 
              />
            </div>

            <div className="d-grid gap-2 cum">
              <button
                className="btn btn-primary"
                type="submit"
                > Submit
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer text-">
          <span 
          id='da-link'
          onClick={handleResendOTP} 
          style={{ 
          textDecoration: 'underline', 
          cursor: 'pointer',
          fontSize: '0.8rem',
          marginLeft: '16rem',
          paddingBottom: '10rem',
          }} 
          disabled={resendDisabled}
          >
          Re-send OTP
          </span>
          {resendDisabled && <p style={{marginLeft: '11.1rem', fontSize: '0.8rem', marginBottom: '0'}}>Resend OTP in: {countdown} seconds</p>}
          {errorMessage && <p style={{marginLeft: '4.6rem', fontSize: '0.8rem', marginBottom: '0'}} >{errorMessage}</p>}
        </div>
      </div>
    </div>
  </div>
  );
}

export default VerifyotpScreen;
