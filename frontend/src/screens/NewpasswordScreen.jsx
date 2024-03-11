import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userNewPasswordReducer } from '../actions/userActions';

function NewPasswordScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uidb64, setUidb64] = useState('');
  const [token, setToken] = useState('');
  const newPasswordState = useSelector(state => state.userNewPassword);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uidb64Param = urlParams.get('uidb64');
    const tokenParam = urlParams.get('token');

    if (uidb64Param && tokenParam) {
      setUidb64(uidb64Param);
      setToken(tokenParam);
    } else {
      navigate("/invalid");
    }
  }, [navigate]);

  useEffect(() => {
    if (newPasswordState && newPasswordState.success) {
      navigate("/");
    } else if (newPasswordState && newPasswordState.error) {
      if (newPasswordState.error === 'Cannot use old password') {
        setMessage('You cannot use your old password.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  }, [newPasswordState, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !uidb64 || !token) {
      setMessage('All fields are required for password reset.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await dispatch(userNewPasswordReducer(uidb64, token, password));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setMessage('You cannot use your old password.');
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <div>
      <h2>New Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>Reset Password</button>
        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default NewPasswordScreen;
