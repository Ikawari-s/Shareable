import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userNewPasswordReducer } from '../actions/userActions';
import logotext from '../designs/images/logotext.png';  

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
    const resetPassword = async () => {
      if (newPasswordState && newPasswordState.success) {
        navigate("/"); // Redirect to homepage upon success
      } else if (newPasswordState && newPasswordState.error) {
        if (newPasswordState.error === 'Cannot use old password') {
          setMessage('You cannot use your old password.');
        } else {
          setMessage('An error occurred. Please try again later.');
        }
      }
    };

    resetPassword();
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
      const success = await dispatch(userNewPasswordReducer(uidb64, token, password));
      setLoading(false);
      if (success) {
        navigate("/"); // Redirect to homepage upon success
      }
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
    // <div>
    //   <h2>New Password</h2>
    //   <form onSubmit={handleResetPassword}>
    //     <div>
    //       <label htmlFor="password">New Password:</label>
    //       <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     </div>
    //     <div>
    //       <label htmlFor="confirmPassword">Confirm Password:</label>
    //       <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
    //     </div>
    //     <button type="submit" disabled={loading}>Reset Password</button>
    //     {loading && <p>Loading...</p>}
    //     {message && <p>{message}</p>}
    //   </form>
    // </div>
    <div id="NewPassword">
      <div id="gab"> <img src={logotext} alt="Logo" /></div>
    <div className="container" style={{ paddingTop: '7rem'}}>
      <div className="card custom-card-background wrapper">
        <div className="card-header">
          <h1 className="text-center">New Password</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label htmlFor="[password]" className="form-label">
                New Password:
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2 cum">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}>
                Reset Password</button>
         {loading && <p style={{marginLeft: '17.5rem', fontSize: '0.8rem', marginBottom: '0'}}>Loading...</p>}
         {message && <p style={{marginLeft: '9rem', fontSize: '0.8rem', marginBottom: '0'}}>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default NewPasswordScreen;
