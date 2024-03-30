import React, { useEffect, useState } from "react";
import "../designs/UserProfileScreen.css";
import { useNavigate } from "react-router-dom"; 
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux'; 
import { changePassword } from '../actions/userActions';
import '../designs/HomePage.css';

function UserProfileAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirmation password do not match');
      return;
    }

    try {
      await dispatch(changePassword(currentPassword, newPassword));
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form className="settings-form" onSubmit={handleSave}>
        <div className="section-container" style={{position: 'absolute', left: '50rem', top: '3.6rem'}}>
          {/* <div className="d-flex justify-content-around">
            <Nav.Link id="itaas" as={Link} to="/userprofile">
              Profile Information
            </Nav.Link>
            <Nav.Link id="itaas" as={Link} to="/userprofileaccount">
              Account
            </Nav.Link>
          </div> */}
          {/* <div
            className="card custom-card-background text-white card h-10 h5-1 mb-1"
            style={{ backgroundColor: "black", width: "50rem", margin: "auto" }}
          > */}
            <h1 style={{lineHeight: '2.5rem'}} className="profInfo">Change Password</h1>
            <div style={{ width: "31.3rem", margin: "20px", }}>
              <div>
                <div>
                  <label>Replace your current password with a new one</label> <br /><br /><br />
                  <label>Current password</label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input
                      className="bar"
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '.02rem', padding: '.6rem 1rem' }}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div>
                  <label>Enter new password</label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input
                      className="bar"
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '.02rem', padding: '.6rem 1rem' }}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div>
                  <label>Confirm new password</label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input
                      className="bar"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '.02rem', padding: '.6rem 1rem' }}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Button
                  className="save-btn"
                  id="paw"
                  variant="primary"
                  type="submit"
                >
                  Save
                </Button>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </div>
            </div>
          </div>
        {/* </div> */}
    </form>
  );
}

export default UserProfileAccount;
