import React, { useEffect, useState } from "react";
import "../designs/UserProfileScreen.css";
import { useNavigate } from "react-router-dom"; 
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux'; 
import { changePassword } from '../actions/userActions';

function UserProfileAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Define dispatch function

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
      <div className="title">
        <h1 className="text-white">
          <b>User</b>
        </h1>
        <div className="section-container">
          <div className="d-flex justify-content-around">
            <Nav.Link id="itaas" as={Link} to="/userprofile">
              Profile Information
            </Nav.Link>
            <Nav.Link id="itaas" as={Link} to="/userprofileaccount">
              Account
            </Nav.Link>
          </div>
          <div
            className="card h-10 h5-1 mb-1"
            className="card custom-card-background text-white"
            style={{ backgroundColor: "black", width: "50rem", margin: "auto" }}
          >
            <h1 className="profInfo">Profile Information</h1>
            <div style={{ width: "47rem", margin: "20px" }}>
              <div>
                <div>
                  <label>Current password</label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input
                      className="bar"
                      type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div>
                  <label>New password</label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input
                      className="bar"
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div>
                  <label>Confirm password</label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input
                      className="bar"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Button
                  className="save-btn"
                  style={{ width: "6rem", margin: "30px" }}
                  variant="primary"
                  type="submit"
                >
                  Save
                </Button>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UserProfileAccount;
