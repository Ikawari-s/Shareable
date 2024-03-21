import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordRequest } from '../actions/userActions'; 
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logotext from '../designs/images/logotext.png';  

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendPasswordError = useSelector(state => state.sendPasswordError);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(sendPasswordRequest(email)); 
      // Only set the message if there is no error
      setMessage('Password reset request sent successfully.');
    } catch (error) {
      setMessage('SEND FAILED');
    }
  };

  return (
    // <div>
    //   <h2>Forgot Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email:</label>
    //     <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     <button type="submit">Reset Password</button>
    //     <Link to="/"> Go back?</Link>
    //   </form>
      // {sendPasswordError && <p>{sendPasswordError}</p>}
      // {/* Only display the success message when there is no error */}
      // {message && !sendPasswordError && <p>{message}</p>}
    // </div>
    <div id="OTP">
      <div id="gab"> <img src={logotext} alt="Logo" /></div>
    <div className="container" style={{ paddingTop: '8.5rem'}}>
      <div className="card custom-card-background wrapper">
        <div className="card-header">
          <h1 className="text-center">Forgot Password</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                placeholder="Email"
                className="form-control"
                type="email" 
                id="email" 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className="d-grid gap-2 cum">
              <button
                className="btn btn-primary"
                type="submit"
                > Reset Password
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer text-">
        <Link id="da-link" to="/"> Go back?</Link>
        {sendPasswordError && <p style={{marginLeft: '6.5rem', fontSize: '0.8rem', marginBottom: '0'}}>{sendPasswordError}</p>}
      {/* Only display the success message when there is no error */}
      {message && !sendPasswordError && <p style={{marginLeft: '6.5rem', fontSize: '0.82rem', marginBottom: '0'}}>{message}</p>}
        </div>
      </div>
    </div>
  </div>
  );
}

export default ForgotPasswordScreen;
