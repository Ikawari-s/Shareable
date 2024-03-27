import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changePassword } from '../actions/userActions';

function ChangePassword() {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('All fields are required');
      return;
    }


    if (newPassword.length < 8) {
      setMessage('New password must be at least 8 characters long.');
      return;
    }


    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match');
      return;
    }

    setLoading(true);

    try {

      await dispatch(changePassword(currentPassword, newPassword));
      setMessage('Password changed successfully.');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(error.response.data.error);
    }

    setLoading(false);
  };

  return (
    <div className="container brap">
      <h1>Change Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;
