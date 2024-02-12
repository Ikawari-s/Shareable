import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendPasswordRequest } from '../actions/userActions'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(sendPasswordRequest(email)); 
      setMessage('Password reset request sent successfully.');
    } catch (error) {
      setMessage('Error: Unable to send password reset request.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Reset Password</button>
        <Link to="/"> Go back?</Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPasswordScreen;
