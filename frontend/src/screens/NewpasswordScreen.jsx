import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uidb64, setUidb64] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract uidb64 and token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const uidb64Param = urlParams.get('uidb64'); // Change uid to uidb64
    const tokenParam = urlParams.get('token');

    if (uidb64Param && tokenParam) {
      // Log uidb64 and token to console
      console.log('uidb64:', uidb64Param);
      console.log('token:', tokenParam);
      
      // Set uidb64 and token in component state
      setUidb64(uidb64Param);
      setToken(tokenParam);
    } else {
      // Handle missing uidb64 or token parameters
      setMessage('Error: Missing parameters for password reset.');
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Error: Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      // Update the password using the password-reset endpoint
      const resetUrl = `http://127.0.0.1:8000/api/password-reset/${uidb64}/${token}/`;
      await axios.patch(resetUrl, {
        new_password: password,
      });
      
      // Call the password-reset-complete endpoint to finalize the process
      const completeUrl = `http://127.0.0.1:8000/api/password-reset-complete/`;
      const response = await axios.post(completeUrl, {
        uidb64: uidb64,
        token: token,
        new_password: password,
      });
      
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error: Unable to reset password. Please try again later.');
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h2>New Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </div>
        <button type="submit" disabled={loading}>Reset Password</button>
        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default NewPasswordScreen;
